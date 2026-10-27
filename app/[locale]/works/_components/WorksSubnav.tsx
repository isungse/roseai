import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import {
  WORKS_FEATURES,
  WORKS_PRODUCT_NAME,
  type WorksFeatureSlug,
} from "@/lib/data/works";
import { cn } from "@/lib/utils";

export type WorksSection = "overview" | WorksFeatureSlug | "tour";

interface WorksSubnavProps {
  current: WorksSection;
}

// Secondary bar under the TopBar (sticky `top-16` = TopBar height). Rendered
// by each page with its own section key so the active state needs no client
// JS; seven flat links replace a dropdown.
export function WorksSubnav({ current }: WorksSubnavProps) {
  const t = useTranslations("works");

  const links: { key: WorksSection; href: string; label: string }[] = [
    { key: "overview", href: "/works", label: t("nav.overview") },
    ...WORKS_FEATURES.map((f) => ({
      key: f.slug,
      href: `/works/${f.slug}`,
      label: t(`features.${f.slug}.name`),
    })),
    { key: "tour", href: "/works/tour", label: t("nav.tour") },
  ];

  return (
    <nav
      aria-label={t("common.productSubnav")}
      className="sticky top-16 z-40 border-b border-hair bg-paper/90 backdrop-blur-md"
    >
      <div className="flex h-12 items-center gap-6 px-7 md:px-10">
        <span className="mono cap hidden shrink-0 text-xs font-semibold tracking-[0.08em] md:inline">
          {WORKS_PRODUCT_NAME}
        </span>
        <ul className="flex h-full items-center gap-1 overflow-x-auto">
          {links.map((link) => {
            const on = link.key === current;
            return (
              <li key={link.key} className="shrink-0">
                <Link
                  href={link.href}
                  locale="ko"
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "inline-flex h-12 items-center border-b-2 px-3 text-sm font-medium transition-colors",
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
      </div>
    </nav>
  );
}
