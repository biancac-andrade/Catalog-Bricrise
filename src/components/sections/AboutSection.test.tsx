import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LocaleProvider } from "@/context/LocaleContext";

import AboutSection from "./AboutSection";

describe("AboutSection", () => {
  it("renderiza cabeçalho da marca com id sobre", () => {
    render(
      <LocaleProvider>
        <AboutSection />
      </LocaleProvider>,
    );
    expect(
      screen.getByRole("heading", { name: /Onde o nó vira laço$/i }),
    ).toBeInTheDocument();
    expect(document.getElementById("sobre")).toBeTruthy();
  });
});