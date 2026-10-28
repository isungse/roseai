"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface TopBarLink {
  href: string;
  label: string;
}

interface TopBarNavProps {
  /** Accessible name of the product nav landmark (i18n). */
  label: string;
  links: readonly TopBarLink[];
}

// Client leaf: only the current-page mark needs the pathname. A single list
// serves both layouts — a scrolling chip row under the logo below `lg`, an
// inline row beside it from `lg` — so there is one nav landmark, not two.
export function TopBarNav({ label, links }: TopBarNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="border-t border-hair lg:border-t-0">
      <ul className="flex h-12 items-center gap-1 overflow-x-auto px-7 md:px-10 lg:h-16 lg:overflow-visible lg:px-0">
        {links.map((link) => {
          const on =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "inline-flex h-12 items-center border-b-2 px-3 text-sm font-medium transition-colors lg:h-16",
                  on
                    ? "border-brand text-ink"
                    : "border-transparent text-g500 hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
