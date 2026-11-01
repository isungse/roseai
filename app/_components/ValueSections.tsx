import { useTranslations } from "next-intl";

import {
  BadgeCheck,
  BookOpen,
  Calendar,
  CalendarClock,
  CheckSquare,
  DoorOpen,
  FileSignature,
  Headset,
  ListTodo,
  MessageSquare,
  Network,
  Newspaper,
  Send,
  ShieldCheck,
  Vote,
  type LucideIcon,
} from "lucide-react";

import { WORKS_HUB_IMAGES } from "@/lib/data/works";
import { cn } from "@/lib/utils";
import { worksImage } from "@/lib/works/images";

import { ScreenImage } from "./ScreenImage";
import { SectionHeading } from "./SectionHeading";

// Icon per bullet; the labels come from `works.values.<zone>.items` in the
// same order (i18n keeps text, this file keeps the locale-invariant icons).
const ZONES: readonly { key: string; image: string; icons: readonly LucideIcon[] }[] = [
  {
    key: "collab",
    image: WORKS_HUB_IMAGES.collab,
    icons: [MessageSquare, Newspaper, Calendar, DoorOpen, Vote],
  },
  {
    key: "flow",
    image: WORKS_HUB_IMAGES.flow,
    icons: [FileSignature, Headset, BookOpen, ListTodo, CheckSquare],
  },
  {
    key: "hr",
    image: WORKS_HUB_IMAGES.hr,
    icons: [CalendarClock, BadgeCheck, Send, Network, ShieldCheck],
  },
];

export function ValueSections() {
  const t = useTranslations("works.values");

  return (
    <section>
      <div className="px-6 py-16 md:px-10 md:py-20 lg:py-28">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div className="mt-12 flex flex-col gap-16 lg:mt-16 lg:gap-28">
          {ZONES.map((zone, index) => {
            const items = t.raw(`${zone.key}.items`) as string[];
            const flip = index % 2 === 1;
            return (
              <article
                key={zone.key}
                className={cn("benefit-section", flip && "benefit-section-reverse")}
              >
                <div className="benefit-heading">
                  <p className="text-sm font-semibold text-brand">{t(`${zone.key}.eyebrow`)}</p>
                  <h3 className="mt-3 whitespace-pre-line text-h3 font-bold leading-snug tracking-tight md:text-section">
                    {t(`${zone.key}.title`)}
                  </h3>
                </div>
                <p className="benefit-description text-body leading-7 text-copy">
                  {t(`${zone.key}.body`)}
                </p>
                <ul className="benefit-links flex flex-wrap gap-x-5 gap-y-3">
                  {items.map((label, i) => {
                    const Icon = zone.icons[i];
                    return (
                      <li
                        key={label}
                        className="inline-flex items-center gap-2 text-sm font-medium"
                      >
                        <Icon
                          size={16}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          className="text-brand"
                        />
                        {label}
                      </li>
                    );
                  })}
                </ul>
                <div className="benefit-visual rounded-2xl bg-g50 p-3 md:p-5">
                  <ScreenImage
                    image={worksImage(zone.image)}
                    alt={t(`${zone.key}.alt`)}
                    sizes="(min-width: 1360px) 568px, (min-width: 1024px) 44vw, 90vw"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
