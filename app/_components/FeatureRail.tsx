"use client";

import { useEffect, useId, useRef, useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";

import type { ReactNode } from "react";

interface FeatureRailProps {
  label: string;
  previousLabel: string;
  nextLabel: string;
  children: ReactNode;
}

export function FeatureRail({ label, previousLabel, nextLabel, children }: FeatureRailProps) {
  const id = useId();
  const rail = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => {
      const start = element.scrollLeft <= 1;
      const end = element.scrollLeft + element.clientWidth >= element.scrollWidth - 2;
      setEdges((current) => current.start === start && current.end === end ? current : { start, end });
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, []);

  function move(direction: number) {
    const element = rail.current;
    const card = element?.firstElementChild;
    if (!element || !card) return;
    const distance = card.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap);
    element.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <div className="mt-8">
      <div className="mb-5 flex justify-end gap-3 px-6 md:px-10">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={edges.start}
          aria-label={previousLabel}
          aria-controls={id}
          className="inline-flex size-11 items-center justify-center rounded-full border border-hair bg-paper transition-colors hover:border-ink disabled:cursor-default disabled:opacity-30"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={edges.end}
          aria-label={nextLabel}
          aria-controls={id}
          className="inline-flex size-11 items-center justify-center rounded-full border border-hair bg-paper transition-colors hover:border-ink disabled:cursor-default disabled:opacity-30"
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
      <ul
        ref={rail}
        id={id}
        aria-label={label}
        className="feature-rail flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:gap-6 md:px-10"
      >
        {children}
      </ul>
    </div>
  );
}
