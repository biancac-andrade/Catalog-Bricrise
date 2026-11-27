import { describe, expect, it } from "vitest";

import type { CatalogProduct, CatalogTheme } from "./catalog.types";
import {
  filterCatalogProducts,
  getThemesForCatalogGroup,
  getVisibleCatalogPills,
} from "./categoryFilters";

const atelieTheme: CatalogTheme = {
  _id: "t1",
  slug: "copa",
  title: "Copa",
  groupKey: "pulseiras",
  groupTitle: "Pulseiras",
  catalogGroupKey: "atelie",
};

const papelTheme: CatalogTheme = {
  _id: "t2",
  slug: "kpop",
  title: "KPOP",
  groupKey: "photocards",
  groupTitle: "Photocards",
  catalogGroupKey: "papelaria",
};

function product(theme: CatalogTheme, id: string): CatalogProduct {
  return {
    _id: id,
    slug: id,
    title: `Produto ${id}`,
    price: 10,
    available: true,
    imageUrl: "/x.png",
    theme: {
      _id: theme._id,
      slug: theme.slug,
      title: theme.title,
      groupKey: theme.groupKey,
      groupTitle: theme.groupTitle,
      catalogGroupKey: theme.catalogGroupKey,
    },
  };
}

describe("catalog filters", () => {
  const products = [
    product(atelieTheme, "a1"),
    product(papelTheme, "p1"),
    {
      ...product(atelieTheme, "orphan"),
      theme: {
        ...product(atelieTheme, "orphan").theme,
        catalogGroupKey: null,
      },
    },
  ];

  it("should only show group tabs that have products", () => {
    const pills = getVisibleCatalogPills(products);
    expect(pills.map((p) => p.id)).toEqual(["all", "atelie", "papelaria"]);
  });

  it("should list themes with counts for atelie", () => {
    const themes = getThemesForCatalogGroup(
      [atelieTheme, papelTheme],
      products,
      "atelie",
    );
    expect(themes).toHaveLength(1);
    expect(themes[0]?.theme.slug).toBe("copa");
    expect(themes[0]?.productCount).toBe(1);
  });

  it("should keep ungrouped products in Todos only", () => {
    const all = filterCatalogProducts(products, {
      category: "all",
      themeSlug: null,
      query: "",
    });
    expect(all).toHaveLength(3);

    const atelie = filterCatalogProducts(products, {
      category: "atelie",
      themeSlug: null,
      query: "",
    });
    expect(atelie).toHaveLength(1);
  });
});
