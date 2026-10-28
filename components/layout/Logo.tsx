import { useTranslations } from "next-intl";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md";
  /** Adds the `WORKS` mark after the company wordmark (TopBar product logo). */
  product?: boolean;
}

// Company mark (2×2 grid · hairline · ROSE·AI). The TopBar shows the product
// logo, the footer the company alone (works spec §2.1). `WORKS` is a
// locale-invariant design element like the wordmark, so it has no message key.
export function Logo({ size = "md", product = false }: LogoProps) {
  const t = useTranslations("common");
  const mark = size === "sm" ? "h-4 w-4" : "h-6 w-6";
  const hair = size === "sm" ? "h-4" : "h-[22px]";
  const word = size === "sm" ? "text-sm" : "text-lg";

  return (
    <Link href="/" aria-label={t("homeLabel")} className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`grid grid-cols-2 grid-rows-2 gap-px ${mark}`}
      >
        <span className="bg-ink" />
        <span className="bg-brand" />
        <span className="bg-ink" />
        <span className="bg-ink" />
      </span>
      <span className={`block w-px bg-ink ${hair}`} aria-hidden="true" />
      <span
        className={`flex items-baseline gap-2 pl-3 font-extrabold leading-none tracking-[-0.02em] ${word}`}
      >
        <span>
          ROSE<span className="text-brand">·AI</span>
        </span>
        {product && (
          <span className="mono cap text-xs font-semibold tracking-[0.08em]">
            WORKS
          </span>
        )}
      </span>
    </Link>
  );
}
