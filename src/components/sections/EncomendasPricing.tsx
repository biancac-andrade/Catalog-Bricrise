"use client";

import InteractivePriceMatrix from "@/components/orders/InteractivePriceMatrix";
import PageHeader from "@/components/ui/PageHeader";
import { useLocale } from "@/context/LocaleContext";

export default function EncomendasPricing() {
  const { copy } = useLocale();
  const { orders } = copy;

  return (
    <section className="relative z-20 pb-4 md:pb-6">
      <div className="relative z-20 mx-auto max-w-3xl">
        <PageHeader
          kicker={orders.header.kicker}
          title={orders.header.title}
          subtitle={orders.header.subtitle}
        />

        <InteractivePriceMatrix />
      </div>
    </section>
  );
}