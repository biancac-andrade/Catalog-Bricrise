"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

import ProductQuickView from "@/components/catalog/ProductQuickView";
import { useCart } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";
import { brandClasses, brandShadows } from "@/design-system/brandTokens";

interface ProductProps {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  available?: boolean;
  priority?: boolean;
}

export default function ProductCard({
  productId,
  name,
  price,
  imageUrl,
  available = true,
  priority = false,
}: Readonly<ProductProps>) {
  const { addLine } = useCart();
  const { copy } = useLocale();
  const t = copy.cart.product;
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addLine({
      productId,
      title: name,
      price,
      imageUrl,
      quantity: qty,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  const hoverLift = available
    ? { y: -4, scale: 1.015, boxShadow: brandShadows.cardHover }
    : undefined;

  return (
    <motion.article
      className={`group/card relative z-20 flex h-full flex-col overflow-hidden rounded-2xl border border-[#D9C9BA]/50 bg-[#FAFAF8] p-3 sm:p-3.5 ${
        available ? "" : "opacity-90"
      }`}
      style={{ boxShadow: brandShadows.card }}
      whileHover={hoverLift}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <ProductQuickView
        imageUrl={imageUrl}
        name={name}
        renderTrigger={({ onOpen }) => (
          <button
            type="button"
            onClick={onOpen}
            className="group/image relative mb-2.5 aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-xl bg-[#F2F2F0] outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#8C6F65] sm:mb-3"
            aria-label={`Ampliar foto de ${name}`}
          >
            <Image
              src={imageUrl}
              alt=""
              fill
              className={`object-cover transition-transform duration-500 ease-out group-hover/image:scale-[1.03] ${
                available ? "" : "grayscale"
              }`}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
            />
          </button>
        )}
      />

      <div className="flex min-h-0 flex-1 flex-col">
        <h3
          className={`mb-1 line-clamp-2 text-[0.8125rem] font-semibold leading-snug text-[#735E53] sm:text-sm ${brandClasses.heading}`}
        >
          {name}
        </h3>
        <p
          className={`mb-3 text-xs font-medium tabular-nums text-[#8C6F65] ${brandClasses.body}`}
        >
          R$ {price.toFixed(2)}
        </p>

        <div className="mt-auto flex w-full flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-1.5">
          <div
            className="flex h-11 w-full min-w-0 items-center rounded-xl border border-[#D9C9BA]/60 bg-[#F7F8F3] px-1 sm:h-10 sm:flex-[5] sm:px-0.5"
            role="group"
            aria-label={`Quantidade: ${name}`}
          >
            <button
              type="button"
              onClick={() => setQty((n) => Math.max(1, n - 1))}
              disabled={qty <= 1}
              className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg text-[#735E53] transition enabled:hover:bg-[#EAE5DE]/70 disabled:opacity-30 sm:h-9 sm:w-10"
              aria-label={t.decreaseQty}
            >
              <span
                aria-hidden
                className="block h-5 w-5 text-center text-[1.35rem] font-semibold leading-5"
              >
                −
              </span>
            </button>
            <span
              className={`flex flex-1 items-center justify-center text-base font-semibold tabular-nums leading-5 text-[#735E53] ${brandClasses.heading}`}
            >
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((n) => Math.min(99, n + 1))}
              disabled={qty >= 99}
              className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg text-[#735E53] transition enabled:hover:bg-[#EAE5DE]/70 disabled:opacity-30 sm:h-9 sm:w-10"
              aria-label={t.increaseQty}
            >
              <span
                aria-hidden
                className="block h-5 w-5 text-center text-[1.35rem] font-semibold leading-5"
              >
                +
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`flex h-11 w-full min-w-0 items-center justify-center rounded-xl border px-3 text-sm font-semibold leading-tight transition sm:h-10 sm:flex-[4] sm:px-2 sm:text-xs ${brandClasses.heading} ${
              justAdded
                ? "border-[#4A6B56] bg-[#EAE5DE]/50 text-[#4A6B56]"
                : "border-[#D9C9BA] bg-white text-[#735E53] hover:border-[#8C6F65]/70 hover:bg-[#F7F8F3]"
            }`}
          >
            {justAdded ? t.added : t.addToCart}
          </button>
        </div>
      </div>
    </motion.article>
  );
}