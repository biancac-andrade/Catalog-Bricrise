# Bricrisê — catálogo

Site do catálogo da **Bricrisê** (pulseiras e peças em macramê). Lista produtos por tema, com link para WhatsApp e estado **disponível / esgotado**.

## O que usa

- **Next.js 16** (App Router) + **React** + **Tailwind CSS**
- **Contentful** como CMS — produtos, fotos, preços e disponibilidade geridos em [app.contentful.com](https://app.contentful.com)
- Fallback local em `data/catalog.seed.ts` quando Contentful não está configurado

---

## 1. Conta e espaço no Contentful

1. Cria conta gratuita em [contentful.com](https://www.contentful.com).
2. Cria um **Space** (espaço) novo — nome livre, ex.: `bricrise`.

---

## 2. Modelo de conteúdo

Em **Content model → + Create content type**, usa **três** tipos com os **API identifiers** exatos abaixo (ordem sugerida: `group` → `theme` → `product`).

### 2.1 `group` — Grupo (Ateliê / Papelaria)

| Field ID | Tipo | Notas |
|----------|------|-------|
| `title` | Short text | Marca como **Entry title**; ex.: `Ateliê Criativa` |
| `slug` | Short text | Aparência **Slug**; ex.: `atelie` |
| `key` | Short text | **`atelie`** ou **`papelaria`** (chave usada no site) |

Cria **duas** entradas publicadas: Ateliê (`key: atelie`) e Papelaria (`key: papelaria`).

### 2.2 `theme` — Tema (subcategoria / linha)

| Field ID | Tipo | Notas |
|----------|------|-------|
| `title` | Short text | Marca como **Entry title** |
| `slug` | Short text | Aparência **Slug**; ex.: `copa` |
| `group` | **Reference** | Aceita só o content type **`group`** |
| `groupKey` | Short text | (opcional legado) ex.: `pulseiras` |
| `groupTitle` | Short text | (opcional legado) ex.: `Pulseiras` |

### 2.3 `product` — Produto

| Field ID | Tipo | Notas |
|----------|------|-------|
| `title` | Short text | Marca como **Entry title** |
| `slug` | Short text | Aparência **Slug** |
| `price` | **Integer** | Preço em R$ sem decimais |
| `image` | **Media** (File) | Uma imagem por produto |
| `theme` | **Reference** | Aceita só o content type `theme` |
| `available` | **Boolean** | Desmarcado = esgotado no site |

> Ordem: **Grupos** → **Temas** (com referência ao grupo) → **Produtos** (referência ao tema).

---

## 3. Fazer upload de imagens em lote

1. Vai a **Media → Add assets → Upload files**.
2. Seleciona todas as fotos de uma vez.
3. Publica todos os assets (**Publish all**).
4. Ao criar cada produto, escolhes a foto já carregada na biblioteca.

---

## 4. Criar entradas de Grupo e Tema

**Content → Add entry → Grupo** (duas entradas):

| Título | Slug | key |
|--------|------|-----|
| Ateliê Criativa | `atelie` | `atelie` |
| Papelaria Criativa | `papelaria` | `papelaria` |

**Content → Add entry → Tema**, preenche:

| Campo | Exemplo Copa | Exemplo KPOP |
|-------|-------------|--------------|
| Titulo | `Copa` | `KPOP` |
| Slug | `copa` | `kpop` |
| **Grupo (Reference)** | Ateliê Criativa | Papelaria Criativa |
| Chave do grupo (opcional) | `pulseiras` | `photocards` |
| Titulo do Grupo (opcional) | `Pulseiras` | `Photocards` |

Clica **Publish** em cada tema. Temas **sem** referência a grupo continuam visíveis só em **Todos** no site.

---

## 5. Criar entradas de Produto

**Content → Add entry → Produto**, preenche todos os campos e clica **Publish**.

- **Available** ligado = disponível; desligado = aparece como "Esgotado" no site (sem precisar apagar o produto).
- Para marcar como vendido depois: abre o produto → desliga **Available** → **Publish**.

---

## 6. API keys

**Settings → API keys → Add API key** (ou usa a existente):

| Campo no Contentful | Variável no `.env` |
|---------------------|-------------------|
| Space ID | `CONTENTFUL_SPACE_ID` |
| Content Delivery API – access token | `CONTENTFUL_ACCESS_TOKEN` |

> Usa sempre o token da **Content Delivery API** (leitura de conteúdo publicado), não o de Preview.

---

## 7. Configuração local

```bash
npm install
cp .env.example .env
```

Preenche o `.env`:

```env
CONTENTFUL_SPACE_ID=SEU_SPACE_ID
CONTENTFUL_ACCESS_TOKEN=SEU_TOKEN
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_LOCALE=en-US
```

> **Locale:** vai a *Settings → Locales* no Contentful e usa o código que lá aparece (`en-US` por defeito, ou `pt-BR` se configurares).

Corre o site:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## 8. Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Site local → [http://localhost:3000](http://localhost:3000) |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | ESLint |

---

## 9. Deploy em produção (Vercel)

1. Liga o repositório Git (GitHub/GitLab) em [vercel.com](https://vercel.com) → **Import Project**.
2. Framework: **Next.js** (detectado automaticamente).
3. Em **Settings → Environment Variables**, adiciona:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
   - `CONTENTFUL_ENVIRONMENT` = `master`
   - `CONTENTFUL_LOCALE` = `en-US` (ou o teu locale)
4. Clica **Deploy**.

A página revalida automaticamente a cada **2 minutos** — alterações publicadas na Contentful aparecem no site sem redeploy completo.

---

## 10. Estrutura do projeto

> **Nota — estrutura v1 obsoleta:** a tabela abaixo descreve o layout **single-page** inicial (`app/` na raiz). A aplicação atual é **v2** em [`src/app/`](./src/app/) — ver [Guia v2](#guia-de-instalação-scripts-e-padrões-de-código-v2) e [estudo de arquitetura](./docs/estudo-desenvolvimento-arquitetura.md).

| Caminho | Função |
|---------|--------|
| `app/layout.tsx` | Entrada Next: estilos globais + reexport de metadata e layout |
| `app/config/layout/` | Componente raiz (`RootLayout`, fontes Glacial Indifference) |
| `app/config/metadata/` | Metadados SEO (título, descrição) |
| `app/styles/globals.css` | Tailwind + tokens de cor da marca |
| `app/page.tsx` | Rota `/`: página inicial + `revalidate` (ISR) |
| `app/components/` | Componentes por pasta (`CatalogView/`, `SiteHeader/`, …) |
| `app/components/CatalogView/CatalogView.types.ts` | Tipos do catálogo (tema, produto, dados); reexportados em `CatalogView/index.ts` |
| `lib/utils/` | Funções utilitárias (ex.: links WhatsApp) |
| `lib/contentful/` | Cliente, env, `fetchCatalog` (com fallback para seed) e mapeamento API → modelos do site |
| `hooks/` | Custom hooks React (vazio até precisares de um) |
| `data/catalog.seed.ts` | Dados de exemplo (fallback sem Contentful) |
| `.env.example` | Modelo de variáveis de ambiente |

---

## Documentação externa

- [Next.js](https://nextjs.org/docs)
- [Contentful](https://www.contentful.com/developers/docs/)

---

## Registro de atualização e changelog

Repositório: [biancac-andrade/Catalog-Bricrise](https://github.com/biancac-andrade/Catalog-Bricrise)

| Versão | Data | Objetivo | Status |
|--------|------|----------|--------|
| **v1.0** | 2024–2025 | Catálogo single-page, integração Contentful, estrutura inicial documentada nas seções 1–10 deste README | Entregue (legado) |
| **v2.0** | 2025-11-24 | Boutique editorial **multi-rota** (`/sobre`, `/servicos`, `/catalogo`, `/encomendas`), animação global `WanderingYarnScroll` (scroll + autoplay em viewports curtas), **PT-BR / EN-US** via `src/content/locales/`, layout `ViewportShell` 100vh, documentação modular em `/docs` | Entregue |
| **v2.1** | 2025-11-26 | Copy/carrossel de **Serviços** (3 abas), home com **`copy.home`** e painéis blur, **carrinho** `/carrinho`, filtros grupo/tema, encomendas editoriais, footer só copyright; testes com **100%** nos módulos UI v2.1 (`npm run test:coverage`) | Em curso |

As seções **1 a 10** acima permanecem como referência histórica (Contentful, deploy, estrutura v1). A implementação atual vive em **`src/app`** e componentes em **`src/components`** (ver [estudo de arquitetura](./docs/estudo-desenvolvimento-arquitetura.md)).

---

## IA no ciclo de vida do projeto (AI-Driven Development)

O desenvolvimento v2 foi conduzido com **assistentes de IA no Cursor**, sob regras explícitas de integridade de dados e code review estrito.

- **Produto e copy:** briefing editorial, carrossel de serviços, página Sobre e footer bilíngue gerados e refinados em `src/content/locales/`.
- **Arquitetura:** migração para rotas dedicadas, shell viewport, contexto de locale e scroll container.
- **Qualidade:** TypeScript `strict`, ESLint React 19, testes Vitest; diretrizes em [`docs/rules.md`](./docs/rules.md).
- **Documentação:** auditoria e criação de especificações em [`/docs`](./docs/README.md).

Detalhes do fluxo: [`docs/ai-engineering-workflow.md`](./docs/ai-engineering-workflow.md).

---

## Mapa da documentação técnica (`/docs`)

| Documento | Descrição |
|-----------|-----------|
| [`docs/README.md`](./docs/README.md) | Índice da pasta |
| [`docs/briefing-produto.md`](./docs/briefing-produto.md) | Briefing de produto e jornada de conversão |
| [`docs/design-system-tokens.md`](./docs/design-system-tokens.md) | Tokens de cor, tipografia e logos |
| [`docs/estudo-desenvolvimento-arquitetura.md`](./docs/estudo-desenvolvimento-arquitetura.md) | Arquitetura Next.js, animação do fio, i18n |
| [`docs/ai-engineering-workflow.md`](./docs/ai-engineering-workflow.md) | Engenharia assistida por IA |
| [`docs/rules.md`](./docs/rules.md) | Padrões de code review |

Resumos legados (não canônicos): `src/docs/briefing.md`, `src/docs/design-tokens.md`.

---

## Guia de instalação, scripts e padrões de código (v2)

### Pré-requisitos

- Node.js 20+
- npm (padrão do repo) ou pnpm/yarn equivalentes

### Setup

```bash
git clone https://github.com/biancac-andrade/Catalog-Bricrise.git
cd Catalog-Bricrise
npm install
cp .env.example .env
```

Com **pnpm**: `pnpm install` · com **yarn**: `yarn install`.

Configure Contentful conforme as seções **1–7** deste README, ou use apenas o seed local.

### Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Desenvolvimento → [http://localhost:3000](http://localhost:3000) |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (run once) |
| `npm run test:coverage` | Vitest + cobertura 100% nos módulos v2.1 (`vitest.config.ts`) |
| `npm run test:watch` | Vitest em modo watch |

### Estrutura v2 (referência rápida)

| Caminho | Função |
|---------|--------|
| `src/app/` | Rotas App Router, `layout.tsx`, ISR |
| `src/components/` | UI (layout, sections, catalog, services) |
| `src/content/locales/` | Copy PT-BR e EN-US |
| `src/context/` | `LocaleProvider`, scroll container |
| `src/hooks/useYarnProgress.ts` | Progresso do fio (scroll + autoplay) |
| `lib/contentful/` | Cliente e `fetchCatalog` |
| `data/catalog.seed.ts` | Fallback sem CMS |
| `public/brand/` | Logos e brand kit |

### Contribuição

1. Respeitar contratos de catálogo e `lib/utils/whatsapp.ts` salvo tarefa explícita.
2. Copy novo somente em `src/content/locales/`.
3. Rodar `npm run lint` e `npm run test` antes de abrir PR.
4. Consultar [`docs/rules.md`](./docs/rules.md) para padrões TypeScript, imports e a11y.
