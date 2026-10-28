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
