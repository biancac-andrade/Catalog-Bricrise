import type { CatalogData, CatalogProduct, CatalogTheme } from "@/lib/catalog/types";
import { urlForSanityImage } from "@/lib/sanity/image";

type RawTheme = {
  _id: string;
  slug: string | null;
  title: string | null;
  groupKey: string | null;
  groupTitle: string | null;
};

type RawProduct = {
  _id: string;
  title: string | null;
  price: number | null;
  slug: string | null;
  /** Ausente em documentos antigos = disponível. */
  available: boolean | null;
  image: unknown;
  theme: RawTheme | null;
};

type RawCatalog = {
  themes: RawTheme[];
  products: RawProduct[];
};

function normalizeTheme(t: RawTheme): CatalogTheme | null {
  if (!t.slug || !t.title) return null;
  return {
    _id: t._id,
    slug: t.slug,
    title: t.title,
    groupKey: t.groupKey ?? "geral",
    groupTitle: t.groupTitle ?? "Catálogo",
  };
}

function themesFromProducts(list: CatalogProduct[]): CatalogTheme[] {
  const map = new Map<string, CatalogTheme>();
  for (const p of list) {
    const id = p.theme._id;
    if (!map.has(id)) {
      map.set(id, {
        _id: p.theme._id,
        slug: p.theme.slug,
        title: p.theme.title,
        groupKey: p.theme.groupKey,
        groupTitle: p.theme.groupTitle,
      });
    }
  }
  return [...map.values()].sort((a, b) =>
    a.groupTitle.localeCompare(b.groupTitle, "pt-BR"),
  );
}

export function mapSanityCatalog(raw: RawCatalog): CatalogData {
  let themes = (raw.themes ?? [])
    .map(normalizeTheme)
    .filter(Boolean) as CatalogTheme[];

  const products: CatalogProduct[] = [];

  for (const p of raw.products ?? []) {
    if (p.title == null || p.price == null || !p.slug) {
      continue;
    }

    const theme = p.theme;
    if (!theme?.slug || !theme?.title) {
      continue;
    }

    const imageUrl = urlForSanityImage(p.image, 900);
    if (!imageUrl) continue;

    products.push({
      _id: p._id,
      slug: p.slug,
      title: p.title,
      price: p.price,
      available: p.available !== false,
      imageUrl,
      theme: {
        _id: theme._id,
        slug: theme.slug,
        title: theme.title,
        groupKey: theme.groupKey ?? "geral",
        groupTitle: theme.groupTitle ?? "Catálogo",
      },
    });
  }

  if (themes.length === 0 && products.length > 0) {
    themes = themesFromProducts(products);
  }

  return { themes, products };
}
