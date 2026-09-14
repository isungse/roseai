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

- `meta.md` — 룰 파일 작성·갱신 원칙 (다른 룰 파일을 수정할 때 먼저 따를 메타 규칙)
- `code-style.md` — 코드 컨벤션, 네이밍, 폴더 구조
- `design-system.md` — 색상/폰트/스페이싱 토큰
- `i18n.md` — 한국어/영어 번역 관리
- `seo.md` — 메타태그, sitemap, OG 이미지
- `accessibility.md` — a11y 체크리스트
- `deployment.md` — Vercel 배포 & 환경변수

세션 종료 시 변경 사항은 해당 rule 파일에 업데이트.
200줄이 넘으면 분할.

## Work Log

`work-log/YYYY-MM-DD/README.md` — 세션(날짜) 단위 작업 기록. 룰 파일과 역할이 다르다:

- **rule 파일** — 시간이 지나도 유효한 원칙과 그 이유(Why). 세션·날짜 언급 없음.
- **work-log** — 그날 무엇을 어떻게 바꿨는지(What/When). 작업 목적, 반영된 문구·에셋, 변경 파일, 검증 결과, 배포 커밋, 보류 사항.

같은 날 여러 세션이 작업하면 하나의 README 에 절을 추가한다. 배포된 사용자 노출 문구는 work-log 에 전문을 남겨 되돌릴 기준점으로 삼는다.

## Session End Checklist

- [ ] 변경 의도를 rule 파일에 기록 (What이 아닌 Why)
- [ ] `work-log/<오늘 날짜>/README.md` 에 작업 기록 추가 (What/When)
- [ ] 새 컴포넌트는 Props 인터페이스 명시
- [ ] 텍스트는 하드코딩 금지, i18n JSON에 추가
- [ ] `npm run build` 통과 확인
- [ ] Lighthouse 기준 Performance/SEO/A11y ≥ 95
