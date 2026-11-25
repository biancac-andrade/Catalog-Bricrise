"use client";

import { useMemo, useState } from "react";

import CategoryFilter from "@/components/catalog/CategoryFilter";
import ProductCard from "@/components/catalog/ProductCard";
import type { CatalogProduct, CatalogTheme } from "@/components/catalog/catalog.types";
import {
  CATALOG_PILL_OPTIONS,
  filterProductsByCategory,
  type CatalogCategoryFilter,
} from "@/components/catalog/categoryFilters";
import PageHeader from "@/components/ui/PageHeader";
import { useLocale } from "@/context/LocaleContext";
import { brandClasses } from "@/design-system/brandTokens";

type Props = {
  themes: CatalogTheme[];
  products: CatalogProduct[];
};

export default function CatalogSection({
  products,
  themes: _themes,
}: Readonly<Props>) {
  void _themes;
  const { copy } = useLocale();

  const [category, setCategory] = useState<CatalogCategoryFilter>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const byCategory = filterProductsByCategory(products, category);
    const q = query.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter((p) => p.title.toLowerCase().includes(q));
  }, [products, category, query]);

  const activeLabel =
    CATALOG_PILL_OPTIONS.find((p) => p.id === category)?.label ?? "Todos";

  return (
    <section id="catalogo" className="relative z-20 px-4 md:px-6">
      <div className="relative z-20 mx-auto max-w-6xl">
        <PageHeader
          kicker={copy.catalog.header.kicker}
          title={copy.catalog.header.title}
          subtitle={copy.catalog.header.subtitle}
          titleId="catalogo-heading"
        />

        <div className="mb-10">
          <label
            className={`mb-4 block ${brandClasses.body}`}
            htmlFor="catalog-search"
          >
            <span className="sr-only">Buscar no catálogo</span>
            <input
              id="catalog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome do item..."
              className="w-full max-w-md rounded-xl border border-[#D9C9BA] bg-[#F2F2F0]/90 px-4 py-2.5 text-sm text-[#735E53] shadow-sm outline-offset-2 backdrop-blur-sm placeholder:text-[#BFA393] focus-visible:outline-2 focus-visible:outline-[#8C6F65]"
            />
          </label>

          <CategoryFilter value={category} onChange={setCategory} />

          <p className={`mt-4 text-xs text-[#BFA393] ${brandClasses.body}`}>
            {activeLabel} · {visible.length}{" "}
            {visible.length === 1 ? "produto" : "produtos"}
          </p>
        </div>

        {visible.length === 0 ? (
          <p
            className={`py-12 text-center text-[#8C6F65] ${brandClasses.body}`}
          >
            Nenhum produto neste filtro. Tente &quot;Todos&quot; ou peça uma
            encomenda personalizada.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((p, index) => (
              <li key={p._id} className="relative z-20">
                <ProductCard
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