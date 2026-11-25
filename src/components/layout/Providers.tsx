"use client";

import type { ReactNode } from "react";

import { LocaleProvider } from "@/context/LocaleContext";

export default function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return <LocaleProvider>{children}</LocaleProvider>;
}