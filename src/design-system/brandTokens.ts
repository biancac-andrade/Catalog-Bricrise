export const brandTokens = {
  bgPrimary: "#F7F8F3",
  bgSecondary: "#F2F2F0",
  border: "#D9C9BA",
  textPrimary: "#735E53",
  accentBrown: "#8C6F65",
  accentWarm: "#BFA393",
  whatsappSage: "#4A6B56",
  yarnTerracotta: "#D9621E",
} as const;

export const brandShadows = {
  card: "0 4px 20px -8px rgba(115, 94, 83, 0.22)",
  cardHover: "0 8px 24px -14px rgba(115, 94, 83, 0.2)",
  drawer: "0 8px 40px -12px rgba(115, 94, 83, 0.35)",
} as const;

export type BrandTokens = typeof brandTokens;

export const brandClasses = {
  heading: "font-[family-name:var(--font-glacial)] tracking-[0.04em]",
  body: "font-[family-name:var(--font-body)]",
  glassHeader:
    "backdrop-blur-md bg-[#F7F8F3]/85 border-b border-[#D9C9BA]/50",
  actionBtn:
    "bg-[#8C6F65] text-[#F7F8F3] transition-colors hover:bg-[#735E53]",
} as const;