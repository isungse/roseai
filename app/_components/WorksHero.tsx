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

// Home S1 (works spec §4). The visual is the composed product artwork
// (spec §3) once it is published, and the desktop + phone capture pair before.
export function WorksHero() {
  const t = useTranslations("works.hero");
  const art = heroArtwork();
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
            <Accented text={t("lead")} accent={t("accent")} />
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={TOUR_HREF}>{t("ctaTour")}</ButtonLink>
            <ButtonLink href="/#features" variant="secondary">
              {t("ctaFeatures")}
            </ButtonLink>
          </div>
        </div>

        {art ? (
          // The artwork carries its own frames and background; the hero panel
          // radius (design-system "rounded-2xl") is the only framing it gets.
          <Image
            src={art.src}
            alt={t("artAlt")}
            width={art.width}
            height={art.height}
            preload
            fetchPriority="high"
            sizes="(min-width: 1024px) 58vw, 100vw"
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
    </section>
  );
}
