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

```text
Atue como Tech Lead Frontend especialista em Git e Conventional Commits.

Organize alterações pendentes em commits atômicos (não um único git add .).
Mensagens em inglês: type(scope): imperative summary.

Roteiro típico:
1. fix(catalog): ProductQuickView render-prop
2. refactor(core): remove legacy app/
3. refactor(animation): useYarnProgress
4. refactor(orders): OrdersShippingNotice
5. refactor(content): locale pruning
6. docs(architecture): README + /docs

Validar lint e test antes de push.
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

Índice geral: [README.md](./README.md) · fluxo IA: [ai-engineering-workflow.md](./ai-engineering-workflow.md).