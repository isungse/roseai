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

### 필수 변수 접근은 `lib/env.ts` 경유

필수 환경변수(`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`)는 **`lib/env.ts` 를 통해서만** 읽는다. `process.env.*` 를 컴포넌트/유틸에서 직접 참조하지 않는다.

- `required(name)` 헬퍼가 누락/빈 값이면 모듈 로드 시점에 `throw` — 빌드가 즉시 실패해 프로덕션에 `undefined` 가 새는 것을 차단한다.
- 컴포넌트는 `import { env } from "@/lib/env"` 후 `env.contactEmail`, `env.siteUrl` 사용. fallback 상수(`"contact@roseai.co.kr"` 등) 를 둬서 빈 값을 가리지 않는다.
- **함의**: Vercel Preview·Prod 환경에 이 두 변수가 등록되어 있지 않으면 빌드가 실패한다. 새 환경 프로비저닝 시 가장 먼저 확인.
- 선택(optional) 변수는 이 패턴을 쓰지 않는다 — 기본값이 있거나 런타임에 분기 처리.

### Vercel scope 분리 — Production / Preview / Development

Vercel 의 환경변수는 **3개 scope** 별로 따로 관리된다. Production 에만 등록한 변수는 Preview 빌드에서 missing 으로 보이고 `lib/env.ts` 가드가 throw 한다.

- **Production** — `main` 브랜치 push 시 사용
- **Preview** — feature/PR 브랜치 push 시 사용
- **Development** — `vercel dev` 로컬 명령용

새 변수 추가 시 **세 scope 모두** 켠다. UI 는 Environments 박스의 체크박스 3개. CLI 는 scope 별 별도 명령 (아래 참조).

### Vercel 의 "마지막 성공 빌드" 서빙

각 environment 의 public URL 은 **마지막으로 성공한 빌드**를 계속 서빙한다. 이후 push 가 모두 실패해도 URL 은 옛 콘텐츠를 보여준다. "URL 이 안 바뀌네" 의 진단 분기:

1. 빌드 성공했지만 CDN 전파 대기 (1~2분, 흔함)
2. 빌드 실패하고 옛 빌드가 그대로 서빙 — `vercel ls` 로 최신 배포 상태 확인

배포 후 1~2분 지나도 URL 이 안 바뀌면 (2) 의심하고 빌드 로그 확인.

### Vercel CLI 운영

`vercel` CLI 가 인증되어 있으면 (`vercel whoami` 로 확인) 환경변수·재배포가 명령 한 줄.

**프로젝트 연결** (한 번만):

```powershell
npx vercel link --cwd <repo-root> --yes
```

**환경변수 조회**:

```powershell
npx vercel env ls --cwd <repo-root>
```

**환경변수 추가** — 세 scope 별로 별도 명령:

```powershell
npx vercel env add NAME production --value "v" --yes --cwd <repo-root>
printf '' | npx vercel env add NAME preview "" --value "v" --yes --cwd <repo-root>
npx vercel env add NAME development --value "v" --yes --cwd <repo-root>
```

⚠ **CLI quirk**: `preview` scope 는 **위치 인자(branch) 가 명시적으로 필요**. 모든 preview 브랜치에 적용하려면 빈 문자열 `""` 을 세 번째 인자로 넘긴다. `--yes` 만으로는 git_branch_required 에러가 살아남는다. 다른 scope 는 위치 인자 불필요.

**빌드 재트리거** — 환경변수 추가 후 기존 commit 의 실패한 빌드는 새 env 를 자동으로 보지 않는다. 가장 단순한 트리거:

```powershell
git commit --allow-empty -m "ci: re-trigger build"
git push
```

또는 `npx vercel redeploy <deployment-url>`. 빈 commit 은 PR 워크플로우와 자연스럽게 통합되어 일반적으로 선호.

### Git worktree 부트스트랩

`git worktree add` 로 생성된 워크트리는 두 가지 결손이 있다:
1. `.env.local` 미복사 — `.gitignore` 대상이라 worktree 체크아웃에서 제외됨. `lib/env.ts` 가 모듈 로드 시점에 throw → 페이지가 500.
2. `node_modules` 부재 — 부모 walk-up 으로 일부는 동작해도, `next/font/local` 의 `src` 는 컴파일 타임에 `lib/fonts.ts` 기준 상대 경로(`../node_modules/pretendard/...`) 를 번들러가 해석하므로 워크트리 자체에 설치 필요.

해결: 새 워크트리 진입 직후 1회 실행.

```powershell
pwsh -File .claude/scripts/setup-worktree.ps1
```

`.env.local` 을 메인 워크트리에서 복사 + `npm install` 을 idempotent 하게 수행한다. 재실행해도 두 단계 모두 skip — CI/훅에서 호출해도 안전.

### Git worktree 정리 (PR 머지 후)

PR 머지 후 4 단계로 정리. 모든 git 명령은 메인 레포에 `-C` 로 실행한다 — 워크트리 내부에서 자기 자신을 제거하려 하면 OS·git 양쪽에서 충돌.

```powershell
# 1. 안전 확인 — feature 브랜치 tip 이 origin/main 에 reachable 한가
git -C <main-repo> fetch
git -C <main-repo> merge-base --is-ancestor <branch> origin/main && echo OK

# 2. 원격 브랜치 삭제
git -C <main-repo> push origin --delete <branch>

# 3. 워크트리 등록 해제 (점유 프로세스 먼저 종료)
git -C <main-repo> worktree remove .claude/worktrees/<name>

# 4. 로컬 브랜치 삭제 (먼저 main 동기화)
git -C <main-repo> pull --ff-only origin main
git -C <main-repo> branch -d <branch>
```

**왜 `git branch --merged` 안 쓰나** — 머지가 squash 가 아닌 **merge commit** 방식이거나 로컬 main 이 옛 상태면 `--merged` 가 false negative 를 낸다. `merge-base --is-ancestor` 는 commit 한 개의 reachability 만 확인해 머지 방식·로컬 상태와 무관하게 정확.

**워크트리 디렉토리 물리 삭제 실패** — Windows 에서 "Device or resource busy" / "Invalid argument" 가 뜨면 디렉토리를 잡고 있는 프로세스가 있다. 흔한 원인:
- 실행 중인 dev/preview 서버 — 먼저 종료
- 현재 셸 세션의 cwd 가 그 디렉토리 — 다른 셸/세션에서 삭제

git metadata 정리(`worktree remove`) 는 보통 성공하지만 디스크 디렉토리만 잔존할 수 있다. 별도 셸에서 `Remove-Item -Recurse -Force <path>` 로 마무리.

## 빌드·런타임 설정

- Framework Preset: **Next.js** (자동 감지).
- Node: Vercel 기본 (20.x). 변경 시 `package.json engines` 명시.
- Install Command: `npm install` (lockfile commit됨).
- Build Command: `npm run build`. 로컬에서 통과시킨 후 push.
- Output: Next.js 기본 (`.next/`). 커스텀 불필요.

### `next.config.ts` 기본값

- `images.formats: ["image/avif", "image/webp"]` — LCP·대역폭 개선 (SEO 가산점).
- `experimental.optimizePackageImports: ["lucide-react"]` — 아이콘 트리셰이킹. 새 배럴-export 패키지(헤드리스 UI 킷 등) 도입 시 여기에 추가.
- 새 옵션을 넣기 전에 Next 16 기준 stable/experimental 상태를 문서에서 확인.

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
