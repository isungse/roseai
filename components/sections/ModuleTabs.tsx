"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, type KeyboardEvent } from "react";

import { MODULE_STATUS, type Module } from "@/lib/data/modules";
import { cn } from "@/lib/utils";

interface ModuleTabsProps {
  modules: ReadonlyArray<Module>;
}

export function ModuleTabs({ modules }: ModuleTabsProps) {
  const t = useTranslations("modules");
  const [activeId, setActiveId] = useState(modules[0].id);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const active = modules.find((m) => m.id === activeId) ?? modules[0];

  function moveFocus(nextIndex: number) {
    const target = buttonsRef.current[nextIndex];
    if (!target) return;
    target.focus();
    setActiveId(modules[nextIndex].id);
  }

  function handleKey(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveFocus((index + 1) % modules.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveFocus((index - 1 + modules.length) % modules.length);
        break;
      case "Home":
        e.preventDefault();
        moveFocus(0);
        break;
      case "End":
        e.preventDefault();
        moveFocus(modules.length - 1);
        break;
    }
  }

  return (
    <div className="grid grid-cols-1 border-y border-ink md:grid-cols-[4fr_8fr]">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Modules"
        className="flex flex-col border-b border-hair md:border-b-0 md:border-r"
      >
        {modules.map((m, i) => {
          const isActive = m.id === activeId;
          return (
            <button
              key={m.id}
              ref={(el) => {
                buttonsRef.current[i] = el;
              }}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls="module-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(m.id)}
              onKeyDown={(e) => handleKey(e, i)}
              className={cn(
                "grid grid-cols-[48px_1fr_auto] items-center gap-3 border-b border-hair px-5 py-5 text-left transition-colors last:border-b-0",
                isActive ? "bg-ink text-paper" : "bg-paper hover:bg-g50",
              )}
            >
              <span
                className={cn(
                  "mono text-sm font-semibold",
                  isActive ? "text-brand" : "text-g500",
                )}
              >
                {m.id}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-semibold tracking-[-0.01em]">
                  {t(`${m.i18nKey}.title`)}
                </span>
                <span
                  className={cn(
                    "mt-0.5 block truncate text-xs",
                    isActive ? "text-paper/60" : "text-g500",
                  )}
                >
                  {t(`${m.i18nKey}.em`)}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "mono text-xs",
                  isActive ? "text-brand" : "text-g500",
                )}
              >
                →
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="module-panel"
        role="tabpanel"
        aria-labelledby={`module-tab-${active.id}`}
        className="relative min-h-[440px] p-8 md:p-10"
      >
        <div className="mono absolute right-8 top-8 text-right text-[11px] text-g500 md:right-10 md:top-10">
          <div>FIG. 02.{active.id}</div>
          <div className="mt-1">
            {MODULE_STATUS.statusLabel} ·{" "}
            <span className="text-brand">{MODULE_STATUS.statusValue}</span>
          </div>
          <div className="mt-1">{MODULE_STATUS.version}</div>
        </div>

        <div
          aria-hidden="true"
          className="mono text-[64px] font-semibold leading-none tracking-[-0.02em] text-brand md:text-[72px]"
        >
          {active.id}
        </div>

        <h3 className="mt-6 font-display text-[32px] font-bold leading-[1.05] tracking-[-0.025em] md:text-[40px]">
          {t(`${active.i18nKey}.title`)}
          <em className="mt-2 block text-[18px] font-semibold not-italic tracking-[-0.01em] text-g500 md:text-[20px]">
            {t(`${active.i18nKey}.em`)}
          </em>
        </h3>

        <p className="mt-6 max-w-[56ch] text-[15px] leading-[1.6]">
          {t(`${active.i18nKey}.desc`)}
        </p>

        <div className="mt-7 flex flex-wrap">
          {active.stack.map((s) => (
            <span
              key={s}
              className="mono -mb-px -mr-px border border-hair px-3 py-2 text-[11px] font-medium"
            >
              {s}
            </span>
          ))}
        </div>

        <a
          href="#"
          className="mono cap mt-9 inline-flex items-center gap-3 border-b border-ink pb-1.5 text-xs font-semibold tracking-[0.04em] transition-colors hover:border-brand hover:text-brand"
        >
          {t("liveDemo")} <span aria-hidden="true">→</span>
        </a>

        {/* Module preview placeholder — hidden until the demo HTML files
            are linked in per module. When restoring, decide whether this
            becomes an <iframe> loading the demo page or a static thumbnail. */}
        {/* <div
          aria-hidden="true"
          className="mono relative mt-10 hidden aspect-[16/9] w-[44%] items-end justify-between border border-hair p-2.5 text-[10px] text-g500 lg:absolute lg:bottom-10 lg:right-10 lg:mt-0 lg:flex"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, var(--g50) 0 8px, transparent 8px 16px)",
          }}
        >
          <span className="absolute left-2.5 top-2.5 h-2 w-2 bg-brand" />
          <span>{t("previewLabel")}</span>
          <span>{MODULE_STATUS.previewSize}</span>
        </div> */}
      </div>
    </div>
  );
}
