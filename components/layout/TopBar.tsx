import { useTranslations } from "next-intl";

import { Logo } from "./Logo";
import { TopBarNav } from "./TopBarNav";

export function TopBar() {
  const t = useTranslations("common");

  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-paper/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-7 md:px-10">
        <Logo />
        <TopBarNav label={t("productNav")} />
      </div>
    </header>
  );
}
