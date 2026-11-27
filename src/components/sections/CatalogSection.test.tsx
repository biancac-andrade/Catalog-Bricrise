import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { catalogSeed } from "@/data/catalog.seed";
import { CartProvider } from "@/context/CartContext";
import { LocaleProvider } from "@/context/LocaleContext";

import CatalogSection from "./CatalogSection";

function setup() {
  const result = render(
    <LocaleProvider>
      <CartProvider>
        <CatalogSection
          themes={catalogSeed.themes}
          products={catalogSeed.products}
        />
      </CartProvider>
    </LocaleProvider>,
  );
  return within(result.container);
}

describe("CatalogSection", () => {
  it("mostra todos os produtos por padrão", () => {
    const root = setup();
    expect(
      root.getByRole("heading", { name: /Catálogo completo/i }),
    ).toBeInTheDocument();
    expect(root.getAllByRole("listitem").length).toBe(catalogSeed.products.length);
  });

  it("filtra por Ateliê Criativa e mostra submenu de temas", async () => {
    const user = userEvent.setup();
    const root = setup();
    await user.click(root.getByRole("tab", { name: /Ateliê Criativa/i }));
    expect(
      root.getByRole("tab", { name: /Todos os temas/i }),
    ).toBeInTheDocument();
    expect(root.getByRole("tab", { name: /Copa/i })).toBeInTheDocument();
    expect(root.getAllByRole("listitem").length).toBe(catalogSeed.products.length);
  });
});