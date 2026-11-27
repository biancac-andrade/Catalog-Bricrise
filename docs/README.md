# Documentação técnica — Bricrisê

Índice oficial da pasta `/docs`. Especificações de produto, design, arquitetura, testes e fluxo de IA.

## Índice rápido

| Documento | Conteúdo |
|-----------|----------|
| [briefing-produto.md](./briefing-produto.md) | Visão da boutique, jornada WhatsApp, carrinho e v2.1 editorial |
| [design-system-tokens.md](./design-system-tokens.md) | Paleta, tipografia, logos em `public/brand/` |
| [estudo-desenvolvimento-arquitetura.md](./estudo-desenvolvimento-arquitetura.md) | App Router, i18n, `WanderingYarnScroll`, camadas UI |
| [ai-engineering-workflow.md](./ai-engineering-workflow.md) | Engenharia assistida por IA e governança |
| [rules.md](./rules.md) | Code review: TypeScript, ESLint, a11y, código limpo |
| [engineering-prompts.md](./engineering-prompts.md) | Registro de prompts de IA no v2 |

## v2.1 — redação editorial e interações (nov/2025)

Entregas desta fase alinham **copy**, **UI** e **conversão** sem alterar contratos Contentful/WhatsApp de negócio.

### Home (`/`)

| Bloco | Comportamento | Copy |
|-------|----------------|------|
| `HeroSection` | Painel sem borda: `backdrop-blur` + gradiente; legibilidade sobre o fio laranja | `copy.home.hero` (seda, macramê, papelaria, WhatsApp) |
| `HomeFrontsSection` | Dois cards com o mesmo véu; bloco de título centralizado; grid I/II alinhado à esquerda no card | `copy.home.fronts` + links `/catalogo`, `/encomendas`, `/servicos` |

### Serviços (`/servicos`)

Carrossel `ServicesCarousel` com painel translúcido (borda suave no card principal), autoplay 6s (pausa hover/foco), abas + setas + dots.

| Slide | Tag | Conteúdo resumido |
|-------|-----|-------------------|
| 1 | Ateliê têxtil | Catálogo/referências; passos 01–03 (peça, cartela seda, miçangas); sem badge/título redundantes |
| 2 | Papelaria afetiva | Photocards, polaroids, quadros, adesivos; CTA textual para `/encomendas` |
| 3 | Dicas | Briefing (referências, cores, detalhes) + 3 dicas de arquivo/foto; lista em grid numerado alinhado |

Lista numerada: `grid` coluna fixa para `01/02/03` e texto à esquerda (evita “dente” em quebras centralizadas).

### Catálogo e carrinho

| Peça | Rota / arquivo | Notas |
|------|----------------|-------|
| Filtros grupo → tema | `CategoryFilter`, `ThemeFilter`, `categoryFilters.ts` | Contentful `group` + `theme` |
| Carrinho | `CartContext`, `/carrinho`, `CartHeaderIcon` | Lista, stepper no card, WhatsApp com mensagem formatada |
| Mensagem orçamento | `lib/cart/formatCartWhatsAppMessage.ts` | Texto consolidado para WhatsApp |

### Encomendas (`/encomendas`)

| Peça | Notas |
|------|-------|
| `InteractivePriceMatrix` | Tabs editoriais, simulador animado (`order-sim-*` em `globals.css`) |
| `OrdersShippingNotice` | `*** Obs.` em azul, fora do card pesado |

### Footer

- Copyright: `© {ano} Bricrisê.` (sem tagline).
- Copy: `copy.footer.brandName` apenas.

### Internacionalização

Todo texto de UI novo em `src/content/locales/pt-BR.ts` e `en-US.ts`, incluindo bloco `home` e slides `services`.

Componentes de seção consomem `useLocale()`; evitar strings fixas em JSX (exceto testes e aria bilíngue pontual no carrossel).

## Testes e cobertura

| Comando | Função |
|---------|--------|
| `npm run test` | Vitest — suíte completa |
| `npm run test:coverage` | Cobertura **100%** (statements, branches, functions, lines) nos módulos v2.1 abaixo |

Módulos com gate 100% em `vitest.config.ts`:

- `src/components/services/ServicesCarousel.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/HomeFrontsSection.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/orders/OrdersShippingNotice.tsx`

Testes associados: `*.test.tsx` espelhados em cada pasta. Demais specs do repo (catálogo, locale, yarn, metadata) rodam em `npm run test` e mantêm regressão do v2.0.

## Código limpo (regras aplicadas)

- TypeScript `strict`; props `Readonly` onde aplicável.
- Sem comentários óbvios no código; nomes e estrutura explicam intenção.
- `'use client'` só em componentes com estado, locale ou motion.
- Painéis “véu”: `bg-[#F7F8F3]/40–48`, `backdrop-blur`, gradiente radial; home sem borda, carrossel com borda leve opcional.

## Ponteiros legados

- `src/docs/briefing.md` e `src/docs/design-tokens.md` → canônicos nesta pasta.
- Hero ativo: `HeroSection.tsx` + copy `home.hero`.

## Repositório

https://github.com/biancac-andrade/Catalog-Bricrise