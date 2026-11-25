"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
  return `${base} text-[#735E53] hover:bg-[#F2F2F0]`;
}

export default function MobileMenuDrawer({ open, onClose }: Readonly<Props>) {
  const pathname = usePathname();
  const { copy, primaryNav } = useLocale();
  const { mobileMenu } = copy.header;
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
            aria-label="Fechar menu"
            className="fixed inset-0 z-40 bg-[#735E53]/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            aria-label="Menu mobile"
            className="fixed inset-y-0 right-0 z-50 flex w-[min(88vw,20rem)] flex-col border-l border-[#D9C9BA]/50 bg-[#F7F8F3]/95 px-6 py-8 shadow-xl backdrop-blur-md"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
          >
            <p
              className={`mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#BFA393] ${brandClasses.heading}`}
            >
              {mobileMenu.sectionLabel}
            </p>
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
          </motion.nav>
        </>
      ) : null}
    </AnimatePresence>
  );
}