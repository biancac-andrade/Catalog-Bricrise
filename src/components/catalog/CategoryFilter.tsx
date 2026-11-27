"use client";

import type { CatalogCategoryFilter } from "@/components/catalog/categoryFilters";
import { brandClasses } from "@/design-system/brandTokens";

type Pill = { id: CatalogCategoryFilter; label: string };

type Props = {
  pills: Pill[];
  value: CatalogCategoryFilter;
  onChange: (next: CatalogCategoryFilter) => void;
  ariaLabel: string;
};

export default function CategoryFilter({
  pills,
  value,
  onChange,
  ariaLabel,
}: Readonly<Props>) {
  return (
    <div
      className="inline-flex max-w-full flex-wrap gap-1 rounded-full bg-[#EAE5DE]/60 p-1"
      role="tablist"
      aria-label={ariaLabel}
    >
      {pills.map((pill) => {
        const active = value === pill.id;
        return (
          <button
            key={pill.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(pill.id)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm transition ${brandClasses.heading} ${
              active
                ? "border border-[#D9C9BA]/70 bg-[#F7F8F3] font-medium text-[#735E53] shadow-sm"
                : "border border-transparent font-semibold text-[#735E53]/85 hover:bg-[#F2F2F0]/50"
            }`}
          >
            {pill.label}
          </button>
        );
      })}
    </div>
  );
}