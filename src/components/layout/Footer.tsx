"use client";

import Image from "next/image";
import Link from "next/link";

import { brandLogos } from "@/assets/brand/logos";
import { useLocale } from "@/context/LocaleContext";
import { brandClasses } from "@/design-system/brandTokens";

export default function Footer() {
  const { copy } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-30 shrink-0 border-t border-[#D9C9BA] bg-[#F2F2F0]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <p
          className={`text-xs text-[#735E53]/85 sm:text-sm ${brandClasses.body}`}
        >
          © {year} {copy.footer.brandName}.
        </p>

        <Link
          href="/"
          aria-label={copy.footer.brandName}
          className="shrink-0 rounded-lg outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#8C6F65]"
        >
          <span className="relative block h-9 w-9 overflow-hidden rounded-full border border-[#D9C9BA] bg-[#F7F8F3] sm:h-10 sm:w-10">
            <Image
              src={brandLogos.knotMark}
              alt=""
              fill
              className="object-cover"
              sizes="40px"
            />
          </span>
        </Link>
      </div>
    </footer>
  );
}