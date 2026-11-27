import { describe, expect, it } from "vitest";

import type { CartLine } from "@/types/cart";

import { formatCartWhatsAppMessage } from "./formatCartWhatsAppMessage";

const sample: CartLine[] = [
  {
    productId: "1",
    title: "Pulseira teste",
    price: 12,
    imageUrl: "/x.png",
    quantity: 2,
  },
];

describe("formatCartWhatsAppMessage", () => {
  it("monta mensagem em pt-BR com total", () => {
    const msg = formatCartWhatsAppMessage(sample, "pt-BR");
    expect(msg).toContain("orçamento");
    expect(msg).toContain("Pulseira teste");
    expect(msg).toContain("2×");
    expect(msg).toContain("Total:");
    expect(msg).toContain("24,00");
  });

  it("retorna vazio sem linhas", () => {
    expect(formatCartWhatsAppMessage([])).toBe("");
  });
});