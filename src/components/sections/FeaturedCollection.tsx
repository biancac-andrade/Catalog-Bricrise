import Link from "next/link";

import ProductCard from "@/components/catalog/ProductCard";
import type { CatalogProduct } from "@/components/catalog/catalog.types";
import { brandClasses } from "@/design-system/brandTokens";

type Props = {
  products: CatalogProduct[];
};

const FEATURED_COUNT = 4;

export default function FeaturedCollection({ products }: Readonly<Props>) {
  const featured = products.slice(0, FEATURED_COUNT);

  return (
    <div className="yarn-readable">
      <header className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2
            className={`text-2xl font-bold text-[#735E53] sm:text-3xl ${brandClasses.heading}`}
          >
            Destaques da Coleção
          </h2>
          <p className={`mt-2 text-sm text-[#8C6F65] ${brandClasses.body}`}>
            Quatro peças em evidência — o catálogo completo tem muito mais.
          </p>
        </div>
        <Link
          href="/catalogo"
          className={`shrink-0 text-sm font-semibold text-[#8C6F65] underline-offset-4 hover:text-[#735E53] hover:underline ${brandClasses.heading}`}
        >
          Ver catálogo completo
        </Link>
      </header>

      {featured.length === 0 ? (
        <p className={`text-[#8C6F65] ${brandClasses.body}`}>
          Novidades em breve. Enquanto isso, fale conosco pelo WhatsApp.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((p, index) => (
            <li key={p._id} className="relative z-20">
              <ProductCard
                productId={p._id}
                name={p.title}
                price={p.price}
                imageUrl={p.imageUrl}
                available={p.available}
                priority={index < 4}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}