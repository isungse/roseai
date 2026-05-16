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
      <SectionLabel code="02 / PRODUCTION" />

      <div className="px-7 pb-16 pt-16 md:px-10 md:pb-20 md:pt-20">
        <h2
          id="modules-heading"
          className="mb-10 font-display text-[clamp(28px,3.6vw,48px)] font-bold leading-[1.05] tracking-[-0.02em]"
        >
          {t("headingMain")}{" "}
          <em className="font-bold not-italic text-g500">{t("headingEm")}</em>
        </h2>
        <ModuleTabs modules={MODULES} />
      </div>
    </section>
  );
}
