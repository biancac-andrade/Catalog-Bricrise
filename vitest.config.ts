import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const root = __dirname;

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    css: false,
  },
  resolve: {
    alias: [
      { find: "@/lib", replacement: path.resolve(root, "lib") },
      { find: "@/data", replacement: path.resolve(root, "data") },
      { find: "@", replacement: path.resolve(root, "src") },
    ],
  },
});