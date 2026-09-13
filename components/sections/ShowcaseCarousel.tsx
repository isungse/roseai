"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { RevealText, countWords } from "@/components/ui/RevealText";

export interface ShowcaseSlide {
  id: string;
  src: string;
  alt: string;
  /** Optional. Heading-less slides render the body at statement size. */
  heading?: string;
  body: string;
}

interface ShowcaseCarouselProps {
  slides: ShowcaseSlide[];
  /** `goTo[i]` is the accessible label of the i-th indicator dot. */
  labels: { region: string; prev: string; next: string; goTo: string[] };
  cta: ReactNode;
}

const AUTOPLAY_MS = 5000;

type Position = "active" | "left" | "right" | "hidden";

const POSITION_CLASS: Record<Position, string> = {
  active:
    "z-30 opacity-100 [transform:translate3d(0,0,0)_scale(1)_rotateY(0)]",
  // The peek must read as "there is another card": ~18% offset with a mild
  // scale. The stack wrapper's inner padding gives it room so the rotated
  // edge never crosses the shell border.
  left: "z-20 opacity-100 [transform:translate3d(-18%,-13%,0)_scale(0.88)_rotateY(15deg)]",
  right:
    "z-20 opacity-100 [transform:translate3d(18%,-13%,0)_scale(0.88)_rotateY(-15deg)]",
  hidden: "pointer-events-none z-10 opacity-0",
};

const ARROW_CLASS =
  "inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-brand";

const HEADING_CLASS =
  "whitespace-pre-line text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.25] tracking-[-0.02em]";
const BODY_CLASS =
  "mt-6 whitespace-pre-line text-[clamp(16px,1.25vw,19px)] leading-[1.8] text-ink";
// Heading-less slides: the first line does the heading's job, so the whole
// body is set at statement size to keep a 1:1 weight with the image.
const STATEMENT_CLASS =
  "whitespace-pre-line text-[clamp(22px,2vw,26px)] font-medium leading-[1.6] tracking-[-0.01em] text-ink";

function positionOf(index: number, active: number, length: number): Position {
  if (index === active) return "active";
  if (index === (active - 1 + length) % length) return "left";
  if (index === (active + 1) % length) return "right";
  return "hidden";
}

export function ShowcaseCarousel({
  slides,
  labels,
  cta,
}: ShowcaseCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const length = slides.length;
  const multi = length > 1;

  const next = useCallback(() => setActive((i) => (i + 1) % length), [length]);
  const prev = useCallback(
    () => setActive((i) => (i - 1 + length) % length),
    [length],
  );

  // Autoplay pauses on hover / focus-within and is off entirely under
  // prefers-reduced-motion (WCAG 2.2.2: the user must be able to stop it).
  useEffect(() => {
    if (!multi || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [multi, paused, next]);

  // Arrow keys only while focus is inside the carousel. A window-level
  // listener would hijack the keys page-wide.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!multi) return;
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  const slide = slides[active];
  const headingWords = slide.heading ? countWords(slide.heading) : 0;
  // The page's single h1 is slide 01's heading. It stays in the DOM (sr-only)
  // while other slides are active so the outline never loses its h1.
  const pageTitle = slides[0].heading ?? labels.region;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20"
    >
      {/* Outer padding reserves room for the peeking card's overhang. */}
      <div className="px-6 md:px-10">
        <div className="relative mx-auto aspect-square w-full max-w-[520px] [perspective:1000px]">
          {slides.map((s, i) => (
          <Image
            key={s.id}
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`rounded-2xl object-cover shadow-lg transition-[transform,opacity] duration-[400ms] ${POSITION_CLASS[positionOf(i, active, length)]}`}
          />
          ))}
        </div>
      </div>

      <div>
        {multi && (
          <p className="mono mb-5 text-xs tabular-nums text-g500">
            {slide.id} / {String(length).padStart(2, "0")}
          </p>
        )}

        {/* Keyed on the slide so the word stagger replays on change. */}
        <div key={slide.id} aria-live="polite" aria-atomic="true">
          <h1 className={active === 0 ? HEADING_CLASS : "sr-only"}>
            {active === 0 ? <RevealText text={pageTitle} /> : pageTitle}
          </h1>
          {active !== 0 && slide.heading && (
            <h2 className={HEADING_CLASS}>
              <RevealText text={slide.heading} />
            </h2>
          )}
          <p className={slide.heading ? BODY_CLASS : STATEMENT_CLASS}>
            <RevealText text={slide.body} startIndex={headingWords} />
          </p>
        </div>

        {/* Arrows + dots sit left; the CTA is pushed to the text column's
            right edge so it doesn't crowd the navigation. */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          {multi && (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label={labels.prev}
                className={ARROW_CLASS}
              >
                <ArrowLeft size={20} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={labels.next}
                className={ARROW_CLASS}
              >
                <ArrowRight size={20} strokeWidth={1.75} />
              </button>
              <div className="flex items-center gap-2 px-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={labels.goTo[i]}
                    aria-current={i === active ? "true" : undefined}
                    className={`h-2.5 rounded-full transition-[width,background-color] ${
                      i === active ? "w-7 bg-brand" : "w-2.5 bg-hair hover:bg-g500"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="ml-auto">{cta}</div>
        </div>
      </div>
    </div>
  );
}
