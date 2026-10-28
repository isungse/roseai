# Accessibility

WCAG 2.1 AA 기준. Lighthouse A11y ≥ 95. 한국어 사용자 환경도 함께 고려.

## 구조·시맨틱

- 페이지당 `<h1>` 은 **하나**. 이후 `h2 → h3` 순서를 건너뛰지 않는다.
- 랜드마크 사용: `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`.
- 버튼은 `<button>`, 이동은 `<a>`/`<Link>`. `div onClick` 으로 상호작용 구현 금지.
- 리스트는 `<ul>`/`<ol>`. 시각적 리스트를 `div` 로 만들지 않는다.

## 키보드

- 모든 인터랙티브 요소는 Tab으로 접근, Enter/Space 로 활성화 가능해야 한다.
- 포커스 순서가 시각적 순서와 일치해야 한다.
- 포커스 링은 절대 제거하지 않는다. 재디자인은 `:focus-visible` 에 커스텀 스타일 적용.
- **예외 — 자체 포커스 신호를 가진 underline-style 입력**: `border-b border-hair → focus:border-brand` 처럼 보더 색 변경이 명확한 포커스 인디케이터인 경우, 전역 outline 링은 시각 부조화를 일으킨다. `input:focus-visible, textarea:focus-visible { outline: none }` 로 outline 만 제거하고 보더 색 변경에 포커스 신호 역할을 위임 (WCAG 충족). 버튼·링크 등 다른 요소의 전역 outline 은 유지.
- 모달/드로어는 포커스 트랩 + ESC 로 닫기 + 열기 전 포커스 위치 복원. (구현 패턴은 `code-style.md` 의 Modal/Dialog 패턴 참조.)

## 스크린리더

- 아이콘 전용 버튼: `aria-label` 필수. 예: `<button aria-label="메뉴 열기">`.
- 장식 이미지: `alt=""`. 의미 있는 이미지: 내용을 기술하는 `alt`.
- 동적 상태 변화는 `aria-live="polite"` (중요도 낮음) / `"assertive"` (오류).
- `role` 은 시맨틱 태그로 충분하지 않을 때만. 남용하면 오히려 해롭다.
- `aria-labelledby` / `aria-controls` / `aria-describedby` 는 **실제로 그 id 를 가진 요소가 DOM 에 존재해야** 작동한다. 탭 패턴에서 패널이 `aria-labelledby={`tab-${id}`}` 를 쓰면, 각 탭 버튼에 동일한 `id` 를 반드시 부여 (예: `ModuleTabs`).
- 시각적 강조 용도의 `<em>` / `<strong>` 을 레이아웃/색상 목적으로 쓰지 않는다. 스크린리더가 강세로 읽어 의미가 왜곡된다. 색만 바꾸려면 `<span>` + 유틸리티 클래스.

## 색·대비

- 본문 텍스트 대비 ≥ 4.5:1, 큰 텍스트(18px bold / 24px) ≥ 3:1.
- UI 컴포넌트·포커스 링 ≥ 3:1.
- 정보 전달을 색에만 의존하지 않는다. 아이콘·텍스트 보조 필수.

## 폼

- 모든 `<input>` 에 연결된 `<label>`. `aria-label` 은 레이아웃상 불가피할 때만.
- 오류 메시지는 필드 근처 + `aria-describedby` 연결 + `aria-invalid="true"`.
- 자동완성 힌트 (`autocomplete="email"`, `"current-password"` 등) 적극 사용.

## 모션

- `prefers-reduced-motion: reduce` 미디어쿼리 존중. 패럴랙스/큰 translate 애니메이션 제거.
- 3Hz 이상 점멸 금지 (발작 트리거).

## 언어

- `<html lang="ko">` 반드시 — 사이트는 한국어 전용이다 (i18n.md).
- 혼용 구간은 `<span lang="en">...</span>` 으로 표시. 스크린리더 발음 개선.

## 한국어 특화

- `word-break: keep-all` + `overflow-wrap: anywhere` 를 본문 기본값으로.
- 폰트 크기는 최소 14px. 조사·어미가 많아 영어보다 조밀하게 보이므로 여백을 넉넉히.

## Skip Link

첫 번째 포커스 가능한 요소로 "본문 바로가기" 링크 제공. 기본은 화면 밖, 포커스 시 노출.

## 테스트

- 키보드만으로 주요 플로우 완주 가능?
- NVDA(Windows) 또는 VoiceOver 로 헤딩/랜드마크 탐색이 자연스러운가?
- axe DevTools 경고 0건?
- 150% 줌에서 레이아웃이 깨지지 않는가?

## 체크리스트 (PR 전)

- [ ] `<h1>` 은 하나, 헤딩 순서가 선형
- [ ] 모든 인터랙티브 요소가 Tab 순회 가능
- [ ] 아이콘 버튼에 `aria-label`
- [ ] 이미지 `alt` 작성 완료
- [ ] 대비 4.5:1 이상
- [ ] `prefers-reduced-motion` 대응
- [ ] Lighthouse A11y ≥ 95

## 탭 · 메뉴 탐색

- 기능 상세의 탭(`FeatureTabs`): `role="tablist"` / `tab` / `tabpanel`, 좌우 방향키로 이동, 선택 탭에 `aria-selected`.
- 상단 내비(`TopBarNav`)와 투어 메뉴: 현재 항목에 `aria-current="page"`(내비) 또는 선택 상태 표시. 좁은 화면의 가로 스크롤 칩도 Tab 으로 전부 닿아야 한다.
- 스냅샷 iframe 에는 화면 이름이 든 `title` 을 준다.

## 자동 재생 콘텐츠

현재 사이트에는 자동 재생 요소가 없다 (2026-10-28 개편으로 쇼케이스 캐러셀 삭제 — 구현 패턴은 `code-style.md` "Carousel / Autoplay 패턴"). 다시 넣으면:

- 자동 재생은 hover / focus-within 에서 정지하고, `prefers-reduced-motion: reduce` 면 시작하지 않는다 (WCAG 2.2.2). 항목이 1개면 컨트롤을 렌더하지 않는다.
- 전환되는 문구 블록은 `aria-live="polite"` + `aria-atomic`. 키보드 방향키는 컴포넌트 루트의 `onKeyDown` — `window` 리스너로 페이지 전체를 가로채지 않는다.
- 컨트롤에는 `aria-label`(이전/다음, "{n}번 항목으로 이동"), 활성 표시는 `aria-current`. 페이지 h1 은 하나로 유지한다.
- 브랜드 레드 텍스트는 흰 배경 대비 4.6:1 — 본문 크기(4.5:1 기준)에서는 경계값이라 강조 구절은 큰 글자에서 쓰는 편이 안전하다.
