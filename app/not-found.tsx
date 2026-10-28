import { useTranslations } from "next-intl";
import Link from "next/link";

// Root not-found also answers every unmatched URL (no locale segment above it).
export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="px-7 py-16 md:px-10 md:py-20">
      <p className="mono cap text-xs font-medium text-brand">{t("eyebrow")}</p>
      <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] md:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-5 text-g500">
        <Link href="/" className="underline underline-offset-4 hover:text-ink">
          {t("back")}
        </Link>
      </p>
    </section>
  );
}
