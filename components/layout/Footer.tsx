import { useTranslations } from "next-intl";

import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@roseai.co.kr";

  const links = [
    { href: "#modules", label: t("links.modules") },
    { href: "#contact", label: t("links.contact") },
  ];

  return (
    <footer className="mono border-t border-hair px-6 py-8 text-xs text-g500 md:px-8">
      <div className="mx-auto grid max-w-screen-xl gap-6 md:grid-cols-[1fr_3fr_1fr] md:items-center">
        <Logo size="sm" />
        <div className="flex flex-wrap items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <span aria-hidden="true">·</span>
          <span>{t("office")}</span>
          <a
            href={`mailto:${contactEmail}`}
            className="transition-colors hover:text-ink"
          >
            {contactEmail}
          </a>
        </div>
        <div className="text-left md:text-right">{t("copyright")}</div>
      </div>
    </footer>
  );
}
