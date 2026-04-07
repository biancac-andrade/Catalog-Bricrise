"use client";

import { useMemo, useState } from "react";

import type { CatalogProduct, CatalogTheme } from "@/lib/catalog/types";

import ProductCard from "./ProductCard";

type Props = {
  themes: CatalogTheme[];
  products: CatalogProduct[];
};

function groupThemesBySection(themes: CatalogTheme[]) {
  const map = new Map<string, CatalogTheme[]>();
  for (const t of themes) {
    const label = t.groupTitle || "Catálogo";
    const list = map.get(label) ?? [];
    list.push(t);
    map.set(label, list);
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, "pt-BR"));
}

export default function CatalogView({
  themes,
  products,
}: Readonly<Props>) {
  const [selectedThemeSlug, setSelectedThemeSlug] = useState<string>("all");

  const sections = useMemo(() => groupThemesBySection(themes), [themes]);

  const countByThemeSlug = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of products) {
      const slug = p.theme.slug;
      map.set(slug, (map.get(slug) ?? 0) + 1);
    }
    return map;
  }, [products]);

  const totalCount = products.length;

  const visible = useMemo(() => {
    if (selectedThemeSlug === "all") return products;
    return products.filter((p) => p.theme.slug === selectedThemeSlug);
  }, [products, selectedThemeSlug]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:flex-row md:items-start md:gap-10 md:px-6">
      <aside className="w-full shrink-0 md:sticky md:top-28 md:w-56 md:max-w-56">
        <div className="rounded-2xl border border-bicrise-sand bg-bicrise-white/90 p-3 shadow-sm">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-bicrise-clay">
            Temas
          </p>
          <div
            className="flex flex-row flex-wrap gap-2 md:flex-col md:flex-nowrap"
            role="tablist"
            aria-label="Filtrar por tema"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedThemeSlug === "all"}
              aria-label={`Todos os produtos, ${totalCount} itens`}
              className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold tabular-nums transition-colors md:w-full ${
                selectedThemeSlug === "all"
                  ? "bg-bicrise-brown text-bicrise-white"
                  : "bg-bicrise-white text-bicrise-brown ring-1 ring-bicrise-sand hover:bg-bicrise-sand/35"
              }`}
              onClick={() => setSelectedThemeSlug("all")}
            >
              <span>Todos</span>
              <span
                className={
                  selectedThemeSlug === "all"
                    ? "text-bicrise-white/90"
                    : "text-bicrise-clay"
                }
              >
                ({totalCount})
              </span>
            </button>

            {sections.map(([sectionTitle, list]) => (
              <div key={sectionTitle} className="md:w-full">
                <p className="mt-3 px-2 text-[11px] font-bold uppercase tracking-wide text-bicrise-dust md:mt-4">
                  {sectionTitle}
                </p>
                <div className="mt-2 flex flex-row flex-wrap gap-2 md:flex-col md:gap-1">
                  {list.map((t) => {
                    const active = selectedThemeSlug === t.slug;
                    const n = countByThemeSlug.get(t.slug) ?? 0;
                    return (
                      <button
                        key={t._id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        aria-label={`${t.title}, ${n} ${n === 1 ? "produto" : "produtos"}`}
                        className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold tabular-nums transition-colors md:w-full ${
                          active
                            ? "bg-bicrise-brown text-bicrise-white"
                            : "bg-bicrise-white text-bicrise-brown ring-1 ring-bicrise-sand hover:bg-bicrise-sand/35"
                        }`}
                        onClick={() => setSelectedThemeSlug(t.slug)}
                      >
                        <span>{t.title}</span>
                        <span
                          className={
                            active ? "text-bicrise-white/90" : "text-bicrise-clay"
                          }
                        >
                          ({n})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="mb-6 text-center md:text-left">
          <h1 className="mb-2 text-2xl font-bold text-bicrise-brown sm:text-3xl">
            Catálogo da Bricrisê 🧶
          </h1>
          <p className="text-bicrise-clay">
            Peças feitas à mão. Use o menu ao lado para ver só um tema de cada vez.
          </p>
        </header>

        {visible.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-bicrise-sand bg-bicrise-white p-8 text-center text-bicrise-clay">
            Nenhum produto neste tema ainda.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((p, index) => (
              <li key={p._id}>
                <ProductCard
                  name={p.title}
                  price={p.price}
                  imageUrl={p.imageUrl}
                  available={p.available}
                  priority={index < 6}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
