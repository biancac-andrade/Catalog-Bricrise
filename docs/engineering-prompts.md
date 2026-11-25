# Registro de prompts de engenharia (IA)

Prompts consolidados usados no ciclo v2 do Bricrisê. Preservar aqui ao repetir ou evoluir fluxos no Cursor / Antigravity.

---

## Code review estrito (Staff + Mid-Level)

**Objetivo:** review cirúrgico em Next.js App Router, TypeScript strict, Tailwind, Framer Motion.

**Regras resumidas:** sem comentários óbvios; sem `any`; imports ordenados; `src/app` único; a11y em controles; `transform-gpu` em animações contínuas.

**Saída:** por arquivo — (1) visão crítica, (2) reorganização de pastas, (3) código refatorado.

Referência completa: [rules.md](./rules.md).

---

## Organização de PR e Conventional Commits

**Objetivo:** PR limpa e atômica a partir da branch de refatoração, com histórico legível para review.

```text
Atue como Tech Lead Frontend especialista em Git e Conventional Commits.

Organize todas as alterações pendentes da branch de refatoração para submissão de uma nova Pull Request (PR) limpa e atômica.

### Diretrizes de Execução
1. Verifique `git status` e agrupe os arquivos modificados em commits atômicos e lógicos.
2. Não realize commit único massivo (`git add . && git commit -m "update"`).
3. Todas as mensagens devem ser em inglês no padrão Conventional Commits (`type(scope): imperative summary`).
4. Execute as checagens de validação (`pnpm lint` e `pnpm test` ou `pnpm build`) antes de finalizar.

### Roteiro Sequencial de Comandos Git (v2)
1. fix(catalog): resolve render-prop ref leak in ProductQuickView
2. refactor(core): remove legacy root app directory in favor of src/app
3. refactor(animation): extract useYarnProgress hook and streamline autoplay loop
4. refactor(orders): extract OrdersShippingNotice and streamline price matrix
5. refactor(content): prune dead locale keys and enforce stable list identifiers
6. docs(architecture): update version history to v2.0 and document design tokens

Commits adicionais para o restante do tree (App Router pages, design-system, deps, brand assets) — mesmas regras, escopos novos: `feat(app)`, `feat(ui)`, `chore(deps)`, `assets(brand)`.
```

---

## Auditoria README e `/docs`

**Objetivo:** manter README histórico intacto; adicionar changelog v1→v2; criar `briefing-produto`, `design-system-tokens`, `estudo-desenvolvimento-arquitetura`, `ai-engineering-workflow`.

**Governança:** não apagar seções Contentful legadas; marcar estrutura v1 como obsoleta na §10.

---

## Layout viewport + autoplay do fio

**Objetivo:** `ViewportShell` 100vh; scroll no `#app-main-scroll`; `WanderingYarnScroll` com scroll container + autoplay ~2,8s quando não há scroll.

---

## Services carousel editorial

**Objetivo:** coluna única, `renderTrigger`, setas laterais terracota, copy em `useLocale()`, sem abas superiores.

---

## Header ativo + idioma compacto

**Objetivo:** `usePathname` + pill ativo; dropdown PT/EN com `renderTrigger` handlers estáveis.

---

## Limpeza técnica (pipeline)

**Frente 1:** ESLint `ProductQuickView`, remover `app/` raiz, `docs/rules` path aliases.

**Frente 2:** `useYarnProgress`, `OrdersShippingNotice`, prune locale keys, redirects `src/docs/*`.

---

## Suíte de testes (>95% coverage) — Staff QA

```text
Atue como Staff QA Engineer e Lead Frontend Developer especialista em Jest, Vitest,
React Testing Library e Next.js (App Router).

Escreva e atualize a suíte completa de testes unitários e de integração da aplicação
Bricrisê (Next.js + TypeScript + Tailwind + Framer Motion), garantindo cobertura
rigorosa acima de 95% em Statements, Branches, Functions e Lines.

Diretrizes: commits de teste sem comentários óbvios; BDD em inglês; mocks de
usePathname/useRouter, framer-motion, ResizeObserver/matchMedia, localStorage.

Escopo: useYarnProgress, ProductQuickView, ServicesCarousel, InteractivePriceMatrix,
OrdersShippingNotice, isNavActive, LocaleContext.

Validação: pnpm test -- --coverage (no repo: npm run test:coverage).
```

**Papel:** Staff QA Engineer + Lead Frontend (Vitest, React Testing Library, Next.js App Router).

**Meta de cobertura (arquivos críticos):** Statements, Branches, Functions e Lines ≥ 95%.

**Qualidade em testes:** sem comentários óbvios; BDD em inglês — `describe('ComponentOrHookName')` e `it('should … when …')`.

**Mocks determinísticos:**

- Next.js: `usePathname`, `useRouter`, `useSearchParams`
- Framer Motion: render leve sem RAF/GPU; validar `variants` / props quando relevante
- Browser: `ResizeObserver`, `matchMedia`, `resize`
- `localStorage`: valor gravado, nulo, exceção em `getItem`/`setItem`
- `<dialog>`: polyfill `showModal` / `close` em jsdom (`src/test/browserDoubles.ts`)

**Escopo obrigatório:**

| Área | Cenários |
|------|----------|
| `useYarnProgress` | reduced motion; scroll vs autoplay (slop 80px); cleanup em unmount; `pathname` |
| `ProductQuickView` | `renderTrigger`; fechado; `onOpen` / `onClose` |
| `ServicesCarousel` | slide 1; setas; loop; dots |
| `InteractivePriceMatrix` + `OrdersShippingNotice` | abas Simples/Premium/Holográfico/Outros; frete BR + Sumaré |
| `isNavActive` | `/`, aninhadas, `null`, divergentes |
| `LocaleContext` | default `pt-BR`, `localStorage`, troca `en-US`, persistência |

**Validação:**

```bash
npm run test:coverage
# equivalente pnpm: pnpm test -- --coverage
```

Thresholds configurados em `vitest.config.ts` (include dos arquivos acima).

---

Índice geral: [README.md](./README.md) · fluxo IA: [ai-engineering-workflow.md](./ai-engineering-workflow.md).