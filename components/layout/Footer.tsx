import { useTranslations } from "next-intl";

import { ContactTrigger } from "@/components/sections/ContactTrigger";
import { env } from "@/lib/env";

import { Logo } from "./Logo";

const LINK_CLASS = "transition-colors hover:text-ink";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="mono border-t border-hair px-6 py-8 text-xs text-g500 md:px-8">
      <div className="mx-auto grid max-w-screen-xl gap-6 md:grid-cols-[1fr_3fr_1fr] md:items-center">
        <Logo size="sm" />
        <div className="flex flex-wrap items-center gap-8">
          <a href="#modules" className={LINK_CLASS}>
            {t("links.modules")}
          </a>
          <ContactTrigger className={LINK_CLASS}>
            {t("links.contact")}
          </ContactTrigger>
          <span aria-hidden="true">·</span>
          <span>{t("office")}</span>
          <a href={`mailto:${env.contactEmail}`} className={LINK_CLASS}>
            {env.contactEmail}
          </a>
        </div>
        <div className="text-left md:text-right">{t("copyright")}</div>
      </div>
    </footer>
  );
}
