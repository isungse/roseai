import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { permanentRedirect } from "next/navigation";

import { type Locale } from "@/i18n/routing";
import { worksMetadata } from "@/lib/works/metadata";

import { FeatureGrid } from "./_components/FeatureGrid";
import { Highlights } from "./_components/Highlights";
import { TourBanner } from "./_components/TourBanner";
import { ValueSections } from "./_components/ValueSections";
import { WorksHero } from "./_components/WorksHero";
import { WorksSubnav } from "./_components/WorksSubnav";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "ko") return {};
  const t = await getTranslations({ locale, namespace: "works.meta" });
  return worksMetadata({
    path: "/works",
    title: t("title"),
    description: t("description"),
  });
}

export default async function WorksHubPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  // Config redirects already send /en/works here; this guard keeps the
  // Korean-only messages from being requested for any other locale.
  if (locale !== "ko") permanentRedirect("/ko/works");
  setRequestLocale(locale);

  return (
    <>
      <WorksSubnav current="overview" />
      <WorksHero />
      <ValueSections />
      <Highlights />
      <FeatureGrid />
      <TourBanner />
    </>
  );
}
