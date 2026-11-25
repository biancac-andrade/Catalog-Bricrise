import { describe, expect, it } from "vitest";

import { metadata } from "./metadata";

describe("app metadata", () => {
  it("define título Bricrisê", () => {
    expect(metadata.title).toBe("Bricrisê");
  });
});