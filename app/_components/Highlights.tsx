import { useTranslations } from "next-intl";

import { Building2, Lock, SlidersHorizontal, type LucideIcon } from "lucide-react";

import { WORKS_HUB_IMAGES } from "@/lib/data/works";
import { worksImage } from "@/lib/works/images";

import { ScreenImage } from "./ScreenImage";
import { SectionHeading } from "./SectionHeading";

const CARDS: readonly { key: string; icon: LucideIcon }[] = [
  { key: "proven", icon: Building2 },
  { key: "tailored", icon: SlidersHorizontal },
  { key: "secure", icon: Lock },
];

export function Highlights() {
  const t = useTranslations("works.highlights");

  return (
    // Sections stay on paper: g500 body text and the brand eyebrow fall under
    // 4.5:1 on the g50 backdrop (Lighthouse color-contrast, 2026-10-27).
    <section className="border-b border-hair">
      <div className="px-7 py-16 md:px-10 md:py-20 lg:py-28">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {CARDS.map(({ key, icon: Icon }) => (
            <li
              key={key}
              className="flex flex-col rounded-lg border border-hair p-7 shadow-sm"
            >
              <Icon
                size={24}
                strokeWidth={1.75}
                aria-hidden="true"
                className="text-brand"
              />
              <h3 className="mt-5 text-h3 font-bold tracking-[-0.01em]">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-3 text-body text-g500">{t(`${key}.body`)}</p>
              {key === "tailored" && (
                <ScreenImage
                  image={worksImage(WORKS_HUB_IMAGES.tailored)}
                  alt={t("tailored.alt")}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="mt-6 shadow-sm"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
