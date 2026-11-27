import Image from "next/image";

import { brandLogos } from "@/assets/brand/logos";
import { brandClasses } from "@/design-system/brandTokens";

export default function AboutEditorial() {
  return (
    <div className="yarn-readable mx-auto max-w-3xl py-4">
      <header className="mb-10 text-center md:text-left">
        <p
          className={`mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#BFA393] ${brandClasses.heading}`}
        >
          A Marca
        </p>
        <h1
          className={`text-2xl font-bold text-[#735E53] sm:text-3xl ${brandClasses.heading}`}
        >
          Conheça a Bricrisê
        </h1>
      </header>

      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <div className="mx-auto flex shrink-0 flex-col items-center gap-3 md:mx-0 md:w-40">
          <span className="relative h-32 w-32 overflow-hidden rounded-full border border-[#D9C9BA]/60 bg-[#F2F2F0]">
            <Image
              src={brandLogos.knotMark}
              alt="Bricrisê — monograma em corda"
              fill
              className="object-cover"
              sizes="128px"
            />
          </span>
          <p
            className={`text-center text-sm italic text-[#8C6F65] md:text-left ${brandClasses.body}`}
          >
            Onde o nó vira laço
          </p>
        </div>

        <div className={`space-y-5 text-[#8C6F65] ${brandClasses.body}`}>
          <p className="leading-relaxed">
            A Bricrisê nasceu do encontro entre gerações: o cuidado de mãe, a
            criatividade de filha e a alegria do Galego. Por aqui, artesanato é
            forma de carinho — cada nó e cada impressão carrega história e
            dedicação manual.
          </p>
          <p className="leading-relaxed">
            No ateliê têxtil trabalhamos com{" "}
            <strong className="font-semibold text-[#735E53]">
              cordão de 1mm
            </strong>{" "}
            em macramê; na papelaria,{" "}
            <strong className="font-semibold text-[#735E53]">
              papéis fotográficos
            </strong>{" "}
            com laminação de alta durabilidade para photocards e adesivos.
          </p>
          <p className="leading-relaxed">
            Nosso diferencial é a personalização: cores, temas, quantidades e
            prazos combinados com transparência, sempre com acabamento refinado
            pensado para quem coleciona ou presenteia.
          </p>
          <p className="font-medium text-[#735E53]">
            Com amor, Bianca, Cristiane &amp; Galego.
          </p>
        </div>
      </div>
    </div>
  );
}