import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { catalogSeed } from "@/data/catalog.seed";

import Page, { revalidate } from "./page";

vi.mock("@/lib/contentful/fetchCatalog", () => ({
  fetchCatalog: vi.fn(() =>
    Promise.resolve({
      themes: catalogSeed.themes,
      products: catalogSeed.products,
    }),
  ),
}));

import { fetchCatalog } from "@/lib/contentful/fetchCatalog";

describe("app/page (início)", () => {
  it("exporta revalidate para ISR (segundos)", () => {
    expect(revalidate).toBe(120);
  });

  it("monta cabeçalho e catálogo com dados do catálogo", async () => {
    const ui = await Page();
    render(ui);
    expect(screen.getByText("Bricrisê 🧶")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Catálogo da Bricrisê/i }),
    ).toBeInTheDocument();
    expect(vi.mocked(fetchCatalog)).toHaveBeenCalledOnce();
  });
});
