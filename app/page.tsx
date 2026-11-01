import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { worksMetadata } from "@/lib/works/metadata";

import { FeatureGrid } from "./_components/FeatureGrid";
import { Highlights } from "./_components/Highlights";
import { TourBanner } from "./_components/TourBanner";
import { ValueSections } from "./_components/ValueSections";
import { WorksHero } from "./_components/WorksHero";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("works.meta");
  return worksMetadata({
    path: "/",
    title: t("title"),
    description: t("description"),
    absoluteTitle: true,
  });
}

// The introduction explains the product; the tour owns the complete menu.
export default function HomePage() {
  return (
    <>
      <WorksHero />
      <ValueSections />
      <Highlights />
      <FeatureGrid />
      <TourBanner />
    </>
  );
}
