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
| `--color-copy` | `copy` | `#525252` | 긴 소개 본문과 회색 배경 위 본문 |
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
  --color-copy: #525252;
  --color-hair: #e5e5e5;
}
```

## 타이포그래피

폰트 스택 — 모두 `app/layout.tsx` 에서 통합 로드. CDN 링크/`<link rel="stylesheet">` 금지.

- **Inter** — `next/font/google`. 라틴 문자와 display 폰트. **variable font — weight 배열을 지정하지 않는다**, `next/font` 가 전 축(100–900)을 로드한다.
- **JetBrains Mono** — `next/font/google`. 모노스페이스 (인덱스 숫자, 메타 라인, 버튼 화살표). variable font, weight 배열 없음.
- **Pretendard Variable** — `npm i pretendard` → **사이트가 쓰는 글자만 남긴 서브셋**을 `next/font/local` 로 로드. 한국어 본문 우선.
  - 경로: `app/fonts/PretendardVariable.subset.woff2` (약 100 KB, 굵기 축 전부 유지). 원본(`node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2`)은 2 MB 라 모든 페이지에 preload 되면 모바일 LCP 가 13초까지 밀렸다(2026-10-28 W9 Lighthouse).
  - 문구를 바꾸면 `npm run font:subset` 으로 다시 만든다(`app/fonts/subset.mjs` — `messages/`·`app/`·`components/`·`lib/` 의 글자 + 출력 가능한 ASCII). `messages/ko.json` 에 서브셋에 없는 글자가 있으면 `lib/fonts.ts` 가 빌드를 멈춘다 — 시스템 폰트로 조용히 바뀌는 글자를 배포하지 않는다.
  - `public/fonts/` 로 복사하지 말고 로컬 import 로 번들링. 자체 호스팅으로 CLS·개인정보·오프라인 빌드 모두 해결.
- 세 폰트 모두 CSS 변수로 노출 (`--font-inter`, `--font-mono`, `--font-pretendard`) 해서 `@theme` 에서 참조.

```css
@theme {
  --font-sans: var(--font-pretendard), var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-mono-jetbrains), ui-monospace, monospace;
  --font-display: var(--font-inter), var(--font-pretendard), sans-serif;
}
```

한국어 소개 본문과 제목은 Pretendard 를 먼저 사용한다. `font-display` 는 Inter 우선이며, 폰트 역할은 CSS 변수로 선택한다.

| 토큰 | 크기 | Line-height | 용도 |
|---|---|---|---|
| `text-display` | 56 | 1.05 | 큰 display 문구 |
| `text-intro` | 48 | 1.4 | 데스크톱 소개 히어로 |
| `text-section` | 36 | 1.35 | 소개 섹션·업무 이점 제목 |
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

- 섹션 수직 패딩: `py-16 md:py-20 lg:py-28`.
- 홈 소개 컨테이너 가로 패딩: `px-6 md:px-10` (24 / 40px). 기능 상세·투어의 기존 `px-7 md:px-10` 은 별도 화면의 독해 폭으로 유지한다.
- 최대 너비: **`max-w-[1360px]` 페이지 셸** (아래 "Page Shell" 절). 좁은 독해 영역은 `max-w-prose`.

### Page Shell

페이지 전체는 `app/layout.tsx` 의 단일 셸 안에서 렌더된다. 셸이 **유일한 너비 제어 지점** — 섹션·헤더·푸터 안에 `mx-auto max-w-screen-xl` 같은 보조 클램프를 두지 않는다.

```tsx
// app/layout.tsx
<body className="text-ink antialiased">  {/* body bg 는 globals.css 에서 g50 */}
  <div className="mx-auto flex min-h-svh max-w-[1360px] flex-col bg-paper">
    <TopBar />     {/* sticky top-0 */}
    <main className="flex flex-1 flex-col">{children}</main>
    <Footer />
  </div>
</body>
```

- **외곽 캔버스**는 `g50`, 셸은 `paper`. 최대 1360px에서 가운데 정렬하며, 1440px 화면에는 좌우 40px 캔버스가 남는다.
- **상하 마진은 0**이고 셸 테두리는 두지 않는다. 제품 소개가 뷰포트 위에서 바로 시작하고, `min-h-svh` 와 flex main 이 짧은 페이지에서도 화면 높이를 채운다.
- **Sticky 오프셋은 `top-0`**. 헤더 위 빈틈으로 본문이 비치지 않게 하며, 레이아웃에 상하 마진을 다시 넣어 보정하지 않는다.
- **섹션은 내부 패딩만 책임진다.** 너비 클램프를 중복하지 않고, 구분선은 정보 그룹을 나눌 때 사용한다.

### Sticky TopBar 클리어런스

TopBar 는 데스크톱 64px, 모바일 로고 64px + 메뉴 48px이며 sticky 오프셋은 `top-0`. 앵커에는 해당 높이보다 큰 scroll margin 을 두어 도착 제목이 헤더에 가려지지 않게 한다.

### 소개 화면 구성

- 홈은 제품 소개 → 업무 이점 3개 → 제품 근거 → 핵심 5기능 → 전체 메뉴 투어 순서다. 전체 메뉴의 세부 항목은 투어에서 탐색한다.
- 업무 이점은 모바일에서 **제목 → 화면 → 설명 → 관련 기능** 순서로 보여 준다. 데스크톱은 2열을 좌우 교차하며, 설명과 그 장면을 가까이 둔다. `benefit-section` 의 grid area 로 표현하고 DOM 을 복제하지 않는다.
- 기능 레일 카드 폭은 모바일 **296px**, `md` 이상 **400px**, 간격은 **16 / 24px**, 스크롤 시작 패딩은 **24 / 40px**다. 다음 카드 일부가 보여 수평 탐색을 알 수 있게 한다. 동작은 `code-style.md` 의 수동 레일 원칙을 따른다.

## Radius / Shadow

| 토큰 | 값 | 용도 |
|---|---|---|
| `rounded-sm` | 6px | 배지, 인풋 |
| `rounded-md` | 10px | 버튼, 카드 |
| `rounded-lg` | 16px | 섹션 카드 |
| `rounded-2xl` | 24px | 히어로 패널 |

반경은 위 값을 `globals.css` 의 `--radius-sm/md/lg/2xl` 에 명시한다. Tailwind 기본값과 문서값이 다르게 적용되지 않게 한다. 그림자는 `shadow-sm`, `shadow-md`, `shadow-lg` 만 사용한다.

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

## 이미지 에셋 파이프라인

### 제품 화면 표시

- `lib/works/image-metadata.ts` 의 static import 에서 실제 `width`·`height` 를 읽는다. `worksImage()` 는 이미지별 치수와 kind 를 반환하며, 모든 이미지를 1440×900으로 가정하지 않는다. 파일이나 메타데이터가 빠지면 빌드 오류로 드러낸다.
- `ScreenImage` 는 비율을 유지하고, `mobile` 과 `panel` 은 최대 **288px**, `sidebar` 는 최대 **192px**로 제한한다. 좁은 캡처를 넓은 본문 폭에 맞춰 확대하면 장면이 지나치게 길어지고 주변 설명과 떨어지기 때문이다.
- 축소된 제품 화면은 **원본 크게 보기** 링크로 원본을 새 탭에서 열 수 있게 한다. 캡처 안 글자를 읽을 경로를 제공하면서 원본 제품 UI를 왜곡하거나 재합성하지 않는다.
- 이미지 교체는 표시용 치수만 바꾸는 작업과 구분한다. 표시 문제를 해결하기 위해 공개 원본 이미지를 재압축·크롭하지 않는다.

### 자산 제작

- **생성**: Higgsfield MCP 로 직접 생성 가능. 계정이 무료 플랜이면 GPT Image 2.5 · Recraft 는 "Requires basic plan or higher" 로 거부되고 **Google Nano Banana Pro** (`nano_banana_pro`, 1:1, 2k, 2048² 출력, 후보 2장 ≈ 소액 크레딧) 가 동작한다. 후보는 스크래치패드에 내려받아 사용자에게 보내고, 사용자가 외부(ChatGPT 등)에서 편집한 뒤 Downloads 에 저장한 파일을 최종본으로 쓴다 — 편집본은 1254² 로 줄어 돌아오는 경우가 많다.
- 원본은 생성 도구에서 받은 PNG (사용자 Downloads 폴더). 저장소에는 **정사각 JPEG q86** 만 커밋한다. `next/image` 가 AVIF/WebP 로 재인코딩하므로 원본 PNG(2–5MB) 는 커밋하지 않는다.
- 파일명: 제품 화면 이미지는 `public/images/works/<feature|hub>/<nn>-<desc>.jpg` (스냅샷 파이프라인 산출물 — 손으로 고치지 않는다), 홈 히어로 아트워크는 `public/images/home-hero.jpg`. 사진 에셋을 다시 쓰게 되면 `<용도>-<번호>-<키>.jpg` 처럼 파일명만 보고 쓰임을 알 수 있게 짓고, 순서를 바꿀 때 데이터의 `src` 만 바꾸지 말고 `git mv` 로 파일도 함께 옮긴다.
- 해상도: 원본 짧은 변이 1600 이상이면 1600² 로 리사이즈, 그보다 작으면 (예: 16:9 1672×941 원본 → 941²) **업스케일하지 않고 짧은 변 크기 그대로** 둔다. 카드 최대 렌더 폭이 460px(2x DPR 920px) 이라 900px 대 소스로 충분하고, 업스케일은 픽셀 정보 없이 파일만 키운다.
- 크롭: 정사각 원본은 그대로, 16:9 원본은 기계적 중앙 크롭 대신 **인물이 왼쪽 1/3, 시선 방향으로 배경(스카이라인·호수) 이 열리도록** 가로 오프셋(0.5 = 중앙, 보통 0.55–0.6) 을 정한다. 후보 오프셋 3–4개를 콘택트 시트 한 장으로 비교한 뒤 확정.
- 변환은 Python Pillow: `Image.open().convert("RGB")` (생성 도구 메타데이터 제거) → `crop` → `save(quality=86, optimize=True, progressive=True)`. PowerShell `System.Drawing` 도 되지만 WebP 원본은 읽지 못한다.
- **같은 파일명으로 이미지를 교체하면 브라우저가 옛 `/_next/image` 결과를 계속 보여줄 수 있다.** dev 의 최적화 응답은 `max-age=0, must-revalidate` 지만 Browser pane 은 재검증 없이 캐시를 재사용한 사례가 있음. 서버 측 옵티마이저 캐시는 Next 16 dev 에서 **`.next/dev/cache/images`** 에 있고 (`.next/cache/images` 아님) 파일 교체를 정상 감지한다 — 서버 문제가 아니다. **판정법**: `Invoke-WebRequest "http://localhost:3000/_next/image?url=…&w=640&q=75" -Headers @{Accept='image/jpeg'}` 로 서버 응답을 직접 받아 로컬 파일과 32×32 썸네일 픽셀 차이로 비교 (일치 ≈ 1, 불일치 ≈ 200+). 브라우저 쪽 잔상은 `fetch(url, {cache:'reload'})` 를 **srcset 의 모든 폭**에 대해 실행한 뒤 새로고침. 프로덕션은 파일 ETag 가 바뀌어 새 이미지가 서빙되며 같은 판정법으로 확정 가능.
