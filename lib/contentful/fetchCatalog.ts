import { catalogSeed } from "@/data/catalog.seed";
import type { CatalogData } from "@/app/components/CatalogView";
import { getContentfulClient } from "@/lib/contentful/client";
import { isContentfulConfigured } from "@/lib/contentful/env";
import { mapContentfulToCatalog } from "@/lib/contentful/mapContentfulCatalog";

export async function fetchCatalog(): Promise<CatalogData> {
  if (!isContentfulConfigured()) {
    return catalogSeed;
  }

  const client = getContentfulClient();
  if (!client) {
    return catalogSeed;
  }

  try {
    const mapped = await mapContentfulToCatalog(client);
    if (mapped.products.length === 0) {
      return catalogSeed;
    }
    return mapped;
  } catch {
    return catalogSeed;
  }
}
