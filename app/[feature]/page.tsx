import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import {
  featureHref,
  findWorksFeature,
  WORKS_FEATURE_SLUGS,
} from "@/lib/data/works";
import { worksMetadata } from "@/lib/works/metadata";

import { FeaturePage } from "../_components/FeaturePage";

// Only the five core features exist at the top level; any other single
// segment is a 404, not a render.
export const dynamicParams = false;

export function generateStaticParams() {
  return WORKS_FEATURE_SLUGS.map((feature) => ({ feature }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ feature: string }>;
}): Promise<Metadata> {
  const { feature } = await params;
  const data = findWorksFeature(feature);
  if (!data) return {};
  const t = await getTranslations(`works.features.${data.slug}.meta`);
  return worksMetadata({
    path: featureHref(data.slug),
    title: t("title"),
    description: t("description"),
  });
}

export default async function WorksFeaturePage({
  params,
}: {
  params: Promise<{ feature: string }>;
}) {
  const { feature } = await params;
  const data = findWorksFeature(feature);
  if (!data) notFound();

  return <FeaturePage feature={data} />;
}
