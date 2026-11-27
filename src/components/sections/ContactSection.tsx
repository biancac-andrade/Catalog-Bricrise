import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { SOCIAL_LINKS } from "@/components/layout/navConfig";
import { brandClasses } from "@/design-system/brandTokens";

export default function ContactSection() {
  return (
    <section
      id="contato"
      className="relative z-20 px-4 py-14 md:px-6 md:py-20"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center rounded-2xl border border-[#D9C9BA]/70 bg-[#F2F2F0]/80 px-6 py-10 text-center shadow-sm">
        <h2
          className={`mb-3 text-2xl font-bold text-[#735E53] ${brandClasses.heading}`}
        >
          Fazer Encomenda
        </h2>
        <p
          className={`mb-6 max-w-md text-base leading-relaxed text-[#8C6F65] ${brandClasses.body}`}
        >
          Escolha um item do catálogo ou descreva sua ideia. Respondemos pelo
          WhatsApp com valores, prazos e opções de envio.
        </p>
        <WhatsAppButton
          label="Pedir no WhatsApp"
          message="Olá Bricrisê, vim do catálogo e quero fazer uma encomenda."
          className="px-5 py-2.5"
        />
        <nav className="mt-8" aria-label="Redes sociais">
          <ul className="flex flex-wrap justify-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-semibold text-[#8C6F65] underline-offset-4 hover:text-[#735E53] hover:underline ${brandClasses.heading}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}