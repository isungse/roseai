import { useTranslations } from "next-intl";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { TOUR_HREF, WORKS_HUB_IMAGES } from "@/lib/data/works";
import { heroArtwork, worksImage } from "@/lib/works/images";

import { ScreenImage } from "./ScreenImage";

interface AccentedProps {
  text: string;
  /** One phrase inside `text` drawn in brand red (design-system: accent phrase). */
  accent: string;
}

function Accented({ text, accent }: AccentedProps) {
  const at = text.indexOf(accent);
  if (!accent || at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="text-brand">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}

export function WorksHero() {
  const t = useTranslations("works.hero");
  const art = heroArtwork();
  const desktop = worksImage(WORKS_HUB_IMAGES.heroDesktop);
  const mobile = worksImage(WORKS_HUB_IMAGES.heroMobile, "mobile");

  return (
    <section className="px-6 pb-16 pt-12 md:px-10 md:pb-20 md:pt-20">
      <div className="text-center">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold tracking-wide text-brand">
            {t("eyebrow")}
          </p>
          <h1 className="mt-5 whitespace-pre-line text-h2 font-bold leading-snug tracking-tight md:text-intro">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-prose whitespace-pre-line text-body text-copy md:text-body-lg">
            <Accented text={t("lead")} accent={t("accent")} />
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/#features">
              {t("ctaFeatures")}
            </ButtonLink>
            <ButtonLink href={TOUR_HREF} variant="secondary">{t("ctaTour")}</ButtonLink>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-5xl md:mt-16">
          {art ? (
            // The artwork carries its own frames and background; the hero panel
            // radius (design-system "rounded-2xl") is the only framing it gets.
            <Image
              src={art.src}
              alt={t("artAlt")}
              width={art.width}
              height={art.height}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1152px) 1024px, 90vw"
              className="block h-auto w-full rounded-2xl"
            />
          ) : (
            // Desktop capture with the phone capture overlapping its bottom-right
            // corner; the padding reserves room for the overhang.
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
          )}
        </div>
      </div>
    </section>
  );
}
