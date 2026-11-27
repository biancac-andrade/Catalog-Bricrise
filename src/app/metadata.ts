import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Bricrisê",
  description:
    "Catálogo Bricrisê — macramê artesanal, photocards e papelaria sob encomenda.",
};

/** Mantém o visual editorial claro mesmo com o sistema do celular em dark mode. */
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F7F8F3",
};