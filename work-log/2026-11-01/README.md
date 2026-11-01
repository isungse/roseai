# 2026년 11월 1일 서비스 소개 페이지 개선

## 요청과 반영 범위

네이버웍스 코어 서비스 소개 분석을 바탕으로 ROSE-AI WORKS 소개 사이트를 개선하고, 이미지 비율·모바일 정보 밀도·투어 URL 동작을 수정했다. 이번 사용자 요청에 따라 홈에서 전체 41개 메뉴를 펼치던 구성을 **핵심 5기능 레일 + 전체 메뉴 투어**로 바꿨다. 전체 메뉴와 관리자 메뉴의 접근 경로는 투어에 유지했다.

제품명, 실제 제품 화면, 한국어 전용 구성, FAQ·문의·요금·연락처를 두지 않는 정책은 유지했다. 공개 원본 이미지와 스냅샷 파일은 수정하지 않았다. 브랜치는 `codex/works-intro-improvements`이며 이 기록 시점에는 커밋·푸시·배포하지 않았다.

## 구현 결과

- 홈을 상단에서 바로 시작하도록 셸의 상하 마진과 외곽선을 없앴다. 최대 폭 1360px와 sticky 헤더는 유지했다.
- 제품 이점 3개를 행동 중심 제목으로 정리하고, 모바일에는 제목 → 화면 → 설명 → 관련 기능 순서로 배치했다. 긴 본문용 `copy` 색과 소개 제목 크기, 실제 반경 토큰을 정의했다.
- 핵심 5개 기능을 수동 가로 레일로 묶었다. 카드 전체를 상세 페이지 링크로 만들고, 다음/이전 버튼과 모바일 스크롤을 제공했다.
- 이미지별 static import 메타데이터로 실제 치수를 사용한다. 모바일·좁은 패널은 최대 288px, 사이드바는 192px로 제한하고 원본 크게 보기 링크를 제공했다. 마지막 투어 배너는 전체 대시보드 장면으로 바꿨다.
- 투어는 `menu`·`role`·`view` query에서 화면을 파생한다. 선택 변경, 새로고침, 브라우저 뒤로가기·앞으로가기, 관리자 딥링크가 일치하며 기존 query/hash 를 보존한다.
- 투어 미리보기와 view 타입을 `TourPane.tsx` 로 분리하고 URL 필드를 하나의 객체로 묶었다. `TourExplorer` 196줄·`TourPane` 114줄이며, 기존 `tourData` 의 type-only import 경로를 유지했다.
- 모바일 상단 내비는 현재 항목을 완전히 보이게 하고 이전/다음 탐색 버튼을 제공한다. 투어 미리보기는 모바일 높이 512px로 확대했다.
- 기능 탭의 비활성 패널도 DOM에 유지해 ARIA 연결을 보존했다. 실제 이미지 폭에 맞춰 sizes 를 조정하고, 문구 변경 뒤 폰트 서브셋을 재생성했다.
- 로고 링크는 화면에 표시된 브랜드명과 숨김 보조 문구로 접근 가능한 이름을 구성해 음성 제어·스크린리더 이름이 보이는 텍스트와 일치하도록 했다.

## 변경 문구 전문

아래 표는 `messages/ko.json` 의 이번 diff다. `\n` 은 실제 UI에서 의도한 줄바꿈이다. 기존 본문 문구는 표에 없는 경우 그대로 유지했다.

| 키 | 변경 전 | 반영 문구 |
|---|---|---|
| `common.homeSuffix` | 없음 | 홈으로 이동 |
| `works.nav.previous` | 없음 | 이전 메뉴 보기 |
| `works.nav.next` | 없음 | 다음 메뉴 보기 |
| `works.values.collab.title` | 소통과 협업 | 필요한 대화와 소식을\n한곳에서 이어갑니다 |
| `works.values.collab.eyebrow` | 없음 | 소통과 협업 |
| `works.values.flow.title` | 업무 흐름 | 기안부터 요청 처리까지\n업무의 흐름을 연결합니다 |
| `works.values.flow.eyebrow` | 없음 | 업무 흐름 |
| `works.values.hr.title` | 인사·행정·보안 | 교대근무와 인사 업무를\n병원에 맞게 관리합니다 |
| `works.values.hr.eyebrow` | 없음 | 인사·행정·보안 |
| `works.grid.eyebrow` | 전체 기능 | 주요 기능 |
| `works.grid.title` | 메뉴 그대로, 전부 보여 드립니다 | 병원에 필요한 핵심 기능을 한곳에 |
| `works.grid.lead` | 제품 사이드바 순서 그대로입니다. 핵심 기능은 상세 페이지로, 나머지는 화면 미리보기로 이어집니다. | 매일 쓰는 다섯 가지 기능부터 살펴보세요. 실제 화면과 함께 자세히 소개합니다. |
| `works.grid.previous` | 없음 | 이전 기능 보기 |
| `works.grid.next` | 없음 | 다음 기능 보기 |
| `works.grid.allMenus` | 없음 | 전체 기능과 관리자 메뉴는 메뉴 투어에서 둘러볼 수 있습니다. |
| `works.tourBanner.alt` | ROSE-AI WORKS 사이드바 메뉴 | ROSE-AI WORKS 대시보드와 전체 기능 사이드바 |
| `works.screenImage.openOriginal` | 없음 | 원본 크게 보기 |
| `works.screenImage.openOriginalLabel` | 없음 | {name} 원본 크게 보기 (새 탭) |

## 수정 파일

| 영역 | 파일 |
|---|---|
| 셸과 공통 디자인 | `app/layout.tsx`, `app/globals.css`, `components/ui/ButtonLink.tsx`, `components/layout/Logo.tsx` |
| 홈 구성 | `app/page.tsx`, `app/_components/WorksHero.tsx`, `ValueSections.tsx`, `Highlights.tsx`, `SectionHeading.tsx`, `FeatureGrid.tsx`, 새 `FeatureRail.tsx`, `TourBanner.tsx` |
| 실제 이미지 치수와 프레임 | `lib/works/images.ts`, 새 `lib/works/image-metadata.ts`, `app/_components/ScreenImage.tsx`, `FeaturePage.tsx` |
| 탭과 탐색 | `app/_components/FeatureTabs.tsx`, `TourExplorer.tsx`, 새 `TourPane.tsx`, `components/layout/TopBar.tsx`, `TopBarNav.tsx` |
| 문구와 글꼴 | `messages/ko.json`, `app/fonts/PretendardVariable.subset.woff2`, `app/fonts/subset-chars.ts` |
| 규칙과 작업 기록 | `.claude/rules/design-system.md`, `code-style.md`, `accessibility.md`, 이 파일과 `evidence/` |

기존 미추적 `.playwright-mcp/`, `scripts/`, `supabase/queries/` 는 이번 작업 산출물에 포함하지 않고 보존했다.

## 검증 결과

| 검증 | 결과와 근거 |
|---|---|
| ESLint | 통과 |
| TypeScript `tsc --noEmit` | 통과 |
| 프로덕션 `npm run build` | 투어 파일 분리와 최종 로고 수정까지 포함해 통과. 최종 빌드로 3011 포트에서 실행 |
| 독립 브라우저 탐색 검사 | 투어 URL·역할·모바일 보기·새로고침·Back/Forward·query/hash 보존·잘못된 값 fallback 등 14개 통과. 페이지 오류 0건. [JSON](C:/Users/SPW/ai-project/rose-ai-homepage/work-log/2026-11-01/evidence/navigation-verification.json) |
| 이미지 담당 브라우저 검사와 통합 QA | 데스크톱·모바일 화면, 원본 링크, 탭·이미지 비율 확인. 보고된 페이지 오류 0건. 증거는 [evidence](C:/Users/SPW/ai-project/rose-ai-homepage/work-log/2026-11-01/evidence)에 저장 |
| 모바일 현재 메뉴 | 390px 업무지원 페이지에서 활성 항목 x=120~269px로 전체 노출. 방향 버튼으로 scrollLeft 209→0 확인 |
| 모바일 투어 | iframe 약 332×512px. 메뉴 복귀·Forward·새로고침 후 같은 선택 복원, 새 탭 링크 유지 |
| 홈 높이와 반응형 | 프로덕션 서버 3011에서 1440px 뷰포트/문서 폭 1425px: 높이 6026px. 모바일 390px/문서 폭 375px: 높이 6043px. 768px/753px: 7212px, 1920px/1905px: 6026px. 전 구간 페이지 가로 넘침 0, 카드 5개. 모바일은 기존 약 1.4만px에서 약 6천px로 축소 |
| 원본 자산 | `public` 의 원본 이미지·스냅샷 변경 없음 |
| Lighthouse 모바일 | 13.6.0, 로컬 프로덕션 빌드: 성능 90 / 접근성 100 / SEO 100, CLS 0, LCP 3.7초. 로컬 환경의 검색 차단 정책 때문에 `is-crawlable`, `robots-txt` 검사는 제외했으며, SEO 점수는 운영 사이트의 색인 가능 여부를 검증한 결과가 아니다. [원본 결과](C:/Users/SPW/ai-project/rose-ai-homepage/work-log/2026-11-01/evidence/lighthouse-home-mobile.json) |
| 최종 로고 접근성 검사 | Lighthouse 진단에서 확인한 이름 불일치를 수정한 후 최종 빌드에서 axe `label-content-name-mismatch` 검사: 위반·미확정 항목 0건. [JSON](C:/Users/SPW/ai-project/rose-ai-homepage/work-log/2026-11-01/evidence/final-logo-accessibility.json) |

대표 화면: [모바일 내비](C:/Users/SPW/ai-project/rose-ai-homepage/work-log/2026-11-01/evidence/mobile-navigation.png), [모바일 투어](C:/Users/SPW/ai-project/rose-ai-homepage/work-log/2026-11-01/evidence/mobile-tour-preview.png), [데스크톱 홈](C:/Users/SPW/ai-project/rose-ai-homepage/work-log/2026-11-01/evidence/home-desktop-full.png), [모바일 홈](C:/Users/SPW/ai-project/rose-ai-homepage/work-log/2026-11-01/evidence/home-mobile-full.png).

## 실행과 측정 범위

로컬 미리보기는 [http://localhost:3011](http://localhost:3011)에서 실행 중이다. 다시 실행할 때는 프로젝트 루트에서 `npm run start -- --port 3011`을 사용한다. 최종 폰트 서브셋 생성, lint, 프로덕션 빌드와 화면 검증을 마쳤으며 공개 사이트에는 배포하지 않았다.

프로덕션 화면 측정은 스크롤바를 포함한 브라우저로 수행했으며, 스크롤바 없는 headless 390px 결과(높이 약 5967px)와 문서 폭이 달라 줄바꿈·총높이에 차이가 있다. Lighthouse 전체 측정 뒤 로고 이름을 수정했으며 해당 변경은 최종 빌드에서 별도 axe 검사로 확인했다. 기존 미결 콘텐츠인 양식 편집 방식·업무지원 상태 표현은 제품 사실 확인 없이 이번 디자인 변경에서 새로 단정하지 않았다.
