import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./sanity/schemaTypes";

/**
 * No browser, o Sanity substitui só `process.env.SANITY_STUDIO_*` (não `NEXT_PUBLIC_*`).
 * O `npm run studio` copia NEXT_PUBLIC → SANITY_STUDIO em scripts/studio.mjs.
 */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID?.trim();
const dataset =
  process.env.SANITY_STUDIO_DATASET?.trim() || "production";

if (!projectId) {
  throw new Error(
    [
      "Sanity Studio: falta o ID do projeto.",
      "No `.env` use NEXT_PUBLIC_SANITY_PROJECT_ID=… e rode `npm run studio`,",
      "ou defina SANITY_STUDIO_PROJECT_ID=… (mesmo valor).",
      "Opcional: SANITY_STUDIO_DATASET=production",
    ].join("\n"),
  );
}

export default defineConfig({
  name: "default",
  title: "Bricrisê — catálogo",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
