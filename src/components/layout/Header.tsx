"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

import CartHeaderIcon from "@/components/cart/CartHeaderIcon";
import LanguageToggle from "@/components/layout/LanguageToggle";
import MobileMenuDrawer from "@/components/layout/MobileMenuDrawer";
import WhatsAppIconLink from "@/components/ui/WhatsAppIconLink";
import { brandLogos } from "@/assets/brand/logos";
import { HEADER_WHATSAPP_MESSAGE } from "@/components/layout/navConfig";
import { useLocale } from "@/context/LocaleContext";
import { brandClasses } from "@/design-system/brandTokens";
import { isNavActive } from "@/lib/navigation/isNavActive";

type HamburgerProps = {
  open: boolean;
  onToggle: () => void;
};

function HamburgerButton({ open, onToggle }: Readonly<HamburgerProps>) {
  return (
    <button
      type="button"
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#D9C9BA]/50 bg-[#F7F8F3]/50 outline-offset-2 backdrop-blur-sm transition hover:bg-[#F7F8F3]/70 focus-visible:outline-2 focus-visible:outline-[#8C6F65] md:hidden"
      aria-expanded={open}
      aria-controls="site-nav-drawer"
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      onClick={onToggle}
    >
      <span className="flex w-4 flex-col items-center justify-center gap-[4px]">
        <motion.span
          className="block h-0.5 w-4 origin-center rounded-full bg-[#735E53]"
          animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.22 }}
        />
        <motion.span
          className="block h-0.5 w-4 rounded-full bg-[#735E53]"
          animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.18 }}
        />
        <motion.span
          className="block h-0.5 w-4 origin-center rounded-full bg-[#735E53]"
          animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.22 }}
        />
      </span>
    </button>
  );
}

function navLinkClass(active: boolean) {
  const base = `inline-block rounded-full px-3.5 py-1.5 text-sm transition-all duration-200 ${brandClasses.heading}`;
  if (active) {
    return `${base} bg-[#8C6F65] font-medium text-[#F7F8F3] shadow-sm`;
  }
  return `${base} font-semibold text-[#735E53]/80 hover:bg-[#D9C9BA]/30 hover:text-[#735E53]`;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { primaryNav } = useLocale();

  return (
    <>
      <header className={brandClasses.glassHeader}>
        <div className="mx-auto grid h-14 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 md:px-6">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 rounded-lg outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#8C6F65]"
          >
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[#D9C9BA]/60 bg-[#F7F8F3]">
              <Image
                src={brandLogos.knotMark}
                alt=""
                fill
                className="object-cover"
                sizes="36px"
                priority
              />
            </span>
            <span
              className={`truncate text-lg font-bold text-[#735E53] ${brandClasses.heading}`}
            >
              Bricrisê
            </span>
          </Link>

          <nav
            className="hidden justify-center md:flex"
            aria-label="Navegação principal"
          >
            <ul className="flex items-center gap-1">
              {primaryNav.map((link) => {
                const active = isNavActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={navLinkClass(active)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2">
            <LanguageToggle />
            <CartHeaderIcon />
            <WhatsAppIconLink message={HEADER_WHATSAPP_MESSAGE} />
            <HamburgerButton
              open={menuOpen}
              onToggle={() => setMenuOpen((v) => !v)}
            />
          </div>
        </div>
      </header>
      <div id="site-nav-drawer">
        <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}