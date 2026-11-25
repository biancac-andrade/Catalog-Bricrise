"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import ProductQuickView from "@/components/catalog/ProductQuickView";
import { whatsappLink } from "@/lib/utils/whatsapp";
import { brandClasses } from "@/design-system/brandTokens";

interface ProductProps {
  name: string;
  price: number;
  imageUrl: string;
  available?: boolean;
  priority?: boolean;
}

export default function ProductCard({
  name,
  price,
  imageUrl,
  available = true,
  priority = false,
}: Readonly<ProductProps>) {
  const whatsappUrl = whatsappLink(
    `Olá Bricrisê, vim do catálogo e tenho interesse em "${name}". Podemos combinar os detalhes?`,
  );

  return (
    <motion.article
      className={`relative z-20 flex h-full transform-gpu flex-col bg-transparent ${available ? "" : "opacity-85"}`}
      whileHover={available ? { y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <ProductQuickView
        imageUrl={imageUrl}
        name={name}
        renderTrigger={({ onOpen }) => (
          <button
            type="button"
            onClick={onOpen}
            className="group relative mb-3 aspect-square w-full cursor-zoom-in overflow-hidden rounded-lg bg-[#F2F2F0] outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#8C6F65]"
            aria-label={`Ampliar foto de ${name}`}
          >
            <Image
              src={imageUrl}
              alt=""
              fill
              className={`object-cover transition-transform duration-300 group-hover:scale-[1.02] ${available ? "" : "grayscale"}`}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
            />
            {available === false ? (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#735E53]/40">
                <span
                  className={`rounded-md bg-[#F7F8F3]/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#735E53] ${brandClasses.heading}`}
                >
                  Esgotado
                </span>
              </div>
            ) : null}
          </button>
        )}
      />

      <h3
        className={`mb-1 line-clamp-2 text-sm font-bold leading-snug text-[#735E53] sm:text-base ${brandClasses.heading}`}
      >
        {name}
      </h3>
      <p
        className={`mb-3 text-sm font-semibold text-[#8C6F65] ${brandClasses.body}`}
      >
        R$ {price.toFixed(2)}
      </p>

      {available ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto inline-flex w-full items-center justify-center rounded-full py-2 text-center text-xs font-bold sm:text-sm ${brandClasses.heading} ${brandClasses.actionBtn}`}
        >
          Encomendar
        </a>
      ) : (
        <span
          className={`mt-auto block w-full py-2 text-center text-xs font-semibold text-[#BFA393] sm:text-sm ${brandClasses.body}`}
          aria-disabled="true"
        >
          Indisponível
        </span>
      )}
    </motion.article>
  );
}