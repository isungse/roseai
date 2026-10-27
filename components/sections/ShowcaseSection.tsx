import { useTranslations } from "next-intl";

import { SHOWCASE_SLIDES } from "@/lib/data/showcase";

import { ShowcaseCarousel } from "./ShowcaseCarousel";

// Server shell: resolves translations and hands plain strings to the client
// carousel so `useTranslations` never crosses the "use client" boundary.
export function ShowcaseSection() {
  const t = useTranslations("showcase");

  // `heading` is optional per slide: omit the key in BOTH locale files and
  // the carousel renders the body at statement size instead.
  const slides = SHOWCASE_SLIDES.map((s) => ({
    id: s.id,
    src: s.src,
    alt: t(`slides.${s.i18nKey}.alt`),
    heading: t.has(`slides.${s.i18nKey}.heading`)
      ? t(`slides.${s.i18nKey}.heading`)
      : undefined,
    body: t(`slides.${s.i18nKey}.body`),
    accent: t.has(`slides.${s.i18nKey}.accent`)
      ? t(`slides.${s.i18nKey}.accent`)
      : undefined,
    // The CTA label is a locale-invariant design element (like the logo and
    // the TopBar `WORKS` link), so it is not translated.
    cta: s.href ? { label: "WORKS", href: s.href } : undefined,
  }));

  return (
    // flex-1 + items-center: the only section takes the shell's remaining
    // height (see design-system.md "Page Shell") and centers vertically.
    <section
      id="showcase"
      className="relative flex flex-1 items-center border-b border-hair"
    >
      {/* Vertical padding is deliberately modest: on tall viewports flex
          centering supplies the breathing room, and on 768–900px laptops the
          smaller padding keeps the whole card (footer included) on screen. */}
      <div className="w-full px-7 py-12 md:px-10 md:py-16">
        <ShowcaseCarousel
          slides={slides}
          labels={{
            region: t("regionLabel"),
            prev: t("prev"),
            next: t("next"),
            goTo: slides.map((_, i) => t("goTo", { index: i + 1 })),
          }}
        />
      </div>
    </section>
  );
}
