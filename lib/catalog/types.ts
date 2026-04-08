export type CatalogTheme = {
  _id: string;
  slug: string;
  title: string;
  groupKey: string;
  groupTitle: string;
};

export type CatalogProduct = {
  _id: string;
  slug: string;
  title: string;
  price: number;
  available: boolean;
  imageUrl: string;
  theme: Pick<CatalogTheme, "_id" | "slug" | "title" | "groupKey" | "groupTitle">;
};

export type CatalogData = {
  themes: CatalogTheme[];
  products: CatalogProduct[];
};
