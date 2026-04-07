import { defineCliConfig } from "sanity/cli";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID?.trim() ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ||
  "";
const dataset =
  process.env.SANITY_STUDIO_DATASET?.trim() ||
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ||
  "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
