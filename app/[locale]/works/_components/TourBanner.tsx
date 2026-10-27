import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { WORKS_HUB_IMAGES } from "@/lib/data/works";
import { worksImage } from "@/lib/works/images";

import { ScreenImage } from "./ScreenImage";

// Last hub section: the whole menu, no inquiry CTA (owner decision 2026-10-27).
export function TourBanner() {
  const t = useTranslations("works.tourBanner");

  return (
    <section>
      <div className="grid items-center gap-10 px-7 py-16 md:px-10 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div>
          <p className="mono cap text-xs font-medium tracking-[0.08em] text-brand">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-h2 font-bold tracking-[-0.02em] md:text-h1">
            {t("title")}
          </h2>
          <p className="mt-5 text-body-lg text-g500">{t("body")}</p>
          <ButtonLink href="/works/tour" locale="ko" className="mt-8">
            {t("button")}
          </ButtonLink>
        </div>
        <ScreenImage
          image={worksImage(WORKS_HUB_IMAGES.sidebar)}
          alt={t("alt")}
        />
      </div>
    </section>
  );
}
