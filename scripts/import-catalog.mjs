/**
 * Importa temas e produtos para o Sanity a partir de `data/sanity-catalog.json`.
 * Útil quando o Studio no browser não deixa escrever nos inputs.
 *
 * 1. Copie `data/sanity-catalog.example.json` → `data/sanity-catalog.json`
 * 2. Edite o JSON no Cursor (caminhos de `image` relativos à raiz do projeto)
 * 3. Em sanity.io/manage → API → Crie token com permissão "Editor" (não commite o token)
 * 4. `.env`: SANITY_API_WRITE_TOKEN=sk...
 * 5. npm run import:sanity
 */
import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { existsSync, readFileSync, createReadStream } from "node:fs";
import { resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = resolve(__dirname, "..");

config({ path: resolve(root, ".env") });
config({ path: resolve(root, ".env.local"), override: true });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

const catalogPath = resolve(root, "data", "sanity-catalog.json");

if (!projectId) {
  console.error("Falta NEXT_PUBLIC_SANITY_PROJECT_ID no .env");
  process.exit(1);
}
if (!token) {
  console.error(
    "Falta SANITY_API_WRITE_TOKEN. Crie em https://www.sanity.io/manage → API → Tokens (Editor).",
  );
  process.exit(1);
}
if (!existsSync(catalogPath)) {
  console.error(
    `Crie ${catalogPath} (podes copiar data/sanity-catalog.example.json).`,
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

/** @param {string} relPath */
function absImage(relPath) {
  const p = resolve(root, relPath);
  if (!existsSync(p)) {
    throw new Error(`Imagem não encontrada: ${relPath} (abs: ${p})`);
  }
  return p;
}

async function themeIdBySlug(slug) {
  return client.fetch(`*[_type == "theme" && slug.current == $slug][0]._id`, {
    slug,
  });
}

async function upsertTheme(t) {
  const slug = t.slug?.trim();
  if (!slug || !t.title?.trim()) {
    throw new Error(`Tema inválido: ${JSON.stringify(t)}`);
  }
  const doc = {
    _type: "theme",
    title: t.title.trim(),
    slug: { _type: "slug", current: slug },
    groupKey: (t.groupKey ?? "pulseiras").trim(),
    groupTitle: (t.groupTitle ?? "Pulseiras").trim(),
  };
  const id = await themeIdBySlug(slug);
  if (id) {
    await client
      .patch(id)
      .set({
        title: doc.title,
        slug: doc.slug,
        groupKey: doc.groupKey,
        groupTitle: doc.groupTitle,
      })
      .commit();
    console.log(`Tema atualizado: ${slug}`);
    return id;
  }
  const created = await client.create(doc);
  console.log(`Tema criado: ${slug}`);
  return created._id;
}

async function uploadImage(relPath) {
  const path = absImage(relPath);
  const asset = await client.assets.upload("image", createReadStream(path), {
    filename: basename(path),
  });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

async function upsertProduct(p, themeRefId) {
  const slug = p.slug?.trim();
  if (!slug || !p.title?.trim() || p.price == null) {
    throw new Error(`Produto inválido: ${JSON.stringify(p)}`);
  }
  if (!p.image?.trim()) {
    throw new Error(`Produto "${slug}" precisa de campo "image" (caminho relativo).`);
  }
  const image = await uploadImage(p.image.trim());
  const available = p.available === false ? false : true;
  const doc = {
    _type: "product",
    title: p.title.trim(),
    slug: { _type: "slug", current: slug },
    price: Number(p.price),
    available,
    image,
    theme: { _type: "reference", _ref: themeRefId },
  };
  if (!Number.isFinite(doc.price) || doc.price <= 0) {
    throw new Error(`Preço inválido no produto "${slug}"`);
  }

  const id = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]._id`,
    { slug },
  );
  if (id) {
    await client
      .patch(id)
      .set({
        title: doc.title,
        slug: doc.slug,
        price: doc.price,
        available: doc.available,
        image: doc.image,
        theme: doc.theme,
      })
      .commit();
    console.log(`Produto atualizado: ${slug}`);
  } else {
    await client.create(doc);
    console.log(`Produto criado: ${slug}`);
  }
}

async function main() {
  const raw = readFileSync(catalogPath, "utf8");
  const data = JSON.parse(raw);
  const themes = data.themes ?? [];
  const products = data.products ?? [];

  if (themes.length === 0) {
    console.error("O JSON precisa de um array `themes` com pelo menos um tema.");
    process.exit(1);
  }

  const themeIds = {};
  for (const t of themes) {
    const slug = t.slug?.trim();
    const id = await upsertTheme(t);
    themeIds[slug] = id;
  }

  for (const p of products) {
    const ts = p.themeSlug?.trim();
    if (!ts || !themeIds[ts]) {
      throw new Error(
        `Produto "${p.slug}": themeSlug "${ts}" não existe nos temas importados.`,
      );
    }
    await upsertProduct(p, themeIds[ts]);
  }

  console.log("\nFeito. No Sanity, os documentos podem estar como rascunho: publica no Manage se precisares.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
