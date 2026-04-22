import { useTranslations } from "next-intl";

import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  CONTACT_META_LABELS,
  CONTACT_META_VALUES,
} from "@/lib/data/contact";

import { ContactForm } from "./ContactForm";

export function ContactSection() {
  const t = useTranslations("contact");
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@roseai.co.kr";
  const em = t("headingEm");

  const metaRows = [
    { label: CONTACT_META_LABELS.office, value: CONTACT_META_VALUES.office },
    { label: CONTACT_META_LABELS.mail, value: contactEmail, isEmail: true },
    {
      label: CONTACT_META_LABELS.response,
      value: CONTACT_META_VALUES.response,
    },
    {
      label: CONTACT_META_LABELS.languages,
      value: CONTACT_META_VALUES.languages,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative"
    >
      <SectionLabel code="03 / CONTACT" />

      <div className="mx-auto max-w-screen-xl px-6 pb-10 pt-24 md:px-8 md:pt-32">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-12">
          <h2
            id="contact-heading"
            className="font-display text-[clamp(40px,5.5vw,72px)] font-bold leading-none tracking-[-0.025em] lg:col-span-7"
          >
            {t("headingPrimary")}
            <br />
            {t("headingIntro")}{" "}
            <b className="font-bold text-brand">{t("headingAccent")}</b>
            {em && (
              <em className="mt-2 block text-[0.6em] font-bold not-italic tracking-[-0.02em] text-g500">
                {em}
              </em>
            )}
          </h2>

          <dl className="mt-4 self-start text-xs text-g500 lg:col-span-4 lg:col-start-9">
            {metaRows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between border-b border-hair py-2"
              >
                <dt>{row.label}</dt>
                <dd className="font-semibold text-ink">
                  {row.isEmail ? (
                    <a
                      href={`mailto:${row.value}`}
                      className="hover:text-brand"
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
