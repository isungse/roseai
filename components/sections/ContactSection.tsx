import { useTranslations } from "next-intl";

import { SectionLabel } from "@/components/ui/SectionLabel";

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
      <SectionLabel code="02 / CONTACT" />

      {/* 홈페이지의 대문(hero gate) — 원본 Hero 가 주석 처리된 상태에서
          이 섹션이 페이지의 메인 메시지를 부담한다. 타이포 스케일·웨이트는
          원본 Hero 와 동일 ceiling(`clamp(52,9vw,128) / extrabold / 0.95 / -0.035em`)
          을 재사용해 디자인 시스템 일관성을 유지한다. 폼은 모달 다이얼로그로
          분리되었고(TopBar/Footer 의 CONTACT 트리거), 본 섹션에는 별도
          CTA 를 두지 않는다 — 타이포가 곧 메시지. */}
      <div className="mx-auto max-w-screen-xl px-6 pb-32 pt-32 md:px-8 md:pb-40 md:pt-40 lg:pb-48 lg:pt-48">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12 lg:gap-y-16">
          <h2
            id="contact-heading"
            className="max-w-[18ch] font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-[clamp(42px,7.2vw,100px)] lg:col-span-9"
          >
            {t("headingLineOne")}
            <br />
            {t("headingLineTwoIntro")}{" "}
            <span className="text-brand">{t("headingLineTwoAccent")}</span>
            {em && (
              <span className="mt-6 block font-semibold leading-[1.1] tracking-[-0.015em] text-g500 text-[clamp(22px,3.2vw,44px)] md:mt-8">
                {em}
              </span>
            )}
          </h2>

          {/* 우측: 주석 처리된 원본 Hero 의 도형 재사용 — 4×4 그리드 위
              6개 노드(1개 brand-red) + "FIG. 01 / SYSTEM TOPOLOGY" 캡션.
              hidden lg:block 이므로 데스크탑 전용. aspect-square. */}
          <div className="lg:col-span-3 lg:col-start-10">
            <HeroDiagram />
          </div>

          <p className="text-[clamp(17px,1.3vw,21px)] leading-[1.55] text-g500 lg:col-span-7 lg:max-w-[58ch]">
            {t("sub")}
          </p>
        </div>
      </div>
    </section>
  );
}
