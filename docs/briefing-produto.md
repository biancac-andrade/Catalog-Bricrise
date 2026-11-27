# Briefing de Produto — Bricrisê

## Visão geral

A **Bricrisê** é um ateliê independente que une artesanato têxtil (seda, macramê, pulseiras e colares personalizáveis) à **papelaria afetiva** para fãs — photocards, polaroids, impressões para quadros, adesivos e fotos nos tamanhos combinados. O catálogo digital transmite elegância acolhedora, valoriza o trabalho manual e conduz o cliente à **conversão via WhatsApp** (carrinho com lista + orçamento, sem checkout proprietário).

O produto digital é uma **boutique editorial multi-rota**: páginas dedicadas com narrativa institucional, serviços, tabela de referência e catálogo filtrável, mantendo a camada de dados (Contentful + seed) intacta para evolução incremental.

## Pilares de oferta

### Ateliê têxtil (seda, cordão 1 mm e macramê)

Pulseiras, cordões e colares: modelo do catálogo com ajustes ou referências próprias; cartela de cores de seda; miçangas, letras e pingentes. Produção sob medida com acabamento manual.

### Papelaria afetiva

K-Pop, doramas, memes ou memórias em colecionáveis; photocards, polaroids, impressões para quadros, adesivos e tamanhos avulsos. Valores e acabamentos na página **Encomendas**; arquivos e briefing via WhatsApp.

### Dicas de encomenda

Referências abundantes, cores e descrição clara da ideia; envio de fotos como **Documento** no WhatsApp; enquadramento 9:16 quando aplicável.

## Jornada de conversão

```mermaid
flowchart LR
  A[Navegação editorial] --> B[/sobre /servicos /catalogo /encomendas]
  B --> C[Seleção e contexto]
  C --> D[WhatsApp com mensagem contextual]
```

1. **Descoberta** — Home (hero + duas frentes com véu sobre o fio), Sobre e Serviços (carrossel de 3 abas).
2. **Exploração** — Catálogo com busca, filtros grupo/tema e `ProductCard` com stepper + carrinho.
3. **Lista** — `/carrinho`: revisão, limpar lista, total estimado, WhatsApp.
4. **Referência de preços** — Encomendas com matriz interativa, simulador e aviso de envio (`*** Obs.`).
5. **Fechamento** — WhatsApp com mensagem contextual (produto, carrinho ou encomendas).

## Público e tom

Fãs de K-Pop e doramas, clientes que buscam presentes personalizados e compradores de peças artesanais locais (Sumaré e região). Tom: afetivo, claro, profissional sem frieza corporativa.

## Rotas oficiais (v2)

| Rota | Propósito |
|------|-----------|
| `/` | Hero + frentes do ateliê (`copy.home`) |
| `/carrinho` | Lista de orçamento antes do WhatsApp |
| `/sobre` | História da marca e identidade visual |
| `/servicos` | Carrossel de linhas (têxtil, photocards, dicas de envio) |
| `/catalogo` | Produtos (Contentful ou seed) |
| `/encomendas` | Tabela base e simulador |

## Fora de escopo (dados)

Modelos Contentful (`theme`, `product`), `fetchCatalog`, seed e utilitário `whatsapp.ts` são contratos estáveis: a UI consome, não redefine schemas de backend/CMS.