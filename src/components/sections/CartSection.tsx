"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";
import { brandClasses, brandShadows } from "@/design-system/brandTokens";
import { formatCartWhatsAppMessage } from "@/lib/cart/formatCartWhatsAppMessage";
import { whatsappLink } from "@/lib/utils/whatsapp";
import PageHeader from "@/components/ui/PageHeader";

function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

function WhatsAppGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="shrink-0"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TrashIcon({ size = 14 }: Readonly<{ size?: number }>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 7h16" />
      <path d="M10 11v6M14 11v6" />
      <path d="M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12" />
      <path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  );
}

export default function CartSection() {
  const { lines, isEmpty, setQuantity, removeLine, clearCart, itemCount } =
    useCart();
  const { copy, locale } = useLocale();
  const t = copy.cart.page;

  const grandTotal = lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );

  const waHref = isEmpty
    ? undefined
    : whatsappLink(formatCartWhatsAppMessage(lines, locale));

  return (
    <section className="relative z-20 px-4 pb-16 md:px-6">
      <div className="relative z-20 mx-auto max-w-2xl">
        <PageHeader
          kicker={t.kicker}
          title={t.title}
          subtitle={t.subtitle}
          titleId="carrinho-heading"
        />

        {isEmpty ? (
          <div className="rounded-2xl border border-dashed border-[#D9C9BA] bg-[#FAFAF8] px-6 py-12 text-center">
            <p
              className={`text-lg font-semibold text-[#735E53] ${brandClasses.heading}`}
            >
              {t.emptyTitle}
            </p>
            <p className={`mt-2 text-sm text-[#8C6F65] ${brandClasses.body}`}>
              {t.emptyBody}
            </p>
            <Link
              href="/catalogo"
              className={`mt-6 inline-flex rounded-full border border-[#8C6F65] bg-[#F7F8F3] px-5 py-2 text-sm font-semibold text-[#735E53] transition hover:bg-white ${brandClasses.heading}`}
            >
              {t.emptyCta}
            </Link>
          </div>
        ) : (
          <>
            <ul className="space-y-2.5">
              {lines.map((line) => {
                const subtotal = line.price * line.quantity;
                return (
                  <li
                    key={line.productId}
                    className="grid grid-cols-[5rem_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-[#D9C9BA]/55 bg-[#FAFAF8] p-2.5 sm:grid-cols-[5.75rem_minmax(0,1fr)_auto] sm:gap-3.5 sm:p-3"
                    style={{ boxShadow: brandShadows.card }}
                  >
                    <div className="relative aspect-square w-full max-w-[5.75rem] overflow-hidden rounded-xl bg-[#F2F2F0]">
                      <Image
                        src={line.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80px, 92px"
                      />
                    </div>

                    <div className="flex min-w-0 flex-col gap-1.5">
                      <h2
                        className={`line-clamp-2 text-[0.9375rem] font-semibold leading-snug text-[#735E53] sm:text-base ${brandClasses.heading}`}
                      >
                        {line.title}
                      </h2>
                      <p
                        className={`text-xs text-[#8C6F65] sm:text-sm ${brandClasses.body}`}
                      >
                        {formatBRL(line.price)} / {t.unitPrice}
                      </p>

                      <div className="flex items-center gap-1">
                        <div
                          className="flex h-7 items-center rounded-lg border border-[#D9C9BA]/60 bg-[#F7F8F3] px-px"
                          role="group"
                          aria-label={`Quantidade: ${line.title}`}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              line.quantity <= 1
                                ? removeLine(line.productId)
                                : setQuantity(
                                    line.productId,
                                    line.quantity - 1,
                                  )
                            }
                            className="flex h-6 w-7 items-center justify-center rounded-md text-[#735E53] transition hover:bg-[#EAE5DE]/70"
                            aria-label={copy.cart.product.decreaseQty}
                          >
                            <span className="text-base font-semibold leading-none">
                              −
                            </span>
                          </button>
                          <span
                            className={`min-w-[1.35rem] text-center text-xs font-semibold tabular-nums leading-none text-[#735E53] ${brandClasses.heading}`}
                          >
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(line.productId, line.quantity + 1)
                            }
                            className="flex h-6 w-7 items-center justify-center rounded-md text-[#735E53] transition hover:bg-[#EAE5DE]/70"
                            aria-label={copy.cart.product.increaseQty}
                          >
                            <span className="text-base font-semibold leading-none">
                              +
                            </span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeLine(line.productId)}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#D9C9BA]/70 text-[#BFA393] transition hover:border-[#8C6F65]/50 hover:bg-[#F2F2F0] hover:text-[#8C6F65] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6F65]"
                          aria-label={t.remove}
                          title={t.remove}
                        >
                          <TrashIcon size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-center self-stretch py-0.5 text-right">
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-wide text-[#BFA393] ${brandClasses.heading}`}
                      >
                        {t.lineTotal}
                      </p>
                      <p
                        className={`mt-0.5 text-base font-bold tabular-nums text-[#735E53] sm:text-lg ${brandClasses.heading}`}
                      >
                        {formatBRL(subtotal)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div
              className="mt-6 overflow-hidden rounded-2xl border border-[#D9C9BA]/65 bg-gradient-to-b from-[#FAFAF8] via-[#F7F8F3] to-[#EAE5DE]/35 p-4 sm:p-5"
              style={{ boxShadow: brandShadows.card }}
            >
              <div className="flex items-end justify-between gap-4 border-b border-[#D9C9BA]/45 pb-3">
                <div>
                  <p
                    className={`text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#BFA393] ${brandClasses.heading}`}
                  >
                    {t.grandTotal}
                  </p>
                  <p
                    className={`mt-1 text-xs text-[#8C6F65] ${brandClasses.body}`}
                  >
                    {itemCount}{" "}
                    {itemCount === 1 ? t.itemSingular : t.itemPlural}
                  </p>
                </div>
                <p
                  className={`text-2xl font-bold tabular-nums leading-none text-[#735E53] sm:text-[1.65rem] ${brandClasses.heading}`}
                >
                  {formatBRL(grandTotal)}
                </p>
              </div>

              <div className="mt-4">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`cart-whatsapp-cta inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#2CBF67_0%,#3D8B5E_48%,#4A6B56_100%)] px-5 py-3 text-sm font-bold text-[#F7F8F3] transition duration-200 hover:brightness-105 active:scale-[0.99] ${brandClasses.heading}`}
                >
                  <WhatsAppGlyph />
                  {t.sendQuote}
                </a>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={clearCart}
                className={`text-[14px] font-normal !text-[#2563EB] underline decoration-[#2563EB]/40 underline-offset-[3px] transition hover:!text-[#1D4ED8] hover:decoration-[#1D4ED8] ${brandClasses.body}`}
              >
                {t.clear}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}