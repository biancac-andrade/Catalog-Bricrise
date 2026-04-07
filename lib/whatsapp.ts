/** Número com DDI (Brasil) sem + ou espaços — mesmo formato usado em wa.me */
export const WHATSAPP_E164 = "5519981944880";

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_E164}`;
  if (!message?.trim()) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}
