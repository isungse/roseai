"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { LangToggle } from "./LangToggle";

interface TopBarNavProps {
  /** Accessible name of the product nav landmark (i18n). */
  label: string;
}

// Client leaf: needs the pathname to mark WORKS as current and to hide the
// language toggle inside the Korean-only product section (i18n.md).
export function TopBarNav({ label }: TopBarNavProps) {
  const pathname = usePathname();
  const inWorks = pathname === "/works" || pathname.startsWith("/works/");

  return (
    <div className="flex items-center gap-5 md:gap-8">
      <nav aria-label={label}>
        <Link
          href="/works"
          locale="ko"
          aria-current={inWorks ? "page" : undefined}
          className={cn(
            // `WORKS` is a locale-invariant design element, like the logo.
            "mono cap inline-flex h-16 items-center border-b-2 text-xs font-semibold tracking-[0.08em] transition-colors",
            inWorks
              ? "border-brand text-ink"
              : "border-transparent text-g500 hover:text-ink",
          )}
        >
          WORKS
        </Link>
      </nav>
      {!inWorks && <LangToggle />}
    </div>
  );
}
