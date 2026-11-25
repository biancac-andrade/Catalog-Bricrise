# Design System — Tokens e identidade visual

Fonte de verdade em código: `src/design-system/brandTokens.ts`, `src/design-system/typography.ts` e `src/app/globals.css` (`@theme` Tailwind).

## Paleta oficial

| Nome | Hex | Token / uso |
|------|-----|-------------|
| Algodão cru (fundo principal) | `#F7F8F3` | `bgPrimary`, body, header glass |
| Neutro claro | `#F2F2F0` | `bgSecondary`, cards, footer |
| Bege suave | `#D9C9BA` | `border`, linhas tracejadas do fio |
| Marrom terroso base | `#735E53` | `textPrimary`, tipografia principal |
| Bronze médio | `#BFA393` | `accentWarm`, kickers secundários |
| Terracota editorial | `#8C6F65` | `accentBrown`, botões, nav ativo, barras de progresso |
| Laranja da linha artesanal | `#D9621E` | `yarnTerracotta`, novelo, traço animado do fio |
| Laranja derivado (sombras UI) | `#BD4F13`, `#F08244` | Detalhes do SVG do novelo |

## Tipografia

| Papel | Família | Classe |
|-------|---------|--------|
| Títulos e display | Glacial Indifference (local, `fonts/`) | `brandClasses.heading` |
| Corpo | Inter (Google Fonts) | `brandClasses.body` |

Tracking de títulos: ~`0.04em`–`0.2em` em kickers uppercase.

## Sombras (`brandShadows`)

Reutilizadas em cards, drawer mobile e elevação de produto — definidas em `brandTokens.ts`.

## Logos e arquivos de marca

Mapeamento TypeScript: `src/assets/brand/logos/index.ts`. Binários servidos em **`public/brand/`** e **`public/images/`** (não `public/assets/brand`).

| Arquivo | Uso sugerido |
|---------|----------------|
| `logo-knot-icon.png` | Header, footer, favicon circular |
| `logo-knot-circle-dark.png` | Destaque Sobre, vitrines |
| `logo-bricrise-horizontal.jpg` | Lockup horizontal |
| `logo-knot-mark-minimal.png` | Watermark, fundos sutis |
| `logo-bricrise-dark.png` / `logo-bricrise-stacked-serif-dark.png` | Fundos escuros |
| `brand-kit-sheet.png` | Referência interna de identidade |
| `public/images/whatsapp.svg` | Ícone WhatsApp na UI |

Diretrizes: não distorcer proporção do nó; preferir fundos `#F7F8F3` ou `#F2F2F0`; manter contraste mínimo WCAG AA em textos `#735E53` sobre fundos claros.

## Motion e superfícies

- Glass header: `backdrop-blur-md` + borda `#D9C9BA/50`.
- Cards editoriais: `rounded-3xl`, borda bege, sombra terrosa leve.
- Animações contínuas: `transform-gpu` e `will-change-transform` no fio global (`WanderingYarnScroll`).

## Internacionalização visual

Copy e rótulos de UI vêm de `src/content/locales/`. Cores e tokens não mudam entre PT-BR e EN-US.