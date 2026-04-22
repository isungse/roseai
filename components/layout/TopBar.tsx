import { useTranslations } from "next-intl";

import { LangToggle } from "./LangToggle";
import { Logo } from "./Logo";

export function TopBar() {
  const t = useTranslations("nav");

  const items = [
    { href: "#modules", label: t("modules") },
    { href: "#philosophy", label: t("philosophy") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-screen-xl items-center justify-between px-6 md:px-8">
        <Logo />
        <nav
          aria-label="Primary"
          className="mono cap hidden items-center gap-7 text-xs font-medium md:flex"
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex justify-end">
          <LangToggle />
        </div>
      </div>
    </header>
  );
}
