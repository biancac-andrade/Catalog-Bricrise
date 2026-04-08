export function isContentfulConfigured(): boolean {
  return Boolean(
    process.env.CONTENTFUL_SPACE_ID?.trim() &&
      process.env.CONTENTFUL_ACCESS_TOKEN?.trim(),
  );
}

export function getContentfulSpaceId(): string | undefined {
  return process.env.CONTENTFUL_SPACE_ID?.trim();
}

export function getContentfulAccessToken(): string | undefined {
  return process.env.CONTENTFUL_ACCESS_TOKEN?.trim();
}

export function getContentfulLocale(): string {
  return process.env.CONTENTFUL_LOCALE?.trim() || "en-US";
}

export function getContentfulEnvironment(): string {
  return process.env.CONTENTFUL_ENVIRONMENT?.trim() || "master";
}
