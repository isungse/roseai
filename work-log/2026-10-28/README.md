# 2026-10-28 — works 스냅샷 1차 반입

## 목적
제품 소개 `/works`의 화면 출처인 스냅샷 파이프라인(private `groupware-demo/tools`)이 처음으로 끝까지 돌아, 투어용 정적 HTML과 화면 이미지가 이 브랜치에 들어왔다.

## 들어온 파일
- `public/demos/works/<slug>/index.html` 10장: dashboard · approval-inbox · approval-new · approval-my-documents · approval-drafts · board-notice · board-department · board-write · board-post · calendar
- `public/images/works/` 11장: hub/01-dashboard · hub/02-dashboard-mobile · hub/04-approval · hub/07-sidebar · approval/01-hero · approval/07-numbering · board/01-hero · board/02-boards · board/03-notice · board/04-editor · board/07-writing

## 2차 반입 (같은 날 저녁)
- `public/demos/works/` +2: checkin-home(출퇴근 앱, 390 폭) · messenger(원무팀 대화방 활성 — 사진·PDF 첨부, 읽지 않은 메시지 구분선)
- `public/images/works/` +8: hub/03-messenger · messenger/01-hero · 02-rooms · 03-files · 06-desktop(임시 — 창 프레임 합성 전 1280×860 원본) · 08-retention · 09-mobile · attendance/04-wifi
- 메신저 캡처는 최신 메시지가 보이게 스크롤한 상태로 찍는다(실제 앱이 열리는 위치)

## 데이터
병원 이름(평택성모병원)만 실명이고 인물·부서·직급·문서·메시지는 전부 생성기가 만든 가상 데이터다. 오너 결정(2026-10-28): 실 직원 명단과 대조하지 않고 가상 이름 그대로 쓴다. 검사 게이트(실 사번 패턴·외부 origin·스크립트·링크·noindex·크기) 7항목 전부 통과한 뒤 커밋했다.

## 확인한 것
- 스냅샷 HTML: `<script>` 0 · 외부 origin 0 · `href`는 배너 「← 돌아가기」 1건 · noindex · 131~177 KB · `(TEST)` 표기 치환됨
- `/ko/works/tour?menu=dashboard`(로컬 dev)에서 iframe에 대시보드 스냅샷이 배너와 함께 열림
- 이미지: 2880×1800 / 1170×2532 JPEG(q86, progressive). 캡처는 미리보기 배너를 숨기고 찍는다

## 다음
checkin-home · messenger → 나머지 화면 → 51장 전부 → `lib/works/images.ts` 자리표시 0 → 게이트 통과 → 커밋·프리뷰.

---

# 2026-10-28 (밤) — 사이트 전면 개편: ROSE-AI WORKS 제품 사이트

## 목적
오너 결정으로 roseai.co.kr 전체를 ROSE-AI WORKS 소개 사이트로 바꾼다. 홈이 곧 제품 허브이고, 사이트는 한국어 하나만 둔다.
옛 브랜드 랜딩(사진 쇼케이스 4장·영어판)과 사이트 안 링크가 끊긴 옛 데모 3개는 숨기지 않고 보관한 뒤 지운다.
운영 반영은 이 브랜치를 머지할 때 한 번에 한다 — 그때까지 운영에는 옛 사이트가 그대로 있다.

## 바뀐 것
- **주소**: `/`(홈 = 제품 허브) · `/approval` · `/messenger` · `/attendance` · `/board` · `/support` · `/tour`. 언어 접두어와 `/works` 접두어가 없다.
- **옛 주소 308**: `/ko`·`/en`·`/works`·`/ko/works/**`·`/en/works/**`·`/ko/**`·`/en/**`·옛 데모 3개 → 새 주소로 한 번에 (`next.config.ts`).
- **한국어 고정**: next-intl 라우팅 없는 구성 — `i18n/request.ts` 가 `ko` 고정, `messages/ko.json` 하나(옛 `works.ko.json` 을 합침). `[locale]` 세그먼트·`routing.ts`·`navigation.ts`·`proxy.ts`·`LangToggle` 삭제. 링크는 `next/link`.
- **상단 바**: 제품 로고(`ROSE·AI` + `WORKS`) + 기능 5개·전체 메뉴 투어. 옛 works 서브내비는 상단 바로 합쳤다. 좁은 화면은 로고 아래 가로 스크롤 칩 줄.
- **푸터**: `© 2026 ROSE-AI` (옛 `ALL SYSTEMS NOMINAL` 제거). 연락처는 두지 않는다.
- **메타**: 제목 `<페이지> | ROSE-AI WORKS`(홈은 제품 제목 그대로), canonical = 자기 경로, hreflang 없음, sitemap 7 URL, JSON-LD `@graph`(Organization · WebSite · SoftwareApplication — offers·SearchAction 없음), 사이트 공통 OG.
- **404**: 한국어 문구(메시지 키 `notFound.*`).
- **경로 헬퍼**: `lib/data/works.ts` 의 `featureHref` · `TOUR_HREF` · `tourMenuHref` — 컴포넌트의 `/works…` 문자열 17곳을 대체.

## 문구 변경 (초안 — 확정은 문구 검토 때)
- 홈 히어로: 아이브로우 "병원 그룹웨어" · 제목 "병원이 매일 쓰는 그룹웨어,\nROSE-AI WORKS" · 리드 "전자결재·메신저·근태관리·게시판·업무지원을 하나의 흐름으로.\n평택성모병원에서 실제 운영 중인 제품을 그대로 소개합니다." · 강조 "실제 운영 중인"
- 페이지 제목: "전자결재" · "메신저" · "근태관리" · "게시판" · "업무지원 SUPPORT" · "전체 메뉴 투어" (옛 제목 끝의 " — ROSE-AI WORKS" 를 빼고, " | ROSE-AI WORKS" 는 제목 템플릿이 붙인다)
- 404: "404" · "페이지를 찾을 수 없습니다." · "홈으로 돌아가기"

## 지운 것
`components/sections/ShowcaseCarousel.tsx`·`ShowcaseSection.tsx` · `lib/data/showcase.ts` · `public/images/showcase-*` 5개 · `messages/en.json` ·
`public/demos/{performance,service-desk,workforce-monitor}` · 그 데모만 쓰던 글꼴 4개(IBM Plex Mono 3 · JetBrains Mono). 스냅샷이 쓰는 `PretendardVariable.woff2` 는 남겼다.
옛 사이트의 마지막 운영 상태는 커밋 `bd73552` 에 주석 태그 `archive/brand-site` 로 보관한다(원격 push 는 확인 뒤).

## 스냅샷
배너 「← 돌아가기」 링크를 `/tour` 로 바꿔 12장을 다시 뽑았다. 이전 추출본과 비교해 바뀐 줄은 각 파일의 링크 한 줄뿐이다(추출 결정성 유지). 검사 게이트 7항목 통과.

## 규칙 개정
`CLAUDE.md` · `i18n.md`(한국어 고정으로 다시 씀) · `seo.md`(canonical·hreflang 없음·JSON-LD) · `content.md`(제품 문구 원칙으로 다시 씀) ·
`code-style.md` · `design-system.md` · `accessibility.md` · `deployment.md`(정규 호스트 apex, 미들웨어 없음).

## 확인한 것
- `npm run lint` 경고 0, `npm run build` 통과 — 13개 경로 전부 정적, 미들웨어 없음
- 로컬 dev: 7 페이지 200, `/foo`·`/approval/x`·`/api/contact` 404, 옛 주소 13개가 308 한 번으로 새 주소(최종 200)
- 헤드리스 1440·390: 7 페이지 콘솔 오류 0 · 외부 요청 0, 투어 iframe 에 대시보드 스냅샷이 열리고 살아 있는 링크는 배너 `/tour` 하나
- 모바일 상단 바 두 줄(로고 64px + 칩 48px), 칩 줄만 가로 스크롤 · 페이지 가로 스크롤 없음 · 현재 페이지 `aria-current`

## 다음
보관 태그 push(확인 뒤) → 홈 히어로 아트워크 시안 2종 → 나머지 스냅샷 → 자리표시 0 → 프리뷰 Lighthouse → 문구 확정 → PR.
정규 호스트는 apex — Vercel 도메인 설정(`www` → apex)을 교체 때 맞춘다.

## 보관 태그 · 결재 문서 상세 스냅샷 (같은 날 밤)
- 보관 태그 `archive/brand-site`(→ `bd73552`)를 오너 확인 뒤 origin 에 push 했다.
- `public/demos/works/approval-detail/index.html` 추가: 구매요청서 결재 진행 중 화면 — 결재선(기안 · 승인 2 · 합의 현재 · 원장 대기, 참조 확인 1) · 품목 표 · 첨부 1 · 관련문서 2 · 결재 이력 4 · 의견 2. 인물·문서는 전부 가상 데이터다.
- `public/images/works/approval/04-preapprove.jpg` 추가(결재선 표가 보이는 데스크톱 캡처) — 전자결재 페이지의 선결재 탭 이미지.
- 이 문서의 목록 배지를 상세와 맞추려고 댓글 수를 2로 했다. 그래서 `approval-inbox` · `approval-my-documents` 스냅샷에 「댓글 2개」 배지 하나가 더해졌고(다른 변경 없음), 그 화면에서 찍은 `hub/04-approval` · `approval/01-hero` · `approval/07-numbering` 을 다시 찍었다.
- 확인: 첫 화면 호출 12건 전부 200 · 콘솔 오류 0 · 외부 요청 0 · 두 번 추출 결과 동일 · 살아 있는 링크는 배너 `/tour` 하나 · 스냅샷 검사 7항목 통과(공개 스냅샷 13장, 이미지 20/51).

## 홈 히어로 아트워크 자리 · 기능 이미지 축소 결정 (같은 날 밤)
- 홈 히어로는 `public/images/home-hero.jpg`(실제 화면 스냅샷으로 만든 제품 컴포지션, 1600×1200)가 있으면 그 한 장을 보여 주고, 없으면 지금처럼 데스크톱·모바일 캡처를 겹친다(`f606b17`). 대체 텍스트 키 `works.hero.artAlt` 추가.
- 아트워크 시안 2종(정면 / 기기만 살짝 기울인 사선)은 오너가 고르기 전이라 저장소에 넣지 않았다. 로컬 dev 에서 두 시안을 넣어 홈 화면을 찍어 보고 파일은 다시 뺐다 — 같은 파일명으로 바꿔 넣으면 dev 이미지 최적화 캐시(`.next/dev/cache/images`)가 앞 시안을 계속 내주므로, 비교할 때는 그 캐시를 비운다.
- 오너 결정: 기능 페이지 이미지는 대표 1 + 탭 3 + 심화 1 로 줄인다(51 → 32장). 홈 히어로 아트워크는 줄이지 않는다. 탭·섹션 목록은 확인 뒤 코드에 반영한다.

## 홈 히어로 A안 게시 · 공유 카드 (같은 날 밤)
- 오너가 A안(정면)을 골랐다. `public/images/home-hero.jpg`(1600×1200, 115 KB) — 브라우저 틀 속 대시보드, 오른쪽 아래 출퇴근 앱 화면 휴대폰, 결재선 도장 카드, 메신저 말풍선 카드. 모두 실제 화면 스냅샷이고 인물·문서는 가상이다.
- 공유 카드(`app/opengraph-image.tsx`, 1200×630 PNG 116 KB): 왼쪽에 로고·문구·제품명·도메인, 오른쪽에 히어로 아트워크.
- 고친 것: 기능 페이지·투어에 `og:image` 가 없었다. 페이지가 정한 `openGraph` 가 루트 이미지를 덮어써서다(메타 병합은 얕다). 메타 헬퍼가 공유 카드를 `openGraph.images`·`twitter.images` 에 직접 넣는다 — 홈·기능 5·투어 모두 `og:image`·`twitter:image` 확인. seo.md 에 규칙으로 남겼다.
- 확인: lint·build 통과(OG 정적 생성), 홈 1440·390 화면에 아트워크 표시, 콘솔 오류 0.

## 기능 페이지 축소 반영 (같은 날 밤)
- 오너가 목록을 확정했다(「표대로 확정」). 기능 페이지마다 대표 1 + 탭 3 + 심화 1, 이미지 51 → 32장.

  | 페이지 | 탭 3 | 심화 1 |
  |---|---|---|
  | 전자결재 | 양식 빌더 · 결재선 · 결재 진행 | 문서번호와 연도별 연번 |
  | 메신저 | 1:1·그룹 대화방 · 파일 첨부 · PC 데스크톱 앱 | 모바일 웹 |
  | 근태관리 | 근무표 · 연차 · Wi-Fi 출퇴근 | 근태관리자 화면 |
  | 게시판 | 전사·부서 게시판 · 공지 배지 · 댓글 | 글쓰기 화면 |
  | 업무지원 | 요청 접수 · 담당 부서 자동 판정 · 처리 현황 | 요청 상세와 처리 이력 |

- 전자결재의 「선결재·연속 결재」 탭은 「결재 진행」(`progress`)으로 바꿨다 — 이미지는 결재선 도장이 보이는 문서 상세(`approval/04-preapprove.jpg` → `04-progress.jpg`). 문구 초안: "결재칸 도장으로 누가 승인했고 지금 누구 차례인지 바로 보입니다. 의견과 결재 이력, 첨부, 관련문서도 문서 한 화면에 모입니다."
- AI 맞춤법 검사는 이미지 없이 전자결재 리드에 한 문장으로 남겼다: "기안 본문의 맞춤법과 띄어쓰기는 AI가 검사해 제안하고, 반영은 사람이 정합니다."
- 빠진 탭·섹션 문구 키 19개를 지웠고, 이미 찍었지만 빠지는 `messenger/08-retention.jpg` · `board/04-editor.jpg` 를 지웠다.
- 확인: lint·build 통과, 기능 페이지 5장 모두 탭 3 · 심화 1 · 콘솔 오류 0 · 문구 누락 로그 0, 스냅샷 검사 7항목 통과(이미지 18/32).

## 스냅샷·이미지 완성 (같은 날 밤 늦게)
- 전체 메뉴 투어의 스냅샷이 메뉴마다 다 들어왔다(공개 HTML 35장). 기능·허브 이미지 32장도 전부 실제 화면 캡처다.
- 자리표시 SVG 2개와 그 대체 코드를 지웠다. 이제 캡처 파일이 빠지면 빌드가 멈춘다(`lib/works/images.ts`) — 빈 틀로 배포되는 일이 없다. 문구 키 `works.common.placeholder` 삭제.
- 스냅샷이 입력칸·선택칸 값까지 실제 화면과 같아졌다(목록의 「20개」, 기안 양식 선택, 양식 편집 입력값).
- 새 이미지: 결재선 편집 창(즐겨찾기 결재선) · 양식 편집(기본 결재선·결재 정책) · 게시글 댓글 · 근무표 · 연차 현황 · 마감 현황 · SUPPORT 목록 · 요청 접수 · 유형별 담당 부서 · 처리 이력 · PC 메신저(Windows 창 제목 표시줄을 그려 넣은 합성).
- 확인: lint·build 통과, 홈·기능 5·투어 200, 콘솔 오류 0, 스냅샷 검사 최종 모드 통과(HTML 35 · 이미지 32/32).

## W9 점검 — 프리뷰 Lighthouse·링크·옛 주소 (같은 날 밤)
측정: Lighthouse 12.8 모바일 기본값(느린 4G·CPU 4배 시뮬레이션), 보호된 프리뷰를 공유 링크 쿠키로 열어 페이지마다 3회, 중앙값.

| 페이지 | 성능 (전 → 후) | 접근성 | 권장사항 | SEO(프리뷰) |
|---|---|---|---|---|
| 홈 `/` | 74 → **92** (92–94) | 100 | 100 | 61 |
| 전자결재 `/approval` | 73 → **92** (92–93) | 100 | 100 | 61 |
| 투어 `/tour` | 61 → **92** (92–97) | 96 → 100 | 100 | 58 |

- 원인과 수정
  - Pretendard Variable 원본(2 MB)이 모든 페이지에 preload 돼 LCP가 약 13초였다 → 사이트가 쓰는 글자만 남긴 서브셋(100 KB, 굵기 전부)으로 바꿨다. 문구를 바꾸면 `npm run font:subset`, 서브셋에 없는 글자가 문구에 들어오면 빌드가 멈춘다.
  - 히어로 이미지가 낮은 우선순위로 받아지고 있었다(Next 16에서 `priority`가 `preload`로 바뀌었고 `fetchPriority`를 따로 줘야 높아진다) → `preload` + `fetchPriority="high"`.
  - Inter·JetBrains Mono preload 제거(404 제목·작은 라벨에만 쓰인다).
  - 투어: 정적 HTML에 탐색기가 없어 하이드레이션 뒤 나타나며 화면이 밀렸다(CLS 최대 0.67) → Suspense 대체 화면을 기본 메뉴의 탐색기로. 선택된 메뉴 글자를 잉크색으로(빨강 4.2:1 → 대비 통과).
- 성능 95는 아직이다. LCP 약 3.1–3.3초가 남는데, 남은 것은 Next.js 런타임 JS(약 180 KB)·한글 글꼴(100 KB)·모바일 연결 수립이다. 프리뷰 툴바·링크 미리 불러오기·하단 이미지를 막아 봐도 1점 안팎이었다.
- SEO 58–61은 프리뷰 전용 차단(`x-robots-tag: noindex`, 운영 외 robots.txt) 두 항목 때문이고, 둘을 빼면 100이다. 운영(`VERCEL_ENV=production`)에서는 열린다.
- 링크: 홈·기능 5·투어에서 내부 대상 82개 전부 200. 기능이 아닌 slug(`/calendar`)와 `/api/contact`는 404.
- 옛 주소: `/ko`·`/en`·`/ko/works`·`/ko/works/approval`·`/en/works/tour?menu=todo`·`/works/board`·옛 데모 3개(`…/index.html`)가 308 한 번에 새 주소(200). `/ko/아무거나`는 규칙대로 `/아무거나`로 한 번에 가고 그 주소가 없어 404다.
- 그 밖: 옛 사이트 흔적 0, 메시지 파일 `ko.json` 하나, `<html lang="ko">`, 스냅샷 검사 최종 모드 통과, lint·build 통과.
