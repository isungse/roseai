# 2026년 11월 1일 서비스 소개 페이지 개선

## 요청과 반영 범위

네이버웍스 코어 서비스 소개 분석을 바탕으로 ROSE-AI WORKS 소개 사이트를 개선하고, 이미지 비율·모바일 정보 밀도·투어 URL 동작을 수정했다. 이번 사용자 요청에 따라 홈에서 전체 41개 메뉴를 펼치던 구성을 **핵심 5기능 레일 + 전체 메뉴 투어**로 바꿨다. 전체 메뉴와 관리자 메뉴의 접근 경로는 투어에 유지했다.

제품명, 실제 제품 화면, 한국어 전용 구성, FAQ·문의·요금·연락처를 두지 않는 정책은 유지했다. 공개 원본 이미지와 스냅샷 파일은 수정하지 않았다. 작업 브랜치는 `codex/works-intro-improvements`이며, 후속 사용자 요청에 따라 커밋과 운영 배포까지 완료했다.

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

로컬 미리보기는 [http://localhost:3011](http://localhost:3011)에서 실행 중이다. 다시 실행할 때는 프로젝트 루트에서 `npm run start -- --port 3011`을 사용한다. 최종 폰트 서브셋 생성, lint, 프로덕션 빌드와 화면 검증을 마쳤으며, 운영 사이트에도 반영했다.

프로덕션 화면 측정은 스크롤바를 포함한 브라우저로 수행했으며, 스크롤바 없는 headless 390px 결과(높이 약 5967px)와 문서 폭이 달라 줄바꿈·총높이에 차이가 있다. Lighthouse 전체 측정 뒤 로고 이름을 수정했으며 해당 변경은 최종 빌드에서 별도 axe 검사로 확인했다. 기존 미결 콘텐츠인 양식 편집 방식·업무지원 상태 표현은 제품 사실 확인 없이 이번 디자인 변경에서 새로 단정하지 않았다.

## 커밋과 운영 배포

후속 사용자 요청으로 개선 파일과 검증 자료를 선택 커밋한 뒤 GitHub `main`에 반영했다. 기존 미추적 파일은 커밋에 넣지 않았다.

- 기능 변경 커밋: [`a0084ce9581b506fafef989ceb36bbf31dd0fab6`](https://github.com/isungse/roseai/commit/a0084ce9581b506fafef989ceb36bbf31dd0fab6)
- 대상: Vercel `isungses-projects/roseai`, 프로젝트 `prj_c3moLOdHSyFFv2Lae1Q2UXQfYrUu`, Production, Git `main`
- 기능 배포: `dpl_AEMbRLGBx8DawcC6uCRCaZ1uUKq5`, **READY**, 원격 빌드 약 22초
- 운영 주소: [https://roseai.co.kr](https://roseai.co.kr)
- 기능 배포 고유 주소: [roseai-2a3kjrs4e-isungses-projects.vercel.app](https://roseai-2a3kjrs4e-isungses-projects.vercel.app)
- 직전 정상 배포: `dpl_HY2s1dbjs3ZSM71Qx7QWcfgeqVBF` (롤백 기준)

운영 도메인에서 `/`, 5개 기능 상세, `/tour`, sitemap, robots, OG 이미지 등 10개 경로의 200 응답을 확인했다. 홈에 핵심 카드 5개와 신규 문구가 표시되며, 390px 모바일에서 페이지 가로 넘침이 없다. robots는 `Allow: /`와 `Disallow: /demos/`, sitemap은 운영 도메인의 7개 페이지를 반환한다. 기존 언어·제품 URL은 308로 연결된다.

모바일 투어에서 메뉴 복귀 → 다른 메뉴 선택 → 새로고침 → 뒤로가기·앞으로가기 순서를 실제 운영 사이트에서 확인했다. 선택과 query/hash가 보존되며 iframe 높이는 512px이다. 검사 중 페이지 JavaScript 오류 0건. [운영 투어 검증 JSON](C:/Users/SPW/ai-project/rose-ai-homepage/work-log/2026-11-01/evidence/production-tour-verification.json)

해당 기능 배포의 최근 10분 Vercel 오류 수준 로그 조회 결과는 0건이었다. 이 기록은 배포 직후 확인 범위이며 지속 모니터링 결과는 아니다. 기능 배포 이후의 문서 커밋은 배포 기록만 추가한다.

## 후속 세션 — 기능 탭 접근 이름 수정 (PR #4)

### 요청과 범위

위 변경을 검수한 결과(groupware-demo `docs/research/naver-works-core/03-code-review.md`) 접근성 회귀 1건을 고쳤다. 그 밖의 지적과 제안(치수용 static import의 중복 산출물, 반경 토큰 `xl`, 모바일 내비 왼쪽 여백, 투어 history 적재, 미사용 코드, 공개 저장소의 미추적 잔재)은 groupware-demo plan W14로 넘겼고 이 PR에는 넣지 않았다.

### 무엇을 고쳤나

- `app/_components/FeatureTabs.tsx`: 탭 버튼의 `aria-label={item.title}` 제거. 데스크톱(`lg` 이상)에서는 버튼 안에 제목과 설명이 함께 보이는데 접근 가능한 이름이 제목뿐이어서, 운영 `/approval` 데스크톱의 axe 규칙 `label-content-name-mismatch`(WCAG 2.5.3 Label in Name)가 탭 3개 모두에서 실패했다. Lighthouse에서는 이 규칙의 가중치가 0이라 점수는 100으로 남았고, 당일 접근성 검증이 홈(모바일)과 로고만 대상이라 드러나지 않았다. 모바일은 설명이 숨겨져 영향이 없다.
- `.claude/rules/accessibility.md`: 탭 이름은 보이는 제목·설명에서 그대로 나오게 두고 `aria-label`로 제목만 남기지 않는다는 규칙과 그 이유를 추가.
- 문구 변경 없음(폰트 서브셋 재생성 불필요). 이미지·스냅샷 변경 없음.

### 검증

| 검증 | 결과 |
|---|---|
| `tsc --noEmit` · `eslint` · `npm run build` | 통과 |
| 운영(수정 전) `/approval` 데스크톱 Lighthouse 13.6.0 | 접근성 100, `label-content-name-mismatch` 실패 3건(탭 버튼) |
| 프리뷰(수정 후) `/approval` 데스크톱 Lighthouse | 접근성 100, `label-content-name-mismatch` 통과(0건), 실패 감사 0 |
| 프리뷰(수정 후) `/approval` 모바일 Lighthouse | 접근성 100, 같은 규칙 통과 |
| 운영 홈 모바일 Lighthouse(검수 때 측정, 이 수정과 무관) | 성능 97 · 접근성 100 · SEO 100, LCP 2.6초, CLS 0 |

프리뷰는 Vercel 보호가 걸려 있어 공유 링크로 받은 `_vercel_jwt` 쿠키를 Lighthouse `--extra-headers`로 넘겨 측정했다. 측정 원본은 로컬 작업 폴더에만 두고 저장소에는 넣지 않았다(쿠키 값이 설정에 남는다).

### 커밋과 배포

- 브랜치 `fix/feature-tabs-label-in-name`, 커밋 `2a673d8` → [PR #4](https://github.com/isungse/roseai/pull/4). 체크 3개 통과, 머지 가능 상태.
- 오너 「머지 진행」 → merge commit `a8c8a18`(2026-11-01). Vercel 운영 배포 성공 뒤 운영 `/approval` 데스크톱 Lighthouse 13.6.0: 접근성 100, `label-content-name-mismatch` 통과(0건), 실패 감사 0. 운영 HTML의 탭 버튼에 `aria-label` 없음 확인.
