import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutContent from "./AboutContent";

describe("AboutContent", () => {
  it("renderiza título, tagline e assinatura", () => {
    render(<AboutContent />);
    expect(
      screen.getByRole("heading", { name: /Conhece a Bricrisê/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Onde o nó vira laço/)).toBeInTheDocument();
    expect(screen.getByText(/Bianca, Cristiane/)).toBeInTheDocument();
  });

  it("define id sobre no article", () => {
    render(<AboutContent />);
    expect(document.getElementById("sobre")).toBeTruthy();
  });
});
