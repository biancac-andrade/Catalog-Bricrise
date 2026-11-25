import Link from "next/link";

import { brandClasses } from "@/design-system/brandTokens";

const FRONTS = [
  {
    num: "I",
    eyebrow: "Ateliê têxtil",
    title: "Macramê & cordão 1mm",
    description:
      "Pulseiras, chaveiros e acessórios com nós artesanais — peças únicas ou em pequenas séries, sempre com acabamento manual.",
    href: "/catalogo",
    cta: "Ver peças em macramê",
  },
  {
    num: "II",
    eyebrow: "Papelaria & fandom",
    title: "Photocards, adesivos & mimos",
    description:
      "Colecionáveis laminados, gráficos para eventos e papelaria afetiva para quem ama contar histórias com detalhes.",
    href: "/catalogo",
    cta: "Explorar papelaria",
  },
] as const;

export default function HomeFrontsSection() {
  return (
    <section
      aria-labelledby="frentes-heading"
      className="relative z-20 px-4 pb-16 md:px-6 md:pb-20"
    >
      <div className="yarn-readable relative z-20 mx-auto max-w-6xl">
        <header className="mb-10 border-b border-[#D9C9BA]/40 pb-8 text-center md:text-left">
          <h2
            id="frentes-heading"
            className={`mb-2 text-xl font-bold text-[#735E53] sm:text-2xl ${brandClasses.heading}`}
          >
            Dois ateliês, uma mesma delicadeza
          </h2>
          <p
            className={`mx-auto max-w-2xl text-sm leading-relaxed text-[#8C6F65] sm:text-base md:mx-0 ${brandClasses.body}`}
          >
            Têxtil artesanal e papelaria para fandoms — cada linha com
            matéria-prima escolhida e tempo de mão dedicado.
          </p>
        </header>

        <ul className="grid gap-12 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-[#D9C9BA]/40">
          {FRONTS.map((front) => (
            <li key={front.title} className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <article className="space-y-3">
                <p
                  className={`text-xs font-semibold tracking-[0.2em] text-[#BFA393] ${brandClasses.heading}`}
                >
                  {front.num} · {front.eyebrow}
                </p>
                <h3
                  className={`text-lg font-bold text-[#735E53] sm:text-xl ${brandClasses.heading}`}
                >
                  {front.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed text-[#8C6F65] sm:text-base ${brandClasses.body}`}
                >
                  {front.description}
                </p>
                <Link
                  href={front.href}
                  className={`inline-block pt-2 text-sm font-semibold text-[#735E53] underline-offset-4 transition hover:text-[#8C6F65] hover:underline ${brandClasses.heading}`}
                >
                  {front.cta} →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}