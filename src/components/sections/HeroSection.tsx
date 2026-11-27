"use client";

import Link from "next/link";

import { useLocale } from "@/context/LocaleContext";
import { brandClasses } from "@/design-system/brandTokens";

export default function HeroSection() {
  const { copy } = useLocale();
  const hero = copy.home.hero;

  return (
    <section
      id="inicio"
      className="relative z-20 px-4 pb-12 pt-8 sm:pb-16 sm:pt-12 md:px-6"
    >
      <div className="yarn-readable mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-[1.35rem] bg-[#F7F8F3]/40 px-5 py-8 text-center backdrop-blur-[10px] sm:px-8 sm:py-10 md:rounded-[1.5rem] md:py-11">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_90%_at_50%_35%,rgba(250,250,248,0.72)_0%,rgba(247,248,243,0.28)_55%,rgba(247,248,243,0.06)_100%)]"
          />
          <div className="relative z-10">
            <p
              className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6F65] ${brandClasses.heading}`}
            >
              {hero.kicker}
            </p>
            <h1
              className={`mb-4 text-3xl font-bold leading-tight text-[#735E53] sm:text-4xl md:text-5xl ${brandClasses.heading}`}
            >
              {hero.title}
            </h1>
            <p
              className={`mx-auto max-w-xl text-base leading-relaxed text-[#8C6F65] sm:text-lg ${brandClasses.body}`}
            >
              {hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/catalogo"
                className={`rounded-full px-6 py-2.5 text-sm font-bold shadow-sm ${brandClasses.heading} ${brandClasses.actionBtn}`}
              >
                {hero.ctaCatalog}
              </Link>
              <Link
                href="/sobre"
                className={`rounded-full border border-[#D9C9BA]/70 bg-[#F7F8F3]/75 px-6 py-2.5 text-sm font-semibold text-[#735E53] backdrop-blur-sm transition hover:bg-[#F2F2F0] ${brandClasses.heading}`}
              >
                {hero.ctaAbout}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}