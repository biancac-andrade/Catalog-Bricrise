import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LocaleProvider } from "@/context/LocaleContext";

import Page, { revalidate } from "./page";

describe("app/page (home)", () => {
  it("exporta revalidate para ISR (segundos)", () => {
    expect(revalidate).toBe(120);
  });

  it("renderiza home enxuta com hero e frentes do ateliê", async () => {
    const ui = await Page();
    render(<LocaleProvider>{ui}</LocaleProvider>);
    expect(
      screen.getByRole("heading", { name: /Onde o nó vira laço/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Dois ateliês, uma mesma delicadeza/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Ver catálogo/i }),
    ).toHaveAttribute("href", "/catalogo");
    expect(
      screen.getByRole("link", { name: /Conhecer a marca/i }),
    ).toHaveAttribute("href", "/sobre");
    expect(
      screen.getByRole("link", { name: /Serviços e dicas de encomenda/i }),
    ).toHaveAttribute("href", "/servicos");
    expect(
      screen.getByRole("link", { name: /Valores e formatos/i }),
    ).toHaveAttribute("href", "/encomendas");
  });
});