// Nav 아이템 (MODULES / CONTACT) 은 현재 단계에서 숨김 — 페이지 본문 / footer
// / hero CTA 가 진입로를 대체한다. 복원 시 아래 주석 블록 4곳을 모두 해제:
//   1) useTranslations import 와 const t (line ~6, ~14)
//   2) ContactTrigger import
//   3) NAV_LINK_CLASS 상수
//   4) <nav> 내부의 두 아이템 JSX
// import { useTranslations } from "next-intl";

// import { ContactTrigger } from "@/components/sections/ContactTrigger";

import { LangToggle } from "./LangToggle";
import { Logo } from "./Logo";

// const NAV_LINK_CLASS =
//   "relative py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform hover:after:scale-x-100";

export function TopBar() {
  // const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-screen-xl items-center justify-between px-6 md:px-8">
        <Logo />
        <nav
          aria-label="Primary"
          className="mono cap hidden items-center gap-7 text-xs font-medium md:flex"
        >
          {/*
          <a href="#modules" className={NAV_LINK_CLASS}>
            {t("modules")}
          </a>
          <ContactTrigger className={NAV_LINK_CLASS}>
            {t("contact")}
          </ContactTrigger>
          */}
        </nav>
        <div className="flex justify-end">
          <LangToggle />
        </div>
      </div>
    </header>
  );
}
