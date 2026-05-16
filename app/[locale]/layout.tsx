import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { TopBar } from "@/components/layout/TopBar";
import { ContactDialogProvider } from "@/components/sections/ContactDialog";
import { routing, type Locale } from "@/i18n/routing";
import { env } from "@/lib/env";
import { inter, jetbrainsMono, pretendard } from "@/lib/fonts";

import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(env.siteUrl),
    title: {
      default: t("title"),
      template: "%s | ROSE-AI",
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ko: "/ko",
        en: "/en",
        "x-default": "/ko",
      },
    },
    openGraph: {
      type: "website",
      siteName: "ROSE-AI",
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      className={`${pretendard.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="text-ink antialiased">
        <NextIntlClientProvider>
          <ContactDialogProvider>
            <a href="#main" className="skip-link">
              {t("skipToContent")}
            </a>
            {/* Page shell — Naver-style fixed-width column floating on the g50
                backdrop. `my-10 md:my-16` (40 / 64px) lifts the shell off the
                viewport top and bottom for a "hotel rulebook" — generous
                breathing room above and below a contained card; `border` (all
                four sides) closes the box.

                The sticky TopBar uses `top-0` (NOT the shell margin). The
                floating-card look is visible only at scroll=0; once the user
                scrolls, the bar pins to viewport top and section content scrolls
                fully underneath. Using `top-10 md:top-16` (matching shell margin)
                creates a 40-64px gap above the bar through which section
                content leaks visibly — the bar appears to float mid-page with
                content above AND below it. `top-0` eliminates that gap.

                Inner sections no longer set their own max-w-screen-xl — the
                shell is the single source of width. */}
            <div className="mx-auto my-10 max-w-[1200px] border border-hair bg-paper md:my-16">
              <TopBar />
              <main id="main">{children}</main>
              <Footer />
            </div>
          </ContactDialogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
