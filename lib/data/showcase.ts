// Locale-invariant slide metadata. Human-readable strings live under
// `showcase.slides.<i18nKey>` in messages/*.json (see .claude/rules/i18n.md).
// Slide 03 is appended here when its image arrives.
export const SHOWCASE_SLIDES = [
  { id: "01", i18nKey: "coffee", src: "/images/showcase-01.jpg" },
  { id: "02", i18nKey: "evening", src: "/images/showcase-02.jpg" },
] as const;

export type ShowcaseSlideMeta = (typeof SHOWCASE_SLIDES)[number];
