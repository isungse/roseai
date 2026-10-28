import { useTranslations } from "next-intl";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  featureHref,
  TOUR_HREF,
  WORKS_FEATURES,
  type WorksFeature,
} from "@/lib/data/works";
import { cn } from "@/lib/utils";
import { worksImage } from "@/lib/works/images";

import { FeatureTabs } from "./FeatureTabs";
import { ScreenImage } from "./ScreenImage";
import { SectionHeading } from "./SectionHeading";

interface FeaturePageProps {
  feature: WorksFeature;
}

// Shared template for the five feature pages (works spec §5, blocks T0–T5).
export function FeaturePage({ feature }: FeaturePageProps) {
  const t = useTranslations("works");
  const f = `features.${feature.slug}`;
  const name = t(`${f}.name`);

  const tabs = feature.tabs.map((tab) => ({
    key: tab.key,
    title: t(`${f}.tabs.${tab.key}.title`),
    body: t(`${f}.tabs.${tab.key}.body`),
    panel: (
      <ScreenImage
        image={worksImage(tab.image)}
        alt={t(`${f}.tabs.${tab.key}.alt`)}
        sizes="(min-width: 1024px) 60vw, 100vw"
      />
    ),
  }));

  const others = WORKS_FEATURES.filter((o) => o.slug !== feature.slug);

  return (
    <>

      {/* T1 — hero */}
      <section className="border-b border-hair">
        <div className="grid gap-12 px-7 py-16 md:px-10 md:py-20 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-16 lg:py-28">
          <div>
            <p className="mono cap text-xs font-medium tracking-[0.08em] text-brand">
              {t("featurePage.eyebrow")} · {name}
            </p>
            <h1 className="mt-5 whitespace-pre-line text-h2 font-bold tracking-[-0.02em] md:text-h1">
              {t(`${f}.tagline`)}
            </h1>
            <p className="mt-6 text-body-lg text-g500">{t(`${f}.lead`)}</p>
          </div>
          <ScreenImage
            image={worksImage(feature.hero)}
            alt={t(`${f}.heroAlt`)}
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        </div>
      </section>

      {/* T2 — core feature tabs */}
      <section className="border-b border-hair">
        <div className="px-7 py-16 md:px-10 md:py-20 lg:py-28">
          <SectionHeading
            eyebrow={t("featurePage.tabsEyebrow")}
            title={t("featurePage.tabsTitle", { name })}
          />
          <div className="mt-12">
            <FeatureTabs
              label={t("featurePage.tabsLabel", { name })}
              tabs={tabs}
            />
          </div>
        </div>
      </section>

      {/* T3 — deep dives, zigzag */}
      <section className="border-b border-hair">
        <div className="px-7 py-16 md:px-10 md:py-20 lg:py-28">
          <SectionHeading
            eyebrow={t("featurePage.sectionsEyebrow")}
            title={t("featurePage.sectionsTitle")}
          />
          <div className="mt-14 flex flex-col gap-16 lg:gap-24">
            {feature.sections.map((section, index) => {
              const flip = index % 2 === 1;
              return (
                <div
                  key={section.key}
                  className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
                >
                  <div className={cn(flip && "lg:order-2")}>
                    <h3 className="text-h3 font-bold tracking-[-0.01em]">
                      {t(`${f}.sections.${section.key}.title`)}
                    </h3>
                    <p className="mt-4 text-body text-g500">
                      {t(`${f}.sections.${section.key}.body`)}
                    </p>
                  </div>
                  <ScreenImage
                    image={worksImage(section.image)}
                    alt={t(`${f}.sections.${section.key}.alt`)}
                    className={cn(flip && "lg:order-1")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* T5 — other features + tour; the page ends here, no inquiry CTA */}
      <section>
        <div className="px-7 py-16 md:px-10 md:py-20 lg:py-28">
          <SectionHeading
            eyebrow={t("featurePage.othersEyebrow")}
            title={t("featurePage.othersTitle")}
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other) => {
              const Icon = other.icon;
              return (
                <li key={other.slug}>
                  <Link
                    href={featureHref(other.slug)}
                    className="flex h-full flex-col rounded-lg border border-hair p-5 transition-colors hover:border-ink"
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="text-g500"
                    />
                    <span className="mt-3 text-body font-semibold">
                      {t(`features.${other.slug}.name`)}
                    </span>
                    <span className="mt-1 whitespace-pre-line text-sm text-g500">
                      {t(`features.${other.slug}.tagline`)}
                    </span>
                    <span className="mono cap mt-auto pt-4 text-[11px] font-semibold tracking-[0.06em]">
                      {t("featurePage.detail")} <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink href={TOUR_HREF} className="mt-10">
            {t("featurePage.tourButton")}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
