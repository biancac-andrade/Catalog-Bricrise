"use client";

import { useMemo, useState } from "react";

import CategoryFilter from "@/components/catalog/CategoryFilter";
import ProductCard from "@/components/catalog/ProductCard";
import type { CatalogProduct, CatalogTheme } from "@/components/catalog/catalog.types";
import {
  filterCatalogProducts,
  getThemesForCatalogGroup,
  getVisibleCatalogPills,
  type CatalogCategoryFilter,
} from "@/components/catalog/categoryFilters";
import ThemeFilter from "@/components/catalog/ThemeFilter";
import PageHeader from "@/components/ui/PageHeader";
import { useLocale } from "@/context/LocaleContext";
import { brandClasses } from "@/design-system/brandTokens";

type Props = {
  themes: CatalogTheme[];
  products: CatalogProduct[];
};

export default function CatalogSection({
  products,
  themes,
}: Readonly<Props>) {
  const { copy } = useLocale();
  const filterCopy = copy.catalog.filters;

  const groupLabels = useMemo(
    () => ({
      all: filterCopy.allGroups,
      atelie: filterCopy.groups.atelie,
      papelaria: filterCopy.groups.papelaria,
    }),
    [filterCopy],
  );

  const visiblePills = useMemo(
    () => getVisibleCatalogPills(products, groupLabels),
    [products, groupLabels],
  );

  const [category, setCategory] = useState<CatalogCategoryFilter>("all");
  const [themeSlug, setThemeSlug] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const themeOptions = useMemo(() => {
    if (category === "all") return [];
    return getThemesForCatalogGroup(themes, products, category);
  }, [category, themes, products]);

  const visible = useMemo(
    () =>
      filterCatalogProducts(products, {
        category,
        themeSlug,
        query,
      }),
    [products, category, themeSlug, query],
  );

  const activeLabel =
    visiblePills.find((p) => p.id === category)?.label ?? filterCopy.allGroups;

  const handleCategoryChange = (next: CatalogCategoryFilter) => {
    setCategory(next);
    setThemeSlug(null);
  };

  return (
    <section id="catalogo" className="relative z-20 px-4 md:px-6">
      <div className="relative z-20 mx-auto max-w-6xl">
        <PageHeader
          kicker={copy.catalog.header.kicker}
          title={copy.catalog.header.title}
          subtitle={copy.catalog.header.subtitle}
          titleId="catalogo-heading"
        />

        <div className="mb-10 space-y-4">
          <div className="flex flex-col gap-3 border-b border-[#E5DDD4] pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <CategoryFilter
              pills={visiblePills}
              value={category}
              onChange={handleCategoryChange}
              ariaLabel={filterCopy.ariaCategories}
            />

            <label
              className={`relative block w-full shrink-0 sm:w-52 ${brandClasses.body}`}
              htmlFor="catalog-search"
            >
              <span className="sr-only">{filterCopy.searchSrOnly}</span>
              <span
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#BFA393]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
              </span>
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={filterCopy.searchPlaceholder}
                className="w-full rounded-full border border-[#D9C9BA] bg-[#FAFAF8] py-2 pl-9 pr-3 text-sm text-[#735E53] outline-offset-2 placeholder:text-[#BFA393] focus-visible:border-[#8C6F65] focus-visible:outline-2 focus-visible:outline-[#8C6F65]/40"
              />
            </label>
          </div>

          {category !== "all" ? (
            <ThemeFilter
              themes={themeOptions}
              value={themeSlug}
              onChange={setThemeSlug}
              themesHeading={filterCopy.themesHeading}
              allThemesLabel={filterCopy.allThemes}
              ariaLabel={filterCopy.ariaThemes}
            />
          ) : null}

          <p className={`text-xs text-[#BFA393] ${brandClasses.body}`}>
            {activeLabel}
            {themeSlug
              ? ` · ${themeOptions.find((t) => t.theme.slug === themeSlug)?.theme.title ?? themeSlug}`
              : ""}{" "}
            · {visible.length}{" "}
            {visible.length === 1
              ? filterCopy.productSingular
              : filterCopy.productPlural}
          </p>
        </div>

        {visible.length === 0 ? (
          <p
            className={`py-12 text-center text-[#8C6F65] ${brandClasses.body}`}
          >
            {filterCopy.emptyResults}
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((p, index) => (
              <li key={p._id} className="relative z-20">
                <ProductCard
                  productId={p._id}
                  name={p.title}
                  price={p.price}
                  imageUrl={p.imageUrl}
                  available={p.available}
                  priority={index < 8}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}