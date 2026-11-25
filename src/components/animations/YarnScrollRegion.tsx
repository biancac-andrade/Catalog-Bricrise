import type { ReactNode } from "react";

import WanderingYarnScroll from "@/components/animations/WanderingYarnScroll";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function YarnScrollRegion({
  children,
  className = "",
}: Readonly<Props>) {
  return (
    <div
      className={`relative min-h-[140vh] overflow-x-hidden ${className}`}
    >
      <WanderingYarnScroll />
      <div className="relative z-20 flex flex-col gap-10">{children}</div>
    </div>
  );
}