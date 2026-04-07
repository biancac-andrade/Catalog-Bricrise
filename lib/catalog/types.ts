/** Formato estável para o front — alinhado ao que o Sanity deve devolver após o fetch/GROQ. */
export type CatalogTheme = {
  _id: string;
  slug: string;
  title: string;
  /** Agrupa no menu lateral, ex.: todas as pulseiras sob "Pulseiras". */
  groupKey: string;
  groupTitle: string;
};

export type CatalogProduct = {
  _id: string;
  slug: string;
  title: string;
  price: number;
  /** false = vendido/esgotado (controlado no CMS). */
  available: boolean;
  /** URL absoluta (CDN Sanity) ou caminho local em /public */
  imageUrl: string;
  theme: Pick<CatalogTheme, "_id" | "slug" | "title" | "groupKey" | "groupTitle">;
};

export type CatalogData = {
  themes: CatalogTheme[];
  products: CatalogProduct[];
};
