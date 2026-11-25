import { brandClasses } from "@/design-system/brandTokens";

type Props = Readonly<{
  label: string;
  notice: string;
}>;

export default function OrdersShippingNotice({ label, notice }: Props) {
  return (
    <aside
      className="border-t-4 border-[#D9621E] bg-[#735E53] px-6 py-4 sm:px-10 sm:py-5"
      aria-labelledby="encomendas-shipping-notice"
    >
      <p
        id="encomendas-shipping-notice"
        className={`text-[11px] font-bold uppercase tracking-[0.16em] text-[#F08244] ${brandClasses.heading}`}
      >
        {label}
      </p>
      <p
        className={`mt-2 text-sm font-semibold leading-relaxed text-[#F7F8F3] sm:text-[0.95rem] ${brandClasses.body}`}
      >
        {notice}
      </p>
    </aside>
  );
}