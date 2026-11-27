import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

export default function ContentPanel({
  children,
  className = "",
  as: Tag = "div",
}: Readonly<Props>) {
  return (
    <Tag className={`relative z-20 ${className}`}>{children}</Tag>
  );
}