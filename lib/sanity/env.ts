export function isSanityConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim());
}

export function getSanityProjectId(): string | undefined {
  return process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
}

export function getSanityDataset(): string {
  return process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
}
