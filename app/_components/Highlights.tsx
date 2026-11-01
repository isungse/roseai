import { useTranslations } from "next-intl";

import { Building2, Lock, SlidersHorizontal, type LucideIcon } from "lucide-react";

import { WORKS_HUB_IMAGES } from "@/lib/data/works";
import { worksImage } from "@/lib/works/images";

import { ScreenImage } from "./ScreenImage";

const CARDS: readonly { key: string; icon: LucideIcon }[] = [
  { key: "tailored", icon: SlidersHorizontal },
  { key: "proven", icon: Building2 },
  { key: "secure", icon: Lock },
];

export function Highlights() {
  const t = useTranslations("works.highlights");

  return (
    <section className="bg-g50">
      <div className="px-6 py-16 md:px-10 md:py-20 lg:py-28">
        <p className="text-sm font-semibold text-copy">{t("eyebrow")}</p>
        <h2 className="mt-3 text-h3 font-bold tracking-tight md:text-section">{t("title")}</h2>

        <ul className="mt-10 grid gap-5 lg:grid-cols-2 lg:grid-rows-2">
          {CARDS.map(({ key, icon: Icon }) => (
            <li
              key={key}
              className={`flex flex-col rounded-lg bg-paper p-7 md:p-9 ${key === "tailored" ? "lg:row-span-2" : ""}`}
            >
              <Icon
                size={24}
                strokeWidth={1.75}
                aria-hidden="true"
                className="text-brand"
              />
              <h3 className="mt-4 text-h3 font-bold tracking-tight">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-3 text-body leading-7 text-copy">{t(`${key}.body`)}</p>
              {key === "tailored" && (
                <ScreenImage
                  image={worksImage(WORKS_HUB_IMAGES.tailored)}
                  alt={t("tailored.alt")}
                  sizes="(min-width: 1360px) 556px, (min-width: 1024px) 42vw, 85vw"
                  className="mt-8"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
