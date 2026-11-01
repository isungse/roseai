"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

import type { KeyboardEvent, ReactNode } from "react";

export interface FeatureTab {
  key: string;
  title: string;
  body: string;
  /** Pre-rendered on the server (the screen image) so no translation or fs access crosses the client boundary. */
  panel: ReactNode;
}

interface FeatureTabsProps {
  label: string;
  tabs: FeatureTab[];
}

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeToLayout(onChange: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getDesktopLayout() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerLayout() {
  return false;
}

// WAI-ARIA tabs: one tab in the Tab order, arrows/Home/End move between tabs,
// the panel is labelled by its tab (ids must exist in the DOM — accessibility.md).
export function FeatureTabs({ label, tabs }: FeatureTabsProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const isDesktop = useSyncExternalStore(subscribeToLayout, getDesktopLayout, getServerLayout);

  function focusTab(index: number) {
    setActive(index);
    refs.current[index]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = tabs.length - 1;
    const moves: Record<string, number> = {
      [isDesktop ? "ArrowDown" : "ArrowRight"]: index === last ? 0 : index + 1,
      [isDesktop ? "ArrowUp" : "ArrowLeft"]: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const target = moves[e.key];
    if (target === undefined) return;
    e.preventDefault();
    focusTab(target);
  }

  if (tabs.length === 0) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
      <div
        role="tablist"
        aria-label={label}
        aria-orientation={isDesktop ? "vertical" : "horizontal"}
        className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {tabs.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.key}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.key}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "shrink-0 rounded-md border px-4 py-3 text-left transition-colors lg:w-full lg:px-5 lg:py-4",
                selected
                  ? "border-ink bg-ink text-paper"
                  : "border-hair bg-paper text-ink hover:border-ink",
              )}
            >
              <span className="block text-sm font-semibold lg:text-body">
                {item.title}
              </span>
              <span
                className={cn(
                  "mt-1 hidden text-sm leading-relaxed lg:block",
                  selected ? "text-paper/80" : "text-g500",
                )}
              >
                {item.body}
              </span>
            </button>
          );
        })}
      </div>

      <div className="min-w-0">
        {tabs.map((item, index) => (
          <div
            key={item.key}
            role="tabpanel"
            id={`${baseId}-panel-${item.key}`}
            aria-labelledby={`${baseId}-tab-${item.key}`}
            hidden={index !== active}
            tabIndex={index === active ? 0 : -1}
          >
            {index === active ? (
              <>
                <p className="mb-4 text-body text-g500 lg:hidden">{item.body}</p>
                {item.panel}
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
