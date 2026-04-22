# ROSE-AI Homepage

ROSE-AI의 공식 홍보 웹사이트. `roseai.co.kr` 도메인으로 배포.

## Stack

- Next.js 16 (App Router, async params) + TypeScript + Tailwind CSS v4
- next-intl (KO/EN i18n)
- Deployed on Vercel Pro
- Fonts: Pretendard (KR) + Inter + JetBrains Mono (mono)

## Core Principles

모든 코드는 아래 기준으로 평가·작성한다:

- **Suitability** — 요구사항에 맞는가
- **Readability** — 6개월 후의 나도 읽을 수 있는가
- **Scalability** — 모듈/페이지 추가 시 구조가 무너지지 않는가
- **Maintainability** — 수정 지점이 1곳에 모여 있는가
- **Reusability** — 같은 패턴이 2번 이상 나오면 컴포넌트화
- **Separation of Concerns** — UI / 로직 / 데이터 / 스타일 분리
- **Database Stability** — Firestore 쿼리는 트랜잭션·인덱스 사전 검토
- **UI Consistency** — design-system.md의 토큰만 사용
- **Error Handling** — 사용자 입력·네트워크·서드파티는 반드시 try-catch + UI 상태
- **Future Extensibility** — 현재 필요 없는 추상화는 금지, 단 확장 포인트는 주석으로 표시

## Rules 파일

도메인별 상세 규칙은 `.claude/rules/` 하위 파일을 참조:

- `code-style.md` — 코드 컨벤션, 네이밍, 폴더 구조
- `design-system.md` — 색상/폰트/스페이싱 토큰
- `i18n.md` — 한국어/영어 번역 관리
- `seo.md` — 메타태그, sitemap, OG 이미지
- `accessibility.md` — a11y 체크리스트
- `deployment.md` — Vercel 배포 & 환경변수

세션 종료 시 변경 사항은 해당 rule 파일에 업데이트.
200줄이 넘으면 분할.

## Session End Checklist

- [ ] 변경 의도를 rule 파일에 기록 (What이 아닌 Why)
- [ ] 새 컴포넌트는 Props 인터페이스 명시
- [ ] 텍스트는 하드코딩 금지, i18n JSON에 추가
- [ ] `npm run build` 통과 확인
- [ ] Lighthouse 기준 Performance/SEO/A11y ≥ 95
