# SEO

도메인: `https://roseai.co.kr` — apex 가 정규 호스트다 (`www` 는 apex 로 영구 리다이렉트, deployment.md). 한국어 전용. Lighthouse SEO ≥ 95 유지.

## 메타데이터

- 모든 페이지는 `generateMetadata()` 로 title/description/OG 를 반환한다. 문구는 메시지 JSON 에서 온다 (i18n.md).
- 루트 layout: `metadataBase: new URL(NEXT_PUBLIC_SITE_URL)`, `title.template`: `%s | ROSE-AI WORKS`. 홈은 제품 제목을 그대로 쓴다 (`title.absolute`).
- 공통 헬퍼 `lib/works/metadata.ts` 가 canonical·OG·Twitter 를 한 모양으로 만든다.
- `description` 은 120~160자. 제품 가치 + 핵심 키워드 포함.
- `NEXT_PUBLIC_SITE_URL` 은 정규 호스트와 같아야 한다 — 다르면 canonical 이 리다이렉트되는 주소를 가리킨다.

## Open Graph / Twitter

- OG 이미지: `1200x630`, `<2MB`. 사이트 공통 이미지 `app/opengraph-image.tsx` (`next/og` ImageResponse) — 제품명·문구 옆에 홈 히어로 아트워크(`public/images/home-hero.jpg`)를 그린다. 아트워크가 없으면 글자만 그린다.
- **메타데이터 병합은 얕다.** 페이지가 `openGraph` 를 직접 정하면 루트의 파일 컨벤션 이미지가 통째로 빠진다. 그래서 공통 헬퍼(`lib/works/metadata.ts`)가 `openGraph.images`·`twitter.images` 에 공유 카드(`/opengraph-image`)를 직접 넣는다 — 새 페이지도 이 헬퍼를 쓴다.
- Satori 는 woff2 를 읽지 못하므로 한글 폰트는 `node_modules/pretendard/dist/public/static/*.otf` 를 `fs` 로 읽어 넘긴다. 이미지는 `<img src="data:…">` 로만 그린다(`next/image` 미적용).
- `twitter.card: 'summary_large_image'`.

## canonical (hreflang 없음)

```ts
alternates: { canonical: path }   // "/", "/approval", "/tour" …
```

- 한 언어만 있으므로 `alternates.languages`(hreflang)를 두지 않는다 — 존재하지 않는 언어판을 가리키지 않는다.
- canonical 은 쿼리·trailing slash 정규화된 값으로.
- 주소를 옮기면 옛 주소는 `next.config.ts` `redirects()` 에서 308 한 번으로 새 주소에 잇는다 (구체적인 규칙을 먼저 — 첫 일치가 적용된다).

## Sitemap / Robots

- `app/sitemap.ts` 에서 공개 페이지를 전부 배출한다 (홈 · 기능 상세 · 투어). 스냅샷·옛 주소는 넣지 않는다.
- `changeFrequency`, `lastModified` 는 실제 업데이트 기준이 있을 때만 채운다 (거짓 값 금지).
- `app/robots.ts` 에서 `sitemap` 절대 URL 명시. 운영에서는 `/demos/` 를 disallow (스냅샷은 자체 noindex 도 있다).
- 프리뷰/스테이징은 `robots` 에서 `disallow: '/'` 강제 (`VERCEL_ENV !== "production"`).

## 구조화 데이터 (JSON-LD)

루트 layout 에 `@graph` 하나로 넣는다: `Organization`(ROSE-AI — 만든 회사) · `WebSite`(ROSE-AI WORKS) · `SoftwareApplication`(ROSE-AI WORKS).

- `offers` 없음 — 사이트는 요금을 쓰지 않는다.
- `SearchAction` 없음 — 사이트 검색이 없다. 없는 기능을 구조화 데이터로 주장하지 않는다.
- `<script type="application/ld+json">` 로 삽입하고 `JSON.stringify(...).replace(/</g, "\\u003c")` 로 `<` 를 이스케이프한다.

## 성능·Core Web Vitals

SEO 점수의 절반은 CWV. 배포 전 확인:

- LCP < 2.5s — 히어로 이미지는 `priority`, 폰트는 `display: swap` + `preload`
- CLS < 0.1 — 모든 이미지/iframe에 명시 치수. 임베드 자리 예약
- INP < 200ms — 무거운 클라이언트 JS 금지. Server Component 우선

## 이미지

- `next/image` 필수. `alt` 항상 작성 (장식 이미지는 `alt=""`).
- 포맷: AVIF → WebP → fallback. `next/image` 기본 최적화 활용.
- 외부 이미지 도메인은 `next.config.ts` 의 `images.remotePatterns` 에 등록.

## 링크·접근성 가산점

- 내부 링크는 `next/link`. `prefetch` 기본 유지.
- 앵커 텍스트는 "여기 클릭" 금지. 목적어를 포함.
- 파괴 액션 외에는 `<a>` 대신 `<Link>`.

## 체크리스트 (배포 전)

- [ ] title/description 이 페이지마다 고유하다
- [ ] OG 이미지가 렌더된다 (Slack/카톡 프리뷰 확인)
- [ ] canonical 이 정규 호스트의 자기 경로이고, 그 주소가 리다이렉트 없이 200 이다
- [ ] 옛 주소가 308 한 번으로 새 주소에 닿는다
- [ ] sitemap.xml, robots.txt 가 200으로 응답한다
- [ ] Lighthouse SEO ≥ 95, Performance ≥ 90 (모바일)
