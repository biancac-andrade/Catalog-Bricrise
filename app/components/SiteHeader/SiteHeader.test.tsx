import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SiteHeader from "./SiteHeader";

describe("SiteHeader", () => {
  it("exibe link WhatsApp para wa.me", () => {
    render(<SiteHeader />);
    const link = screen.getByRole("link", { name: /WhatsApp/i });
    expect(link.getAttribute("href")).toMatch(/^https:\/\/wa\.me\//);
  });

  it("não expõe links de âncora Sobre ou Catálogo no topo", () => {
    render(<SiteHeader />);
    expect(screen.queryByRole("link", { name: /^Sobre$/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /^Catálogo$/i })).toBeNull();
  });
});
