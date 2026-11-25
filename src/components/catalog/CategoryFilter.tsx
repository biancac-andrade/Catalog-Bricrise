"use client";

import {
  CATALOG_PILL_OPTIONS,
  type CatalogCategoryFilter,
} from "@/components/catalog/categoryFilters";
import { brandClasses } from "@/design-system/brandTokens";

type Props = {
  value: CatalogCategoryFilter;
  onChange: (next: CatalogCategoryFilter) => void;
};

export default function CategoryFilter({ value, onChange }: Readonly<Props>) {
  return (
    <div
      className="flex flex-wrap gap-2 border-b border-[#D9C9BA] pb-4"
      role="tablist"
      aria-label="Filtrar catálogo"
    >
      {CATALOG_PILL_OPTIONS.map((pill) => {
        const active = value === pill.id;
        return (
          <button
            key={pill.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(pill.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${brandClasses.heading} ${
              active
                ? "bg-[#8C6F65] text-[#F7F8F3]"
                : "text-[#735E53] hover:bg-[#F2F2F0]"
            }`}
          >
            {pill.label}
          </button>
        );
      })}
    </div>
  );
}