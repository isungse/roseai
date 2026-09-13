import { useTranslations } from "next-intl";

import { SHOWCASE_SLIDES } from "@/lib/data/showcase";

import { ContactTrigger } from "./ContactTrigger";
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
          cta={
            <ContactTrigger className="mono cap inline-flex items-center gap-6 bg-brand px-5 py-3.5 text-sm font-semibold tracking-[0.04em] text-paper transition-colors hover:bg-ink">
              <span>CONTACT</span>
              <span aria-hidden="true">→</span>
            </ContactTrigger>
          }
        />
      </div>
    </section>
  );
}
