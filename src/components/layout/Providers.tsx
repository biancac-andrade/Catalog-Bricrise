"use client";

import type { ReactNode } from "react";

import { CartProvider } from "@/context/CartContext";
import { LocaleProvider } from "@/context/LocaleContext";

export default function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <LocaleProvider>
      <CartProvider>{children}</CartProvider>
    </LocaleProvider>
  );
}