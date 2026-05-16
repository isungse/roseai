import { useTranslations } from "next-intl";

import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="mono border-t border-hair px-7 py-7 text-xs text-g500 md:px-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Logo size="sm" />
        <div>{t("copyright")}</div>
      </div>
    </footer>
  );
}
