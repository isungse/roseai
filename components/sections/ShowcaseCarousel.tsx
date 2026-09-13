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
  heading: string;
  body: string;
}

interface ShowcaseCarouselProps {
  slides: ShowcaseSlide[];
  labels: { region: string; prev: string; next: string };
  cta: ReactNode;
}

const AUTOPLAY_MS = 5000;

type Position = "active" | "left" | "right" | "hidden";

const POSITION_CLASS: Record<Position, string> = {
  active:
    "z-30 opacity-100 [transform:translate3d(0,0,0)_scale(1)_rotateY(0)]",
  left: "z-20 opacity-100 [transform:translate3d(-14%,-11%,0)_scale(0.85)_rotateY(15deg)]",
  right:
    "z-20 opacity-100 [transform:translate3d(14%,-11%,0)_scale(0.85)_rotateY(-15deg)]",
  hidden: "pointer-events-none z-10 opacity-0",
};

const ARROW_CLASS =
  "inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-brand";

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
  const headingWords = countWords(slide.heading);

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

      <div>
        {multi && (
          <p className="mono mb-5 text-xs tabular-nums text-g500">
            {slide.id} / {String(length).padStart(2, "0")}
          </p>
        )}

        {/* Keyed on the slide so the word stagger replays on change. */}
        <div key={slide.id} aria-live="polite" aria-atomic="true">
          <h1 className="text-balance text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.25] tracking-[-0.02em]">
            <RevealText text={slide.heading} />
          </h1>
          <p className="mt-6 whitespace-pre-line text-[clamp(16px,1.25vw,19px)] leading-[1.8] text-ink">
            <RevealText text={slide.body} startIndex={headingWords} />
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          {multi && (
            <>
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
            </>
          )}
          {cta}
        </div>
      </div>
    </div>
  );
}
