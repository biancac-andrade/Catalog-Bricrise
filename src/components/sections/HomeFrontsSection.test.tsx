import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomeFrontsSection from "@/components/sections/HomeFrontsSection";
import { LocaleProvider } from "@/context/LocaleContext";

function renderFronts() {
  return render(
    <LocaleProvider>
      <HomeFrontsSection />
    </LocaleProvider>,
  );
}

describe("HomeFrontsSection", () => {
  it("should render studio fronts and deep links", () => {
    renderFronts();
    expect(
      screen.getByRole("heading", { name: /Dois ateliês, uma mesma delicadeza/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Catálogo, ideia sua ou referências/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explorar o catálogo/i })).toHaveAttribute(
      "href",
      "/catalogo",
    );
    expect(screen.getByRole("link", { name: /Valores e formatos/i })).toHaveAttribute(
      "href",
      "/encomendas",
    );
    expect(
      screen.getByRole("link", { name: /Serviços e dicas de encomenda/i }),
    ).toHaveAttribute("href", "/servicos");
  });

  it("should wire the section heading id for assistive tech", () => {
    renderFronts();
    expect(document.getElementById("frentes-heading")).toHaveTextContent(
      /Dois ateliês/i,
    );
  });
});