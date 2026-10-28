import { useTranslations } from "next-intl";
import Link from "next/link";

import {
  featureHref,
  tourMenuHref,
  WORKS_MENU,
  type WorksMenuItem,
} from "@/lib/data/works";

import { SectionHeading } from "./SectionHeading";

const LINK_CLASS =
  "mono cap mt-auto inline-flex items-center gap-2 pt-4 text-[11px] font-semibold tracking-[0.06em] text-ink hover:text-brand";

function CardAction({ item }: { item: WorksMenuItem }) {
  const t = useTranslations("works.grid");

  if (item.feature) {
    return (
      <Link href={featureHref(item.feature)} className={LINK_CLASS}>
        {t("detail")} <span aria-hidden="true">→</span>
      </Link>
    );
  }
  if (item.snapshot) {
    return (
      <Link
        href={tourMenuHref(item.key)}
        className={LINK_CLASS}
      >
        {t("screen")} <span aria-hidden="true">→</span>
      </Link>
    );
  }
  return (
    <p className="mono cap mt-auto pt-4 text-[11px] font-medium tracking-[0.06em] text-g500">
      {item.external ? t("external") : t("admin")}
    </p>
  );
}

// Every sidebar menu as a card, in sidebar order (works spec §4 S4).
export function FeatureGrid() {
  const t = useTranslations("works");

  return (
    <section id="features" className="scroll-mt-28 border-b border-hair lg:scroll-mt-20">
      <div className="px-7 py-16 md:px-10 md:py-20 lg:py-28">
        <SectionHeading
          eyebrow={t("grid.eyebrow")}
          title={t("grid.title")}
          lead={t("grid.lead")}
        />

        <div className="mt-12 flex flex-col gap-12">
          {WORKS_MENU.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.key}>
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  {GroupIcon && (
                    <GroupIcon size={16} strokeWidth={1.75} aria-hidden="true" />
                  )}
                  {t(`menu.groups.${group.key}`)}
                  {group.adminOnly && (
                    <span className="mono cap rounded-sm border border-hair px-1.5 py-0.5 text-[10px] font-medium tracking-[0.06em] text-g500">
                      {t("grid.admin")}
                    </span>
                  )}
                </h3>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={item.key}
                        className="flex flex-col rounded-lg border border-hair p-5 transition-colors hover:border-ink"
                      >
                        <Icon
                          size={20}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          className="text-g500"
                        />
                        <p className="mt-3 text-body font-semibold">
                          {t(`menu.items.${item.key}.label`)}
                        </p>
                        <p className="mt-1 text-sm text-g500">
                          {t(`menu.items.${item.key}.blurb`)}
                        </p>
                        <CardAction item={item} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
