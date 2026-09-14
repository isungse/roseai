# Design System

색상·타이포그래피·스페이싱·모션 토큰. **이 문서에 정의된 값만 사용한다.** 임의의 hex/px 값 금지.

## 토큰 정의 위치 (Tailwind v4)

**단일 신뢰 소스**: `app/globals.css` 의 `@theme` 블록.
- `tailwind.config.ts` 는 사용하지 않는다 (v4 기본 방식).
- 색상 hex 와 폰트 스택을 `@theme` 에 직접 선언한다. 별도의 `styles/tokens.css` 를 두지 않는다 (DRY).
- 인라인 스타일에서 토큰이 필요할 때는 Tailwind v4 가 자동 노출하는 `var(--color-ink)`, `var(--color-hair)` 등을 그대로 사용한다.
- 결과: 컴포넌트는 `bg-brand`, `text-ink`, `border-hair` 같은 Tailwind 클래스만 사용. `bg-[var(...)]` 임의 사용 금지.

### `globals.css` 변경 시 캐시·서버 재기동

`app/globals.css` 의 **어떤 변경**도 Turbopack HMR 로 즉시 반영되지 않는다 — `@theme` 토큰뿐 아니라 **신규 CSS 룰 추가**도 동일. 변경 후:

1. dev 서버 재기동.
2. 그래도 새 룰이 브라우저 stylesheet 에 없으면 (`document.styleSheets` 로 확인) `.next/` 디렉토리 삭제 후 재기동.

이유: Tailwind v4 의 `@import "tailwindcss"` 가 빌드 시점에 CSS 를 한 번 컴파일하고, Turbopack 의 컴포넌트 HMR 은 `className` 변경만 반영. `globals.css` 룰 추가는 빌드 출력에 포함되어 재컴파일이 필요하며 캐시가 옛 컴파일을 잡고 있을 수 있다.

증상 진단: 새 selector 가 적용되지 않을 때 — DOM 의 `getComputedStyle` 로는 적용 안 됨이 확인되지만, 파일은 정확히 저장된 상태. 이때 위 절차로 해결.

## 색상

원본 ROSE-AI 랜딩의 Swiss minimalist 팔레트를 그대로 이관. 다크모드는 차기 마일스톤.

| 토큰 (CSS var) | Tailwind alias | 값 | 용도 |
|---|---|---|---|
| `--color-ink` | `ink` | `#000000` | 기본 텍스트·테두리 강조 |
| `--color-paper` | `paper` | `#FFFFFF` | 페이지 배경 |
| `--color-brand` | `brand` | `#E03131` | ROSE 레드 포인트 |
| `--color-g50` | `g50` | `#F4F4F4` | 보조 배경 (Evidence 섹션 등) |
| `--color-g500` | `g500` | `#737373` | 서브 텍스트 |
| `--color-hair` | `hair` | `#E5E5E5` | 얇은 구분선 |

`@theme` 예시:

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-ink: #000000;
  --color-paper: #ffffff;
  --color-brand: #e03131;
  --color-g50: #f4f4f4;
  --color-g500: #737373;
  --color-hair: #e5e5e5;
}
```

## 타이포그래피

폰트 스택 — 모두 `app/[locale]/layout.tsx` 에서 통합 로드. CDN 링크/`<link rel="stylesheet">` 금지.

- **Inter** — `next/font/google`. 본문·헤딩 기본. **variable font — weight 배열을 지정하지 않는다**, `next/font` 가 전 축(100–900)을 로드한다.
- **JetBrains Mono** — `next/font/google`. 모노스페이스 (인덱스 숫자, 메타 라인, 버튼 화살표). variable font, weight 배열 없음.
- **Pretendard Variable** — `npm i pretendard` → `next/font/local` 로 variable woff2 로드. 한국어 본문 우선.
  - 경로: `node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2`
  - 프로젝트에서는 `public/fonts/` 로 복사하지 말고 로컬 import 로 번들링. 자체 호스팅으로 CLS·개인정보·오프라인 빌드 모두 해결.
- 세 폰트 모두 CSS 변수로 노출 (`--font-inter`, `--font-mono`, `--font-pretendard`) 해서 `@theme` 에서 참조.

```css
@theme {
  --font-sans: var(--font-pretendard), var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-mono-jetbrains), ui-monospace, monospace;
  --font-display: var(--font-inter), var(--font-pretendard), sans-serif;
}
```

우선순위 이유: 한국어가 섞인 본문은 Pretendard 가 먼저 glyph 를 커버하고, 없는 문자(대부분 라틴)만 Inter 로 fallback. Display (히어로 헤드라인 "Architecture of Intelligence")는 순수 라틴이므로 Inter 를 먼저.

| 토큰 | 크기 | Line-height | 용도 |
|---|---|---|---|
| `text-display` | 56/72 | 1.05 | 히어로 헤드라인 |
| `text-h1` | 40 | 1.15 | 섹션 타이틀 |
| `text-h2` | 32 | 1.2 | 서브 섹션 |
| `text-h3` | 24 | 1.3 | 카드 타이틀 |
| `text-body-lg` | 18 | 1.6 | 리드 문단 |
| `text-body` | 16 | 1.6 | 본문 |
| `text-sm` | 14 | 1.5 | 캡션/메타 |
| `text-xs` | 12 | 1.4 | 레이블/배지 |

- 한국어는 `word-break: keep-all; overflow-wrap: anywhere;` 기본 적용.
- 숫자 조판은 `tabular-nums` 유틸 사용.

## 스페이싱

Tailwind 기본 스케일 (4px grid) 만 사용. 섹션 세로 리듬은 다음 값으로 통일:

- 섹션 수직 패딩: `py-16 md:py-20 lg:py-28`. **예외** — 셸 높이를 채우는 단일 섹션(Showcase)은 flex 중앙 정렬이 여백을 공급하므로 `py-12 md:py-16` 으로 낮춰, 900px 높이 노트북에서도 스크롤 없이 카드 전체가 한 화면에 들어오게 한다.
- 컨테이너 가로 패딩: `px-7 md:px-10`
- 최대 너비: **`max-w-[1360px]` 페이지 셸** (아래 "Page Shell" 절). 좁은 독해 영역은 `max-w-prose`.

### Page Shell (Naver-style 고정 너비)

페이지 전체는 `app/[locale]/layout.tsx` 의 단일 셸 안에서 렌더된다. 셸이 **유일한 너비 제어 지점** — 섹션·헤더·푸터 안에 `mx-auto max-w-screen-xl` 같은 보조 클램프를 두지 않는다.

```tsx
// app/[locale]/layout.tsx
<body className="text-ink antialiased">  {/* body bg 는 globals.css 에서 g50 */}
  <div className="mx-auto my-10 flex min-h-[calc(100svh-5rem)] max-w-[1360px] flex-col border border-hair bg-paper md:my-16 md:min-h-[calc(100svh-8rem)]">
    <TopBar />     {/* sticky top-0 — 셸 마진과 동기하지 않는다 (아래 설명) */}
    <main className="flex flex-1 flex-col">{children}</main>
    <Footer />
  </div>
</body>
```

핵심 디테일:

- **외곽 캔버스**: `globals.css` 의 `html, body { background: var(--color-g50) }`. 셸의 paper bg 가 그 위에 floating 카드처럼 떠 보이고, `border border-hair` (사방) 가 카드 윤곽을 닫는다.
- **셸 너비**: `1360px` 고정 (Tailwind 의 `max-w-screen-xl` = 1280px 가 아닌 임의값). 처음엔 Naver 표준에 가까운 1200 이었으나, 2-컬럼 쇼케이스(이미지 카드 스택 + 본문)가 1200 에서는 답답하고 뒤에 겹친 카드가 드러날 여유가 없어 1360 으로 넓혔다. 1440 뷰포트에서 좌우 40px 여백이 남아 floating-card 시각은 유지된다.
- **셸 상하 여백**: `my-10 md:my-16` (40 / 64px). viewport 가장자리에 붙이지 않는다 — 답답한 풀-블리드 느낌을 차단하고 카드 floating 효과를 만든다. **셸은 `flex flex-col` + `min-h-[calc(100svh-5rem)] md:min-h-[calc(100svh-8rem)]`** (100svh − 상하 마진 합) 로 첫 화면을 채운다. 섹션이 하나뿐인 랜딩에서 셸이 콘텐츠 높이만큼만 서면 카드 아래 g50 캔버스가 크게 남아 페이지가 잘린 것처럼 보인다. `<main>` 은 `flex flex-1 flex-col`, 유일한 섹션은 `flex flex-1 items-center` 로 남는 높이를 차지하며 콘텐츠를 수직 중앙에 둔다. 콘텐츠가 더 길면 min-height 는 무시되고 평소처럼 스크롤된다.
- **Sticky 오프셋은 `top-0` (셸 마진과 동기 금지)**: TopBar 가 `sticky top-10 md:top-16` 처럼 셸 마진과 같은 값을 쓰면, 바 위쪽에 40-64px 의 빈 공간이 viewport 안에 남고 그 영역으로 **스크롤 중인 섹션 콘텐츠가 비쳐 흘러간다** — 바가 페이지 중간에 떠 있는 것처럼 보이고 위·아래로 동시에 콘텐츠가 지나가는 시각 부조화 발생. `top-0` 으로 두면 floating-card 시각은 scroll=0 에서만 보이고, 스크롤이 시작되면 바가 자연스럽게 viewport 최상단으로 올라가 콘텐츠를 완전히 덮는다 — 이게 정상.
- **섹션 측 책임**: 각 섹션은 `border-b border-hair` + `relative` 만 두고, **자체 내부 div** 가 `px-7 md:px-10` 좌우 패딩 + `py-{n}` 세로 패딩만 책임진다. 너비 클램프 없음.

### Sticky TopBar 클리어런스

TopBar 높이는 `h-16` (64px), sticky 오프셋 `top-0`. 섹션 상단 패딩은 sticky 바와 첫 페인트에서 겹치지 않을 만큼(`pt-12` 이상) 둔다. 구 `SectionLabel` 절대 배치 규칙은 컴포넌트 제거와 함께 폐기.

## Radius / Shadow

| 토큰 | 값 | 용도 |
|---|---|---|
| `rounded-sm` | 6px | 배지, 인풋 |
| `rounded-md` | 10px | 버튼, 카드 |
| `rounded-lg` | 16px | 섹션 카드 |
| `rounded-2xl` | 24px | 히어로 패널 |

그림자는 3단계만: `shadow-sm`, `shadow-md`, `shadow-lg`. 다크모드에서는 border 대비를 우선.

## 모션

- 기본 duration: `150ms` (마이크로), `250ms` (표준), `400ms` (레이아웃)
- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)` (= `ease-out-quint` 대용)
- `prefers-reduced-motion: reduce` 시 transform/opacity 외 모션 제거

## Breakpoint

Tailwind 기본 (`sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`). 커스텀 추가 금지.

## 아이콘

Lucide 단일 세트. 크기는 `16/20/24` 3단계만. `stroke-width={1.75}` 기본.

## 다크모드

`class` 전략. `<html class="dark">` 토글. 시스템 prefers-color-scheme 으로 초기값 결정하고 사용자 선택은 localStorage에 저장.

## Showcase 타이포 스케일

랜딩의 유일한 섹션이라 위 토큰 표와 별도로 `clamp` 로 직접 지정한다 (단일 사용처 — 토큰화하지 않음):

| 역할 | 값 | 비고 |
|---|---|---|
| 슬라이드 제목 (h1 / h2) | `clamp(24px, 2.8vw, 36px)` · 1.25 · -0.02em | 2줄 고정은 JSON 값의 `\n` |
| 본문 (제목 있는 슬라이드) | `clamp(16px, 1.25vw, 19px)` · 1.8 | 591px 컬럼에서 **4줄 이내** 유지 (1440 기준 한 줄 ≈ 한글 32자; 넘치면 wrap 되어 줄 수가 는다) |
| 스테이트먼트 본문 (제목 없는 슬라이드) | `clamp(22px, 2vw, 26px)` · 1.6 · medium | 첫 줄이 제목 역할. 현재 4장 모두 제목이 있어 미사용 — 기능은 유지 |
| 카운터 `01 / 04` | mono `text-xs` g500 `tabular-nums` | |

- 원형 요소는 캐러셀 컨트롤에만 허용 (Radius 표의 예외): 화살표 `h-12 w-12 rounded-full bg-ink hover:bg-brand`, 인디케이터 점 `h-2.5 rounded-full` (활성 `w-7 bg-brand`).
- 카드 스택: 이미지 `max-w-[460px] rounded-2xl shadow-lg`, 뒤 카드는 ±18% / -13% / scale .88 / rotateY 15°. 카드 폭·컬럼 간격(`lg:gap-24`)·정렬(md 이상 좌측)은 **뒤 카드 모서리에서 본문까지 100px 이상** 확보하도록 맞춘 값 — 카드를 가운데 정렬하면 줄인 폭의 절반이 왼쪽으로 가서 효과가 반감된다.

## 이미지 에셋 파이프라인

- 원본은 생성 도구에서 받은 1254² 또는 2508² PNG (사용자 Downloads 폴더). 저장소에는 **1600² JPEG q86** 만 커밋 (`public/images/showcase-0N.jpg`, 300–460KB). `next/image` 가 AVIF/WebP 로 재인코딩하므로 원본 PNG(2–5MB) 는 커밋하지 않는다.
- 변환은 PowerShell + `System.Drawing` (ImageMagick 불필요): 정사각 중앙 크롭 → HighQualityBicubic 리사이즈 → JPEG 인코더 품질 86.
- 슬라이드 번호와 파일 번호를 항상 일치시킨다. 순서를 바꿀 때 데이터의 `src` 만 바꾸지 말고 `git mv` 로 파일도 함께 교체.
- **같은 파일명으로 이미지를 교체하면 브라우저가 옛 `/_next/image` 결과를 계속 보여줄 수 있다.** dev 의 최적화 응답은 `max-age=0, must-revalidate` 지만 Browser pane 은 재검증 없이 캐시를 재사용한 사례가 있음. 서버 측 옵티마이저 캐시는 Next 16 dev 에서 **`.next/dev/cache/images`** 에 있고 (`.next/cache/images` 아님) 파일 교체를 정상 감지한다 — 서버 문제가 아니다. **판정법**: `Invoke-WebRequest "http://localhost:3000/_next/image?url=…&w=640&q=75" -Headers @{Accept='image/jpeg'}` 로 서버 응답을 직접 받아 로컬 파일과 32×32 썸네일 픽셀 차이로 비교 (일치 ≈ 1, 불일치 ≈ 200+). 브라우저 쪽 잔상은 `fetch(url, {cache:'reload'})` 를 **srcset 의 모든 폭**에 대해 실행한 뒤 새로고침. 프로덕션은 파일 ETag 가 바뀌어 새 이미지가 서빙되며 같은 판정법으로 확정 가능.
