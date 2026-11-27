"use client";

import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { useScrollContainer } from "@/context/ScrollContainerContext";

const AUTOPLAY_DURATION_S = 2.8;
const SCROLL_SLOP_PX = 80;
const YARN_ROTATION_DEG = 1320;
const YARN_SCALE_DELTA = 0.18;
const YARN_DRIFT_X_PX = 8;
const YARN_DRIFT_Y_PX = 5;

export function useYarnProgress() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const mainRef = useScrollContainer();
  const scrollableRef = useRef(true);
  const progress = useMotionValue(reduceMotion ? 1 : 0);

  const { scrollYProgress } = useScroll(
    mainRef ? { container: mainRef } : undefined,
  );

  const smoothedScroll = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  const output = useSpring(progress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothedScroll, "change", (value) => {
    if (scrollableRef.current) {
      progress.set(value);
    }
  });

  useEffect(() => {
    const main = mainRef?.current;
    if (!main) {
      scrollableRef.current = false;
      progress.set(1);
      return;
    }
    if (reduceMotion) {
      progress.set(1);
      return;
    }

    let stopAutoplay: (() => void) | undefined;

    const syncMode = () => {
      const hasScroll = main.scrollHeight > main.clientHeight + SCROLL_SLOP_PX;
      scrollableRef.current = hasScroll;

      stopAutoplay?.();
      stopAutoplay = undefined;

      if (hasScroll) {
        progress.set(scrollYProgress.get());
      } else {
        progress.set(0);
        const controls = animate(progress, 1, {
          duration: AUTOPLAY_DURATION_S,
          ease: "easeInOut",
        });
        stopAutoplay = () => controls.stop();
      }
    };

    const schedule = () => requestAnimationFrame(syncMode);
    schedule();

    const observer = new ResizeObserver(schedule);
    observer.observe(main);
    window.addEventListener("resize", schedule);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      stopAutoplay?.();
    };
  }, [pathname, mainRef, reduceMotion, progress, scrollYProgress]);

  const pathDraw = useTransform(output, (value) => (reduceMotion ? 1 : value));
  const yarnRotate = useTransform(output, (value) =>
    reduceMotion ? 0 : value * YARN_ROTATION_DEG,
  );
  const yarnScale = useTransform(output, (value) =>
    reduceMotion ? 1 : 1 - value * YARN_SCALE_DELTA,
  );
  const yarnDriftX = useTransform(output, (value) =>
    reduceMotion ? 0 : Math.sin(value * Math.PI * 7.5) * YARN_DRIFT_X_PX,
  );
  const yarnDriftY = useTransform(output, (value) =>
    reduceMotion ? 0 : Math.cos(value * Math.PI * 6.5) * YARN_DRIFT_Y_PX,
  );

  return { pathDraw, yarnRotate, yarnScale, yarnDriftX, yarnDriftY };
}