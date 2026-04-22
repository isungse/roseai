# Deployment

Vercel Pro 배포. 도메인 `roseai.co.kr` (+ `www.roseai.co.kr` → apex 리다이렉트).

## 환경

| 환경 | 브랜치 | URL |
|---|---|---|
| Production | `main` | `https://roseai.co.kr` |
| Preview | PR 브랜치 | `https://rose-ai-homepage-<hash>.vercel.app` |
| Development | 로컬 | `http://localhost:3000` |

- `main` 직접 푸시 금지. PR → 리뷰 → Squash merge.
- Preview URL 은 robots.txt 로 인덱싱 차단 (SEO 문서 참조).

## 환경변수

`.env.local` (로컬) / Vercel Project Settings (Preview·Production) 에 설정. 실제 값이 담긴 `.env*` 는 Git에 커밋 금지 (`.gitignore` 로 제외). 단, **`.env.local.example` 은 커밋한다** — 신규 개발자가 참고할 키 목록 스캐폴드.

| 키 | 범위 | 용도 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | All | 절대 URL 생성, OG, sitemap (`https://roseai.co.kr`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | All | Contact·Footer 공개 이메일 (`contact@roseai.co.kr`). mailto 링크. 하드코딩 금지 |
| `NEXT_PUBLIC_GA_ID` | Prod | Google Analytics (선택) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Prod | Plausible (선택) |
| `REVALIDATE_TOKEN` | All (서버) | On-demand ISR secret |
| `RESEND_API_KEY` | Prod/Preview | 문의 폼 이메일 전송 (차기 단계) |
| `CONTACT_FORM_TO` | Prod/Preview | 문의 폼 수신 주소 |

규칙:
- `NEXT_PUBLIC_` 접두는 **브라우저 노출됨**. 비밀값에는 절대 붙이지 않는다 (`RESEND_API_KEY` 등).
- 새 변수 추가 시: (1) `.env.local.example` 에 빈 값 또는 플레이스홀더로 추가 (2) Vercel 에 Preview·Prod 양쪽 등록 (3) 이 표 갱신.
- Contact 이메일: 원본 HTML 의 Cloudflare `__cf_email__` 난독화는 사용하지 않는다. 일반 `mailto:` 링크로 노출.

## 빌드·런타임 설정

- Framework Preset: **Next.js** (자동 감지).
- Node: Vercel 기본 (20.x). 변경 시 `package.json engines` 명시.
- Install Command: `npm install` (lockfile commit됨).
- Build Command: `npm run build`. 로컬에서 통과시킨 후 push.
- Output: Next.js 기본 (`.next/`). 커스텀 불필요.

## 캐싱 / ISR

- Server Component `fetch` 기본 캐시 활용. 동적 데이터는 `next: { revalidate: N }` 명시.
- On-demand 재검증: `/api/revalidate?path=...&token=$REVALIDATE_TOKEN`.
- 정적 자산(`/public/*`)은 파일명에 해시. 그 외 경로는 `Cache-Control` 기본값 존중.

## 도메인·리다이렉트

- apex `roseai.co.kr` 가 canonical. `www` 는 301 → apex.
- HTTP → HTTPS 자동 (Vercel 기본).
- 루트 `/` → `/ko` 는 미들웨어에서 처리 (i18n 문서 참조).
- 구 URL 이 생기면 `next.config.ts` 의 `redirects()` 에 영구 리다이렉트 등록.

## 배포 전 체크리스트

- [ ] `npm run build` 로컬 통과
- [ ] `npm run lint` 경고 0
- [ ] Lighthouse Performance / SEO / A11y ≥ 95 (Preview 에서 측정)
- [ ] 새 환경변수가 Vercel Preview·Prod 양쪽에 등록됨
- [ ] OG 프리뷰 (Slack/카톡) 로 최종 이미지 확인
- [ ] 다국어 페이지 모두 200 응답 (`/ko`, `/en`, sitemap, robots)

## 롤백

- Vercel 대시보드 → Deployments → 문제 없는 직전 배포에 **Promote to Production**.
- DB/외부 상태 변경이 얽힌 배포는 롤백 전에 데이터 영향 먼저 검토.
