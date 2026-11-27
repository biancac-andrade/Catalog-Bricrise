"use client";

import Image from "next/image";

import { brandLogos } from "@/assets/brand/logos";
import { useLocale } from "@/context/LocaleContext";
import { brandClasses } from "@/design-system/brandTokens";

export default function AboutSection() {
  const { copy } = useLocale();
  const { about } = copy;

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="relative z-20 px-4 pb-12 md:px-6 md:pb-16"
    >
      <div className="relative z-20 mx-auto max-w-3xl text-center">
        <p
          className={`text-xs font-medium uppercase tracking-[0.2em] text-[#8C6F65] ${brandClasses.heading}`}
        >
          {about.header.kicker}
        </p>

        <div className="mx-auto my-6 flex justify-center sm:my-8">
          <span className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72">
            <Image
              src={brandLogos.knotCircleDark}
              alt="Bricrisê — monograma em corda"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 288px"
              priority
            />
          </span>
        </div>

        <h1
          id="sobre-heading"
          className={`mb-6 text-3xl font-semibold text-[#735E53] sm:text-4xl ${brandClasses.heading}`}
        >
          {about.header.title}
        </h1>

        <article
          className={`mx-auto max-w-2xl space-y-5 text-sm leading-relaxed text-[#735E53] sm:text-base ${brandClasses.body}`}
        >
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p
            className={`pt-2 text-sm font-semibold text-[#8C6F65] sm:text-base ${brandClasses.heading}`}
          >
            {about.signature}
          </p>
        </article>
      </div>
    </section>
  );
}