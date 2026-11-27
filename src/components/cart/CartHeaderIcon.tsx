"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";
import { brandClasses } from "@/design-system/brandTokens";

function CartGlyph({ muted }: Readonly<{ muted?: boolean }>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={muted ? "text-[#BFA393]" : "text-[#735E53]"}
    >
      <path d="M6 6h15l-1.5 9h-12z" />
      <path d="M6 6 5 3H2" />
      <circle cx="9" cy="20" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

const baseClass =
  "relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D9C9BA]/60 bg-[#F7F8F3]/80 sm:h-10 sm:w-10";

type Props = {
  className?: string;
  onNavigate?: () => void;
};

export default function CartHeaderIcon({
  className = "",
  onNavigate,
}: Readonly<Props>) {
  const { isEmpty, itemCount } = useCart();
  const { copy } = useLocale();

  if (isEmpty) {
    return (
      <span
        className={`${baseClass} cursor-not-allowed opacity-45 ${className}`}
        aria-disabled="true"
        title={copy.cart.headerDisabledTitle}
      >
        <CartGlyph muted />
        <span className="sr-only">{copy.cart.headerDisabledTitle}</span>
      </span>
    );
  }

  return (
    <Link
      href="/carrinho"
      onClick={() => onNavigate?.()}
      className={`${baseClass} transition [@media(hover:hover)]:hover:border-[#8C6F65] [@media(hover:hover)]:hover:bg-[#F7F8F3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6F65] ${className}`}
      aria-label={`${copy.cart.headerLinkLabel} (${itemCount})`}
    >
      <CartGlyph />
      <span
        className={`absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-[#8C6F65] px-1 text-[10px] font-bold leading-none text-[#F7F8F3] ${brandClasses.heading}`}
      >
        {itemCount > 99 ? "99+" : itemCount}
      </span>
    </Link>
  );
}