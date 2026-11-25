"use client";

import Image from "next/image";
import type { MotionValue } from "framer-motion";
import { motion } from "framer-motion";

import { brandLogos } from "@/assets/brand/logos";

type Props = {
  y: MotionValue<string>;
  opacity: MotionValue<number>;
};

export default function ParallaxBackground({ y, opacity }: Readonly<Props>) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
      style={{ y, opacity }}
    >
      <div className="relative h-[min(72vw,22rem)] w-[min(72vw,22rem)] transform-gpu">
        <Image
          src={brandLogos.knotMark}
          alt=""
          fill
          className="object-contain opacity-90"
          sizes="(max-width: 768px) 72vw, 22rem"
          priority
        />
      </div>
    </motion.div>
  );
}