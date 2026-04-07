import { defineField, defineType } from "sanity";

export const theme = defineType({
  name: "theme",
  title: "Tema",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome do tema",
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
      name: "groupKey",
      title: "Chave do grupo (menu)",
      type: "string",
      description: 'Ex.: pulseiras — agrupa abas no site.',
      initialValue: "pulseiras",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "groupTitle",
      title: "Título do grupo no menu",
      type: "string",
      description: "Ex.: Pulseiras",
      initialValue: "Pulseiras",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
