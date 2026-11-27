import { whatsappLink } from "@/lib/utils/whatsapp";
import { brandClasses } from "@/design-system/brandTokens";

type Props = {
  message?: string;
  label?: string;
  className?: string;
};

export default function WhatsAppButton({
  message = "Olá Bricrisê, vim do catálogo...",
  label = "Pedir orçamento",
  className = "",
}: Readonly<Props>) {
  const href = whatsappLink(message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold shadow-sm ${brandClasses.heading} ${brandClasses.actionBtn} ${className}`}
    >
      {label}
    </a>
  );
}