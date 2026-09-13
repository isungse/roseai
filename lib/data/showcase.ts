// Locale-invariant slide metadata. Human-readable strings live under
// `showcase.slides.<i18nKey>` in messages/*.json (see .claude/rules/i18n.md).
// Slides 02/03 are appended here as their images arrive.
export const SHOWCASE_SLIDES = [
  { id: "01", i18nKey: "coffee", src: "/images/showcase-01.jpg" },
] as const;

export type ShowcaseSlideMeta = (typeof SHOWCASE_SLIDES)[number];
