import { describe, expect, it } from "vitest";

import { isNavActive } from "./isNavActive";

describe("isNavActive", () => {
  it("should return false when pathname is null", () => {
    expect(isNavActive(null, "/catalogo")).toBe(false);
  });

  it("should match home only on exact root path", () => {
    expect(isNavActive("/", "/")).toBe(true);
    expect(isNavActive("/catalogo", "/")).toBe(false);
  });

  it("should match exact segment paths", () => {
    expect(isNavActive("/catalogo", "/catalogo")).toBe(true);
    expect(isNavActive("/encomendas", "/encomendas")).toBe(true);
  });

  it("should match nested routes under the href prefix", () => {
    expect(isNavActive("/catalogo/item", "/catalogo")).toBe(true);
    expect(isNavActive("/catalogo/item/detalhe", "/catalogo")).toBe(true);
  });

  it("should return false when routes diverge", () => {
    expect(isNavActive("/servicos", "/catalogo")).toBe(false);
    expect(isNavActive("/catalog", "/catalogo")).toBe(false);
  });
});