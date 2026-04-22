import { getTranslations, setRequestLocale } from "next-intl/server";

import { type Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "scaffold" });

  return (
    <section className="mx-auto max-w-screen-xl px-6 py-24 md:px-8 md:py-32">
      <p className="mono cap text-xs font-medium text-brand">{t("badge")}</p>
      <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] md:text-6xl">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-prose text-lg text-g500">{t("body")}</p>
    </section>
  );
}
