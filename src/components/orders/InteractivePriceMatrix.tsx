"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import OrdersShippingNotice from "@/components/orders/OrdersShippingNotice";
import { type PriceCategoryKey } from "@/content";
import { useLocale } from "@/context/LocaleContext";
import { brandClasses } from "@/design-system/brandTokens";

function formatMoney(value: number, locale: "pt-BR" | "en-US") {
  return value.toLocaleString(locale === "en-US" ? "en-US" : "pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function InteractivePriceMatrix() {
  const { copy, locale } = useLocale();
  const categories = copy.orders.priceCategories;
  const tabKeys = Object.keys(categories) as PriceCategoryKey[];
  const [activeTab, setActiveTab] = useState<PriceCategoryKey>("simples");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  const items = categories[activeTab].items;
  const selected =
    selectedIndex !== null ? items[selectedIndex] : undefined;

  const estimate = useMemo(() => {
    if (!selected) return null;
    return selected.unit * Math.max(1, quantity);
  }, [selected, quantity]);

  return (
    <figure className="relative z-20 w-full">
      <div className="space-y-6 sm:space-y-8">
        <div
          className="flex flex-wrap gap-x-6 gap-y-2 border-b border-[#D9C9BA]/45 pb-3 sm:gap-x-8"
          role="tablist"
          aria-label={copy.orders.header.title}
        >
          {tabKeys.map((key) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setActiveTab(key);
                  setSelectedIndex(null);
                  setQuantity(1);
                }}
                className={`relative shrink-0 pb-1 text-sm transition sm:text-base ${brandClasses.heading} ${
                  active
                    ? "font-bold !text-[#735E53]"
                    : "font-semibold !text-[#735E53]/55 hover:!text-[#8C6F65]"
                }`}
              >
                {copy.orders.priceTabs[key]}
                <span
                  aria-hidden
                  className={`absolute -bottom-[13px] left-0 h-0.5 w-full rounded-full transition-all duration-200 ${
                    active ? "bg-[#8C6F65]" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden rounded-2xl border border-[#D9C9BA]/45 bg-[#FAFAF8]/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
            role="tabpanel"
          >
            {items.map((item, index) => {
              const isSelected = selectedIndex === index;
              return (
                <li
                  key={item.name}
                  className="border-b border-[#D9C9BA]/35 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIndex(index);
                      setQuantity(1);
                    }}
                    className={`group flex w-full items-center gap-3 px-4 py-3.5 text-left transition sm:px-5 sm:py-4 ${
                      isSelected
                        ? "bg-[#EAE5DE]/45"
                        : "hover:bg-[#F7F8F3]/90"
                    }`}
                  >
                    <span
                      className={`flex h-2 w-2 shrink-0 rounded-full transition ${
                        isSelected
                          ? "bg-[#8C6F65] ring-4 ring-[#8C6F65]/15"
                          : "bg-[#D9C9BA]/80 group-hover:bg-[#BFA393]"
                      }`}
                      aria-hidden
                    />
                    <span
                      className={`min-w-0 flex-1 text-sm text-[#735E53] sm:text-[0.9375rem] ${brandClasses.body}`}
                    >
                      {item.name}
                    </span>
                    <span
                      className={`shrink-0 text-sm font-bold tabular-nums text-[#8C6F65] sm:text-base ${brandClasses.heading}`}
                    >
                      {item.price}
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>

        <div
          className={`relative overflow-hidden rounded-2xl border px-4 py-5 transition-all duration-300 sm:px-6 sm:py-6 ${
            selected
              ? "border-[#8C6F65]/30 bg-[#FAFAF8]/95 shadow-[0_12px_40px_-28px_rgba(115,94,83,0.45)]"
              : "order-sim-idle border-dashed bg-[#F7F8F3]/35"
          }`}
        >
          {selected ? (
            <span
              className="order-sim-accent absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#D9621E] via-[#C97A4A] to-[#8C6F65]"
              aria-hidden
            />
          ) : null}

          <p
            className={`mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#8C6F65] ${brandClasses.heading}`}
          >
            {copy.orders.calculator.label}
          </p>

          {!selected ? (
            <div className="order-sim-enter flex items-start gap-3 sm:items-center">
              <span
                className="order-sim-bounce flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-dashed border-[#D9C9BA] bg-[#F7F8F3]/80 text-lg text-[#BFA393]"
                aria-hidden
              >
                ↑
              </span>
              <p
                className={`text-sm leading-relaxed text-[#8C6F65] ${brandClasses.body}`}
              >
                {copy.orders.calculator.selectItem}
              </p>
            </div>
          ) : (
            <div className="order-sim-enter space-y-5">
              <p
                className={`text-base font-semibold leading-snug text-[#735E53] sm:text-lg ${brandClasses.heading}`}
              >
                {selected.name}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-semibold text-[#735E53] ${brandClasses.body}`}
                  >
                    {copy.orders.calculator.quantity}:
                  </span>
                  <div className="flex h-9 items-center rounded-xl border border-[#D9C9BA]/60 bg-[#F7F8F3] px-px">
                    <button
                      type="button"
                      onClick={() => setQuantity((n) => Math.max(1, n - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#735E53] transition hover:bg-[#EAE5DE]/70 active:scale-95"
                      aria-label={copy.orders.calculator.quantity}
                    >
                      <span className="text-base font-semibold leading-none">
                        −
                      </span>
                    </button>
                    <input
                      id="price-qty"
                      type="number"
                      min={1}
                      max={999}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, Number(e.target.value) || 1))
                      }
                      aria-label={copy.orders.calculator.quantity}
                      className="w-12 border-0 bg-transparent text-center text-sm font-semibold tabular-nums text-[#735E53] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((n) => Math.min(999, n + 1))
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#735E53] transition hover:bg-[#EAE5DE]/70 active:scale-95"
                      aria-label={copy.orders.calculator.quantity}
                    >
                      <span className="text-base font-semibold leading-none">
                        +
                      </span>
                    </button>
                  </div>
                </div>

                <p
                  key={estimate ?? "empty"}
                  className={`order-total-pop text-xl font-bold tabular-nums text-[#735E53] sm:text-2xl ${brandClasses.heading}`}
                >
                  {copy.orders.calculator.estimate}:{" "}
                  <span className="bg-gradient-to-r from-[#8C6F65] to-[#D9621E] bg-clip-text text-transparent">
                    {estimate !== null ? formatMoney(estimate, locale) : "—"}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <figcaption className="mt-2.5 flex justify-end">
        <OrdersShippingNotice
          label={copy.orders.shipping.label}
          notice={copy.orders.shipping.notice}
        />
      </figcaption>
    </figure>
  );
}