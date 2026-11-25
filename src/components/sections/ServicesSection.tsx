"use client";

import PageHeader from "@/components/ui/PageHeader";
import ServicesCarousel from "@/components/services/ServicesCarousel";
import { useLocale } from "@/context/LocaleContext";

export default function ServicesSection() {
  const { copy } = useLocale();
  return (
    <section id="servicos" className="relative z-20 px-4 pb-16 md:px-6 md:pb-20">
      <div className="relative z-20 mx-auto max-w-3xl">
        <PageHeader
          kicker={copy.services.header.kicker}
          title={copy.services.header.title}
          subtitle={copy.services.header.subtitle}
        />
        <ServicesCarousel />
      </div>
    </section>
  );
}