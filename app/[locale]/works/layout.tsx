import { getTranslations, setRequestLocale } from "next-intl/server";

import { WORKS_PRODUCT_NAME } from "@/lib/data/works";
import { env } from "@/lib/env";

export default async function WorksLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Korean-only section: read the ko bundle even while a non-ko request is
  // being redirected by the page (works.* is not merged for other locales).
  const t = await getTranslations({ locale: "ko", namespace: "works.meta" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: WORKS_PRODUCT_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "ko",
    description: t("description"),
    url: `${env.siteUrl}/ko/works`,
    publisher: {
      "@type": "Organization",
      name: "ROSE-AI",
      url: env.siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
