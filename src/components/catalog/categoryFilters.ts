import type { CatalogProduct } from "./catalog.types";

export type CatalogCategoryFilter = "all" | "macrame" | "papelaria";

export const CATALOG_PILL_OPTIONS: {
  id: CatalogCategoryFilter;
  label: string;
}[] = [
  { id: "all", label: "Todos" },
  { id: "macrame", label: "Ateliê Macramê" },
  { id: "papelaria", label: "Papelaria & Cards" },
];

function haystackFromTheme(product: CatalogProduct): string {
  const { groupKey, groupTitle, title } = product.theme;
  return `${groupKey} ${groupTitle} ${title}`.toLowerCase();
}

const MACRAME_HINTS = [
  "pulseir",
  "macram",
  "macramê",
  "ateli",
  "chaveiro",
  "nó",
  "corda",
];

const PAPELARIA_HINTS = [
  "papel",
  "card",
  "photocard",
  "adesiv",
  "lamin",
  "papelaria",
];

function matchesHints(haystack: string, hints: string[]) {
  return hints.some((h) => haystack.includes(h));
}

export function filterProductsByCategory(
  products: CatalogProduct[],
  filter: CatalogCategoryFilter,
): CatalogProduct[] {
  if (filter === "all") return products;

  return products.filter((p) => {
    const haystack = haystackFromTheme(p);
    if (filter === "macrame") {
      return matchesHints(haystack, MACRAME_HINTS);
    }
    return matchesHints(haystack, PAPELARIA_HINTS);
  });
}