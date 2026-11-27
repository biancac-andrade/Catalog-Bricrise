"use client";

import type { ThemeWithCount } from "@/components/catalog/categoryFilters";
import { brandClasses } from "@/design-system/brandTokens";

type Props = {
  themes: ThemeWithCount[];
  value: string | null;
  onChange: (themeSlug: string | null) => void;
};

export default function ThemeFilter({
  themes,
  value,
  onChange,
}: Readonly<Props>) {
  if (themes.length === 0) return null;

  return (
    <div className="space-y-2">
      <p
        className={`text-[0.65rem] font-semibold uppercase tracking-wider text-[#BFA393] ${brandClasses.heading}`}
      >
        Temas
      </p>
      <div
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Filtrar por tema"
      >
        <button
          type="button"
          role="tab"
          aria-selected={value === null}
          onClick={() => onChange(null)}
          className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition sm:text-sm ${brandClasses.heading} ${
            value === null
              ? "border-[#8C6F65] bg-[#F7F8F3] font-medium text-[#735E53] shadow-sm"
              : "border-[#D9C9BA] bg-white/60 font-semibold text-[#735E53] hover:border-[#C4B5A8] hover:bg-[#F2F2F0]"
          }`}
        >
          Todos os temas
        </button>
        {themes.map(({ theme, productCount }) => {
          const active = value === theme.slug;
          return (
            <button
              key={theme._id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(theme.slug)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition sm:text-sm ${brandClasses.heading} ${
                active
                  ? "border-[#8C6F65] bg-[#F7F8F3] font-medium text-[#735E53] shadow-sm"
                  : "border-[#D9C9BA] bg-white/60 font-semibold text-[#735E53] hover:border-[#C4B5A8] hover:bg-[#F2F2F0]"
              }`}
            >
              {theme.title}
              <span
                className={`ml-1.5 tabular-nums font-normal ${active ? "text-[#735E53]" : "text-[#BFA393]"}`}
              >
                {productCount}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}