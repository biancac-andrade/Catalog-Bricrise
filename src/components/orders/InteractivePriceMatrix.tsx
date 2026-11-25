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
    <div className="relative z-20 w-full overflow-hidden rounded-3xl border border-[#D9C9BA]/70 bg-[#F2F2F0]/85 shadow-sm backdrop-blur-md">
      <div className="p-6 sm:p-10">
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-[#EAE5DE]/60 p-1.5 sm:grid-cols-4">
        {tabKeys.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={activeTab === key}
            onClick={() => {
              setActiveTab(key);
              setSelectedIndex(null);
              setQuantity(1);
            }}
            className={`rounded-xl px-2 py-2 text-xs font-medium transition-all duration-200 sm:text-sm ${brandClasses.heading} ${
              activeTab === key
                ? "bg-[#8C6F65] text-[#F7F8F3] shadow-sm"
                : "text-[#735E53] hover:text-[#8C6F65]"
            }`}
          >
            {copy.orders.priceTabs[key]}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
          role="tabpanel"
        >
          {items.map((item, index) => {
            const isSelected = selectedIndex === index;
            return (
              <li key={item.name}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIndex(index);
                    setQuantity(1);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl border p-3.5 text-left transition-colors sm:p-4 ${
                    isSelected
                      ? "border-[#8C6F65] bg-[#F7F8F3]/95 shadow-sm"
                      : "border-[#D9C9BA]/50 bg-[#F7F8F3]/90 hover:border-[#8C6F65]/50"
                  }`}
                >
                  <span
                    className={`text-xs font-medium text-[#735E53] sm:text-sm ${brandClasses.body}`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`shrink-0 rounded-lg bg-[#EAE5DE] px-2.5 py-1 text-xs font-semibold text-[#8C6F65] sm:text-sm ${brandClasses.heading}`}
                  >
                    {item.price}
                  </span>
                </button>
              </li>
            );
          })}
        </motion.ul>
      </AnimatePresence>

      <div className="rounded-2xl border border-[#D9C9BA]/50 bg-[#F7F8F3]/70 p-4 sm:p-5">
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#8C6F65] ${brandClasses.heading}`}
        >
          {copy.orders.calculator.label}
        </p>
        {selected ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className={`text-sm text-[#735E53] ${brandClasses.body}`}>
              {selected.name}
            </p>
            <p className={`text-sm text-[#735E53] ${brandClasses.body}`}>
              <label htmlFor="price-qty" className="mr-2 font-semibold">
                {copy.orders.calculator.quantity}:
              </label>
              <input
                id="price-qty"
                type="number"
                min={1}
                max={999}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value) || 1))
                }
                className="w-16 rounded-lg border border-[#D9C9BA] bg-[#F7F8F3] px-2 py-1 text-center text-sm text-[#735E53]"
              />
            </p>
            <p
              className={`text-base font-bold text-[#8C6F65] sm:text-lg ${brandClasses.heading}`}
            >
              {copy.orders.calculator.estimate}:{" "}
              {estimate !== null ? formatMoney(estimate, locale) : "—"}
            </p>
          </div>
        ) : (
          <p className={`text-sm text-[#8C6F65] ${brandClasses.body}`}>
            {copy.orders.calculator.selectItem}
          </p>
        )}
      </div>
      </div>

      <OrdersShippingNotice
        label={copy.orders.shipping.label}
        notice={copy.orders.shipping.notice}
      />
    </div>
  );
}