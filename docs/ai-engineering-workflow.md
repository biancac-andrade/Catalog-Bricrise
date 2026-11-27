# Fluxo de engenharia com IA (AI-Driven Development)

Este documento descreve como ferramentas de IA (Cursor, agentes com contexto de repositório) foram incorporadas ao ciclo de vida do catálogo Bricrisê, sem substituir revisão humana nem contratos de dados.

## Objetivos do uso de IA

1. Acelerar iterações de UI editorial mantendo **regras de integridade** (Contentful, seed, `whatsapp.ts` intocados).
2. Padronizar **TypeScript estrito**, layout App Router e padrões Tailwind/Framer.
3. Produzir e revisar **copy bilíngue** em arquivos dedicados (`src/content/locales/`).
4. Documentar decisões em `/docs` para onboarding e governança.

## Fases do ciclo

| Fase | Entrada | Saída | Papel da IA |
|------|---------|--------|-------------|
| Produto | Briefing Instagram, nomenclatura de menu | `briefing-produto.md`, rotas v2 | Síntese de IA, validação humana |
| Arquitetura | Single-page → multi-rota | `ViewportShell`, i18n, animação global | Proposta de estrutura + diff revisado |
| Implementação | Prompts com restrições | Componentes `src/components/*` | Geração assistida, lint/test local |
| Code review | Diff + `docs/rules.md` | Lista de riscos e refactors | Reviewer agent (tipagem, a11y, duplicação) |
| Documentação | Estado atual do repo | README + `/docs` | Auditoria e changelog preservando histórico |

## Regras de arquitetura (governança)

Consolidadas em `docs/rules.md` e espelhadas em conversas com o agente:

- Sem comentários óbvios no código; nomes declarativos.
- Props e eventos tipados; sem `any`.
- Ordem de imports e separação `'use client'` / server components.
- Performance: `transform-gpu` em animações de viewport; evitar re-renders desnecessários.

## Copy e i18n assistidos

- Textos institucionais, serviços, encomendas e footer nascem em **pt-BR** e são espelhados em **en-US**.
- Preços permanecem em BRL no inglês (regra de negócio).
- UI lê sempre `useLocale().copy`; evitar strings hardcoded em componentes (exceções em testes e aria genéricos bilíngues).

## Limitações e responsabilidade humana

- IA **não** publica secrets, não faz push force, não altera `.env` sem pedido.
- Decisões de marca (tom, fotos finais, Instagram oficial) validadas pela equipe Bricrisê.
- Testes (`vitest`) e `npm run build` são gate antes de merge.

## Ferramentas

- **Cursor** — IDE, agente, rules/skills do projeto.
- **GitHub** — [Catalog-Bricrise](https://github.com/biancac-andrade/Catalog-Bricrise)
- Referência de review: prompts de Staff Engineer + Mid-Level Reviewer (ver `docs/rules.md`).

## Evolução

Novas automações (CI, preview deploy, Sonar) devem estender este fluxo sem duplicar documentação: atualizar este arquivo e o changelog no `README.md`.