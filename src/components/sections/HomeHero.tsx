import Link from "next/link";

import { brandClasses } from "@/design-system/brandTokens";

export default function HomeHero() {
  return (
    <div className="yarn-readable mx-auto max-w-3xl py-6 text-center sm:py-10">
      <p
        className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6F65] ${brandClasses.heading}`}
      >
        Ateliê Bricrisê
      </p>
      <h1
        className={`mb-4 text-3xl font-bold leading-tight text-[#735E53] sm:text-4xl md:text-5xl ${brandClasses.heading}`}
      >
        Onde o nó vira laço
      </h1>
      <p
        className={`mx-auto max-w-xl text-base leading-relaxed text-[#8C6F65] sm:text-lg ${brandClasses.body}`}
      >
        Macramê artesanal e papelaria para fandoms — peças feitas à mão, com
        acabamento delicado e encomenda direta pelo WhatsApp.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/catalogo"
          className={`rounded-full px-6 py-2.5 text-sm font-bold shadow-sm ${brandClasses.heading} ${brandClasses.actionBtn}`}
        >
          Ver catálogo
        </Link>
        <Link
          href="/sobre"
          className={`rounded-full border border-[#D9C9BA] bg-[#F7F8F3] px-6 py-2.5 text-sm font-semibold text-[#735E53] transition hover:bg-[#F2F2F0] ${brandClasses.heading}`}
        >
          Conheça a marca
        </Link>
      </div>
    </div>
  );
}