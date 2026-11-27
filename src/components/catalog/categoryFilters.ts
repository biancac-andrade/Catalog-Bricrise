import type { CatalogGroupKey, CatalogProduct, CatalogTheme } from "./catalog.types";
import {
  inferCatalogGroupKeyFromTheme,
  resolveProductCatalogGroup,
} from "./resolveCatalogGroup";

export type CatalogCategoryFilter = "all" | CatalogGroupKey;

export type CatalogGroupFilterLabels = {
  all: string;
  atelie: string;
  papelaria: string;
};

export function getVisibleCatalogPills(
  products: CatalogProduct[],
  labels: CatalogGroupFilterLabels,
): { id: CatalogCategoryFilter; label: string }[] {
  const pills: { id: CatalogCategoryFilter; label: string }[] = [
    { id: "all", label: labels.all },
  ];

  const hasAtelie = products.some(
    (p) => resolveProductCatalogGroup(p) === "atelie",
  );
  const hasPapelaria = products.some(
    (p) => resolveProductCatalogGroup(p) === "papelaria",
  );

  if (hasAtelie) {
    pills.push({ id: "atelie", label: labels.atelie });
  }
  if (hasPapelaria) {
    pills.push({ id: "papelaria", label: labels.papelaria });
  }

  return pills;
}

export type ThemeWithCount = {
  theme: CatalogTheme;
  productCount: number;
};

export function getThemesForCatalogGroup(
  themes: CatalogTheme[],
  products: CatalogProduct[],
  group: CatalogGroupKey,
): ThemeWithCount[] {
  const counts = new Map<string, number>();

  for (const product of products) {
    if (resolveProductCatalogGroup(product) !== group) continue;
    counts.set(product.theme._id, (counts.get(product.theme._id) ?? 0) + 1);
  }

  return themes
    .filter((theme) => {
      const themeGroup =
        theme.catalogGroupKey ??
        inferThemeGroupForList(theme, products);
      return themeGroup === group && (counts.get(theme._id) ?? 0) > 0;
    })
    .map((theme) => ({
      theme,
      productCount: counts.get(theme._id) ?? 0,
    }))
    .sort((a, b) => a.theme.title.localeCompare(b.theme.title, "pt-BR"));
}

function inferThemeGroupForList(
  theme: CatalogTheme,
  products: CatalogProduct[],
): CatalogGroupKey | null {
  if (theme.catalogGroupKey) return theme.catalogGroupKey;
  const sample = products.find((p) => p.theme._id === theme._id);
  if (sample) return resolveProductCatalogGroup(sample);
  return inferCatalogGroupKeyFromTheme(theme);
}

export function filterCatalogProducts(
  products: CatalogProduct[],
  options: {
    category: CatalogCategoryFilter;
    themeSlug: string | null;
    query: string;
  },
): CatalogProduct[] {
  const q = options.query.trim().toLowerCase();
  let list = products;

  if (options.category !== "all") {
    list = list.filter(
      (p) => resolveProductCatalogGroup(p) === options.category,
    );
  }

  if (options.category !== "all" && options.themeSlug) {
    list = list.filter((p) => p.theme.slug === options.themeSlug);
  }

  if (q) {
    list = list.filter((p) => p.title.toLowerCase().includes(q));
  }

  return list;
}