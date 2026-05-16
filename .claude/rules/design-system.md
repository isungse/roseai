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

- 섹션 수직 패딩: `py-16 md:py-20 lg:py-28` (Contact·대문 섹션은 1단계 위인 `py-20 md:py-24 lg:py-28`)
- 컨테이너 가로 패딩: `px-7 md:px-10`
- 최대 너비: **`max-w-[1200px]` 페이지 셸** (아래 "Page Shell" 절). 좁은 독해 영역은 `max-w-prose`.

### Page Shell (Naver-style 고정 너비)

페이지 전체는 `app/[locale]/layout.tsx` 의 단일 셸 안에서 렌더된다. 셸이 **유일한 너비 제어 지점** — 섹션·헤더·푸터 안에 `mx-auto max-w-screen-xl` 같은 보조 클램프를 두지 않는다.

```tsx
// app/[locale]/layout.tsx
<body className="text-ink antialiased">  {/* body bg 는 globals.css 에서 g50 */}
  <div className="mx-auto my-10 max-w-[1200px] border border-hair bg-paper md:my-16">
    <TopBar />     {/* sticky top-0 — 셸 마진과 동기하지 않는다 (아래 설명) */}
    <main>{children}</main>
    <Footer />
  </div>
</body>
```

핵심 디테일:

- **외곽 캔버스**: `globals.css` 의 `html, body { background: var(--color-g50) }`. 셸의 paper bg 가 그 위에 floating 카드처럼 떠 보이고, `border border-hair` (사방) 가 카드 윤곽을 닫는다.
- **셸 너비**: `1200px` 고정 (Tailwind 의 `max-w-screen-xl` = 1280px 가 아닌 임의값). 1200 은 Naver·국내 포털의 표준에 더 가깝다.
- **셸 상하 여백**: `my-10 md:my-16` (40 / 64px). viewport 가장자리에 붙이지 않는다 — 답답한 풀-블리드 느낌을 차단하고 카드 floating 효과를 만든다. **`min-h-screen` 은 두지 않는다** — 외곽 g50 이 자연스럽게 채운다.
- **Sticky 오프셋은 `top-0` (셸 마진과 동기 금지)**: TopBar 가 `sticky top-10 md:top-16` 처럼 셸 마진과 같은 값을 쓰면, 바 위쪽에 40-64px 의 빈 공간이 viewport 안에 남고 그 영역으로 **스크롤 중인 섹션 콘텐츠가 비쳐 흘러간다** — 바가 페이지 중간에 떠 있는 것처럼 보이고 위·아래로 동시에 콘텐츠가 지나가는 시각 부조화 발생. `top-0` 으로 두면 floating-card 시각은 scroll=0 에서만 보이고, 스크롤이 시작되면 바가 자연스럽게 viewport 최상단으로 올라가 콘텐츠를 완전히 덮는다 — 이게 정상.
- **섹션 측 책임**: 각 섹션은 `border-b border-hair` + `relative` 만 두고, **자체 내부 div** 가 `px-7 md:px-10` 좌우 패딩 + `py-{n}` 세로 패딩만 책임진다. 너비 클램프 없음.

### Sticky TopBar 클리어런스

TopBar 높이는 `h-16` (64px), sticky 오프셋 `top-0`. `SectionLabel` 은 섹션 상단에 `top-5` 로 absolute. Sticky 와 첫 페인트에서 겹치지 않게 섹션 상단 패딩은 **`pt-16 md:pt-20`** 이상 (Contact 등 메인 섹션은 1단계 위인 `pt-20 md:pt-24`).

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
