import { enUS } from "@/content/locales/en-US";
import { ptBR } from "@/content/locales/pt-BR";

export type LocaleId = "pt-BR" | "en-US";

const locales = {
  "pt-BR": ptBR,
  "en-US": enUS,
} as const;

export type LocaleCopy = (typeof locales)[LocaleId];
export type PriceCategoryKey = keyof typeof ptBR.orders.priceCategories;

export function getCopy(locale: LocaleId = "pt-BR"): LocaleCopy {
  return locales[locale];
}

export function getPrimaryNav(locale: LocaleId = "pt-BR") {
  const c = getCopy(locale);
  return [
    { href: "/sobre", label: c.header.nav.about },
    { href: "/servicos", label: c.header.nav.services },
    { href: "/catalogo", label: c.header.nav.catalog },
    { href: "/encomendas", label: c.header.nav.orders },
  ] as const;
}

export const copy = getCopy("pt-BR");

export { ptBR, enUS };