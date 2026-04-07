import { createClient, type SanityClient } from "next-sanity";

import { getSanityDataset, getSanityProjectId } from "./env";

let _client: SanityClient | null = null;

/** Só cria cliente quando o projeto Sanity está configurado no ambiente. */
export function getSanityClient(): SanityClient | null {
  const projectId = getSanityProjectId();
  if (!projectId) return null;

  if (!_client) {
    _client = createClient({
      projectId,
      dataset: getSanityDataset(),
      apiVersion: "2024-01-01",
      useCdn: true,
    });
  }
  return _client;
}
