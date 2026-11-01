import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { featureHref, TOUR_HREF, WORKS_FEATURES } from "@/lib/data/works";
import { worksImage } from "@/lib/works/images";

import { FeatureRail } from "./FeatureRail";
import { SectionHeading } from "./SectionHeading";

export function FeatureGrid() {
  const t = useTranslations("works");

  return (
    <section id="features" className="scroll-mt-36 py-16 md:py-20 lg:scroll-mt-20 lg:py-28">
      <div className="px-6 md:px-10">
        <SectionHeading
          eyebrow={t("grid.eyebrow")}
          title={t("grid.title")}
          lead={t("grid.lead")}
        />
      </div>
      <FeatureRail
        label={t("grid.title")}
        previousLabel={t("grid.previous")}
        nextLabel={t("grid.next")}
      >
        {WORKS_FEATURES.map(({ slug, icon: Icon, hero }) => {
          const image = worksImage(hero);
          return (
            <li key={slug} className="feature-card min-w-0 snap-start">
              <Link
                href={featureHref(slug)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hair bg-g50 transition-colors hover:border-brand"
              >
                <div className="flex flex-1 flex-col px-7 pb-8 pt-8 md:px-9 md:pt-10">
                  <Icon size={24} strokeWidth={1.75} aria-hidden="true" className="text-ink" />
                  <h3 className="mt-5 text-h3 font-bold">{t(`features.${slug}.name`)}</h3>
                  <p className="mt-3 whitespace-pre-line text-body text-copy">
                    {t(`features.${slug}.tagline`)}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-brand">
                    {t("grid.detail")} <span aria-hidden="true">→</span>
                  </span>
                </div>
                <div className="mx-5 overflow-hidden rounded-t-lg border-x border-t border-hair bg-paper md:mx-7">
                  <Image
                    src={image.src}
                    alt={t(`features.${slug}.heroAlt`)}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 768px) 344px, 256px"
                    className="block h-auto w-full"
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </FeatureRail>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 px-6 md:px-10">
        <p className="text-sm text-copy">{t("grid.allMenus")}</p>
        <Link href={TOUR_HREF} className="inline-flex items-center gap-3 py-2 text-sm font-semibold hover:text-brand">
          {t("hero.ctaTour")} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
