"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";

import { useLocale } from "@/context/LocaleContext";
import { brandClasses } from "@/design-system/brandTokens";

function ChevronLeft() {
  return (
    <svg
      className="h-5 w-5 fill-none stroke-current stroke-2"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      className="h-5 w-5 fill-none stroke-current stroke-2"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function ServicesCarousel() {
  const { copy, locale } = useLocale();
  const slides = copy.services.slides;
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const current = slides[index]!;

  const carouselLabel =
    locale === "en-US" ? "Studio services" : "Serviços do ateliê";

  const slideCounter = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

  return (
    <div
      className="relative z-20 mx-auto w-full max-w-3xl px-4 sm:px-12"
      role="region"
      aria-roledescription="carousel"
      aria-label={carouselLabel}
    >
      <button
        type="button"
        onClick={prevSlide}
        aria-label={locale === "en-US" ? "Previous slide" : "Slide anterior"}
        className="absolute left-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D9C9BA]/50 bg-[#8C6F65] text-[#F7F8F3] shadow-md transition-all hover:scale-105 hover:bg-[#735E53] active:scale-95 sm:-left-4"
      >
        <ChevronLeft />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label={locale === "en-US" ? "Next slide" : "Próximo slide"}
        className="absolute right-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D9C9BA]/50 bg-[#8C6F65] text-[#F7F8F3] shadow-md transition-all hover:scale-105 hover:bg-[#735E53] active:scale-95 sm:-right-4"
      >
        <ChevronRight />
      </button>

      <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-3xl border border-[#D9C9BA]/80 bg-[#F2F2F0]/90 p-6 shadow-[0_10px_30px_rgba(115,94,83,0.08)] backdrop-blur-md sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeInOut" }}
            className="flex grow flex-col justify-between"
          >
            <div>
              <div className="mb-3 flex items-center justify-between gap-2">
                <span
                  className={`text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6F65] ${brandClasses.heading}`}
                >
                  {current.tag}
                </span>
                <span
                  className={`rounded-full border border-[#D9C9BA]/60 bg-[#EAE5DE] px-2.5 py-0.5 text-[11px] font-medium text-[#735E53] ${brandClasses.heading}`}
                >
                  {current.badge}
                </span>
              </div>

              <h2
                className={`mb-3 text-2xl font-semibold text-[#735E53] sm:text-3xl ${brandClasses.heading}`}
              >
                {current.title}
              </h2>

              <p
                className={`mb-6 text-sm leading-relaxed text-[#735E53]/90 sm:text-base ${brandClasses.body}`}
              >
                {current.description}
              </p>

              <div className="mb-6 space-y-2.5">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider text-[#8C6F65] ${brandClasses.heading}`}
                >
                  {current.itemsTitle}
                </span>
                <ul className="space-y-2">
                  {current.items.map((item) => (
                    <li key={item}>
                      <div
                        className={`flex items-start gap-2.5 rounded-xl border border-[#D9C9BA]/40 bg-[#F7F8F3]/90 p-3 text-xs text-[#735E53] sm:text-sm ${brandClasses.body}`}
                      >
                        <span
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D9621E]"
                          aria-hidden
                        />
                        <span className="leading-snug">{item}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#D9C9BA]/50 pt-4">
              <span
                className={`text-xs font-medium italic text-[#8C6F65] sm:text-sm ${brandClasses.body}`}
              >
                {current.highlight}
              </span>
              <span
                className={`text-xs font-medium text-[#735E53]/60 ${brandClasses.heading}`}
                aria-live="polite"
              >
                {slideCounter}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {slides.map((slide, dotIdx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setIndex(dotIdx)}
            aria-label={
              locale === "en-US"
                ? `Go to slide ${dotIdx + 1}`
                : `Ir para o slide ${dotIdx + 1}`
            }
            aria-current={index === dotIdx}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === dotIdx
                ? "w-6 bg-[#8C6F65]"
                : "w-2 bg-[#D9C9BA] hover:bg-[#8C6F65]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}