/**
 * Carrega `.env` / `.env.local` e corre `sanity deploy` (Studio em *.sanity.studio).
 * Primeira vez: `sanity login` se ainda não estiveres autenticada.
 * Extra args: `npm run studio:deploy -- --yes` ou `--url bricrise-catalogo`
 */
import { config } from "dotenv";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

if (existsSync(resolve(root, ".env"))) {
  config({ path: resolve(root, ".env") });
}
if (existsSync(resolve(root, ".env.local"))) {
  config({ path: resolve(root, ".env.local"), override: true });
}

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID?.trim() ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ||
  "";
const dataset =
  process.env.SANITY_STUDIO_DATASET?.trim() ||
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ||
  "production";

if (!projectId) {
  console.error(
    "Falta NEXT_PUBLIC_SANITY_PROJECT_ID (ou SANITY_STUDIO_PROJECT_ID) no .env",
  );
  process.exit(1);
}

process.env.SANITY_STUDIO_PROJECT_ID = projectId;
process.env.SANITY_STUDIO_DATASET = dataset;

const extra = process.argv.slice(2);
const sanityBin = resolve(root, "node_modules/sanity/bin/sanity");
const child = spawn(
  process.execPath,
  [sanityBin, "deploy", ...extra],
  {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  },
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
