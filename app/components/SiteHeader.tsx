import Image from "next/image";

import { whatsappLink } from "@/lib/whatsapp";

/** Troque por `bicrise-logo.png` exportado com fundo transparente (PNG/SVG) quando tiver o arquivo. */
const LOGO_SRC = "/images/bicrise-logo.png";

const whatsappHref = whatsappLink(
  "Oi Bianca! Vim pelo site da Bricrisê. Quero falar sobre as peças. 🧶",
);

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-bicrise-sand/70 bg-[color-mix(in_srgb,var(--background)_96%,transparent)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <a
          href="#inicio"
          className="flex items-center gap-3 rounded-xl outline-offset-4 focus-visible:outline-2 focus-visible:outline-bicrise-dust"
        >
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-bicrise-sand bg-bicrise-white shadow-sm">
            <Image
              src={LOGO_SRC}
              alt="Bricrisê — monograma em corda"
              fill
              className="object-cover"
              sizes="56px"
              priority
            />
          </span>
          <span className="text-left text-xl font-bold tracking-tight text-bicrise-brown">
            Bricrisê 🧶
          </span>
        </a>

        <nav
          className="flex flex-wrap items-center gap-2"
          aria-label="Contato"
        >
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-1.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-95"
          >
            <span>WhatsApp</span>
            <span className="relative h-[18px] w-[18px] shrink-0" aria-hidden>
              <Image
                src="/whatsapp.svg"
                alt=""
                width={18}
                height={18}
                className="object-contain"
              />
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
