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
    brandName: "Bricrisê",
  },
  home: {
    hero: {
      kicker: "Bricrisê studio",
      title: "Where the knot becomes a bow",
      subtitle:
        "Custom textiles in silk and macramé, heartfelt stationery for fans — handmade pieces, your references, and orders on WhatsApp.",
      ctaCatalog: "Browse catalog",
      ctaAbout: "Our story",
    },
    fronts: {
      title: "Two studios, same gentle care",
      subtitle:
        "Catalog picks, your ideas, or references — we adapt, shape the details, and finish every piece by hand.",
      servicesCta: "Services & ordering tips",
      cards: [
        {
          num: "I",
          eyebrow: "Textile studio",
          title: "Bracelets, silk & macramé",
          description:
            "Bracelets, cords, and necklaces with silk thread, beads, and artisan knots. Start from the catalog or send references for something new.",
          href: "/catalogo",
          cta: "Explore the catalog",
        },
        {
          num: "II",
          eyebrow: "Heartfelt stationery",
          title: "Photocards, Polaroids & keepsakes",
          description:
            "K-Pop, dramas, memes, or memories as high-quality collectibles — photocards, stickers, frame prints, and custom photo sizes.",
          href: "/encomendas",
          cta: "Pricing & formats",
        },
      ],
    },
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
    filters: {
      allGroups: "All",
      allThemes: "All themes",
      themesHeading: "Themes",
      groups: {
        atelie: "Creative Studio",
        papelaria: "Creative Stationery",
      },
      searchSrOnly: "Search catalog",
      searchPlaceholder: "Search item...",
      ariaCategories: "Filter catalog",
      ariaThemes: "Filter by theme",
      emptyResults:
        'No products in this filter. Try "All" or request a custom order.',
      productSingular: "product",
      productPlural: "products",
    },
  },
  cart: {
    headerDisabledTitle: "Cart empty — add items from the catalog",
    headerLinkLabel: "View cart",
    page: {
      kicker: "List",
      title: "Your selection",
      subtitle: "Review quantities and send the quote via WhatsApp.",
      emptyTitle: "Nothing here yet",
      emptyBody:
        "In the catalog, pick a quantity and tap add to cart.",
      emptyCta: "Go to catalog",
      unitPrice: "ea.",
      lineTotal: "Subtotal",
      grandTotal: "Estimated total",
      remove: "Remove",
      clear: "Clear list",
      sendQuote: "Send quote on WhatsApp",
      itemSingular: "item",
      itemPlural: "items",
    },
    product: {
      addToCart: "Add",
      added: "Added",
      decreaseQty: "Decrease quantity",
      increaseQty: "Increase quantity",
    },
  },
  services: {
    header: {
      kicker: "Services",
      title: "What we make in the studio",
      subtitle:
        "Custom textiles, heartfelt stationery, and tips for a smooth order — from catalog to WhatsApp.",
    },
    slides: [
      {
        id: "linhas-acessorios",
        tag: "Textile studio",
        badge: "",
        title: "",
        description:
          "At Bricrisê we believe every accessory tells a story. See something in the catalog? We'll adapt it. Have your own idea? Send references — we'll work it out together.",
        itemsTitle: "",
        items: [
          "Define your piece (bracelet, cord, or necklace): start from the catalog or send references.",
          "Browse our available silk thread color chart.",
          "Choose your favorite beads, charms, or letters.",
        ],
        highlight: "Done! We craft a piece that’s uniquely yours.",
      },
      {
        id: "photocards",
        tag: "Heartfelt stationery",
        badge: "",
        title: "",
        description:
          "Turn K-Pop idol photos, drama couples, memes, or cherished memories into high-quality collectibles. We make photocards, Polaroids, prints for frames, stickers, and custom photo sizes.",
        itemsTitle: "",
        items: [],
        highlight:
          "Any age, any fandom — send references on WhatsApp and we'll make it happen. Pricing, formats, and finishes on the Orders page.",
      },
      {
        id: "dicas-envio",
        tag: "Tips",
        badge: "",
        title: "",
        description:
          "So your order moves smoothly, send references (the more the better), your color picks, and a clear note of what you have in mind — we'll shape the idea with you.",
        itemsTitle: "Not sure how to send the photo?",
        items: [
          "Original quality: prefer images saved from Pinterest or X (Twitter). Skip screenshots.",
          'WhatsApp: send the file as "Document" to keep full resolution.',
          "Framing: vertical (9:16), faces centered and away from trim lines.",
        ],
        highlight:
          "From digital file to the piece in your hands — handmade care at every step.",
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