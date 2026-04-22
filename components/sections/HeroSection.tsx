import { useTranslations } from "next-intl";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { HERO_EYEBROW, HERO_KPI, HERO_META } from "@/lib/data/hero";

import { HeroDiagram } from "./HeroDiagram";
import { HeroTimestamp } from "./HeroTimestamp";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative border-b border-hair pt-20 md:pt-24"
      aria-labelledby="hero-headline"
    >
      <SectionLabel code="01 / HERO" />

      <div className="mx-auto max-w-screen-xl px-6 pt-16 md:px-8 md:pt-20">
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-g500">
          {[
            HERO_EYEBROW.seoul,
            HERO_EYEBROW.est,
            null,
            HERO_EYEBROW.status,
          ].map((item, i) => (
            <span
              key={i}
              className="mono flex items-center gap-6 before:text-hair before:content-['/'] first:before:content-none"
            >
              {item ?? <HeroTimestamp />}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-12">
          <h1
            id="hero-headline"
            className="font-display font-extrabold leading-[0.92] tracking-[-0.035em] text-[clamp(52px,9vw,128px)] lg:col-span-9"
          >
            Architecture <span className="text-g500">of</span>
            <span className="block">
              <span className="relative inline-block pr-5">
                Intelligence
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-[6px] h-3.5 w-3.5 bg-brand"
                />
              </span>
              .
            </span>
          </h1>

          <div className="-mt-4 lg:col-span-3 lg:col-start-10 lg:-mt-16">
            <HeroDiagram />
          </div>

          <p className="mt-2 pr-0 text-[17px] leading-[1.55] lg:col-span-7 lg:pr-10">
            {t("sub")}
          </p>

          <dl className="mono mt-2 flex flex-col gap-3 text-xs lg:col-span-4 lg:col-start-9">
            {HERO_META.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between border-b border-hair pb-1.5 text-g500"
              >
                <dt>{row.label}</dt>
                <dd className="font-semibold text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 flex flex-wrap border-t border-ink lg:flex-nowrap">
          {/* VIEW CASE STUDIES — disabled by design decision 2026-04-22.
              Keeping JSX + i18n key "hero.cta.cases" intact so the button
              can be re-enabled without re-translating. */}
          {/* <button
            type="button"
            className="mono cap group inline-flex items-center gap-6 border-r border-hair bg-paper px-7 py-[18px] text-[13px] font-semibold tracking-[0.02em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <span>{t("cta.cases")}</span>
            <span className="mono font-medium transition-transform group-hover:translate-x-1">
              →
            </span>
          </button> */}
          <button
            type="button"
            className="mono cap group inline-flex items-center gap-6 bg-brand px-7 py-[18px] text-[13px] font-semibold tracking-[0.02em] text-paper transition-colors hover:bg-ink"
          >
            <span>{t("cta.demo")}</span>
            <span className="mono font-medium transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        <div
          role="list"
          className="grid grid-cols-2 border-b border-t border-ink md:grid-cols-4"
        >
          {HERO_KPI.map((cell, i) => (
            <div
              key={cell.tag}
              role="listitem"
              className={`relative px-6 pb-6 pt-7 ${
                i > 0 ? "border-l border-hair md:[&:nth-child(3)]:border-l-0" : ""
              } ${i >= 2 ? "border-t border-hair md:border-t-0" : ""}`}
            >
              <div className="mono flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.04em] text-brand">
                <span>{cell.tag}</span>
              </div>
              <div className="mt-[18px] font-display text-[44px] font-bold leading-none tracking-[-0.03em] tabular-nums">
                {cell.num}{" "}
                <small className="text-[20px] font-medium text-g500 tracking-normal">
                  {cell.unit}
                </small>
              </div>
              <div className="mt-2.5 text-xs text-g500">
                {t(`kpi.${cell.i18nKey}`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
