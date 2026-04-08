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

  const selectedTheme = useMemo(
    () => themes.find((t) => t.slug === selectedThemeSlug) ?? null,
    [themes, selectedThemeSlug],
  );

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

  const allThemes = useMemo(
    () => themes,
    [themes],
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 md:flex-row md:items-start md:gap-10 md:px-6 md:py-8">

      {/* Mobile: pills centradas com borda */}
      <section
        aria-label="Filtrar por tema"
        className="rounded-2xl border border-bicrise-sand bg-bicrise-white/90 p-3 shadow-sm md:hidden"
      >
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-bicrise-clay">
          Temas
        </p>
        <div
          className="flex flex-wrap justify-center gap-2"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedThemeSlug === "all"}
            onClick={() => setSelectedThemeSlug("all")}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold tabular-nums transition-colors ${
              selectedThemeSlug === "all"
                ? "bg-bicrise-brown text-bicrise-white"
                : "bg-bicrise-white text-bicrise-brown ring-1 ring-bicrise-sand"
            }`}
          >
            Todos ({totalCount})
          </button>
          {allThemes.map((t) => {
            const active = selectedThemeSlug === t.slug;
            const n = countByThemeSlug.get(t.slug) ?? 0;
            return (
              <button
                key={t._id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedThemeSlug(t.slug)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold tabular-nums transition-colors ${
                  active
                    ? "bg-bicrise-brown text-bicrise-white"
                    : "bg-bicrise-white text-bicrise-brown ring-1 ring-bicrise-sand"
                }`}
              >
                {t.title} ({n})
              </button>
            );
          })}
        </div>
      </section>

      {/* Desktop: sidebar vertical */}
      <aside className="hidden shrink-0 md:sticky md:top-28 md:block md:w-56 md:max-w-56">
        <div className="rounded-2xl border border-bicrise-sand bg-bicrise-white/90 p-3 shadow-sm">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-bicrise-clay">
            Temas
          </p>
          <div
            className="flex flex-col gap-1"
            role="tablist"
            aria-label="Filtrar por tema"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedThemeSlug === "all"}
              aria-label={`Todos os produtos, ${totalCount} itens`}
              className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold tabular-nums transition-colors ${
                selectedThemeSlug === "all"
                  ? "bg-bicrise-brown text-bicrise-white"
                  : "bg-bicrise-white text-bicrise-brown ring-1 ring-bicrise-sand hover:bg-bicrise-sand/35"
              }`}
              onClick={() => setSelectedThemeSlug("all")}
            >
              <span>Todos</span>
              <span className={selectedThemeSlug === "all" ? "text-bicrise-white/90" : "text-bicrise-clay"}>
                ({totalCount})
              </span>
            </button>

            {sections.map(([sectionTitle, list]) => (
              <div key={sectionTitle} className="w-full">
                <p className="mt-4 px-2 text-[11px] font-bold uppercase tracking-wide text-bicrise-dust">
                  {sectionTitle}
                </p>
                <div className="mt-1 flex flex-col gap-1">
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
                        className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold tabular-nums transition-colors ${
                          active
                            ? "bg-bicrise-brown text-bicrise-white"
                            : "bg-bicrise-white text-bicrise-brown ring-1 ring-bicrise-sand hover:bg-bicrise-sand/35"
                        }`}
                        onClick={() => setSelectedThemeSlug(t.slug)}
                      >
                        <span>{t.title}</span>
                        <span className={active ? "text-bicrise-white/90" : "text-bicrise-clay"}>
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
          <p className="mb-4 text-sm text-bicrise-clay/80">
            Peças feitas à mão. Use o menu ao lado para ver só um tema de cada vez.
          </p>
          <p className="text-left text-xs text-bicrise-clay/70">
            A ver:{" "}
            <span className="font-semibold text-bicrise-brown">
              {selectedTheme ? selectedTheme.title : "Todos os temas"}
            </span>
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
