import { whatsappLink } from "@/lib/utils/whatsapp";

import ProductCardImage from "./ProductCardImage";

interface ProductProps {
  name: string;
  price: number;
  imageUrl: string;
  available?: boolean;
  priority?: boolean;
}

export default function ProductCard({
  name,
  price,
  imageUrl,
  available = true,
  priority = false,
}: Readonly<ProductProps>) {
  const whatsappUrl = whatsappLink(
    `Oi Bricrise! Vi no site e tenho interesse na pulseira ${name}. Ela ainda esta disponivel?`,
  );

  return (
    <div
      className={`flex h-full flex-col rounded-2xl border border-bicrise-sand bg-bicrise-white p-3 shadow-sm transition-shadow sm:p-3.5 ${
        available ? "hover:shadow-md" : "opacity-90"
      }`}
    >
      <ProductCardImage
        imageUrl={imageUrl}
        name={name}
        available={available}
        priority={priority}
      />

      <h3 className="mb-0.5 line-clamp-2 text-sm font-bold leading-snug text-bicrise-brown sm:text-base">
        {name}
      </h3>
      <p className="mb-2 text-sm font-semibold text-bicrise-clay sm:text-base">
        R$ {price.toFixed(2)}
      </p>

      {available ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto block w-full rounded-lg bg-bicrise-brown py-2 text-center text-sm font-bold text-bicrise-white transition-colors hover:bg-bicrise-dust"
        >
          Eu quero! 🛍️
        </a>
      ) : (
        <span
          className="mt-auto block w-full cursor-not-allowed rounded-lg bg-bicrise-sand py-2 text-center text-sm font-bold text-bicrise-clay"
          aria-disabled="true"
        >
          Indisponível
        </span>
      )}
    </div>
  );
}
