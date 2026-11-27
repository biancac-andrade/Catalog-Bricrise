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
    coverage: {
      provider: "v8",
      include: [
        "src/components/services/ServicesCarousel.tsx",
        "src/components/sections/HeroSection.tsx",
        "src/components/sections/HomeFrontsSection.tsx",
        "src/components/layout/Footer.tsx",
        "src/components/orders/OrdersShippingNotice.tsx",
      ],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
  resolve: {
    alias: [
      { find: "@/lib", replacement: path.resolve(root, "lib") },
      { find: "@/data", replacement: path.resolve(root, "data") },
      { find: "@", replacement: path.resolve(root, "src") },
    ],
  },
});