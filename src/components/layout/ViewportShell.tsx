"use client";

import { useRef, type ReactNode } from "react";

import WanderingYarnScroll from "@/components/animations/WanderingYarnScroll";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ScrollContainerContext } from "@/context/ScrollContainerContext";

type Props = {
  children: ReactNode;
};

export default function ViewportShell({ children }: Readonly<Props>) {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <ScrollContainerContext.Provider value={mainRef}>
      <div className="flex h-screen max-h-screen flex-col justify-between overflow-hidden bg-[#F7F8F3]">
        <div className="relative z-40 shrink-0">
          <Header />
        </div>
        <main
          ref={mainRef}
          id="app-main-scroll"
          className="relative z-20 min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto px-4 py-4 sm:py-6"
        >
          <div className="flex min-h-full flex-col justify-center">
            {children}
          </div>
        </main>
        <Footer />
        <WanderingYarnScroll className="z-[35]" />
      </div>
    </ScrollContainerContext.Provider>
  );
}