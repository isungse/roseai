import { setRequestLocale } from "next-intl/server";

import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { type Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // 1인 창업 단계 — 1장짜리 랜딩. 이미지 카드 스택 + 소개글 단일 섹션.
  // 문의 폼은 모달 다이얼로그(ContactDialog) — 섹션 CTA 가 연다.
  return <ShowcaseSection />;
}
