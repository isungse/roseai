// Locale-invariant slide metadata. Human-readable strings live under
// `showcase.slides.<i18nKey>` in messages/*.json (see .claude/rules/i18n.md).
export interface ShowcaseSlideMeta {
  id: string;
  i18nKey: string;
  src: string;
  /** Product slides link somewhere; the carousel renders a per-slide CTA. */
  href?: string;
}

export const SHOWCASE_SLIDES: readonly ShowcaseSlideMeta[] = [
  { id: "01", i18nKey: "coffee", src: "/images/showcase-01-coffee.jpg" },
  // ROSE-AI WORKS — the one product slide (owner decision 2026-10-27). Second
  // so the brand opener keeps the h1 while the product card peeks on the
  // right from the first paint. The artwork is replaced by a JPEG
  // composition of real UI snapshots once those exist.
  {
    id: "02",
    i18nKey: "works",
    src: "/images/showcase-02-works.svg",
    href: "/works",
  },
  { id: "03", i18nKey: "office", src: "/images/showcase-03-office.jpg" },
  { id: "04", i18nKey: "evening", src: "/images/showcase-04-evening.jpg" },
  { id: "05", i18nKey: "camp", src: "/images/showcase-05-camp.jpg" },
];
