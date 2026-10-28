import { useTranslations } from "next-intl";

import { featureHref, TOUR_HREF, WORKS_FEATURES } from "@/lib/data/works";

import { Logo } from "./Logo";
import { TopBarNav } from "./TopBarNav";

// One bar for the whole site (works spec §2.1): product logo → home, then the
// five features and the tour. No language toggle — the site is Korean-only.
export function TopBar() {
  const t = useTranslations();

  const links = [
    ...WORKS_FEATURES.map((f) => ({
      href: featureHref(f.slug),
      label: t(`works.features.${f.slug}.name`),
    })),
    { href: TOUR_HREF, label: t("works.nav.tour") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-paper/90 backdrop-blur-md">
      <div className="flex flex-col lg:h-16 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex h-16 items-center px-7 md:px-10 lg:px-0">
          <Logo product />
        </div>
        <TopBarNav label={t("common.productNav")} links={links} />
      </div>
    </header>
  );
}
