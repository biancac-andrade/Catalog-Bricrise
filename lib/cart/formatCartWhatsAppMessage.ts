import type { CartLine } from "@/types/cart";

import type { LocaleId } from "@/content";

function formatMoney(value: number, locale: LocaleId): string {
  const amount = value.toFixed(2);
  return locale === "en-US" ? `R$ ${amount}` : `R$ ${amount.replace(".", ",")}`;
}

export function formatCartWhatsAppMessage(
  lines: CartLine[],
  locale: LocaleId = "pt-BR",
): string {
  if (lines.length === 0) return "";

  const intro =
    locale === "en-US"
      ? "Hello Bricrisê! I'd like a quote for:"
      : "Olá Bricrisê! Gostaria de um orçamento para:";

  const body = lines
    .map((line) => {
      const subtotal = line.price * line.quantity;
      const unit = formatMoney(line.price, locale);
      const total = formatMoney(subtotal, locale);
      return locale === "en-US"
        ? `• ${line.title} — ${line.quantity}× ${unit} = ${total}`
        : `• ${line.title} — ${line.quantity}× ${unit} = ${total}`;
    })
    .join("\n");

  const grand = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const totalLabel =
    locale === "en-US"
      ? `Total: ${formatMoney(grand, locale)}`
      : `Total: ${formatMoney(grand, locale)}`;

  const outro =
    locale === "en-US"
      ? "Can we work out the details?"
      : "Podemos combinar os detalhes?";

  return `${intro}\n\n${body}\n\n${totalLabel}\n\n${outro}`;
}