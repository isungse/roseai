import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { TOUR_HREF, WORKS_HUB_IMAGES } from "@/lib/data/works";
import { worksImage } from "@/lib/works/images";

import { ScreenImage } from "./ScreenImage";

// Last hub section: the whole menu, no inquiry CTA (owner decision 2026-10-27).
export function TourBanner() {
  const t = useTranslations("works.tourBanner");

  return (
    <section className="border-t border-hair">
      <div className="grid items-center gap-10 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div>
          <p className="text-sm font-semibold text-brand">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-h3 font-bold tracking-tight md:text-section">
            {t("title")}
          </h2>
          <p className="mt-5 text-body leading-7 text-copy">{t("body")}</p>
          <ButtonLink href={TOUR_HREF} className="mt-8">
            {t("button")}
          </ButtonLink>
        </div>
        <div className="rounded-2xl bg-g50 p-4 md:p-6">
          <ScreenImage
            image={worksImage(WORKS_HUB_IMAGES.heroDesktop)}
            alt={t("alt")}
            sizes="(min-width: 1360px) 560px, (min-width: 1024px) 43vw, 85vw"
          />
        </div>
      </div>
    </section>
  );
}
