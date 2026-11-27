"use client";

import Link from "next/link";

import { useLocale } from "@/context/LocaleContext";
import { brandClasses } from "@/design-system/brandTokens";

export default function HomeFrontsSection() {
  const { copy } = useLocale();
  const fronts = copy.home.fronts;

  return (
    <section
      aria-labelledby="frentes-heading"
      className="relative z-20 px-4 pb-16 md:px-6 md:pb-20"
    >
      <div className="yarn-readable relative z-20 mx-auto max-w-5xl">
        <header className="relative mb-8 overflow-hidden rounded-[1.35rem] bg-[#F7F8F3]/40 px-4 py-5 text-center backdrop-blur-[10px] sm:px-6 sm:py-6 md:mb-10">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_90%_at_50%_35%,rgba(250,250,248,0.72)_0%,rgba(247,248,243,0.28)_55%,rgba(247,248,243,0.06)_100%)]"
          />
          <div className="relative z-10">
            <h2
              id="frentes-heading"
              className={`mb-2 text-xl font-bold text-[#735E53] sm:text-2xl ${brandClasses.heading}`}
            >
              {fronts.title}
            </h2>
            <p
              className={`mx-auto max-w-2xl text-sm leading-relaxed text-[#8C6F65] sm:text-base ${brandClasses.body}`}
            >
              {fronts.subtitle}
            </p>
          </div>
        </header>

        <ul className="grid gap-6 sm:grid-cols-2 sm:gap-5">
          {fronts.cards.map((front) => (
            <li key={front.title}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-[#F7F8F3]/44 px-5 py-6 backdrop-blur-[8px] sm:px-6 sm:py-7">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_85%_at_50%_20%,rgba(250,250,248,0.65)_0%,rgba(247,248,243,0.2)_60%,transparent_100%)]"
                />
                <div className="relative z-10 grid grid-cols-[2.5rem_1fr] items-start gap-x-3">
                  <span
                    className={`pt-0.5 text-left text-lg font-bold tabular-nums leading-none text-[#D9621E] ${brandClasses.heading}`}
                    aria-hidden
                  >
                    {front.num}
                  </span>
                  <div className="min-w-0 space-y-2 text-left">
                    <p
                      className={`text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#BFA393] ${brandClasses.heading}`}
                    >
                      {front.eyebrow}
                    </p>
                    <h3
                      className={`text-lg font-bold leading-snug text-[#735E53] sm:text-xl ${brandClasses.heading}`}
                    >
                      {front.title}
                    </h3>
                  </div>
                </div>
                <p
                  className={`relative z-10 mt-4 flex-1 text-left text-sm leading-relaxed text-[#8C6F65] sm:text-base ${brandClasses.body}`}
                >
                  {front.description}
                </p>
                <Link
                  href={front.href}
                  className={`relative z-10 mt-5 inline-block text-left text-sm font-semibold text-[#735E53] underline-offset-4 transition hover:text-[#8C6F65] hover:underline ${brandClasses.heading}`}
                >
                  {front.cta} →
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center md:mt-10">
          <Link
            href="/servicos"
            className={`text-sm font-semibold text-[#8C6F65] underline-offset-4 transition hover:text-[#735E53] hover:underline ${brandClasses.heading}`}
          >
            {fronts.servicesCta} →
          </Link>
        </p>
      </div>
    </section>
  );
}