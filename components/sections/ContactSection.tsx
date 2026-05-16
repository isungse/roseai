import { useTranslations } from "next-intl";

import { SectionLabel } from "@/components/ui/SectionLabel";

import { ContactTrigger } from "./ContactTrigger";
import { HeroDiagram } from "./HeroDiagram";

export function ContactSection() {
  const t = useTranslations("contact");
  // headingEm is a KO-only visual pairing under the English brand headline.
  // EN intentionally leaves the key empty so this block renders nothing on
  // the /en page. The locale JSONs still share the same key tree per i18n.md.
  const em = t("headingEm");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-b border-hair bg-paper text-ink"
    >
      <SectionLabel code="01 / PHILOSOPHY" />

      {/* 홈페이지의 대문(hero gate) — 원본 Hero 가 주석 처리된 상태에서
          이 섹션이 페이지의 메인 메시지를 부담한다. 타이포 스케일·웨이트는
          원본 Hero 와 동일 ceiling(`clamp(52,9vw,128) / extrabold / 0.95 / -0.035em`)
          을 재사용해 디자인 시스템 일관성을 유지한다. 폼은 모달 다이얼로그로
          분리되었고(TopBar nav 가 숨김 상태이므로 hero 의 CTA / Footer
          의 CONTACT 가 대화 진입로). */}
      {/* Section padding rescaled for the 1200px shell — the previous full-bleed
          rhythm (py-32→48) felt empty inside the constrained column. Heading
          clamp ceiling lowered from 100→88px so the type doesn't overpower the
          narrower stage. */}
      <div className="px-7 pb-20 pt-20 md:px-10 md:pb-24 md:pt-24 lg:pb-28 lg:pt-28">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-y-12">
          <h2
            id="contact-heading"
            className="max-w-[18ch] font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-[clamp(40px,6.4vw,88px)] lg:col-span-9"
          >
            {t("headingLineOne")}
            <br />
            {t("headingLineTwoIntro")}{" "}
            <span className="text-brand">{t("headingLineTwoAccent")}</span>
            {em && (
              <span className="mt-5 block font-semibold leading-[1.1] tracking-[-0.015em] text-g500 text-[clamp(20px,2.8vw,38px)] md:mt-6">
                {em}
              </span>
            )}
          </h2>

          {/* 우측: 주석 처리된 원본 Hero 의 도형 재사용 — 4×4 그리드 위
              6개 노드(1개 brand-red) + "FIG. 01 / SYSTEM TOPOLOGY" 캡션.
              wrapper 에 `hidden lg:block` 을 둬 모바일에서는 grid row 자체를
              빼서 h2→p→CTA 간 gap-y 가 중복 적용되지 않도록 한다. */}
          <div className="hidden lg:col-span-3 lg:col-start-10 lg:block">
            <HeroDiagram />
          </div>

          {/* 서브 카피 — 두 단계 위계로 분리. lead 는 ink·medium 으로 강한
              포인트를 주고, detail 은 g500·regular 로 보조 설명. h2 의
              extrabold 헤드라인과 톤이 겹치지 않도록 lead 는 medium 까지만.
              col-span-9 + ch 캡 제거 — h2 헤드라인과 같은 너비를 공유해
              한 줄당 글자 수를 늘리고 (lead/detail 각 1줄로 wrap),
              헤드라인-서브-CTA 가 수직 정렬된 단일 텍스트 블록으로 읽힌다. */}
          <div className="lg:col-span-9">
            <p className="text-[clamp(18px,1.5vw,22px)] font-medium leading-[1.45] tracking-[-0.005em] text-ink">
              {t("sub")}
            </p>
            <p className="mt-4 text-[clamp(14px,1.05vw,16px)] leading-[1.6] text-g500">
              {t("subDetail")}
            </p>
          </div>

          {/* 1순위 CTA — 상단 nav 가 숨김 상태이므로 hero 안에서 진입로를 제공.
              데스크탑: 도형 바로 아래 (cols 10-12, row 2). 모바일: sub 단락
              아래 풀-width 로 자연 스택. ContactTrigger 가 동일 다이얼로그 오픈. */}
          <ContactTrigger className="mono cap inline-flex w-full items-center justify-between bg-brand px-5 py-3.5 text-sm font-semibold tracking-[0.04em] text-paper transition-colors hover:bg-ink lg:col-span-3 lg:col-start-10 lg:row-start-2 lg:self-start">
            <span>CONTACT</span>
            <span aria-hidden="true">→</span>
          </ContactTrigger>
        </div>
      </div>
    </section>
  );
}
