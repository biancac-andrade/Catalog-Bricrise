import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Produto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Preço (R$)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "theme",
      title: "Tema",
      type: "reference",
      to: [{ type: "theme" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "available",
      title: "Disponível para venda",
      type: "boolean",
      description:
        "Desmarque quando já tiver vendido — o site mostra como esgotado, sem precisar apagar o produto.",
      initialValue: true,
    }),
  ],
});
