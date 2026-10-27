# SEO

도메인: `https://roseai.co.kr`. 한/영 병렬 운영. Lighthouse SEO ≥ 95 유지.

## 메타데이터

- 모든 페이지는 `generateMetadata()` 로 title/description/OG 를 반환한다. 정적 상수 export 금지 (로케일 분기 불가).
- `title.template`: `%s | ROSE-AI`. 루트는 `default: "ROSE-AI"`.
- `description` 은 120~160자. 제품 가치 + 핵심 키워드 포함.
- `metadataBase: new URL('https://roseai.co.kr')` 를 루트 layout에 설정. 상대 경로 OG 가 풀 URL로 해석된다.

## Open Graph / Twitter

- OG 이미지: `1200x630`, `<2MB`, 로케일별 분리 (`/og/ko.png`, `/og/en.png`).
- 동적 OG 가 필요하면 `next/og` ImageResponse. 세그먼트 단위로는 파일 컨벤션 `opengraph-image.tsx` 가 하위 라우트까지 상속된다 (`app/[locale]/works/opengraph-image.tsx` 가 works 7 페이지를 덮는다). Satori 는 woff2 를 읽지 못하므로 한글 폰트는 `node_modules/pretendard/dist/public/static/*.otf` 를 `fs` 로 읽어 넘긴다.
- `twitter.card: 'summary_large_image'`.

## hreflang / canonical

`generateMetadata` 에서:

```ts
alternates: {
  canonical: `/${locale}${path}`,
  languages: {
    ko: `/ko${path}`,
    en: `/en${path}`,
    'x-default': `/ko${path}`,
  },
}
```

- canonical 은 쿼리·trailing slash 정규화된 값으로.
- 동일 콘텐츠의 ko/en 은 서로 hreflang 으로 연결한다.
- **ko 전용 페이지**(`/works/**`, i18n.md "ko 전용 네임스페이스") 는 `languages` 에 `ko` 와 `x-default` 만 둔다 — 존재하지 않는 en 을 hreflang 으로 가리키지 않는다. 공통 헬퍼 `lib/works/metadata.ts`.

## Sitemap / Robots

- `app/sitemap.ts` 에서 모든 정적·동적 라우트를 ko/en 양쪽으로 배출 (ko 전용 라우트는 ko URL 만).
- `changeFrequency`, `lastModified` 는 실제 업데이트 기준으로 채운다 (거짓 값 금지).
- `app/robots.ts` 에서 `sitemap: 'https://roseai.co.kr/sitemap.xml'` 명시.
- 프리뷰/스테이징 도메인은 `robots` 에서 `disallow: '/'` 강제.

## 구조화 데이터 (JSON-LD)

루트 layout 에 `Organization` + `WebSite` (SearchAction 포함). 기사/케이스 페이지에는 `Article`. 제품 섹션 layout(`app/[locale]/works/layout.tsx`) 에는 `SoftwareApplication` (offers 없음 — 요금을 쓰지 않는다). `<script type="application/ld+json">` 로 삽입.

## 성능·Core Web Vitals

SEO 점수의 절반은 CWV. 배포 전 확인:

- LCP < 2.5s — 히어로 이미지는 `priority`, 폰트는 `display: swap` + `preload`
- CLS < 0.1 — 모든 이미지/iframe에 명시 치수. 광고·임베드 자리 예약
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
- [ ] OG 이미지가 로케일별로 렌더된다 (Slack/카톡 프리뷰 확인)
- [ ] canonical / hreflang 이 정확하다
- [ ] sitemap.xml, robots.txt 가 200으로 응답한다
- [ ] Lighthouse SEO ≥ 95, Performance ≥ 95
