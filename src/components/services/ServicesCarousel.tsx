"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useLocale } from "@/context/LocaleContext";
import { brandClasses } from "@/design-system/brandTokens";

const AUTOPLAY_MS = 6_000;

const STICKERS: Record<string, string[]> = {
  "linhas-acessorios": ["🧵", "✨"],
  "photocards": ["📸", "💫"],
  "dicas-envio": ["📦", "💌"],
};

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

function FloatingSticker({
  emoji,
  className,
  delay = 0,
  reduceMotion,
}: Readonly<{
  emoji: string;
  className: string;
  delay?: number;
  reduceMotion: boolean | null;
}>) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute text-2xl select-none sm:text-3xl ${className}`}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: reduceMotion ? 0 : [0, -6, 0],
        rotate: reduceMotion ? 0 : [-4, 4, -4],
      }}
      transition={{
        opacity: { duration: 0.35, delay },
        scale: { type: "spring", stiffness: 360, damping: 22, delay },
        y: { duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay },
        rotate: { duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay },
      }}
    >
      {emoji}
    </motion.span>
  );
}

export default function ServicesCarousel() {
  const { copy, locale } = useLocale();
  const slides = copy.services.slides;
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const goToSlide = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : next < index ? -1 : direction);
      setIndex(next);
    },
    [direction, index],
  );

  const prevSlide = useCallback(() => {
    const next = index === 0 ? slides.length - 1 : index - 1;
    setDirection(-1);
    setIndex(next);
  }, [index, slides.length]);

  const nextSlide = useCallback(() => {
    const next = index === slides.length - 1 ? 0 : index + 1;
    setDirection(1);
    setIndex(next);
  }, [index, slides.length]);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, slides.length]);

  const current = slides[index]!;
  const stickers = STICKERS[current.id] ?? ["✨"];

  const carouselLabel =
    locale === "en-US" ? "Studio services" : "Serviços do ateliê";

  const slideCounter = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

  const slidePanelMotion = useMemo(
    () =>
      reduceMotion
        ? { initial: false, animate: { opacity: 1, x: 0 }, exit: undefined }
        : {
            initial: { opacity: 0, x: direction * 36 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: direction * -36 },
          },
    [direction, reduceMotion],
  );

  const contentStagger = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.08,
          delayChildren: reduceMotion ? 0 : 0.1,
        },
      },
    }),
    [reduceMotion],
  );

  const lineReveal = useMemo(
    () =>
      reduceMotion
        ? { hidden: {}, visible: {} }
        : {
            hidden: { opacity: 0, y: 22 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring" as const, stiffness: 380, damping: 30 },
            },
          },
    [reduceMotion],
  );

  const itemReveal = useMemo(
    () =>
      reduceMotion
        ? { hidden: {}, visible: {} }
        : {
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring" as const, stiffness: 420, damping: 32 },
            },
          },
    [reduceMotion],
  );

  return (
    <div
      className="relative z-20 mx-auto w-full max-w-3xl px-2 sm:px-4"
      role="region"
      aria-roledescription="carousel"
      aria-label={carouselLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <span className="sr-only" aria-live="polite">
        {paused
          ? locale === "en-US"
            ? "Autoplay paused"
            : "Reprodução automática pausada"
          : locale === "en-US"
            ? "Autoplay on"
            : "Reprodução automática ativa"}
      </span>

      <div className="relative">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-[#D9C9BA]/35 bg-[#F7F8F3]/48 px-3 pb-6 pt-5 shadow-[0_10px_36px_-20px_rgba(115,94,83,0.22)] backdrop-blur-[8px] sm:px-6 sm:pb-8 sm:pt-6">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_40%,rgba(250,250,248,0.78)_0%,rgba(247,248,243,0.38)_45%,rgba(247,248,243,0.08)_100%)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:repeating-linear-gradient(125deg,transparent,transparent_18px,rgba(217,201,186,0.12)_18px,rgba(217,201,186,0.12)_19px)]"
          />

          <div className="relative z-10 mx-2 sm:mx-4">
            <div
              className="mb-7 grid grid-cols-3 gap-1 border-b border-[#D9C9BA]/40 pb-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-2"
              role="tablist"
              aria-label={carouselLabel}
            >
              {slides.map((slide, slideIndex) => {
                const active = index === slideIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls={`service-panel-${slide.id}`}
                    onClick={() => goToSlide(slideIndex)}
                    className={`relative min-w-0 px-0.5 pb-2 pt-0.5 text-center text-[0.68rem] font-bold leading-snug transition-colors sm:shrink-0 sm:px-0 sm:pb-1.5 sm:text-sm sm:text-base ${brandClasses.heading} ${
                      active
                        ? "!text-[#735E53]"
                        : "!text-[#735E53]/45 active:!text-[#8C6F65]/80 [@media(hover:hover)]:hover:!text-[#8C6F65]"
                    }`}
                  >
                    <span className="block hyphens-auto">{slide.tag}</span>
                    {active ? (
                      <motion.span
                        layoutId="services-tab-underline"
                        className="absolute bottom-0 left-0.5 right-0.5 h-0.5 rounded-full bg-[#8C6F65] sm:-bottom-[13px] sm:left-0 sm:right-0"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <motion.div
              layout
              role="tabpanel"
              id={`service-panel-${current.id}`}
              aria-label={current.title || current.tag}
              className="relative mx-auto min-h-[280px] max-w-2xl px-1 text-center sm:px-4"
            >
        <FloatingSticker
          emoji={stickers[0]!}
          className="-top-1 left-2 sm:left-0"
          delay={0.05}
          reduceMotion={reduceMotion}
        />
        <FloatingSticker
          emoji={stickers[1] ?? stickers[0]!}
          className="right-2 bottom-2 sm:right-0"
          delay={0.2}
          reduceMotion={reduceMotion}
        />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            initial={slidePanelMotion.initial}
            animate={slidePanelMotion.animate}
            exit={slidePanelMotion.exit}
            transition={{
              duration: reduceMotion ? 0 : 0.34,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              variants={contentStagger}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={lineReveal}
                className={`flex flex-wrap items-center justify-center gap-3 ${current.badge ? "mb-4" : "mb-2"}`}
              >
                {current.badge ? (
                  <span
                    className={`text-[11px] font-bold uppercase tracking-[0.14em] text-[#BFA393] ${brandClasses.heading}`}
                  >
                    {current.badge}
                  </span>
                ) : null}
                <span
                  className={`text-xs font-bold tabular-nums text-[#735E53]/50 ${brandClasses.heading}`}
                  aria-live="polite"
                >
                  {slideCounter}
                </span>
              </motion.div>

              {current.title ? (
                <motion.h2
                  variants={lineReveal}
                  className={`mb-3 text-2xl font-bold leading-tight text-[#735E53] sm:text-[1.85rem] ${brandClasses.heading}`}
                >
                  {current.title}
                </motion.h2>
              ) : null}

              <motion.p
                variants={lineReveal}
                className={`mx-auto max-w-xl text-sm leading-relaxed text-[#735E53]/90 sm:text-base ${brandClasses.body} ${current.title ? "mb-6" : "mb-5 mt-1"}`}
              >
                {current.description}
              </motion.p>

              {current.itemsTitle ? (
                <motion.p
                  variants={lineReveal}
                  className={`mb-4 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#8C6F65] ${brandClasses.heading}`}
                >
                  {current.itemsTitle}
                </motion.p>
              ) : null}

              {current.items.length > 0 ? (
                <motion.ol
                  variants={contentStagger}
                  className={`mx-auto w-full max-w-md list-none space-y-3.5 pl-0 ${current.itemsTitle ? "" : "mt-1"}`}
                >
                  {current.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      variants={itemReveal}
                      className="grid grid-cols-[2.25rem_1fr] items-start gap-x-2.5 sm:grid-cols-[2.75rem_1fr] sm:gap-x-3"
                    >
                      <span
                        className={`pt-0.5 text-left text-xs font-bold tabular-nums leading-snug text-[#D9621E] sm:text-sm ${brandClasses.heading}`}
                        aria-hidden
                      >
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-left text-xs leading-relaxed text-[#735E53] sm:text-sm ${brandClasses.body}`}
                      >
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </motion.ol>
              ) : null}

              <motion.p
                variants={lineReveal}
                className={`mx-auto mt-6 max-w-md text-sm font-semibold italic text-[#8C6F65] ${brandClasses.body}`}
              >
                {current.highlight}
              </motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
            </motion.div>
          </div>
        </div>

        <h3 className="sr-only">
          {locale === "en-US" ? "Carousel navigation" : "Navegação do carrossel"}
        </h3>
        <div className="mx-auto mt-5 flex w-full max-w-md items-center justify-between gap-4 px-1 sm:max-w-lg sm:gap-6 sm:px-2">
          <motion.button
            type="button"
            onClick={prevSlide}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            aria-label={locale === "en-US" ? "Previous slide" : "Slide anterior"}
            className={`flex h-12 min-w-[3rem] shrink-0 items-center justify-center gap-1.5 rounded-2xl border border-[#D9C9BA]/70 bg-[#FAFAF8] px-3 text-[#735E53] shadow-[0_4px_14px_-8px_rgba(115,94,83,0.35)] transition sm:h-11 sm:min-w-[3.25rem] sm:rounded-full sm:px-0 ${brandClasses.heading} [@media(hover:hover)]:hover:border-[#8C6F65]/55 [@media(hover:hover)]:hover:bg-white`}
          >
            <ChevronLeft />
            <span className="hidden text-xs font-semibold sm:inline">
              {locale === "en-US" ? "Prev" : "Ant."}
            </span>
          </motion.button>

          <div
            className="flex min-w-0 flex-1 items-center justify-center gap-2.5"
            role="group"
            aria-label={
              locale === "en-US" ? "Slide indicators" : "Indicadores de slide"
            }
          >
            {slides.map((slide, dotIdx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(dotIdx)}
                aria-label={
                  locale === "en-US"
                    ? `Go to slide ${dotIdx + 1}`
                    : `Ir para o slide ${dotIdx + 1}`
                }
                aria-current={index === dotIdx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === dotIdx
                    ? "w-9 bg-[#8C6F65]"
                    : "w-2 bg-[#D9C9BA] [@media(hover:hover)]:hover:bg-[#8C6F65]/50"
                }`}
              />
            ))}
          </div>

          <motion.button
            type="button"
            onClick={nextSlide}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            aria-label={locale === "en-US" ? "Next slide" : "Próximo slide"}
            className={`flex h-12 min-w-[3rem] shrink-0 items-center justify-center gap-1.5 rounded-2xl border border-[#D9C9BA]/70 bg-[#FAFAF8] px-3 text-[#735E53] shadow-[0_4px_14px_-8px_rgba(115,94,83,0.35)] transition sm:h-11 sm:min-w-[3.25rem] sm:rounded-full sm:px-0 ${brandClasses.heading} [@media(hover:hover)]:hover:border-[#8C6F65]/55 [@media(hover:hover)]:hover:bg-white`}
          >
            <span className="hidden text-xs font-semibold sm:inline">
              {locale === "en-US" ? "Next" : "Próx."}
            </span>
            <ChevronRight />
          </motion.button>
        </div>
      </div>
    </div>
  );
}