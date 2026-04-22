"use client";

import { useTranslations } from "next-intl";
import { useId, useState, type FormEvent } from "react";

import {
  CONTACT_FIELDS,
  CONTACT_PRIVACY_LINK,
  CONTACT_SEND_LABEL,
  type ContactFieldName,
} from "@/lib/data/contact";
import { cn } from "@/lib/utils";

type FormState = Record<ContactFieldName, string>;

const EMPTY_FORM: FormState = { company: "", email: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");
  const feedbackId = useId();
  const consentId = useId();

  function update(name: ContactFieldName, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status !== "idle") setStatus("idle");
    if (feedback) setFeedback("");
  }

  function validate(): string | null {
    if (!form.company.trim() || !form.email.trim() || !form.message.trim()) {
      return t("form.required");
    }
    if (!EMAIL_RE.test(form.email)) {
      return t("form.invalidEmail");
    }
    if (!consent) {
      return t("form.consentRequired");
    }
    return null;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const error = validate();
    if (error) {
      setStatus("error");
      setFeedback(error);
      return;
    }

    try {
      setStatus("sending");
      setFeedback("");
      await new Promise((r) => setTimeout(r, 500));
      setStatus("success");
      setFeedback(t("form.success"));
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
      setFeedback(t("form.error"));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={feedback ? feedbackId : undefined}
      className="mt-16 grid grid-cols-12 border-t border-ink"
    >
      {CONTACT_FIELDS.map((field) => {
        const value = form[field.name];
        const isFull = field.type === "textarea";
        return (
          <div
            key={field.name}
            className={cn(
              "group relative border-b border-hair px-5 py-[18px]",
              isFull ? "col-span-12" : "col-span-12 md:col-span-6",
              !isFull && field.name === "company" && "md:border-r md:border-hair",
              "after:absolute after:left-0 after:-bottom-px after:h-px after:w-0 after:bg-brand after:transition-[width] focus-within:after:w-full",
            )}
          >
            <label
              htmlFor={`contact-${field.name}`}
              className="mono cap block text-[11px] font-medium tracking-[0.04em] text-g500"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={`contact-${field.name}`}
                name={field.name}
                value={value}
                onChange={(e) => update(field.name, e.target.value)}
                placeholder={t(`form.placeholders.${field.name}`)}
                className="min-h-[110px] w-full resize-none border-0 bg-transparent pt-2 text-[17px] text-ink outline-none placeholder:text-[#bdbdbd]"
                required
              />
            ) : (
              <input
                id={`contact-${field.name}`}
                name={field.name}
                type={field.type}
                value={value}
                onChange={(e) => update(field.name, e.target.value)}
                placeholder={t(`form.placeholders.${field.name}`)}
                autoComplete={
                  field.name === "email" ? "email" : "organization"
                }
                className="w-full border-0 bg-transparent pt-2 text-[17px] text-ink outline-none placeholder:text-[#bdbdbd]"
                required
              />
            )}
            <span className="mono absolute right-3.5 top-3.5 text-[10px] text-[#c8c8c8]">
              {field.idx}
            </span>
          </div>
        );
      })}

      <div className="col-span-12 grid grid-cols-1 border-t border-ink md:grid-cols-[1fr_auto]">
        <label
          htmlFor={consentId}
          className="flex items-center gap-2.5 px-5 py-[18px] text-xs text-g500"
        >
          <input
            id={consentId}
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className={cn(
              "inline-block h-3 w-3 cursor-pointer appearance-none border border-ink",
              consent && "border-brand bg-brand",
            )}
          />
          <span>
            {t("form.consent")}{" "}
            <a
              href={CONTACT_PRIVACY_LINK}
              className="underline-offset-4 hover:text-ink hover:underline"
            >
              {CONTACT_PRIVACY_LINK}
            </a>
            .
          </span>
        </label>
        <button
          type="submit"
          disabled={status === "sending"}
          className="mono cap inline-flex items-center gap-6 bg-ink px-10 py-[22px] text-[13px] font-semibold tracking-[0.04em] text-paper transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{CONTACT_SEND_LABEL}</span>
          <span aria-hidden="true" className="mono font-medium">
            →
          </span>
        </button>
      </div>

      {feedback && (
        <p
          id={feedbackId}
          role="status"
          aria-live={status === "error" ? "assertive" : "polite"}
          className={cn(
            "col-span-12 border-t border-hair px-5 py-4 text-sm",
            status === "success" ? "text-ink" : "text-brand",
          )}
        >
          {feedback}
        </p>
      )}
    </form>
  );
}
