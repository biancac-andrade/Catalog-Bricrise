import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { LocaleProvider } from "@/context/LocaleContext";

import Header from "./Header";

function renderHeader() {
  return render(
    <LocaleProvider>
      <Header />
    </LocaleProvider>,
  );
}

afterEach(() => {
  cleanup();
});

describe("Header", () => {
  it("exibe ícone WhatsApp com link wa.me", () => {
    renderHeader();
    const link = screen.getByRole("link", { name: /WhatsApp Bricrisê/i });
    expect(link.getAttribute("href")).toMatch(/^https:\/\/wa\.me\//);
  });

  it("oferece controle do menu hambúrguer", () => {
    renderHeader();
    expect(
      screen.getByRole("button", { name: /Abrir menu/i }),
    ).toBeInTheDocument();
  });

  it("lista rotas principais", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /^Catálogo$/ })).toHaveAttribute(
      "href",
      "/catalogo",
    );
    expect(screen.getByRole("link", { name: /^Encomendas$/ })).toHaveAttribute(
      "href",
      "/encomendas",
    );
  });
});