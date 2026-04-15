import type { ReactNode } from "react";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { catalogSeed } from "@/data/catalog.seed";

import CatalogView from "./CatalogView";

function setup(
  aboutSlot: ReactNode = (
    <div data-testid="about-slot">Conteúdo do sobre</div>
  ),
) {
  return render(
    <CatalogView
      themes={catalogSeed.themes}
      products={catalogSeed.products}
      aboutSlot={aboutSlot}
    />,
  );
}

describe("CatalogView", () => {
  it("mostra o catálogo com todos os produtos por padrão", () => {
    const { container } = setup();
    const root = within(container.firstChild as HTMLElement);
    expect(
      root.getByRole("heading", { name: /Catálogo da Bricrisê/i }),
    ).toBeInTheDocument();
    expect(root.getAllByRole("listitem").length).toBe(catalogSeed.products.length);
  });

  it("substitui a grade pelo painel Sobre ao ativar Conhece a Bricrisê", async () => {
    const user = userEvent.setup();
    const { container } = setup();
    const root = within(container.firstChild as HTMLElement);

    const sobreTab = root.getByRole("tab", {
      name: /^Conhece a Bricrisê$/,
    });
    await user.click(sobreTab);

    expect(root.getByTestId("about-slot")).toBeInTheDocument();
    expect(
      root.queryByRole("heading", { name: /Catálogo da Bricrisê/i }),
    ).not.toBeInTheDocument();
  });

  it("volta aos produtos ao selecionar Todos", async () => {
    const user = userEvent.setup();
    const { container } = setup();
    const root = within(container.firstChild as HTMLElement);

    await user.click(
      root.getByRole("tab", { name: /^Conhece a Bricrisê$/ }),
    );

    const todosTabs = root.getAllByRole("tab", { name: /^Todos\b/ });
    await user.click(todosTabs[0]);

    expect(
      root.getByRole("heading", { name: /Catálogo da Bricrisê/i }),
    ).toBeInTheDocument();
    expect(root.getAllByRole("listitem").length).toBeGreaterThan(0);
  });

  it("filtra por tema Variadas", async () => {
    const user = userEvent.setup();
    const { container } = setup();
    const root = within(container.firstChild as HTMLElement);

    const variadasTabs = root.getAllByRole("tab", { name: /Variadas \(\d+\)/ });
    await user.click(variadasTabs[0]);

    expect(
      root.getByText(/A ver:/).parentElement,
    ).toHaveTextContent(/Variadas/);
    const items = root.getAllByRole("listitem");
    expect(items.length).toBe(1);
    expect(
      root.getByRole("heading", {
        level: 3,
        name: /Pulseira tons neutros/,
      }),
    ).toBeInTheDocument();
  });
});
