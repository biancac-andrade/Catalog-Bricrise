export const typography = {
  headingFamily: "var(--font-glacial)",
  bodyFamily: "var(--font-body)",
  headingTracking: "0.04em",
  roles: {
    display: {
      className: "font-[family-name:var(--font-glacial)] tracking-[0.04em] font-bold",
      sizes: "text-3xl sm:text-4xl md:text-5xl",
    },
    sectionTitle: {
      className: "font-[family-name:var(--font-glacial)] tracking-[0.04em] font-bold",
      sizes: "text-2xl sm:text-3xl",
    },
    body: {
      className: "font-[family-name:var(--font-body)] font-normal",
      sizes: "text-sm sm:text-base",
    },
    label: {
      className:
        "font-[family-name:var(--font-glacial)] tracking-[0.18em] font-semibold uppercase",
      sizes: "text-xs",
    },
  },
} as const;