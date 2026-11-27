"use client";

import { motion } from "framer-motion";
import { useId } from "react";

import {
  NEEDLE_EYE,
  NEEDLE_ROTATE_DEG,
  WANDERING_YARN_PATH_D,
  YARN_TIP_ORIGIN,
  YARN_VIEWBOX_HEIGHT,
  YARN_VIEWBOX_WIDTH,
} from "@/components/animations/wanderingYarnPath";
import { useYarnProgress } from "@/hooks/useYarnProgress";

type Props = {
  className?: string;
};

export default function WanderingYarnScroll({ className = "" }: Readonly<Props>) {
  const filterId = useId().replace(/:/g, "");
  const { pathDraw, yarnRotate, yarnScale, yarnDriftX, yarnDriftY } =
    useYarnProgress();

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-10 h-full w-full overflow-visible transform-gpu will-change-transform ${className}`}
    >
      <motion.div
        style={{
          rotate: yarnRotate,
          scale: yarnScale,
          x: yarnDriftX,
          y: yarnDriftY,
          left: `${(YARN_TIP_ORIGIN.x / YARN_VIEWBOX_WIDTH) * 100}%`,
          top: `calc(${(YARN_TIP_ORIGIN.y / YARN_VIEWBOX_HEIGHT) * 100}% - 2.75rem)`,
        }}
        className="absolute z-[2] h-[3.25rem] w-[3.25rem] -translate-x-[38%] translate-y-6 transform-gpu will-change-transform sm:translate-y-0 sm:h-16 sm:w-16"
      >
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full drop-shadow-[0_8px_16px_rgba(217,98,30,0.35)]"
        >
          <circle cx="50" cy="50" r="44" fill="#D9621E" />
          <path
            d="M 15 45 C 35 20, 65 20, 85 45 C 65 70, 35 70, 15 45 Z"
            stroke="#BD4F13"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M 25 25 C 45 45, 55 55, 75 75"
            stroke="#F08244"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 30 75 C 50 55, 60 45, 80 25"
            stroke="#BD4F13"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M 12 55 Q 50 90 88 55"
            stroke="#F08244"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 48 90 Q 52 105 70 100"
            stroke="#D9621E"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </motion.div>

      <svg
        viewBox={`0 0 ${YARN_VIEWBOX_WIDTH} ${YARN_VIEWBOX_HEIGHT}`}
        fill="none"
        preserveAspectRatio="none"
        className="h-full w-full transform-gpu will-change-transform"
      >
        <defs>
          <filter
            id={filterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2"
              floodColor="#BD4F13"
              floodOpacity="0.2"
            />
          </filter>
        </defs>

        <path
          d={WANDERING_YARN_PATH_D}
          stroke="#D9C9BA"
          strokeWidth={1.5}
          strokeDasharray="6 8"
          strokeOpacity={0.4}
        />

        <g
          transform={`translate(${NEEDLE_EYE.x} ${NEEDLE_EYE.y}) rotate(${NEEDLE_ROTATE_DEG}) translate(-12 -20)`}
        >
          <path
            d="M 15 0 L 15 142 L 12 168 L 9 142 L 9 0 C 9 -12, 15 -12, 15 0 Z"
            fill="#D9C9BA"
            stroke="#735E53"
            strokeWidth={1.5}
          />
          <ellipse
            cx="12"
            cy="20"
            rx="2.6"
            ry="9"
            fill="#F2F2F0"
            stroke="#735E53"
            strokeWidth={1.4}
          />
        </g>

        <motion.path
          d={WANDERING_YARN_PATH_D}
          stroke="#D9621E"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          filter={`url(#${filterId})`}
          style={{ pathLength: pathDraw }}
        />
      </svg>
    </div>
  );
}