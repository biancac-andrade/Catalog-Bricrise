export const ptBR = {
  header: {
    nav: {
      about: "Sobre",
      services: "Serviços",
      catalog: "Catálogo",
      orders: "Encomendas",
    },
    mobileMenu: {
      sectionLabel: "Páginas",
      home: "Início",
    },
  },
  footer: {
    tagline: "Feito com carinho no ateliê.",
    brandName: "Bricrisê",
  },
  about: {
    header: {
      kicker: "Sobre",
      title: "Onde o nó vira laço",
    },
    paragraphs: [
      "É com muita alegria que abrimos as portas do nosso ateliê digital!",
      "A Bricrisê nasceu de um encontro de gerações: o cuidado de mãe, a criatividade de filha e a alegria do nosso fiel escudeiro, o Galego.",
      "Por aqui, acreditamos que o artesanato é uma forma de carinho. Cada peça de macramê e cada mimo personalizado que criamos carrega um pouquinho da nossa história e muita dedicação manual.",
    ],
    signature: "Com amor, Bianca, Cristiane & Galego",
  },
  catalog: {
    header: {
      kicker: "Catálogo",
      title: "Catálogo completo",
      subtitle:
        "Busque por nome, filtre por linha e encomende com mensagem já personalizada.",
    },
  },
  services: {
    header: {
      kicker: "Serviços",
      title: "O que criamos no ateliê",
      subtitle:
        "Artesanato têxtil e papelaria personalizada com matérias-primas selecionadas e acabamento manual.",
    },
    slides: [
      {
        id: "linhas-acessorios",
        tag: "Ateliê têxtil",
        badge: "Cordões 1mm & Seda",
        title: "Linhas, Pulseiras & Colares",
        description:
          "Na Bricrisê, a gente acredita que cada acessório conta uma história. Além dos nossos modelos fixos, você pode personalizar a sua peça do jeitinho que imaginou.",
        itemsTitle: "Como personalizar:",
        items: [
          "Escolha o modelo da peça (pulseira, cordão ou colar).",
          "Consulte a cartela de cores de fios de seda disponíveis.",
          "Escolha suas miçangas, pingentes ou letras favoritas.",
        ],
        highlight: "Pronto! Criamos uma peça que é só sua.",
      },
      {
        id: "photocards",
        tag: "Papelaria afetiva",
        badge: "Laminação especial",
        title: "PhotoCards",
        description:
          "Transforme fotos do seu idol favorito de K-Pop, casais de dorama, memes ou memórias inesquecíveis em peças colecionáveis de alta qualidade.",
        itemsTitle: "Formatos e acabamentos disponíveis:",
        items: [
          "Simples (sem plastificação)",
          "Premium (com plastificação para durar muito!)",
          "Holográfico (com aquele brilho incrível!)",
          "Estilo Polaroid (Tradicional e Mini)",
          "Fotos avulsas (3x4 para chaveiro, 10x15 e 20x30)",
        ],
        highlight:
          "Você escolhe as fotos e a gente cuida do acabamento com carinho.",
      },
      {
        id: "dicas-envio",
        tag: "Dicas de produção",
        badge: "Qualidade garantida",
        title: "Dicas & Regras de Envio",
        description:
          "Para garantir que sua encomenda chegue com nitidez máxima e cores vivas, siga as nossas regrinhas práticas:",
        itemsTitle: "Recomendações importantes:",
        items: [
          "Qualidade original: Dê preferência para imagens salvas do Pinterest ou X (Twitter). Evite prints.",
          'Envio no WhatsApp: Mande o arquivo como "Documento" para preservar 100% da resolução.',
          "Enquadramento: Fotos verticais (9:16) com rostos centralizados longe das linhas de corte.",
        ],
        highlight: "Cuidado artesanal do arquivo digital à peça final.",
      },
    ],
  },
  orders: {
    header: {
      kicker: "Encomendas & orçamentos",
      title: "Tabela de valores & personalização",
      subtitle:
        "Simule seus mimos, consulte valores de referência e feche direto no WhatsApp.",
    },
    shipping: {
      label: "Obs.",
      notice:
        "Enviamos com todo amor para todo o Brasil via Correios! Retirada em Sumaré e região, entrega somente pelos Correios ou por aplicativos como 99 e Uber — consulte valores e prazos no WhatsApp.",
    },
    calculator: {
      label: "Simule sua encomenda",
      quantity: "Quantidade",
      estimate: "Estimativa",
      selectItem: "Toque em um item para calcular o total.",
    },
    priceTabs: {
      simples: "Simples",
      premium: "Premium",
      holografico: "Holográfico",
      outros: "Outros",
    },
    priceCategories: {
      simples: {
        label: "Photocard simples",
        items: [
          { name: "Tradicional (com verso)", price: "R$ 2,50", unit: 2.5 },
          { name: "Tradicional (sem verso)", price: "R$ 1,50", unit: 1.5 },
          { name: "Mini (com verso)", price: "R$ 2,00", unit: 2 },
          { name: "Mini (sem verso)", price: "R$ 1,00", unit: 1 },
          { name: "Folha A4 — 10 un. (com verso)", price: "R$ 20,00", unit: 20 },
          { name: "Folha A4 — 10 un. (sem verso)", price: "R$ 10,00", unit: 10 },
        ],
      },
      premium: {
        label: "Photocard premium (plastificado)",
        items: [
          { name: "Tradicional (com verso)", price: "R$ 3,50", unit: 3.5 },
          { name: "Tradicional (sem verso)", price: "R$ 2,50", unit: 2.5 },
          { name: "Mini (com verso)", price: "R$ 3,00", unit: 3 },
          { name: "Mini (sem verso)", price: "R$ 2,00", unit: 2 },
          { name: "Folha A4 — 10 un. (com verso)", price: "R$ 30,00", unit: 30 },
          { name: "Folha A4 — 10 un. (sem verso)", price: "R$ 20,00", unit: 20 },
        ],
      },
      holografico: {
        label: "Holográfico (especial)",
        items: [
          { name: "Tradicional (com verso)", price: "R$ 5,00", unit: 5 },
          { name: "Tradicional (sem verso)", price: "R$ 4,50", unit: 4.5 },
          { name: "Folha A4 — 10 un. (com verso)", price: "R$ 45,00", unit: 45 },
          { name: "Folha A4 — 10 un. (sem verso)", price: "R$ 40,00", unit: 40 },
        ],
      },
      outros: {
        label: "Fotos & formatos avulsos",
        items: [
          { name: "Estilo polaroid", price: "R$ 3,00", unit: 3 },
          { name: "Foto 3x4 (para chaveiro fotográfico)", price: "R$ 2,00", unit: 2 },
          { name: "Foto 10x15 cm", price: "R$ 7,00", unit: 7 },
          { name: "Foto 20x30 cm", price: "R$ 9,00", unit: 9 },
        ],
      },
    },
  },
} as const;

export type PtBRLocale = typeof ptBR;
export type PriceCategoryKey = keyof typeof ptBR.orders.priceCategories;