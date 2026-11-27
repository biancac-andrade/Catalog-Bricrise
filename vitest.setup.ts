import "@testing-library/jest-dom/vitest";
import type { ImgHTMLAttributes } from "react";
import { createElement } from "react";
import { vi } from "vitest";

import {
  installDialogElementDoubles,
  installMatchMediaDouble,
} from "@/test/browserDoubles";

installDialogElementDoubles();
installMatchMediaDouble();

vi.mock("next/font/local", () => ({
  default: () => ({ variable: "--font-glacial" }),
}));

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-body" }),
}));

vi.mock("next/link", () => ({
  default: function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return createElement("a", { href, ...props }, children);
  },
}));

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
