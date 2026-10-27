import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { permanentRedirect } from "next/navigation";
import { Suspense } from "react";

import { type Locale } from "@/i18n/routing";
import { worksMetadata } from "@/lib/works/metadata";

import { TourExplorer } from "../_components/TourExplorer";
import { WorksSubnav } from "../_components/WorksSubnav";
import { buildTourGroups } from "../_components/tourData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "ko") return {};
  const t = await getTranslations({ locale, namespace: "works.tour.meta" });
  return worksMetadata({
    path: "/works/tour",
    title: t("title"),
    description: t("description"),
  });
}

export default async function WorksTourPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (locale !== "ko") permanentRedirect("/ko/works/tour");
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "works" });

  const groups = buildTourGroups((key) => t(key));
  const labels = {
    sidebar: t("tour.sidebar"),
    role: t("tour.role"),
    roleEmployee: t("tour.roleEmployee"),
    roleAdmin: t("tour.roleAdmin"),
    previewLabel: t("tour.previewLabel"),
    openNewTab: t("tour.openNewTab"),
    external: t("tour.external"),
    adminPanelTitle: t("tour.adminPanelTitle"),
    adminPanelBody: t("tour.adminPanelBody"),
    pending: t("tour.pending"),
    back: t("tour.back"),
    frameTitle: t("tour.frameTitle", { label: "{label}" }),
    detail: t("tour.detail"),
  };

  return (
    <>
      <WorksSubnav current="tour" />
      <section className="border-b border-hair">
        <div className="px-7 py-12 md:px-10 md:py-16">
          <p className="mono cap text-xs font-medium tracking-[0.08em] text-brand">
            {t("tour.eyebrow")}
          </p>
          <h1 className="mt-4 text-h2 font-bold tracking-[-0.02em] md:text-h1">
            {t("tour.title")}
          </h1>
          <p className="mt-5 max-w-prose text-body-lg text-g500">
            {t("tour.lead")}
          </p>
        </div>
      </section>
      <section>
        <div className="px-7 py-10 md:px-10 md:py-12">
          {/* `useSearchParams` (deep link `?menu=`) needs a Suspense boundary
              to keep the rest of the page statically rendered. */}
          <Suspense fallback={null}>
            <TourExplorer groups={groups} labels={labels} defaultKey="dashboard" />
          </Suspense>
        </div>
      </section>
    </>
  );
}
