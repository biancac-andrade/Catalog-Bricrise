import { brandClasses } from "@/design-system/brandTokens";

type Props = {
  kicker: string;
  title: string;
  subtitle?: string;
  titleId?: string;
};

export default function PageHeader({
  kicker,
  title,
  subtitle,
  titleId,
}: Readonly<Props>) {
  return (
    <header className="pb-10 pt-8 text-center">
      <p
        className={`text-xs font-medium uppercase tracking-[0.2em] text-[#8C6F65] ${brandClasses.heading}`}
      >
        {kicker}
      </p>
      <h1
        id={titleId}
        className={`mt-2 text-3xl font-semibold text-[#735E53] sm:text-4xl ${brandClasses.heading}`}
      >
        {title}
      </h1>
      {subtitle ? (
        <p
          className={`mx-auto mt-2 max-w-xl text-sm text-[#735E53]/80 sm:text-base ${brandClasses.body}`}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}