import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";

import { Footer } from "@/components/layout/Footer";
import { TopBar } from "@/components/layout/TopBar";
import { WORKS_PRODUCT_NAME } from "@/lib/data/works";
import { env } from "@/lib/env";
import { inter, jetbrainsMono, pretendard } from "@/lib/fonts";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("works.meta");

  return {
    metadataBase: new URL(env.siteUrl),
    title: {
      default: t("title"),
      template: `%s | ${WORKS_PRODUCT_NAME}`,
    },
    description: t("description"),
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: WORKS_PRODUCT_NAME,
      title: t("title"),
      description: t("description"),
      url: "/",
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("common");
  const meta = await getTranslations("works.meta");

  // seo.md "구조화 데이터": the maker, the site and the product it presents.
  // No `offers` (the site states no prices) and no SearchAction (no search).
  const organization = { "@id": `${env.siteUrl}/#organization` };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        ...organization,
        name: "ROSE-AI",
        url: env.siteUrl,
      },
      {
        "@type": "WebSite",
        name: WORKS_PRODUCT_NAME,
        url: env.siteUrl,
        inLanguage: "ko",
        publisher: organization,
      },
      {
        "@type": "SoftwareApplication",
        name: WORKS_PRODUCT_NAME,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: "ko",
        description: meta("description"),
        url: env.siteUrl,
        publisher: organization,
      },
    ],
  };

  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="text-ink antialiased">
        <NextIntlClientProvider>
          {/* Static data from our own messages; `<` is escaped so no string
              can close the script element (Next.js JSON-LD guide). */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
          <a href="#main" className="skip-link">
            {t("skipToContent")}
          </a>
          <div className="mx-auto flex min-h-svh max-w-[1360px] flex-col bg-paper">
            <TopBar />
            <main id="main" className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
