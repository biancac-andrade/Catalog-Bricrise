# Vercel Web Analytics — Bricrisê

Coleta **visitantes**, **page views** e **páginas mais acessadas** em produção, sem Google Analytics e sem cookies pesados.

## O que está no código

| Peça | Caminho |
|------|---------|
| Pacote | `@vercel/analytics` (`package.json`) |
| Componente | `src/components/layout/SiteAnalytics.tsx` |
| Montagem | `src/app/layout.tsx` (final do `<body>`) |

O script **só envia dados em deploys na Vercel** (produção e previews conforme política do plano). Em `npm run dev` local não aparece tráfego no painel.

## Ativar no painel (uma vez)

1. [Vercel](https://vercel.com) → projeto **catalog-bricrise**.
2. Aba **Analytics** → **Web Analytics** → **Enable**.
3. Garanta que a `main` já incluiu o commit com `SiteAnalytics` (deploy concluído).
4. Abra o **site de produção**, navegue em 2–3 páginas; aguarde ~30s.
5. Volte em **Analytics** e escolha o período (ex.: *Last 7 Days* ou *Last 24 Hours*).

## O que você consegue analisar

| Métrica | Uso |
|---------|-----|
| **Visitors** | Pessoas únicas no período (aprox. “acessos” do dia, ao filtrar 24h) |
| **Page views** | Total de carregamentos de página |
| **Top pages** | Rotas mais visitadas: `/`, `/catalogo`, `/servicos`, `/encomendas`, `/carrinho` |
| **Referrers / país / dispositivo** | De onde vem o tráfego (Instagram, link direto, etc.) |

**Limitação:** não mostra *clique por botão* (WhatsApp, carrinho). Para isso, no futuro: eventos customizados ou ferramenta de heatmap (ex. Microsoft Clarity).

## Rotas do catálogo (referência)

| Rota | Conteúdo |
|------|----------|
| `/` | Home |
| `/catalogo` | Catálogo |
| `/servicos` | Serviços |
| `/encomendas` | Encomendas |
| `/carrinho` | Carrinho |
| `/sobre` | Sobre |

Page views são registradas por URL; troca de idioma na mesma rota conta como nova interação na mesma página.

## Privacidade (LGPD)

Web Analytics da Vercel é pensado para ser leve e sem identificação direta do visitante. Mesmo assim, para uma vitrine comercial, mantenha na página **Sobre** ou futura política de privacidade um parágrafo informando uso de métricas agregadas de acesso.

## Operação

| Ação | Comando / lugar |
|------|-----------------|
| Validar build após mudança | `npm run build` |
| Ver dados | Vercel → Analytics (não o dashboard de Deployments) |
| Plano Hobby | Cota mensal de eventos — suficiente para vitrine pequena/média |

## Próximos passos (opcional)

- **Speed Insights** (`@vercel/speed-insights`) — performance, não audiência.
- **Eventos** (`track()` do mesmo pacote) — ex.: “adicionou ao carrinho”, se precisar funil além de page views.