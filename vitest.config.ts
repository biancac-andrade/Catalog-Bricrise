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
        "src/hooks/useYarnProgress.ts",
        "src/components/catalog/ProductQuickView.tsx",
        "src/components/services/ServicesCarousel.tsx",
        "src/components/orders/InteractivePriceMatrix.tsx",
        "src/components/orders/OrdersShippingNotice.tsx",
        "src/context/LocaleContext.tsx",
        "lib/navigation/isNavActive.ts",
      ],
      thresholds: {
        statements: 95,
        branches: 95,
        functions: 95,
        lines: 95,
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