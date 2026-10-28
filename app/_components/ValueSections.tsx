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
    <section className="border-b border-hair">
      <div className="px-7 py-16 md:px-10 md:py-20 lg:py-28">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div className="mt-14 flex flex-col gap-16 lg:gap-24">
          {ZONES.map((zone, index) => {
            const items = t.raw(`${zone.key}.items`) as string[];
            const flip = index % 2 === 1;
            return (
              <div
                key={zone.key}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <div className={cn(flip && "lg:order-2")}>
                  <h3 className="text-h3 font-bold tracking-[-0.01em]">
                    {t(`${zone.key}.title`)}
                  </h3>
                  <p className="mt-4 text-body text-g500">
                    {t(`${zone.key}.body`)}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
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
                </div>
                <ScreenImage
                  image={worksImage(zone.image)}
                  alt={t(`${zone.key}.alt`)}
                  className={cn(flip && "lg:order-1")}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
