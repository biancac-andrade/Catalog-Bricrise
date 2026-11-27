import Image from "next/image";

import { brandLogos } from "@/assets/brand/logos";
import { whatsappLink } from "@/lib/utils/whatsapp";

type Props = {
  message?: string;
  className?: string;
};

export default function WhatsAppIconLink({
  message = "Olá Bricrisê, vim do catálogo...",
  className = "",
}: Readonly<Props>) {
  const href = whatsappLink(message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Bricrisê"
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8C6F65] shadow-sm transition-all duration-200 hover:scale-105 hover:opacity-90 sm:h-10 sm:w-10 ${className}`}
    >
      <Image
        src={brandLogos.whatsapp}
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 object-contain brightness-0 invert"
      />
    </a>
  );
}