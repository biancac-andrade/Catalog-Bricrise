# Estudo de desenvolvimento e arquitetura

## Stack

- **Next.js 16** App Router (`src/app/`)
- **React 19**, **TypeScript** (`strict`)
- **Tailwind CSS 4** (`src/app/globals.css`)
- **Framer Motion** — carrosséis, drawer, fio global
- **Contentful** — catálogo com fallback `data/catalog.seed.ts`
- **Vitest** + Testing Library — testes de componentes e metadata

## Evolução arquitetural

| Marco | Modelo | Observação |
|-------|--------|------------|
| v1.0 | Single-page com âncoras | Legado documentado no README original |
| v2.0 | Multi-rota editorial | `src/app`: `/`, `/sobre`, `/servicos`, `/catalogo`, `/encomendas` |

### Layout global (`ViewportShell`)

- `h-screen` no shell; scroll confinado a `#app-main-scroll`.
- Header e footer sempre visíveis em viewports curtas; conteúdo centralizado com `min-h-full` + `justify-center` quando cabe na tela.
- `ScrollContainerContext` expõe o ref do `<main>` para animações e bloqueio de scroll no menu mobile.

### Camadas

```
src/app/                 Rotas e metadata
src/components/          UI (layout, sections, catalog, services, orders, cart)
src/content/locales/     Copy PT-BR e EN-US (dicionários puros, incl. home)
src/context/             LocaleProvider, CartProvider, scroll container
src/types/               Tipos de domínio (ex.: cart)
lib/cart/                Formatação de mensagem WhatsApp do carrinho
lib/contentful/          Integração CMS (inalterada contratualmente)
lib/navigation/          Utilitários de rota ativa
data/catalog.seed.ts     Fallback local
public/brand/            Ativos de marca
```

### UI editorial v2.1

- **Véu legível:** `backdrop-blur` + fundo semitransparente + gradiente radial em hero, frentes da home e carrossel de serviços (contraste com `WanderingYarnScroll`).
- **Serviços:** listas numeradas em CSS grid (coluna de índice + texto alinhado à esquerda).
- **Home:** cards I/II com CTAs para catálogo, encomendas e link central para serviços.

## `WanderingYarnScroll.tsx` e `useYarnProgress`

Progresso em `src/hooks/useYarnProgress.ts`; renderização do fio no componente.

Responsabilidades:

1. Camada **fixed** na viewport (`z-10`), abaixo do conteúdo (`z-20`) e acima do fundo.
2. **Progresso do traço** ligado ao scroll do `<main>` via `useScroll({ container })` em páginas longas (ex.: catálogo).
3. **Auto-play** (~2,8 s, `easeInOut`) quando `scrollHeight ≤ clientHeight + 80px` — novelo gira (`1080deg`) e o traço laranja preenche até a agulha.
4. Recalcula modo em `resize`, `ResizeObserver` no main e mudança de rota (`usePathname`).
5. `prefers-reduced-motion`: traço completo, sem rotação animada.

Geometria: `src/components/animations/wanderingYarnPath.ts` (viewBox, path `d`, origem do novelo, transform da agulha).

## Internacionalização

- Tipos: `LocaleId`, `LocaleCopy` em `src/content/index.ts`.
- Consumo na UI: `useLocale()` (`copy`, `primaryNav`, `setLocale`).
- Persistência: `localStorage` (`bricrise-locale`); `document.documentElement.lang` atualizado no client.
- **Não** alterar schemas de produto nem mensagens WhatsApp de negócio em `lib/utils/whatsapp.ts` sem alinhamento explícito.

## Testes e qualidade

- `npm run test` — Vitest (suíte completa: home, serviços, carrinho, catálogo, locale, yarn, metadata).
- `npm run test:coverage` — threshold **100%** nos módulos v2.1 listados em `vitest.config.ts` (`HeroSection`, `HomeFrontsSection`, `Footer`, `ServicesCarousel`, `OrdersShippingNotice`).
- `npm run lint` — ESLint (incl. regras React 19).
- ISR: `revalidate = 120` nas páginas de catálogo.

## Dívida técnica conhecida

- Cobrir regressões de autoplay vs scroll com E2E (opcional; hoje há testes Vitest em `src/hooks/useYarnProgress.test.tsx`).