import { useTranslations } from "next-intl";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { MODULES } from "@/lib/data/modules";

import { ModuleTabs } from "./ModuleTabs";

export function ModulesSection() {
  const t = useTranslations("modules");

  return (
    <section
      id="modules"
      aria-labelledby="modules-heading"
      className="relative border-b border-hair"
    >
      <SectionLabel code="02 / MODULES" />

      <div className="mx-auto max-w-screen-xl px-6 pb-24 pt-24 md:px-8 md:pb-32 md:pt-32">
        <h2
          id="modules-heading"
          className="mb-12 font-display text-[clamp(32px,4.2vw,56px)] font-bold leading-[1.05] tracking-[-0.02em]"
        >
          {t("headingMain")}{" "}
          <em className="font-bold not-italic text-g500">{t("headingEm")}</em>
        </h2>
        <ModuleTabs modules={MODULES} />
      </div>
    </section>
  );
}
