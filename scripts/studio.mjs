/**
 * Carrega `.env` / `.env.local` antes do Sanity Studio.
 * O Vite do Studio não pode importar `dotenv` + `node:path` no browser.
 */
import { config } from "dotenv";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

if (existsSync(resolve(root, ".env"))) {
  config({ path: resolve(root, ".env") });
}
if (existsSync(resolve(root, ".env.local"))) {
  config({ path: resolve(root, ".env.local"), override: true });
}

/**
 * O Studio injeta no browser só variáveis `SANITY_STUDIO_*` (ver docs Sanity).
 * Espelhamos a partir de `NEXT_PUBLIC_*` para não duplicar no `.env`.
 */
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID?.trim() ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ||
  "";
const dataset =
  process.env.SANITY_STUDIO_DATASET?.trim() ||
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ||
  "production";

if (projectId) {
  process.env.SANITY_STUDIO_PROJECT_ID = projectId;
}
process.env.SANITY_STUDIO_DATASET = dataset;

const sanityBin = resolve(root, "node_modules/sanity/bin/sanity");
const child = spawn(process.execPath, [sanityBin, "dev", "--port", "3333"], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
