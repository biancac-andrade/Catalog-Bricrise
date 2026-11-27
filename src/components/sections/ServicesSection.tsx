"use client";

import { motion, useReducedMotion } from "framer-motion";

import ServicesCarousel from "@/components/services/ServicesCarousel";
import PageHeader from "@/components/ui/PageHeader";
import { useLocale } from "@/context/LocaleContext";

export default function ServicesSection() {
  const { copy } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section id="servicos" className="relative z-20 px-4 pb-16 md:px-6 md:pb-20">
      <div className="relative z-20 mx-auto max-w-3xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <PageHeader
            kicker={copy.services.header.kicker}
            title={copy.services.header.title}
            subtitle={copy.services.header.subtitle}
          />
        </motion.div>
        <ServicesCarousel />
      </div>
    </section>
  );
}