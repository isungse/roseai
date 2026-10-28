# 2026-10-27 ROSE-AI WORKS 제품 섹션 1차 골격 · 문의 폼 제거

## 작업 목적

병원 그룹웨어 제품 **ROSE-AI WORKS** 를 roseai.co.kr 안에 소개하는 `/works` 섹션을 만든다(브랜치 `feat/works-section`).
루트는 브랜드 랜딩으로 유지하되 쇼케이스에 제품 슬라이드 1장을 넣고, TopBar 에 `WORKS` 링크를 더한다.
오너 결정(2026-10-27): 한국어만 · FAQ 없음 · 문의 폼은 **사이트 전체에서 제거** · 병원 실명 평택성모병원 · 관리자 투어 6개 화면 ·
제품명은 영문 `ROSE-AI WORKS` 만. 설계 문서는 private 저장소(groupware-demo `intent/works/spec.md`)에 있다.

이 세션은 **골격과 문구 초안**까지다. 제품 화면 이미지와 투어 스냅샷은 별도 파이프라인(works-snapshots)이 만들며, 그때까지
같은 비율의 회색 자리표시 SVG 가 들어가 있다(`제품 화면 준비 중` 라벨). 자리표시가 남은 상태로는 main 에 머지하지 않는다.

## 반영 내용

### 루트
- 쇼케이스 슬라이드 **02 `works`** 추가(01 coffee · **02 works** · 03 office · 04 evening · 05 camp). 이미지 파일을 `git mv` 로 재번호.
  아트워크는 임시 SVG 컴포지션(`showcase-02-works.svg`) — 실제 UI 스냅샷으로 만든 JPEG 로 교체 예정.
- 캐러셀에 **슬라이드별 CTA**(`ShowcaseSlide.cta`) 도입. 02 가 활성일 때만 `WORKS →` 버튼이 `/ko/works` 로 간다. 전역 `CONTACT` 버튼 제거.
- TopBar: `로고 ── WORKS · KO/EN`. `TopBarNav`(클라이언트 leaf) 가 경로를 보고 works 안에서는 `WORKS` 를 활성 표시하고 언어 토글을 숨긴다.
- **문의 폼 제거(C1)**: `ContactDialog`·`ContactForm`·`ContactTrigger`·`/api/contact`·`lib/data/contact.ts`·`lib/env.server.ts`·`lib/supabase/admin.ts` 삭제,
  `@supabase/supabase-js` 의존성 제거, `contact` 네임스페이스 삭제, `.env.local.example` 은 `NEXT_PUBLIC_SITE_URL` 만.
  Supabase 마이그레이션 파일(`supabase/migrations/…contact_inquiries.sql`)은 DB 이력이라 남겨 둔다. Vercel 의 Supabase·IP_HASH 변수는 사용처가 없다.

### `/works` 섹션 (ko 전용)
- 라우트: `/ko/works`(허브) · `/ko/works/{approval,messenger,attendance,board,support}`(기능 상세, 공통 템플릿) · `/ko/works/tour`(전체 메뉴 투어).
  `/en/works/**` 는 `next.config.ts` `redirects()` 로 308 → `/ko/works/**`, 페이지에도 `permanentRedirect` 가드.
- i18n: `messages/works.ko.json` 의 `works.*` 를 `i18n/request.ts` 가 ko 에서만 병합(규칙 i18n.md "ko 전용 네임스페이스" 신설).
- 데이터: `lib/data/works.ts` — 제품명 상수, 기능 5개(탭·심화 섹션·이미지 경로), 사이드바 메뉴 11그룹 41항목(원본 `AppLayout.tsx` 2026-10-27 기준 아이콘 동일).
- 허브: 서브내비(sticky `top-16`, 7 평면 링크) → 히어로(투어/핵심 기능 CTA) → 핵심 가치 3구역 → 특장점 3 카드 → 전체 기능 카드 그리드(`#features`) → 투어 배너.
- 기능 상세: 히어로 → 핵심 기능 탭(`FeatureTabs`, WAI-ARIA tabs, 방향키·Home·End) → 심화 섹션 지그재그 → 다른 기능 4 + 투어 버튼. 문의 CTA 없음.
- 투어: 사이드바 재현(토큰으로 옮겨 적음) + 역할 토글(일반 직원/관리자) + `<iframe>` 스냅샷 프레임. 스냅샷이 없는 관리자 10개 메뉴는 "관리자 전용" 패널,
  외부 연동 메뉴(이메일·QPS)는 안내 문구. 딥링크 `?menu=<key>`(허브 카드의 "화면 보기"). 모바일은 목록 → 상세 2화면.
- 이미지: `lib/works/images.ts` 가 빌드 시 `public/` 에 파일이 있는지 보고 없으면 자리표시 SVG 로 대체(`unoptimized`). 스냅샷 HTML 도 같은 방식으로 존재 여부 판정.
- 메타: 페이지별 `generateMetadata`(canonical·hreflang 은 ko/x-default 만), `opengraph-image.tsx`(next/og, Pretendard OTF), works layout 에 `SoftwareApplication` JSON-LD,
  `app/sitemap.ts`·`app/robots.ts` 신설(프리뷰는 `Disallow: /`, 운영은 `/demos/` 만 차단).
- 디자인 토큰: `globals.css` `@theme` 에 design-system.md 의 타입 스케일(`text-display`·`text-h1`·`text-h2`·`text-h3`·`text-body-lg`·`text-body`) 선언.
- 공용: `components/ui/ButtonLink.tsx`(primary/secondary).

### 문구 초안 (오너 확정 전)
전문은 `messages/works.ko.json`(works 섹션)과 `messages/ko.json`·`en.json` 의 `showcase.slides.works` 에 있다. 확정되면 이 절에 전문을 옮겨 적는다.

슬라이드 02 (KO) — **병원이 매일 쓰는 그룹웨어, / ROSE-AI WORKS** / 전자결재·메신저·근태관리·게시판·업무지원을 하나의 흐름으로. / 평택성모병원에서 실제 운영 중인 제품을 그대로 소개합니다. / 실제 화면과 전체 메뉴를 직접 둘러보세요. (accent: 실제 운영 중인)

## 변경 파일

- 수정: `app/[locale]/layout.tsx`, `app/globals.css`, `components/layout/TopBar.tsx`, `components/sections/ShowcaseSection.tsx`, `components/sections/ShowcaseCarousel.tsx`,
  `i18n/request.ts`, `lib/data/showcase.ts`, `messages/ko.json`, `messages/en.json`, `next.config.ts`, `package.json`, `package-lock.json`, `.env.local.example`,
  `.claude/rules/{i18n,seo,content,deployment}.md`
- 추가: `app/[locale]/works/**`, `app/sitemap.ts`, `app/robots.ts`, `components/layout/TopBarNav.tsx`, `components/ui/ButtonLink.tsx`, `lib/data/works.ts`,
  `lib/works/{images,metadata}.ts`, `messages/works.ko.json`, `public/images/showcase-02-works.svg`, `public/images/works/_placeholder-{desktop,mobile}.svg`
- 삭제: 문의 폼 관련 7개 파일(위)
- 이동: `public/images/showcase-0{2,3,4}-*.jpg` → `0{3,4,5}`

## 검증 결과

- `npm run lint`: 통과. `npm run build`: 통과(정적 21페이지; `/-/works/opengraph-image` 만 동적).
- 로컬 dev: `/ko`·`/en`·`/ko/works`·기능 5장·`/ko/works/tour` 200, `/en/works{,/tour,/approval}` 308 → `/ko/…`, `/ko/works/nope` 404, `/api/contact` 404,
  `/sitemap.xml` 9 URL(루트 ko/en + works ko 7), `/robots.txt` 로컬에선 Disallow(VERCEL_ENV 없음), `/ko/works/opengraph-image` 200 image/png. 콘솔 오류 0.
- 1440·375 뷰포트 스크린샷으로 루트(02 슬라이드·WORKS 버튼·CONTACT 없음), 허브 전 섹션, 전자결재 탭, 투어(역할 토글·딥링크 `?menu=users` → 관리자 전환) 확인.
- Lighthouse: 아래 "보류 사항" 참조(프리뷰에서 재측정).

## 보류 사항

- 제품 화면 이미지·투어 스냅샷 전부 자리표시 — works-snapshots 파이프라인 결과로 교체(머지 조건).
- 루트 슬라이드 02 아트워크 — 실제 스냅샷으로 만든 JPEG 시안 2종을 프리뷰에 올려 오너 선택. 순서(02 유지 / 01) 도 그때 결정.
- 문구 전문 오너 확정(허브·기능 5장·투어·슬라이드) → 이 work-log 에 전문 기록.
- Lighthouse 는 프리뷰 URL 에서 측정해 기록.
- Vercel 환경변수 `NEXT_PUBLIC_SUPABASE_URL`·`SUPABASE_SECRET_KEY`·`IP_HASH_SECRET` 정리는 오너가 대시보드에서(사용처 없음).
