"use client";

import { useEffect, useId, useRef, useState } from "react";

import { useLocale } from "@/context/LocaleContext";
import type { LocaleId } from "@/content";
import { brandClasses } from "@/design-system/brandTokens";

const OPTIONS: {
  id: LocaleId;
  short: string;
  flag: string;
  menuLabel: string;
}[] = [
  { id: "pt-BR", short: "PT", flag: "🇧🇷", menuLabel: "PT 🇧🇷" },
  { id: "en-US", short: "EN", flag: "🇺🇸", menuLabel: "EN 🇺🇸" },
];

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 shrink-0 text-[#8C6F65] transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type Props = {
  presentation?: "header" | "drawer";
};

export default function LanguageToggle({
  presentation = "header",
}: Readonly<Props>) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const current =
    OPTIONS.find((opt) => opt.id === locale) ?? OPTIONS[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const pick = (id: LocaleId) => {
    setLocale(id);
    setOpen(false);
  };

  if (presentation === "drawer") {
    return (
      <div
        role="group"
        aria-label="Selecionar idioma / Select language"
        className="flex gap-2"
      >
        {OPTIONS.map((opt) => {
          const selected = opt.id === locale;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => pick(opt.id)}
              aria-pressed={selected}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${brandClasses.heading} ${
                selected
                  ? "border-[#8C6F65] bg-[#EAE5DE] text-[#735E53]"
                  : "border-[#D9C9BA] bg-white/70 text-[#735E53]/85 active:bg-[#F2F2F0] [@media(hover:hover)]:hover:border-[#8C6F65]/60"
              }`}
            >
              {opt.menuLabel}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative w-auto shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label="Selecionar idioma / Select language"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex w-auto items-center gap-1.5 rounded-full border border-[#D9C9BA] bg-[#F7F8F3] px-2.5 py-1 text-xs font-medium text-[#735E53] transition-colors [@media(hover:hover)]:hover:border-[#8C6F65] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6F65] ${brandClasses.heading}`}
      >
        <span className="whitespace-nowrap leading-none">
          {current.short} {current.flag}
        </span>
        <ChevronDown open={open} />
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Idiomas disponíveis"
          className="absolute right-0 top-full z-50 mt-1.5 w-max min-w-[6.875rem] rounded-2xl border border-[#D9C9BA] bg-[#F7F8F3] p-1 shadow-lg"
        >
          {OPTIONS.map((opt) => {
            const selected = opt.id === locale;
            return (
              <li key={opt.id} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => pick(opt.id)}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-left text-xs text-[#735E53] transition-colors ${brandClasses.heading} ${
                    selected
                      ? "bg-[#EAE5DE] font-semibold"
                      : "active:bg-[#EAE5DE] [@media(hover:hover)]:hover:bg-[#EAE5DE]"
                  }`}
                >
                  {opt.menuLabel}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}