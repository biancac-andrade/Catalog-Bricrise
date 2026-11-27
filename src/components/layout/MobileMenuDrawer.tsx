"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import CartHeaderIcon from "@/components/cart/CartHeaderIcon";
import LanguageToggle from "@/components/layout/LanguageToggle";
import WhatsAppIconLink from "@/components/ui/WhatsAppIconLink";
import { HEADER_WHATSAPP_MESSAGE } from "@/components/layout/navConfig";
import { useCart } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";
import { brandClasses } from "@/design-system/brandTokens";
import { isNavActive } from "@/lib/navigation/isNavActive";

type Props = {
  open: boolean;
  onClose: () => void;
};

function mobileNavClass(active: boolean) {
  const base = `block rounded-xl px-3 py-3 text-base font-semibold transition ${brandClasses.heading}`;
  if (active) {
    return `${base} bg-[#8C6F65] text-[#F7F8F3] shadow-sm`;
  }
  return `${base} text-[#735E53] active:bg-[#F2F2F0] [@media(hover:hover)]:hover:bg-[#F2F2F0]`;
}

export default function MobileMenuDrawer({ open, onClose }: Readonly<Props>) {
  const pathname = usePathname();
  const { copy, primaryNav } = useLocale();
  const { mobileMenu } = copy.header;
  const { isEmpty, itemCount } = useCart();
  useEffect(() => {
    if (!open) return;
    const main = document.getElementById("app-main-scroll");
    if (!main) return;
    const prev = main.style.overflow;
    main.style.overflow = "hidden";
    return () => {
      main.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label={mobileMenu.closeMenu}
            className="fixed inset-0 z-40 bg-[#735E53]/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            aria-label="Menu mobile"
            className="fixed inset-y-0 right-0 z-50 flex w-[min(88vw,20rem)] flex-col overflow-y-auto border-l border-[#D9C9BA]/50 bg-[#F7F8F3]/95 px-6 py-8 shadow-xl backdrop-blur-md"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <p
                className={`text-xs font-semibold uppercase tracking-[0.18em] text-[#BFA393] ${brandClasses.heading}`}
              >
                {mobileMenu.sectionLabel}
              </p>
              <button
                type="button"
                onClick={onClose}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#D9C9BA]/70 bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#735E53] shadow-sm transition active:bg-[#F2F2F0] [@media(hover:hover)]:hover:border-[#8C6F65]/50 ${brandClasses.heading}`}
              >
                <span aria-hidden className="text-base leading-none">
                  ×
                </span>
                {mobileMenu.close}
              </button>
            </div>
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  href="/"
                  onClick={onClose}
                  aria-current={pathname === "/" ? "page" : undefined}
                  className={mobileNavClass(pathname === "/")}
                >
                  {mobileMenu.home}
                </Link>
              </li>
              {primaryNav.map((link) => {
                const active = isNavActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={mobileNavClass(active)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 border-t border-[#D9C9BA]/40 pt-6">
              <p
                className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#BFA393] ${brandClasses.heading}`}
              >
                {mobileMenu.utilitiesLabel}
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span
                    className={`text-[0.65rem] font-semibold uppercase tracking-wider text-[#BFA393] ${brandClasses.heading}`}
                  >
                    {mobileMenu.language}
                  </span>
                  <LanguageToggle presentation="drawer" />
                </div>
                <div
                  className={`flex items-center justify-between gap-3 rounded-xl border border-[#D9C9BA]/50 px-3 py-2.5 ${
                    isEmpty ? "bg-[#F2F2F0]/40 opacity-60" : "bg-white/70"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <CartHeaderIcon
                      className="!h-11 !w-11"
                      onNavigate={onClose}
                    />
                    <span
                      className={`text-sm font-semibold text-[#735E53] ${brandClasses.heading}`}
                    >
                      {mobileMenu.cart}
                    </span>
                  </div>
                  {!isEmpty ? (
                    <span
                      className={`shrink-0 rounded-full bg-[#C94C4C] px-2.5 py-0.5 text-xs font-bold tabular-nums text-white ${brandClasses.heading}`}
                    >
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-3">
                  <WhatsAppIconLink
                    message={HEADER_WHATSAPP_MESSAGE}
                    className="!h-11 !w-11"
                  />
                  <span
                    className={`text-sm font-semibold text-[#735E53] ${brandClasses.heading}`}
                  >
                    {mobileMenu.whatsapp}
                  </span>
                </div>
              </div>
            </div>
          </motion.nav>
        </>
      ) : null}
    </AnimatePresence>
  );
}