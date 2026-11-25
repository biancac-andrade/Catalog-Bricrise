export const enUS = {
  header: {
    nav: {
      about: "About",
      services: "Services",
      catalog: "Catalog",
      orders: "Orders",
    },
    mobileMenu: {
      sectionLabel: "Pages",
      home: "Home",
    },
  },
  footer: {
    tagline: "Made with care in our studio.",
    brandName: "Bricrisê",
  },
  about: {
    header: {
      kicker: "About",
      title: "Where the knot becomes a bow",
    },
    paragraphs: [
      "We’re delighted to open the doors of our digital studio!",
      "Bricrisê was born from generations coming together: a mother’s care, a daughter’s creativity, and the joy of our faithful sidekick, Galego.",
      "Here we believe craft is a form of love. Every macramé piece and every personalized keepsake carries a bit of our story and a lot of handmade dedication.",
    ],
    signature: "With love, Bianca, Cristiane & Galego.",
  },
  catalog: {
    header: {
      kicker: "Catalog",
      title: "Full catalog",
      subtitle: "Search by name, filter by line, and order with a pre-filled message.",
    },
  },
  services: {
    header: {
      kicker: "Services",
      title: "What we make in the studio",
      subtitle:
        "Textile craft and personalized stationery with selected materials and manual finishing.",
    },
    slides: [
      {
        id: "linhas-acessorios",
        tag: "Textile studio",
        badge: "1mm cord & silk",
        title: "Threads, Bracelets & Necklaces",
        description:
          "At Bricrisê we believe every accessory tells a story. Beyond our ready-made designs, you can customize your piece exactly as you imagined.",
        itemsTitle: "How to personalize:",
        items: [
          "Pick the piece (bracelet, cord, or necklace).",
          "Browse our silk thread color chart.",
          "Choose your beads, charms, or letters.",
        ],
        highlight: "Done! We craft a piece that’s uniquely yours.",
      },
      {
        id: "photocards",
        tag: "Heartfelt stationery",
        badge: "Special lamination",
        title: "PhotoCards",
        description:
          "Turn K-Pop idol photos, drama couples, memes, or unforgettable memories into high-quality collectible prints.",
        itemsTitle: "Formats and finishes:",
        items: [
          "Simple (no lamination)",
          "Premium (laminated to last)",
          "Holographic (that stunning shine!)",
          "Polaroid style (traditional & mini)",
          "Loose prints (3x4 keychain, 10x15 and 20x30)",
        ],
        highlight: "You choose the photos — we handle finishing with care.",
      },
      {
        id: "dicas-envio",
        tag: "Production tips",
        badge: "Quality assured",
        title: "Tips & shipping rules",
        description:
          "Follow these practical guidelines so your order arrives with maximum sharpness and vibrant color:",
        itemsTitle: "Important recommendations:",
        items: [
          "Original quality: Prefer images saved from Pinterest or X (Twitter). Avoid screenshots.",
          'WhatsApp upload: Send the file as “Document” to keep full resolution.',
          "Framing: Vertical (9:16) photos with faces centered, away from trim lines.",
        ],
        highlight: "Handmade care from digital file to final piece.",
      },
    ],
  },
  orders: {
    header: {
      kicker: "Orders & quotes",
      title: "Price list & customization",
      subtitle: "Estimate your order, check reference prices, and finish on WhatsApp.",
    },
    shipping: {
      label: "Note",
      notice:
        "We ship with love anywhere in Brazil via Correios! Pickup in Sumaré and nearby, or delivery via Correios or apps like 99 and Uber — ask on WhatsApp for rates and timing.",
    },
    calculator: {
      label: "Estimate your order",
      quantity: "Quantity",
      estimate: "Estimate",
      selectItem: "Tap an item to calculate the total.",
    },
    priceTabs: {
      simples: "Simple",
      premium: "Premium",
      holografico: "Holo",
      outros: "Other",
    },
    priceCategories: {
      simples: {
        label: "Simple photocard",
        items: [
          { name: "Standard (with back)", price: "R$ 2,50", unit: 2.5 },
          { name: "Standard (no back)", price: "R$ 1,50", unit: 1.5 },
          { name: "Mini (with back)", price: "R$ 2,00", unit: 2 },
          { name: "Mini (no back)", price: "R$ 1,00", unit: 1 },
          { name: "A4 sheet — 10 pcs (with back)", price: "R$ 20,00", unit: 20 },
          { name: "A4 sheet — 10 pcs (no back)", price: "R$ 10,00", unit: 10 },
        ],
      },
      premium: {
        label: "Premium photocard (laminated)",
        items: [
          { name: "Standard (with back)", price: "R$ 3,50", unit: 3.5 },
          { name: "Standard (no back)", price: "R$ 2,50", unit: 2.5 },
          { name: "Mini (with back)", price: "R$ 3,00", unit: 3 },
          { name: "Mini (no back)", price: "R$ 2,00", unit: 2 },
          { name: "A4 sheet — 10 pcs (with back)", price: "R$ 30,00", unit: 30 },
          { name: "A4 sheet — 10 pcs (no back)", price: "R$ 20,00", unit: 20 },
        ],
      },
      holografico: {
        label: "Holographic (special)",
        items: [
          { name: "Standard (with back)", price: "R$ 5,00", unit: 5 },
          { name: "Standard (no back)", price: "R$ 4,50", unit: 4.5 },
          { name: "A4 sheet — 10 pcs (with back)", price: "R$ 45,00", unit: 45 },
          { name: "A4 sheet — 10 pcs (no back)", price: "R$ 40,00", unit: 40 },
        ],
      },
      outros: {
        label: "Loose photos & formats",
        items: [
          { name: "Polaroid style", price: "R$ 3,00", unit: 3 },
          { name: "3x4 photo (keychain — photo only)", price: "R$ 2,00", unit: 2 },
          { name: "10x15 cm photo", price: "R$ 7,00", unit: 7 },
          { name: "20x30 cm photo", price: "R$ 9,00", unit: 9 },
        ],
      },
    },
  },
} as const;