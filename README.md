# Bricrisê — catálogo

Site do catálogo da **Bricrisê** (pulseiras e peças em crochê/macramê). Lista produtos por tema, com link para WhatsApp e estado **disponível / esgotado**.

## O que usa

- **Next.js** (App Router) + **React** + **Tailwind CSS**
- **Sanity** como CMS: tudo o que é produto, foto, preço e “disponível” editas no **Sanity Studio** (local ou na nuvem)
- Se o Sanity **não** estiver configurado ou o fetch falhar, o site usa dados de exemplo em `data/catalog.seed.ts`

## O que precisas

- **Node.js** (LTS recomendado) e **npm**
- Conta em [sanity.io](https://www.sanity.io) e um **projeto** com dataset (geralmente `production`)
- Para **importar** produtos a partir de JSON: token de API Sanity com permissão **Editor** (só no teu computador — nunca no site em produção)

## Configuração inicial

```bash
npm install
cp .env.example .env
```

Edita o `.env` e preenche pelo menos:

| Variável | Onde obter |
|----------|------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | [sanity.io/manage](https://www.sanity.io/manage) → projeto → Project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Normalmente `production` |

Opcional no `.env` (só para `npm run import:sanity`):

| Variável | Uso |
|----------|-----|
| `SANITY_API_WRITE_TOKEN` | Token com role **Editor** (API → Tokens). **Não** uses prefixo `NEXT_PUBLIC_`. |

## Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Site em desenvolvimento → [http://localhost:3000](http://localhost:3000) |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build (depois de `build`) |
| `npm run lint` | ESLint |
| `npm run studio` | Sanity Studio local → [http://localhost:3333](http://localhost:3333) (lê `.env` e espelha `NEXT_PUBLIC_*` → `SANITY_STUDIO_*`) |
| `npm run studio:deploy` | Publica o Studio em `https://<hostname>.sanity.studio` (primeira vez: `npx sanity login`) |
| `npm run import:sanity` | Importa `data/sanity-catalog.json` para o Sanity (precisa de `SANITY_API_WRITE_TOKEN`) |

Argumentos extra para o deploy, por exemplo:

```bash
npm run studio:deploy -- --url meu-catalogo --yes
```

## Conteúdo: Studio vs import JSON

- **Dia a dia:** abre o Studio (local ou hospedado), cria/edita **Produtos** e **Temas**, marca **Disponível para venda** ou não, publica alterações.
- **Import em massa:** copia `data/sanity-catalog.example.json` para `data/sanity-catalog.json`, edita caminhos de `image` e dados, corre `npm run import:sanity`. O ficheiro `sanity-catalog.json` está no `.gitignore` para não ir parar ao Git com dados locais.

## Produção (ex.: Vercel)

1. Liga o repositório Git à Vercel (ou outro host compatível com Next.js).
2. Nas **variáveis de ambiente** do projeto, define `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` (igual ao `.env`).
3. **Não** coloques `SANITY_API_WRITE_TOKEN` no ambiente do site público.
4. A página inicial usa **revalidação** (~2 minutos): alterações no Sanity aparecem no ar sem precisares de redeploy só por causa disso (pode haver um pequeno atraso).

## Estrutura útil

| Caminho | Função |
|---------|--------|
| `app/` | Páginas e componentes do site |
| `sanity/schemaTypes/` | Modelos **Tema** e **Produto** no CMS |
| `lib/catalog/` | Busca do catálogo e mapeamento Sanity → UI |
| `lib/sanity/` | Cliente GROQ e URLs de imagem |
| `scripts/` | Arranque do Studio, deploy do Studio, import JSON |
| `data/catalog.seed.ts` | Dados locais quando não há Sanity |
| `public/images/` | Logo e assets estáticos |
| `.env.example` | Modelo de variáveis de ambiente |

## Documentação externa

- [Next.js](https://nextjs.org/docs)
- [Sanity](https://www.sanity.io/docs)
