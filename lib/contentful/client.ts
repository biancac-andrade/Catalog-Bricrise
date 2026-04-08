import { createClient, type ContentfulClientApi } from "contentful";

import {
  getContentfulAccessToken,
  getContentfulEnvironment,
  getContentfulSpaceId,
} from "./env";

let _client: ContentfulClientApi<undefined> | null = null;

export function getContentfulClient(): ContentfulClientApi<undefined> | null {
  const space = getContentfulSpaceId();
  const accessToken = getContentfulAccessToken();
  if (!space || !accessToken) {
    return null;
  }

  _client ??= createClient({
    space,
    accessToken,
    environment: getContentfulEnvironment(),
  });

  return _client;
}
