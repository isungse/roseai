import { useTranslations } from "next-intl";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { HERO_EYEBROW } from "@/lib/data/hero";

import { HeroDiagram } from "./HeroDiagram";
import { HeroTimestamp } from "./HeroTimestamp";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative border-b border-hair pt-24 md:pt-32"
      aria-labelledby="hero-headline"
    >
      <SectionLabel code="01 / HERO" />

      <div className="mx-auto max-w-screen-xl px-6 pb-20 pt-16 md:px-8 md:pb-28 md:pt-20">
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-g500">
          <span className="mono flex items-center gap-6 before:text-hair before:content-['/'] first:before:content-none">
            {HERO_EYEBROW.seoul}
          </span>
          <span className="mono flex items-center gap-6 before:text-hair before:content-['/']">
            {HERO_EYEBROW.est}
          </span>
          <span className="mono flex items-center gap-6 before:text-hair before:content-['/']">
            <HeroTimestamp />
          </span>
          <span className="mono flex items-center gap-6 before:text-hair before:content-['/']">
            {HERO_EYEBROW.status}
          </span>
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
        </div>

      </div>
    </section>
  );
}
