import { brandClasses } from "@/design-system/brandTokens";

type Props = Readonly<{
  label: string;
  notice: string;
}>;

export default function OrdersShippingNotice({ label, notice }: Props) {
  return (
    <p
      id="encomendas-shipping-notice"
      className={`text-right text-[12px] font-bold leading-relaxed text-[#2563EB] sm:text-[13px] ${brandClasses.body}`}
    >
      <span aria-hidden className="text-[#2563EB]">
        ***
      </span>{" "}
      {label} {notice}
    </p>
  );
}