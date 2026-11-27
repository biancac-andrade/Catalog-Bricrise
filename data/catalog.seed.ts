import type {
  CatalogData,
  CatalogProduct,
  CatalogTheme,
} from "@/components/catalog/catalog.types";

export const catalogGroups: CatalogData["groups"] = [
  {
    _id: "seed-group-atelie",
    slug: "atelie",
    title: "Ateliê Criativa",
    key: "atelie",
  },
  {
    _id: "seed-group-papelaria",
    slug: "papelaria",
    title: "Papelaria Criativa",
    key: "papelaria",
  },
];

const pulseirasThemes: CatalogTheme[] = [
  {
    _id: "theme-copa",
    slug: "copa",
    title: "Copa",
    groupKey: "pulseiras",
    groupTitle: "Pulseiras",
    catalogGroupKey: "atelie",
  },
  {
    _id: "theme-variadas",
    slug: "variadas",
    title: "Variadas",
    groupKey: "pulseiras",
    groupTitle: "Pulseiras",
    catalogGroupKey: "atelie",
  },
];

function copaProducts(): CatalogProduct[] {
  const imgs = ["/products/1000576895.png", "/products/1000576806.png"];
  return Array.from({ length: 19 }, (_, i) => ({
    _id: `seed-copa-${i + 1}`,
    slug: `copa-modelo-${i + 1}`,
    title: i < 2 ? (i === 0 ? "Copa Letras Verde" : "Copa Tubular Trio") : `Copa — modelo ${i + 1}`,
    price: 18 + (i % 8),
    available: true,
    imageUrl: imgs[i % 2]!,
    theme: {
      _id: "theme-copa",
      slug: "copa",
      title: "Copa",
      groupKey: "pulseiras",
      groupTitle: "Pulseiras",
      catalogGroupKey: "atelie",
    },
  }));
}

const variadasProducts: CatalogProduct[] = [
  {
    _id: "seed-var-1",
    slug: "variadas-1",
    title: "Pulseira tons neutros",
    price: 22,
    available: true,
    imageUrl: "/products/1000576806.png",
    theme: {
      _id: "theme-variadas",
      slug: "variadas",
      title: "Variadas",
      groupKey: "pulseiras",
      groupTitle: "Pulseiras",
      catalogGroupKey: "atelie",
    },
  },
];

export const catalogSeed: CatalogData = {
  groups: catalogGroups,
  themes: pulseirasThemes,
  products: [...copaProducts(), ...variadasProducts],
};