import { setRequestLocale } from "next-intl/server";

import { ContactSection } from "@/components/sections/ContactSection";
// import { HeroSection } from "@/components/sections/HeroSection";
import { type Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // 1인 창업 단계 — 1장짜리 랜딩. 메인 메시지(ContactSection) 단일 섹션.
  // 모듈 카탈로그(02 / PRODUCTION) 는 랜딩 재설계 과정에서 제거됨.
  // 폼은 모달 다이얼로그로 분리되어 TopBar/Footer/ContactSection CTA 모두
  // 동일한 다이얼로그를 연다 (components/sections/ContactDialog.tsx).
  // HERO 는 추후 활성화.
  return (
    <>
      {/* <HeroSection /> */}
      <ContactSection />
    </>
  );
}
