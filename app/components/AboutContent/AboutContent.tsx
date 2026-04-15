import Image from "next/image";

const LOGO_SRC = "/images/bicrise-logo.png";

export default function AboutContent() {
  return (
    <article
      id="sobre"
      aria-labelledby="sobre-heading"
      className="space-y-6 text-bicrise-brown"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        <div className="flex shrink-0 flex-col items-center gap-3 sm:w-48 sm:items-start">
          <span className="relative h-28 w-28 overflow-hidden rounded-full border border-bicrise-sand bg-bicrise-white shadow-sm sm:h-36 sm:w-36">
            <Image
              src={LOGO_SRC}
              alt="Bricrisê — monograma em corda"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 112px, 144px"
            />
          </span>
          <p className="max-w-48 text-center text-sm font-semibold italic leading-snug text-bicrise-dust sm:text-left">
            Onde o nó vira laço
          </p>
        </div>

        <div className="min-w-0 flex-1 space-y-6">
          <div>
            <h2
              id="sobre-heading"
              className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Conhece a Bricrisê 🧶✨
            </h2>
            <p className="text-base leading-relaxed text-bicrise-clay">
              É com muita alegria que abrimos as portas do nosso ateliê digital!
            </p>
          </div>

          <p className="text-base leading-relaxed text-bicrise-clay">
            A Bricrisê nasceu de um encontro de gerações: o cuidado de mãe, a
            criatividade de filha e a alegria do nosso fiel escudeiro, o Galego.
            🐾
          </p>

          <p className="text-base leading-relaxed text-bicrise-clay">
            Por aqui, acreditamos que o artesanato é uma forma de carinho. Cada
            peça de macramê e cada mimo personalizado que criamos carrega um
            pouquinho da nossa história e muita dedicação manual.
          </p>

          <div className="rounded-2xl border border-bicrise-sand/80 bg-bicrise-white/80 p-5 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-bicrise-brown">
              🎨 Do seu jeito
            </h3>
            <p className="text-base leading-relaxed text-bicrise-clay">
              Nosso diferencial é a personalização! Quer uma pulseira com sua
              cor favorita? Ou um mimo exclusivo para presentear? Nós
              transformamos sua ideia em arte.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-bicrise-brown">
              🛍️ Como solicitar
            </h3>
            <ol className="list-decimal space-y-2 pl-5 text-base leading-relaxed text-bicrise-clay marker:font-semibold marker:text-bicrise-brown">
              <li>
                Clique no link da nossa Bio (tem um atalho direto para o nosso
                WhatsApp).
              </li>
              <li>
                Escolha entre nossos modelos de pronta entrega ou peça uma
                criação personalizada.
              </li>
              <li>Combinamos os detalhes, cores e o envio!</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-bicrise-sand/80 bg-bicrise-white/80 p-5 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-bicrise-brown">
              📦 Entregas
            </h3>
            <p className="text-base leading-relaxed text-bicrise-clay">
              Enviamos com todo amor para todo o Brasil via Correios! Para quem
              é de Sumaré e região, consulte nossas opções de retirada. 🇧🇷
            </p>
          </div>

          <p className="text-base font-medium leading-relaxed text-bicrise-brown">
            Sejam muito bem-vindos ao nosso universo de nós e criatividade!
          </p>
          <p className="text-sm text-bicrise-dust">
            Com amor, Bianca, Cristiane &amp; Galego.
          </p>
        </div>
      </div>
    </article>
  );
}
