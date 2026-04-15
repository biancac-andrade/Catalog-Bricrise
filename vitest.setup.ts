import "@testing-library/jest-dom/vitest";
import type { ImgHTMLAttributes } from "react";
import { createElement } from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: function MockImage(
    props: ImgHTMLAttributes<HTMLImageElement> & {
      fill?: boolean;
      priority?: boolean;
    },
  ) {
    const { alt = "", src, fill: _f, priority: _p, ...rest } = props;
    void _f;
    void _p;
    return createElement("img", { src, alt, ...rest });
  },
}));
