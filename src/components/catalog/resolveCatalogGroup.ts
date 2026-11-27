import type { CatalogGroupKey, CatalogProduct, CatalogTheme } from "./catalog.types";

const ATELIE_GROUP_ALIASES = new Set([
  "atelie",
  "atelie-criativa",
  "ateliê",
  "feito-a-mao",
  "pulseiras",
  "macrame",
]);

const PAPELARIA_GROUP_ALIASES = new Set([
  "papelaria",
  "papelaria-criativa",
  "photocards",
  "kpop",
  "cards",
]);

const ATELIE_HINTS = [
  "pulseir",
  "macram",
  "macramê",
  "ateli",
  "chaveiro",
  "nó",
  "copa",
  "variadas",
  "sete nós",
  "corda",
];

const PAPELARIA_HINTS = [
  "papel",
  "card",
  "photocard",
  "adesiv",
  "lamin",
  "papelaria",
  "kpop",
  "caneta",
];

export function normalizeCatalogGroupKey(
  raw: string | null | undefined,
): CatalogGroupKey | null {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  if (key === "atelie" || key === "papelaria") return key;
  if (ATELIE_GROUP_ALIASES.has(key)) return "atelie";
  if (PAPELARIA_GROUP_ALIASES.has(key)) return "papelaria";
  return null;
}

export function inferCatalogGroupKeyFromTheme(
  theme: Pick<CatalogTheme, "groupKey" | "title" | "slug">,
): CatalogGroupKey | null {
  const fromGroupKey = normalizeCatalogGroupKey(theme.groupKey);
  if (fromGroupKey) return fromGroupKey;

  const haystack =
    `${theme.groupKey} ${theme.title} ${theme.slug}`.toLowerCase();
  if (ATELIE_HINTS.some((h) => haystack.includes(h))) return "atelie";
  if (PAPELARIA_HINTS.some((h) => haystack.includes(h))) return "papelaria";
  return null;
}

export function resolveProductCatalogGroup(
  product: CatalogProduct,
): CatalogGroupKey | null {
  return product.theme.catalogGroupKey;
}