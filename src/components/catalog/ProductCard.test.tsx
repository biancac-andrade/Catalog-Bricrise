import { cleanup, render, screen, type RenderResult } from "@testing-library/react";
import type { ReactElement } from "react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { CartProvider } from "@/context/CartContext";
import { LocaleProvider } from "@/context/LocaleContext";

import ProductCard from "./ProductCard";

function setup(ui: ReactElement): RenderResult {
  return render(
    <LocaleProvider>
      <CartProvider>{ui}</CartProvider>
    </LocaleProvider>,
  );
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("ProductCard", () => {
  it("mostra nome, preço e adicionar ao carrinho", () => {
    setup(
      <ProductCard
        productId="prod-1"
        name="Pulseira teste"
        price={24.5}
        imageUrl="/products/x.png"
        priority
      />,
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "Pulseira teste" }),
    ).toBeInTheDocument();
    expect(screen.getByText("R$ 24.50")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Adicionar/i }),
    ).toBeInTheDocument();
  });

  it("adiciona ao carrinho ao clicar", async () => {
    const user = userEvent.setup();
    setup(
      <ProductCard
        productId="prod-2"
        name="Item"
        price={10}
        imageUrl="/products/x.png"
      />,
    );
    await user.click(screen.getByRole("button", { name: /Adicionar/i }));
    const raw = window.localStorage.getItem("bricrise-cart-v1");
    expect(raw).toContain("prod-2");
  });
});