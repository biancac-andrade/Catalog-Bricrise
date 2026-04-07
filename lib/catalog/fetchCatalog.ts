import { catalogSeed } from "@/data/catalog.seed";
import type { CatalogData } from "@/lib/catalog/types";
import { getSanityClient } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/env";
import { catalogQuery } from "@/lib/sanity/queries";

import { mapSanityCatalog } from "./mapSanityCatalog";

export async function fetchCatalog(): Promise<CatalogData> {
  if (!isSanityConfigured()) {
    return catalogSeed;
  }

  const client = getSanityClient();
  if (!client) {
    return catalogSeed;
  }

  try {
    const raw = await client.fetch(catalogQuery);
    const mapped = mapSanityCatalog(raw);
    if (mapped.products.length === 0) {
      return catalogSeed;
    }
    return mapped;
  } catch {
    return catalogSeed;
  }
}
