import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import ProductCard from "./ProductCard";

afterEach(() => {
  cleanup();
});

describe("ProductCard", () => {
  it("mostra nome, preço e ação quando disponível", () => {
    render(
      <ProductCard
        name="Pulseira teste"
        price={24.5}
        imageUrl="/products/x.png"
        available
        priority
      />,
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "Pulseira teste" }),
    ).toBeInTheDocument();
    expect(screen.getByText("R$ 24.50")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Eu quero/i })).toBeInTheDocument();
  });

  it("mostra indisponível quando esgotado", () => {
    render(
      <ProductCard
        name="Item esgotado"
        price={10}
        imageUrl="/products/x.png"
        available={false}
      />,
    );
    expect(screen.getByText("Indisponível")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Eu quero/i })).toBeNull();
  });
});
