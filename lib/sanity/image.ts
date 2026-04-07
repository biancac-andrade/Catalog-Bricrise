import { createImageUrlBuilder } from "@sanity/image-url";

import { getSanityDataset, getSanityProjectId } from "./env";

/** Aceita o campo `image` típico de documentos Sanity (`image` com `asset`). */
export function urlForSanityImage(source: unknown, width = 900): string | null {
  const projectId = getSanityProjectId();
  if (!projectId || source == null) return null;

  const builder = createImageUrlBuilder({
    projectId,
    dataset: getSanityDataset(),
  });

  try {
    return builder
      .image(source as never)
      .width(width)
      .quality(86)
      .auto("format")
      .url();
  } catch {
    return null;
  }
}
