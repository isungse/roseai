"use client";

import { useTranslations } from "next-intl";
import { useId, useState, type FormEvent } from "react";

import { CONTACT_FIELDS, type ContactFieldName } from "@/lib/data/contact";
import { cn } from "@/lib/utils";

type FormState = Record<ContactFieldName, string>;
type Status = "idle" | "sending" | "success" | "error";

const EMPTY_FORM: FormState = { company: "", email: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INPUT_BASE =
  "w-full border-0 border-b border-paper/20 bg-transparent pb-3 pt-2 text-[17px] text-paper outline-none transition-colors placeholder:text-paper/40 focus:border-brand";

export function ContactForm() {
  const t = useTranslations("contact.form");
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
      await new Promise((r) => setTimeout(r, 500));
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
        return (
          <div key={field.name}>
            <label
              htmlFor={inputId}
              className="mono cap block text-[11px] font-medium tracking-[0.04em] text-paper/60"
            >
              {t(`labels.${field.name}`)}
            </label>
            {field.type === "textarea" ? (
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
            ) : (
              <input
                id={inputId}
                name={field.name}
                type={field.type}
                value={value}
                onChange={(e) => update(field.name, e.target.value)}
                placeholder={t(`placeholders.${field.name}`)}
                autoComplete={
                  field.name === "email" ? "email" : "organization"
                }
                className={INPUT_BASE}
                required
              />
            )}
          </div>
        );
      })}

      <div className="mt-2 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="mono cap inline-flex items-center gap-4 bg-brand px-8 py-[18px] text-[13px] font-semibold tracking-[0.04em] text-paper transition-colors hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{t("send")}</span>
          <span aria-hidden="true" className="mono font-medium">
            →
          </span>
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="mono cap inline-flex items-center gap-4 border border-paper/30 px-8 py-[18px] text-[13px] font-semibold tracking-[0.04em] text-paper transition-colors hover:border-paper hover:bg-paper/10"
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
            status === "success" ? "text-paper" : "text-brand",
          )}
        >
          {feedback}
        </p>
      )}
    </form>
  );
}
