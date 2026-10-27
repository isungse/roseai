import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { WORKS_HUB_IMAGES } from "@/lib/data/works";
import { worksImage } from "@/lib/works/images";

import { ScreenImage } from "./ScreenImage";

export function WorksHero() {
  const t = useTranslations("works.hero");
  const desktop = worksImage(WORKS_HUB_IMAGES.heroDesktop);
  const mobile = worksImage(WORKS_HUB_IMAGES.heroMobile, "mobile");

  return (
    <section className="border-b border-hair">
      <div className="grid gap-12 px-7 py-16 md:px-10 md:py-20 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-16 lg:py-28">
        <div>
          <p className="mono cap text-xs font-medium tracking-[0.08em] text-brand">
            {t("eyebrow")}
          </p>
          <h1 className="mt-5 whitespace-pre-line text-h2 font-bold tracking-[-0.02em] md:text-h1">
            {t("title")}
          </h1>
          <p className="mt-6 whitespace-pre-line text-body-lg text-g500">
            {t("lead")}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/works/tour" locale="ko">
              {t("ctaTour")}
            </ButtonLink>
            <ButtonLink href="/works#features" locale="ko" variant="secondary">
              {t("ctaFeatures")}
            </ButtonLink>
          </div>
        </div>

        {/* Desktop capture with the phone capture overlapping its bottom-right
            corner; the padding reserves room for the overhang. */}
        <div className="relative pb-14 pr-8 sm:pr-14">
          <ScreenImage
            image={desktop}
            alt={t("desktopAlt")}
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
          <ScreenImage
            image={mobile}
            alt={t("mobileAlt")}
            sizes="200px"
            className="absolute bottom-0 right-0 w-[30%] max-w-[200px] rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
