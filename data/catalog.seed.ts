import type { CatalogData, CatalogProduct, CatalogTheme } from "@/app/components/CatalogView";

const pulseirasThemes: CatalogTheme[] = [
  {
    _id: "theme-copa",
    slug: "copa",
    title: "Copa",
    groupKey: "pulseiras",
    groupTitle: "Pulseiras",
  },
  {
    _id: "theme-variadas",
    slug: "variadas",
    title: "Variadas",
    groupKey: "pulseiras",
    groupTitle: "Pulseiras",
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
    },
  },
];

export const catalogSeed: CatalogData = {
  themes: pulseirasThemes,
  products: [...copaProducts(), ...variadasProducts],
};
