# Briefing de Produto — Bricrisê

## Visão geral

A **Bricrisê** é um ateliê independente que une artesanato têxtil (macramê, pulseiras e acessórios em cordão 1 mm) à **papelaria afetiva** voltada a fandoms — photocards, polaroids e impressões com laminação profissional. O catálogo digital transmite elegância acolhedora, valoriza o trabalho manual e conduz o cliente à **conversão via WhatsApp**, sem checkout proprietário.

O produto digital é uma **boutique editorial multi-rota**: páginas dedicadas com narrativa institucional, serviços, tabela de referência e catálogo filtrável, mantendo a camada de dados (Contentful + seed) intacta para evolução incremental.

## Pilares de oferta

### Ateliê Macramê (cordões 1 mm e fios de seda)

Pulseiras, colares e peças personalizáveis: escolha de modelo, paleta de cores, miçangas, letras e pingentes. Produção sob medida com acabamento manual.

### Papelaria afetiva / Photocards

Photocards para K-Pop, doramas e memórias pessoais; formatos simples, premium laminado, holográfico, estilo Polaroid e fotos avulsas (3×4, 10×15, 20×30). O cliente envia arquivos em alta resolução; o ateliê cuida da impressão e do acabamento.

## Jornada de conversão

```mermaid
flowchart LR
  A[Navegação editorial] --> B[/sobre /servicos /catalogo /encomendas]
  B --> C[Seleção e contexto]
  C --> D[WhatsApp com mensagem contextual]
```

1. **Descoberta** — Home, Sobre e Serviços (carrossel editorial) apresentam a marca e as linhas.
2. **Exploração** — Catálogo com busca, filtros (macramê / papelaria) e cards de produto.
3. **Referência de preços** — Encomendas com matriz interativa e aviso de envio (Correios, retirada, apps).
4. **Fechamento** — Ícone e CTAs de WhatsApp com mensagem pré-preenchida; catálogo inclui nome/ID do produto quando aplicável.

## Público e tom

Fãs de K-Pop e doramas, clientes que buscam presentes personalizados e compradores de peças artesanais locais (Sumaré e região). Tom: afetivo, claro, profissional sem frieza corporativa.

## Rotas oficiais (v2)

| Rota | Propósito |
|------|-----------|
| `/` | Hero + frentes do ateliê |
| `/sobre` | História da marca e identidade visual |
| `/servicos` | Carrossel de linhas (têxtil, photocards, dicas de envio) |
| `/catalogo` | Produtos (Contentful ou seed) |
| `/encomendas` | Tabela base e simulador |

## Fora de escopo (dados)

Modelos Contentful (`theme`, `product`), `fetchCatalog`, seed e utilitário `whatsapp.ts` são contratos estáveis: a UI consome, não redefine schemas de backend/CMS.