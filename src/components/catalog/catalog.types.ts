export type CatalogGroupKey = "atelie" | "papelaria";

export type CatalogGroup = {
  _id: string;
  slug: string;
  title: string;
  key: CatalogGroupKey;
};

export type CatalogTheme = {
  _id: string;
  slug: string;
  title: string;
  /** Legado: subgrupo / linha (ex. pulseiras). Mantido para CMS antigo. */
  groupKey: string;
  groupTitle: string;
  /** Grupo vitrine (Ateliê / Papelaria). Null = só aparece em Todos. */
  catalogGroupKey: CatalogGroupKey | null;
};

export type CatalogProductTheme = Pick<
  CatalogTheme,
  "_id" | "slug" | "title" | "groupKey" | "groupTitle" | "catalogGroupKey"
>;

export type CatalogProduct = {
  _id: string;
  slug: string;
  title: string;
  price: number;
  available: boolean;
  imageUrl: string;
  theme: CatalogProductTheme;
};

export type CatalogData = {
  groups: CatalogGroup[];
  themes: CatalogTheme[];
  products: CatalogProduct[];
};