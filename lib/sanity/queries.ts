import { defineQuery } from "next-sanity";

/**
 * Espera documentos no Sanity:
 * - `theme`: title, slug (slug), groupKey, groupTitle
 * - `product`: title, price, available, slug (slug), image, theme (ref → theme)
 *
 * Ao criar novos temas no Studio, eles aparecem automaticamente na query (e no menu lateral).
 */
export const catalogQuery = defineQuery(`{
  "themes": *[_type == "theme"] | order(groupTitle asc, title asc) {
    _id,
    "slug": slug.current,
    title,
    groupKey,
    groupTitle
  },
  "products": *[_type == "product"] | order(title asc) {
    _id,
    title,
    price,
    available,
    "slug": slug.current,
    image,
    "theme": theme->{
      _id,
      "slug": slug.current,
      title,
      groupKey,
      groupTitle
    }
  }
}`);
