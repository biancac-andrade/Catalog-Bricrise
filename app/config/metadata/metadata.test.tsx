import { describe, expect, it } from "vitest";

import { metadata } from "./metadata";

describe("metadata do site", () => {
  it("define título e descrição", () => {
    expect(metadata.title).toBe("Bricrisê");
    expect(String(metadata.description ?? "")).toMatch(/Bricrisê/);
  });
});
