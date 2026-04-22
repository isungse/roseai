# Code Style

ROSE-AI 홈페이지의 코드 컨벤션, 네이밍 규칙, 폴더 구조를 정의한다.

## 폴더 구조

```
app/
  [locale]/              # next-intl 로케일 라우팅
    (marketing)/         # 공개 페이지 그룹
    layout.tsx
    page.tsx
  api/                   # Route Handlers
components/
  ui/                    # 원자 단위 (Button, Input, Card…)
  sections/              # 페이지 섹션 (Hero, Features…)
  layout/                # Header, Footer, Nav
lib/                     # 순수 유틸, 서버 전용 유틸
  utils.ts
  seo.ts
hooks/                   # React 훅
messages/                # i18n JSON (ko.json, en.json)
types/                   # 공용 타입 선언
public/                  # 정적 에셋
```

원칙:
- 같은 패턴이 2번 이상 반복되면 `components/ui/` 또는 `lib/`로 추출
- 페이지 전용 컴포넌트는 해당 라우트 폴더 안에 `_components/`로 배치
- `_` 접두 폴더는 Next.js가 라우팅에서 제외하므로 private 구조에 활용

## 네이밍

| 대상 | 규칙 | 예시 |
|---|---|---|
| 컴포넌트 파일 | PascalCase `.tsx` | `HeroSection.tsx` |
| 훅 / 유틸 | camelCase `.ts` | `useScrollLock.ts`, `formatDate.ts` |
| 타입 / 인터페이스 | PascalCase, prefix 없음 | `User`, `ArticleMeta` |
| 상수 | UPPER_SNAKE_CASE | `MAX_RETRY` |
| 라우트 폴더 | kebab-case | `case-studies/` |
| i18n 키 | dot.camelCase | `hero.title` |

## TypeScript

- `any` 금지. 불가피하면 `unknown` + 타입가드.
- `interface`는 공개 객체 모양, `type`은 union/유틸리티.
- Props는 컴포넌트 파일 상단에 `interface ComponentNameProps` 로 명시.
- `import type` 을 사용해 런타임/타입 import 분리.
- 필드 종류마다 렌더가 갈리는 데이터는 **discriminated union** 으로 모델링한다. 예: `CONTACT_FIELDS` 는 `kind: "input" | "textarea"` 로 분기되고, 폼 컴포넌트는 `switch (field.kind)` 로 narrow 한 뒤 각 브랜치에서 해당 필드만 접근한다. optional 필드 + 런타임 체크 조합을 쓰지 않는다 (`lib/data/contact.ts`, `components/sections/ContactForm.tsx` 참조).

## React / Next.js

- 기본은 Server Component. 상태·이벤트·브라우저 API가 필요할 때만 `"use client"`.
- `"use client"` 경계는 leaf에 가깝게. 트리 상단에 붙이면 번들이 전염된다.
- 데이터 fetching은 Server Component + `fetch` (Next 캐시 활용). 클라이언트 fetch는 SWR 대신 필요 시에만.
- `next/image`, `next/link`, `next/font` 는 반드시 사용.
- Next 16: 동적 세그먼트의 `params` 는 `Promise`. `const { locale } = await params` 패턴으로 받는다.

### "use client" 경계 전략

섹션을 통째로 클라이언트화하지 말 것. 상호작용하는 **조각만** 분리한다.

예 (ROSE-AI 랜딩 기준):

| 요소 | 경계 |
|---|---|
| `Hero` 섹션 전체 | Server — 텍스트·KPI·다이어그램 정적 |
| `HeroTimestamp` | Client — `new Date()` 는 마운트 후에만 렌더 (hydration mismatch 방지, `suppressHydrationWarning` 동반) |
| `Modules` 섹션 shell | Server — 레이아웃, 데이터 주입 |
| `ModuleTabs` | Client — 탭 선택 상태 (useState), 키보드 핸들링 |
| `Philosophy`, `Evidence` | Server 전체 |
| `ContactForm` | Client — FormData 관리, 유효성, fetch |
| `IndexRail` | Client — IntersectionObserver |
| `GridOverlay` + `G` 키 토글 | Client — keydown 리스너 |
| `LangToggle` | Client — `usePathname` + `useRouter` 로 로케일 스위치 |
| `TopBar` shell | Server. 내부 `LangToggle` 만 Client leaf |

원칙: Server Component 가 데이터와 children 을 Client Component 에 props 로 내려준다. Client 안에서 다시 Server 를 import 하는 것은 불가능하므로, Client → Server 의존이 생기면 경계 설계가 잘못된 것이다.

### 시간·난수 등 클라이언트-의존 값

`new Date()`, `Math.random()`, `window.*` 처럼 서버·클라이언트 값이 달라질 수밖에 없는 값은 **`useSyncExternalStore` + 고정폭 placeholder** 패턴을 쓴다.

- `getServerSnapshot` 은 플레이스홀더 문자열(예: `"——.——.—— · ——:—— KST"`) 을 반환해 SSR 출력과 첫 하이드레이션 결과를 일치시킨다.
- `getClientSnapshot` 이 실제 값을 반환하며, 구독은 interval / event listener 로 notify.
- `useState + useEffect` 로 초기값을 업데이트하는 구식 패턴은 금지 (hydration flash, setState-in-effect 린트 경고).
- 래핑 요소에는 `suppressHydrationWarning` 을 붙여 의도된 불일치임을 명시.

참고 구현: `components/sections/HeroTimestamp.tsx`.

### 리스트 렌더의 key

- 배열 인덱스를 key 로 쓰지 않는다. 의미 있는 식별자(`m.id`, `code` 등) 를 사용.
- `null` 을 끼워 map 하는 sparse 패턴 대신, 요소가 고정 N개라면 sibling 으로 직접 나열한다 (예: Hero eyebrow 4-column meta). CSS pseudo (`before:content-['/'] first:before:content-none`) 로 구분자 처리.

## 스타일

- Tailwind 유틸리티 우선. `cn()` (clsx + tailwind-merge) 로 조건부 조합.
- 긴 클래스가 반복되면 `components/ui/` 컴포넌트로 추출 (CVA 권장).
- 커스텀 CSS는 `app/globals.css` 의 `@layer` 에만 추가.
- 색/간격/폰트는 `design-system.md` 토큰만 사용.

## 함수 / 파일 길이

- 컴포넌트 파일: 200줄 초과 시 분할.
- 함수: 40줄 초과면 책임이 2개일 가능성이 높다. 분해 검토.
- Props 5개 초과 시 객체로 묶거나 컴포지션 재설계.

## 주석

- 기본은 주석 없음. 이름으로 설명이 끝나야 한다.
- WHY가 비자명할 때만 한 줄. 과거 버그, 외부 제약, 서프라이즈 동작.
- TODO는 `// TODO(이름): 내용` 형식. 기한 없는 TODO는 이슈로 옮길 것.

## Import 순서

1. React / Next
2. 외부 패키지
3. `@/` 내부 모듈 (lib → hooks → components 순)
4. 상대 경로
5. 타입 (`import type`)
6. 스타일

그룹 사이 빈 줄 1개.
