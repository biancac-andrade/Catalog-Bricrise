import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HeroSection from "@/components/sections/HeroSection";
import { LocaleProvider } from "@/context/LocaleContext";

function renderHero() {
  return render(
    <LocaleProvider>
      <HeroSection />
    </LocaleProvider>,
  );
}

describe("HeroSection", () => {
  it("should render localized hero copy and primary routes", () => {
    renderHero();
    expect(
      screen.getByRole("heading", { name: /Onde o nó vira laço/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Têxtil personalizado com seda e macramê/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ver catálogo/i })).toHaveAttribute(
      "href",
      "/catalogo",
    );
    expect(
      screen.getByRole("link", { name: /Conhecer a marca/i }),
    ).toHaveAttribute("href", "/sobre");
  });

  it("should expose the home anchor for in-page navigation", () => {
    renderHero();
    expect(document.getElementById("inicio")).toBeInTheDocument();
  });
});