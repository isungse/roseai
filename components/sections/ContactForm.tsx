"use client";

import { useLocale, useTranslations } from "next-intl";
import { useId, useState, type FormEvent } from "react";

import { CONTACT_FIELDS, type ContactFieldName } from "@/lib/data/contact";
import { cn } from "@/lib/utils";

type FormState = Record<ContactFieldName, string>;
type Status = "idle" | "sending" | "success" | "error";

const EMPTY_FORM: FormState = { company: "", email: "", message: "" };

// RFC 5322 is vast; this is a pragmatic production-grade check:
// local part allows common punctuation; domain requires at least one dot
// and a 2+ char TLD; rejects leading/trailing/consecutive dots.
const EMAIL_RE =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

const INPUT_BASE =
  "w-full border-0 border-b border-hair bg-transparent pb-3 pt-2 text-[17px] text-ink outline-none transition-colors placeholder:text-[#bdbdbd] focus:border-brand";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");
  const feedbackId = useId();

  function update(name: ContactFieldName, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (feedback) {
      setFeedback("");
      setStatus("idle");
    }
  }

  function handleCancel() {
    setForm(EMPTY_FORM);
    setFeedback("");
    setStatus("idle");
  }

  function validate(): string | null {
    if (!form.company.trim() || !form.email.trim() || !form.message.trim()) {
      return t("required");
    }
    if (!EMAIL_RE.test(form.email)) {
      return t("invalidEmail");
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          company: form.company.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          locale,
        }),
      });
      if (!res.ok) throw new Error("submit_failed");
      setStatus("success");
      setFeedback(t("success"));
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
      setFeedback(t("error"));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={feedback ? feedbackId : undefined}
      className="flex flex-col gap-7"
    >
      {CONTACT_FIELDS.map((field) => {
        const inputId = `contact-${field.name}`;
        const value = form[field.name];
        const labelNode = (
          <label
            htmlFor={inputId}
            className="mono cap block text-[11px] font-medium tracking-[0.04em] text-g500"
          >
            {t(`labels.${field.name}`)}
          </label>
        );

        if (field.kind === "textarea") {
          return (
            <div key={field.name}>
              {labelNode}
              <textarea
                id={inputId}
                name={field.name}
                value={value}
                onChange={(e) => update(field.name, e.target.value)}
                placeholder={t(`placeholders.${field.name}`)}
                rows={4}
                className={cn(INPUT_BASE, "resize-none")}
                required
              />
            </div>
          );
        }

        return (
          <div key={field.name}>
            {labelNode}
            <input
              id={inputId}
              name={field.name}
              type={field.type}
              value={value}
              onChange={(e) => update(field.name, e.target.value)}
              placeholder={t(`placeholders.${field.name}`)}
              autoComplete={field.name === "email" ? "email" : "organization"}
              className={INPUT_BASE}
              required
            />
          </div>
        );
      })}

      <div className="mt-2 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="mono cap inline-flex items-center gap-4 bg-brand px-8 py-[18px] text-[13px] font-semibold tracking-[0.04em] text-paper transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{t("send")}</span>
          <span aria-hidden="true" className="mono font-medium">
            →
          </span>
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="mono cap inline-flex items-center gap-4 border border-hair bg-paper px-8 py-[18px] text-[13px] font-semibold tracking-[0.04em] text-ink transition-colors hover:border-ink hover:bg-g50"
        >
          {t("cancel")}
        </button>
      </div>

      {feedback && (
        <p
          id={feedbackId}
          role="status"
          aria-live={status === "error" ? "assertive" : "polite"}
          className={cn(
            "mt-1 text-sm",
            status === "success" ? "text-ink" : "text-brand",
          )}
        >
          {feedback}
        </p>
      )}
    </form>
  );
}
