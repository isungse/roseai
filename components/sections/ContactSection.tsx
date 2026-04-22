import { useTranslations } from "next-intl";

import { SectionLabel } from "@/components/ui/SectionLabel";

import { ContactForm } from "./ContactForm";

export function ContactSection() {
  const t = useTranslations("contact");
  // headingEm is a KO-only visual pairing under the English brand headline
  // (matches the reference design). EN intentionally leaves the key empty
  // so this block renders nothing on the /en page. The locale JSONs still
  // share the same key tree per i18n.md.
  const em = t("headingEm");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-paper text-ink"
    >
      <SectionLabel code="03 / CONTACT" />

      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-x-12 gap-y-14 px-6 pb-24 pt-24 md:px-8 md:pb-32 md:pt-32 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2
            id="contact-heading"
            className="font-display text-[clamp(40px,5.5vw,72px)] font-bold leading-[1.05] tracking-[-0.025em]"
          >
            {t("headingLineOne")}
            <br />
            {t("headingLineTwoIntro")}{" "}
            <span className="text-brand">{t("headingLineTwoAccent")}</span>
            {em && (
              <span className="mt-4 block font-bold leading-[1.1] tracking-[-0.02em] text-g500 text-[clamp(24px,3vw,40px)]">
                {em}
              </span>
            )}
          </h2>
          <p className="mt-8 max-w-[44ch] text-[17px] leading-[1.55] text-g500">
            {t("sub")}
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
