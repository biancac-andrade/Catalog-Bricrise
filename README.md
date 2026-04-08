# Bricrisê — catálogo

Site do catálogo da **Bricrisê** (pulseiras e peças em crochê/macramê). Lista produtos por tema, com link para WhatsApp e estado **disponível / esgotado**.

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

Em **Content model → + Create content type**, cria **dois** tipos com os **API identifiers** exatos abaixo.

### 2.1 `theme` — Tema

| Field ID | Tipo | Notas |
|----------|------|-------|
| `title` | Short text | Marca como **Entry title** |
| `slug` | Short text | Aparência **Slug**; ex.: `copa` |
| `groupKey` | Short text | ex.: `pulseiras` |
| `groupTitle` | Short text | ex.: `Pulseiras` (aparece no menu do site) |

### 2.2 `product` — Produto

| Field ID | Tipo | Notas |
|----------|------|-------|
| `title` | Short text | Marca como **Entry title** |
| `slug` | Short text | Aparência **Slug** |
| `price` | **Integer** | Preço em R$ sem decimais |
| `image` | **Media** (File) | Uma imagem por produto |
| `theme` | **Reference** | Aceita só o content type `theme` |
| `available` | **Boolean** | Desmarcado = esgotado no site |

> Cria primeiro os **Temas**, depois os **Produtos** (o campo Reference precisa do tema já existir).

---

## 3. Fazer upload de imagens em lote

1. Vai a **Media → Add assets → Upload files**.
2. Seleciona todas as fotos de uma vez.
3. Publica todos os assets (**Publish all**).
4. Ao criar cada produto, escolhes a foto já carregada na biblioteca.

---

## 4. Criar entradas de Tema

**Content → Add entry → Tema**, preenche:

| Campo | Exemplo Copa | Exemplo Variadas |
|-------|-------------|-----------------|
| Titulo | `Copa` | `Variadas` |
| Slug | `copa` | `variadas` |
| Chave do grupo | `pulseiras` | `pulseiras` |
| Titulo do Grupo | `Pulseiras` | `Pulseiras` |

Clica **Publish** em cada tema.

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

| Caminho | Função |
|---------|--------|
| `app/` | Páginas e componentes React |
| `app/components/CatalogView.tsx` | Grelha de produtos + filtros por tema |
| `app/components/ProductCard.tsx` | Cartão de produto (foto, preço, WhatsApp, esgotado) |
| `app/components/SiteHeader.tsx` | Cabeçalho com logo e botão WhatsApp |
| `lib/contentful/` | Cliente Contentful e variáveis de ambiente |
| `lib/catalog/` | `fetchCatalog` e mapeamento Contentful → tipos do site |
| `lib/whatsapp.ts` | Geração de links `wa.me` |
| `data/catalog.seed.ts` | Dados de exemplo (fallback sem Contentful) |
| `.env.example` | Modelo de variáveis de ambiente |

---

## Documentação externa

- [Next.js](https://nextjs.org/docs)
- [Contentful](https://www.contentful.com/developers/docs/)
