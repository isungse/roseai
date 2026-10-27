import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound, permanentRedirect } from "next/navigation";

import { type Locale } from "@/i18n/routing";
import { findWorksFeature, WORKS_FEATURE_SLUGS } from "@/lib/data/works";
import { worksMetadata } from "@/lib/works/metadata";

import { FeaturePage } from "../_components/FeaturePage";

// Only the five core features exist; anything else is a 404, not a render.
export const dynamicParams = false;

export function generateStaticParams() {
  return WORKS_FEATURE_SLUGS.map((feature) => ({ feature }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; feature: string }>;
}): Promise<Metadata> {
  const { locale, feature } = await params;
  if (locale !== "ko" || !findWorksFeature(feature)) return {};
  const t = await getTranslations({
    locale,
    namespace: `works.features.${feature}.meta`,
  });
  return worksMetadata({
    path: `/works/${feature}`,
    title: t("title"),
    description: t("description"),
  });
}

export default async function WorksFeaturePage({
  params,
}: {
  params: Promise<{ locale: Locale; feature: string }>;
}) {
  const { locale, feature } = await params;
  const data = findWorksFeature(feature);
  if (!data) notFound();
  if (locale !== "ko") permanentRedirect(`/ko/works/${feature}`);
  setRequestLocale(locale);

  return <FeaturePage feature={data} />;
}
