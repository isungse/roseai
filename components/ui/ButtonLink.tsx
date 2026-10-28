import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

const BASE =
  "mono cap inline-flex items-center gap-4 px-6 py-[14px] text-[13px] font-semibold tracking-[0.04em] transition-colors";

const VARIANT: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  primary: "bg-brand text-paper hover:bg-ink",
  secondary: "border border-hair bg-paper text-ink hover:border-ink hover:bg-g50",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(BASE, VARIANT[variant], className)}>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}
