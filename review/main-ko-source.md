# ROSE-AI Homepage — Source Bundle

Snapshot for Claude AI design/code review. All source is copied verbatim from the repo.

- Deployed at: https://roseai-two.vercel.app
- Stack: Next.js 16 (App Router, async params) · TypeScript · Tailwind CSS v4 · next-intl
- Fonts: Pretendard Variable (KR) + Inter (display) + JetBrains Mono (code labels)
- Locales: ko (default) / en
- Sections on the page: Hero (01), Modules (02), Contact (03). Sections 03/04 (Philosophy, Evidence) from the original prototype are deferred.

See `.claude/rules/*` for project conventions (code style, design system, i18n, SEO, accessibility, deployment).

---

## Table of contents

- [app/[locale]/layout.tsx](#app-locale-layout-tsx) — Root layout (html/body, fonts, metadata, providers)
- [app/[locale]/page.tsx](#app-locale-page-tsx) — Home page — composes Hero + Modules + Contact
- [app/[locale]/not-found.tsx](#app-locale-not-found-tsx) — 404 page
- [components/sections/HeroSection.tsx](#components-sections-herosection-tsx) — Hero (01) — server shell
- [components/sections/HeroDiagram.tsx](#components-sections-herodiagram-tsx) — Hero diagram (server, decorative)
- [components/sections/HeroTimestamp.tsx](#components-sections-herotimestamp-tsx) — Hero live KST timestamp (client leaf)
- [components/sections/ModulesSection.tsx](#components-sections-modulessection-tsx) — Modules (02) — server shell
- [components/sections/ModuleTabs.tsx](#components-sections-moduletabs-tsx) — Modules tablist (client, keyboard-enabled)
- [components/sections/ContactSection.tsx](#components-sections-contactsection-tsx) — Contact (03) — server shell
- [components/sections/ContactForm.tsx](#components-sections-contactform-tsx) — Contact form (client, validation + feedback)
- [components/layout/TopBar.tsx](#components-layout-topbar-tsx) — Top navigation bar
- [components/layout/Footer.tsx](#components-layout-footer-tsx) — Site footer
- [components/layout/Logo.tsx](#components-layout-logo-tsx) — ROSE·AI lockup
- [components/layout/LangToggle.tsx](#components-layout-langtoggle-tsx) — KO/EN switch (client)
- [components/ui/SectionLabel.tsx](#components-ui-sectionlabel-tsx) — Section corner label (red square + code)
- [lib/data/hero.ts](#lib-data-hero-ts) — Hero constants (eyebrow labels, diagram caption)
- [lib/data/modules.ts](#lib-data-modules-ts) — Modules data (5 entries + status meta)
- [lib/data/contact.ts](#lib-data-contact-ts) — Contact field schema
- [lib/fonts.ts](#lib-fonts-ts) — next/font loaders (Inter, JetBrains Mono, Pretendard)
- [lib/utils.ts](#lib-utils-ts) — cn() class merge helper
- [i18n/routing.ts](#i18n-routing-ts) — next-intl routing (KO default, EN parallel)
- [i18n/navigation.ts](#i18n-navigation-ts) — Locale-aware Link / useRouter wrappers
- [i18n/request.ts](#i18n-request-ts) — getRequestConfig — loads messages per locale
- [middleware.ts](#middleware-ts) — Locale prefix middleware (/ → /ko)
- [messages/ko.json](#messages-ko-json) — Korean strings
- [messages/en.json](#messages-en-json) — English strings
- [styles/tokens.css](#styles-tokens-css) — Raw CSS variables (ink/paper/brand/g50/g500/hair)
- [app/globals.css](#app-globals-css) — Tailwind v4 @theme mapping + base styles
- [next.config.ts](#next-config-ts) — Next.js config with next-intl plugin

---

## app/[locale]/layout.tsx

_Root layout (html/body, fonts, metadata, providers)_

```tsx
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { TopBar } from "@/components/layout/TopBar";
import { routing, type Locale } from "@/i18n/routing";
import { inter, jetbrainsMono, pretendard } from "@/lib/fonts";

import "../globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://roseai.co.kr";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: "%s | ROSE-AI",
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ko: "/ko",
        en: "/en",
        "x-default": "/ko",
      },
    },
    openGraph: {
      type: "website",
      siteName: "ROSE-AI",
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      className={`${pretendard.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        <NextIntlClientProvider>
          <a href="#main" className="skip-link">
            {t("skipToContent")}
          </a>
          <TopBar />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## app/[locale]/page.tsx

_Home page — composes Hero + Modules + Contact_

```tsx
import { setRequestLocale } from "next-intl/server";

import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ModulesSection } from "@/components/sections/ModulesSection";
import { type Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ModulesSection />
      <ContactSection />
    </>
  );
}
```

## app/[locale]/not-found.tsx

_404 page_

```tsx
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-screen-xl px-6 py-24 md:px-8 md:py-32">
      <p className="mono cap text-xs font-medium text-brand">404</p>
      <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] md:text-6xl">
        Page not found.
      </h1>
      <p className="mt-6 text-g500">
        <Link href="/" className="underline underline-offset-4 hover:text-ink">
          Return to home
        </Link>
      </p>
    </section>
  );
}
```

## components/sections/HeroSection.tsx

_Hero (01) — server shell_

```tsx
import { useTranslations } from "next-intl";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { HERO_EYEBROW } from "@/lib/data/hero";

import { HeroDiagram } from "./HeroDiagram";
import { HeroTimestamp } from "./HeroTimestamp";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative border-b border-hair pt-20 md:pt-24"
      aria-labelledby="hero-headline"
    >
      <SectionLabel code="01 / HERO" />

      <div className="mx-auto max-w-screen-xl px-6 pb-20 pt-16 md:px-8 md:pb-28 md:pt-20">
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-g500">
          {[
            HERO_EYEBROW.seoul,
            HERO_EYEBROW.est,
            null,
            HERO_EYEBROW.status,
          ].map((item, i) => (
            <span
              key={i}
              className="mono flex items-center gap-6 before:text-hair before:content-['/'] first:before:content-none"
            >
              {item ?? <HeroTimestamp />}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-12">
          <h1
            id="hero-headline"
            className="font-display font-extrabold leading-[0.92] tracking-[-0.035em] text-[clamp(52px,9vw,128px)] lg:col-span-9"
          >
            Architecture <span className="text-g500">of</span>
            <span className="block">
              <span className="relative inline-block pr-5">
                Intelligence
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-[6px] h-3.5 w-3.5 bg-brand"
                />
              </span>
              .
            </span>
          </h1>

          <div className="-mt-4 lg:col-span-3 lg:col-start-10 lg:-mt-16">
            <HeroDiagram />
          </div>

          <p className="mt-2 pr-0 text-[17px] leading-[1.55] lg:col-span-7 lg:pr-10">
            {t("sub")}
          </p>
        </div>

      </div>
    </section>
  );
}
```

## components/sections/HeroDiagram.tsx

_Hero diagram (server, decorative)_

```tsx
import { HERO_DIAGRAM_TAG } from "@/lib/data/hero";

const NODES = [
  { top: "25%", left: "25%", red: false },
  { top: "25%", left: "50%", red: false },
  { top: "50%", left: "50%", red: true },
  { top: "50%", left: "75%", red: false },
  { top: "75%", left: "25%", red: false },
  { top: "75%", left: "50%", red: false },
] as const;

export function HeroDiagram() {
  return (
    <div
      aria-hidden="true"
      className="relative hidden aspect-square border border-hair lg:block"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--hair) 1px, transparent 1px), linear-gradient(to bottom, var(--hair) 1px, transparent 1px)",
          backgroundSize: "25% 25%",
        }}
      />
      {NODES.map((node, i) => (
        <span
          key={i}
          className={`absolute h-2.5 w-2.5 ${node.red ? "bg-brand" : "bg-ink"}`}
          style={{ top: node.top, left: node.left }}
        />
      ))}
      <span className="mono absolute bottom-2 left-2 text-[10px] text-g500">
        {HERO_DIAGRAM_TAG}
      </span>
    </div>
  );
}
```

## components/sections/HeroTimestamp.tsx

_Hero live KST timestamp (client leaf)_

```tsx
"use client";

import { useEffect, useState } from "react";

const KST_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Seoul",
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatKst(d: Date) {
  const parts = KST_FORMATTER.formatToParts(d).reduce<Record<string, string>>(
    (acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    },
    {},
  );
  return `${parts.month}.${parts.day}.${parts.year} · ${parts.hour}:${parts.minute} KST`;
}

export function HeroTimestamp() {
  const [ts, setTs] = useState<string | null>(null);

  useEffect(() => {
    setTs(formatKst(new Date()));
    const interval = setInterval(() => setTs(formatKst(new Date())), 60_000);
    return () => clearInterval(interval);
  }, []);

  return <span suppressHydrationWarning>{ts ?? "— · —"}</span>;
}
```

## components/sections/ModulesSection.tsx

_Modules (02) — server shell_

```tsx
import { useTranslations } from "next-intl";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { MODULES } from "@/lib/data/modules";

import { ModuleTabs } from "./ModuleTabs";

export function ModulesSection() {
  const t = useTranslations("modules");

  return (
    <section
      id="modules"
      aria-labelledby="modules-heading"
      className="relative border-b border-hair"
    >
      <SectionLabel code="02 / MODULES" />

      <div className="mx-auto max-w-screen-xl px-6 pb-24 pt-24 md:px-8 md:pb-32 md:pt-32">
        <h2
          id="modules-heading"
          className="mb-12 font-display text-[clamp(32px,4.2vw,56px)] font-bold leading-[1.05] tracking-[-0.02em]"
        >
          {t("headingMain")}{" "}
          <em className="font-bold not-italic text-g500">{t("headingEm")}</em>
        </h2>
        <ModuleTabs modules={MODULES} />
      </div>
    </section>
  );
}
```

## components/sections/ModuleTabs.tsx

_Modules tablist (client, keyboard-enabled)_

```tsx
"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, type KeyboardEvent } from "react";

import { MODULE_STATUS, type Module } from "@/lib/data/modules";
import { cn } from "@/lib/utils";

interface ModuleTabsProps {
  modules: ReadonlyArray<Module>;
}

export function ModuleTabs({ modules }: ModuleTabsProps) {
  const t = useTranslations("modules");
  const [activeId, setActiveId] = useState(modules[0].id);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const active = modules.find((m) => m.id === activeId) ?? modules[0];

  function moveFocus(nextIndex: number) {
    const target = buttonsRef.current[nextIndex];
    if (!target) return;
    target.focus();
    setActiveId(modules[nextIndex].id);
  }

  function handleKey(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveFocus((index + 1) % modules.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveFocus((index - 1 + modules.length) % modules.length);
        break;
      case "Home":
        e.preventDefault();
        moveFocus(0);
        break;
      case "End":
        e.preventDefault();
        moveFocus(modules.length - 1);
        break;
    }
  }

  return (
    <div className="grid grid-cols-1 border-y border-ink md:grid-cols-[4fr_8fr]">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Modules"
        className="flex flex-col border-b border-hair md:border-b-0 md:border-r"
      >
        {modules.map((m, i) => {
          const isActive = m.id === activeId;
          return (
            <button
              key={m.id}
              ref={(el) => {
                buttonsRef.current[i] = el;
              }}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls="module-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(m.id)}
              onKeyDown={(e) => handleKey(e, i)}
              className={cn(
                "grid grid-cols-[48px_1fr_auto] items-center gap-3 border-b border-hair px-5 py-5 text-left transition-colors last:border-b-0",
                isActive ? "bg-ink text-paper" : "bg-paper hover:bg-g50",
              )}
            >
              <span
                className={cn(
                  "mono text-sm font-semibold",
                  isActive ? "text-brand" : "text-g500",
                )}
              >
                {m.id}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-semibold tracking-[-0.01em]">
                  {t(`${m.i18nKey}.title`)}
                </span>
                <span
                  className={cn(
                    "mt-0.5 block truncate text-xs",
                    isActive ? "text-paper/60" : "text-g500",
                  )}
                >
                  {t(`${m.i18nKey}.em`)}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "mono text-xs",
                  isActive ? "text-brand" : "text-g500",
                )}
              >
                →
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="module-panel"
        role="tabpanel"
        aria-labelledby={`module-tab-${active.id}`}
        className="relative min-h-[440px] p-8 md:p-10"
      >
        <div className="mono absolute right-8 top-8 text-right text-[11px] text-g500 md:right-10 md:top-10">
          <div>FIG. 02.{active.id}</div>
          <div className="mt-1">
            {MODULE_STATUS.statusLabel} ·{" "}
            <span className="text-brand">{MODULE_STATUS.statusValue}</span>
          </div>
          <div className="mt-1">{MODULE_STATUS.version}</div>
        </div>

        <div
          aria-hidden="true"
          className="mono text-[64px] font-semibold leading-none tracking-[-0.02em] text-brand md:text-[72px]"
        >
          {active.id}
        </div>

        <h3 className="mt-6 font-display text-[32px] font-bold leading-[1.05] tracking-[-0.025em] md:text-[40px]">
          {t(`${active.i18nKey}.title`)}
          <em className="mt-2 block text-[18px] font-semibold not-italic tracking-[-0.01em] text-g500 md:text-[20px]">
            {t(`${active.i18nKey}.em`)}
          </em>
        </h3>

        <p className="mt-6 max-w-[56ch] text-[15px] leading-[1.6]">
          {t(`${active.i18nKey}.desc`)}
        </p>

        <div className="mt-7 flex flex-wrap">
          {active.stack.map((s) => (
            <span
              key={s}
              className="mono -mb-px -mr-px border border-hair px-3 py-2 text-[11px] font-medium"
            >
              {s}
            </span>
          ))}
        </div>

        <a
          href="#"
          className="mono cap mt-9 inline-flex items-center gap-3 border-b border-ink pb-1.5 text-xs font-semibold tracking-[0.04em] transition-colors hover:border-brand hover:text-brand"
        >
          {t("liveDemo")} <span aria-hidden="true">→</span>
        </a>

        {/* Module preview placeholder — hidden until the demo HTML files
            are linked in per module. When restoring, decide whether this
            becomes an <iframe> loading the demo page or a static thumbnail. */}
        {/* <div
          aria-hidden="true"
          className="mono relative mt-10 hidden aspect-[16/9] w-[44%] items-end justify-between border border-hair p-2.5 text-[10px] text-g500 lg:absolute lg:bottom-10 lg:right-10 lg:mt-0 lg:flex"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, var(--g50) 0 8px, transparent 8px 16px)",
          }}
        >
          <span className="absolute left-2.5 top-2.5 h-2 w-2 bg-brand" />
          <span>{t("previewLabel")}</span>
          <span>{MODULE_STATUS.previewSize}</span>
        </div> */}
      </div>
    </div>
  );
}
```

## components/sections/ContactSection.tsx

_Contact (03) — server shell_

```tsx
import { useTranslations } from "next-intl";

import { SectionLabel } from "@/components/ui/SectionLabel";

import { ContactForm } from "./ContactForm";

export function ContactSection() {
  const t = useTranslations("contact");
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
```

## components/sections/ContactForm.tsx

_Contact form (client, validation + feedback)_

```tsx
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
  "w-full border-0 border-b border-hair bg-transparent pb-3 pt-2 text-[17px] text-ink outline-none transition-colors placeholder:text-[#bdbdbd] focus:border-brand";

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
              className="mono cap block text-[11px] font-medium tracking-[0.04em] text-g500"
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
```

## components/layout/TopBar.tsx

_Top navigation bar_

```tsx
import { useTranslations } from "next-intl";

import { LangToggle } from "./LangToggle";
import { Logo } from "./Logo";

export function TopBar() {
  const t = useTranslations("nav");

  const items = [
    { href: "#modules", label: t("modules") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-screen-xl items-center justify-between px-6 md:px-8">
        <Logo />
        <nav
          aria-label="Primary"
          className="mono cap hidden items-center gap-7 text-xs font-medium md:flex"
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex justify-end">
          <LangToggle />
        </div>
      </div>
    </header>
  );
}
```

## components/layout/Footer.tsx

_Site footer_

```tsx
import { useTranslations } from "next-intl";

import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@roseai.co.kr";

  const links = [
    { href: "#modules", label: t("links.modules") },
    { href: "#contact", label: t("links.contact") },
  ];

  return (
    <footer className="mono border-t border-hair px-6 py-8 text-xs text-g500 md:px-8">
      <div className="mx-auto grid max-w-screen-xl gap-6 md:grid-cols-[1fr_3fr_1fr] md:items-center">
        <Logo size="sm" />
        <div className="flex flex-wrap items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <span aria-hidden="true">·</span>
          <span>{t("office")}</span>
          <a
            href={`mailto:${contactEmail}`}
            className="transition-colors hover:text-ink"
          >
            {contactEmail}
          </a>
        </div>
        <div className="text-left md:text-right">{t("copyright")}</div>
      </div>
    </footer>
  );
}
```

## components/layout/Logo.tsx

_ROSE·AI lockup_

```tsx
import { Link } from "@/i18n/navigation";

interface LogoProps {
  size?: "sm" | "md";
}

export function Logo({ size = "md" }: LogoProps) {
  const mark = size === "sm" ? "h-4 w-4" : "h-6 w-6";
  const hair = size === "sm" ? "h-4" : "h-[22px]";
  const word = size === "sm" ? "text-sm" : "text-lg";

  return (
    <Link
      href="/"
      aria-label="ROSE-AI home"
      className="flex items-center gap-3"
    >
      <span
        aria-hidden="true"
        className={`grid grid-cols-2 grid-rows-2 gap-px ${mark}`}
      >
        <span className="bg-ink" />
        <span className="bg-brand" />
        <span className="bg-ink" />
        <span className="bg-ink" />
      </span>
      <span className={`block w-px bg-ink ${hair}`} aria-hidden="true" />
      <span
        className={`font-extrabold leading-none tracking-[-0.02em] pl-3 ${word}`}
      >
        ROSE<em className="not-italic text-brand">·AI</em>
      </span>
    </Link>
  );
}
```

## components/layout/LangToggle.tsx

_KO/EN switch (client)_

```tsx
"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LangToggle() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className="mono flex items-stretch text-xs"
    >
      {routing.locales.map((code, i) => {
        const on = code === locale;
        return (
          <span key={code} className="flex items-center">
            {i > 0 && (
              <span aria-hidden="true" className="mx-0 h-3.5 w-px bg-hair" />
            )}
            <button
              type="button"
              disabled={isPending}
              onClick={() => switchTo(code)}
              aria-pressed={on}
              className={`px-2.5 py-1.5 font-medium transition-colors ${
                on ? "text-ink" : "text-g500 hover:text-ink"
              }`}
            >
              {code.toUpperCase()}
            </button>
          </span>
        );
      })}
    </div>
  );
}
```

## components/ui/SectionLabel.tsx

_Section corner label (red square + code)_

```tsx
interface SectionLabelProps {
  code: string;
}

export function SectionLabel({ code }: SectionLabelProps) {
  return (
    <div className="mono cap absolute left-6 top-6 z-10 flex items-center gap-2 text-[11px] font-semibold tracking-[0.02em] md:left-8">
      <span aria-hidden="true" className="h-1.5 w-1.5 bg-brand" />
      {code}
    </div>
  );
}
```

## lib/data/hero.ts

_Hero constants (eyebrow labels, diagram caption)_

```ts
export const HERO_EYEBROW = {
  seoul: "SEOUL · KR",
  est: "EST. 2023",
  status: "STATUS · OPERATIONAL",
} as const;

export const HERO_DIAGRAM_TAG = "FIG. 01 / SYSTEM TOPOLOGY";
```

## lib/data/modules.ts

_Modules data (5 entries + status meta)_

```ts
export const MODULES = [
  {
    id: "01",
    i18nKey: "workforcePlanner",
    stack: ["NEXT.JS 15", "POSTGRES", "REDIS", "PYTHON · PROPHET", "WEBSOCKET"],
  },
  {
    id: "02",
    i18nKey: "groupware",
    stack: ["REACT 19", "NESTJS", "POSTGRES", "ELASTICSEARCH", "OIDC · SAML"],
  },
  {
    id: "03",
    i18nKey: "intranet",
    stack: ["NEXT.JS 15", "PGVECTOR", "OPENSEARCH", "S3 · COMPATIBLE", "SCIM"],
  },
  {
    id: "04",
    i18nKey: "boardArchive",
    stack: ["NEXT.JS 15", "MDX · PIPELINE", "POSTGRES", "ALGOLIA", "WEBSUB"],
  },
  {
    id: "05",
    i18nKey: "mobileHub",
    stack: ["REACT NATIVE", "EXPO 51", "WEBSOCKET", "APNS · FCM", "BIOMETRIC"],
  },
] as const;

export type Module = (typeof MODULES)[number];

export const MODULE_STATUS = {
  statusLabel: "STATUS",
  statusValue: "LIVE",
  version: "v 3.2.1",
  previewSize: "1920 × 1080",
} as const;
```

## lib/data/contact.ts

_Contact field schema_

```ts
export const CONTACT_FIELDS = [
  { name: "company", type: "text" },
  { name: "email", type: "email" },
  { name: "message", type: "textarea" },
] as const;

export type ContactFieldName = (typeof CONTACT_FIELDS)[number]["name"];
```

## lib/fonts.ts

_next/font loaders (Inter, JetBrains Mono, Pretendard)_

```ts
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const pretendard = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});
```

## lib/utils.ts

_cn() class merge helper_

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## i18n/routing.ts

_next-intl routing (KO default, EN parallel)_

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en"],
  defaultLocale: "ko",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
```

## i18n/navigation.ts

_Locale-aware Link / useRouter wrappers_

```ts
import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

## i18n/request.ts

_getRequestConfig — loads messages per locale_

```ts
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

## middleware.ts

_Locale prefix middleware (/ → /ko)_

```ts
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

## messages/ko.json

_Korean strings_

```json
{
  "common": {
    "skipToContent": "본문 바로가기",
    "siteName": "ROSE·AI"
  },
  "nav": {
    "modules": "MODULES",
    "philosophy": "PHILOSOPHY",
    "contact": "CONTACT"
  },
  "footer": {
    "copyright": "© 2026 ROSE-AI · ALL SYSTEMS NOMINAL",
    "office": "SEOUL · KR",
    "links": {
      "modules": "MODULES",
      "philosophy": "PHILOSOPHY",
      "evidence": "EVIDENCE",
      "contact": "CONTACT"
    }
  },
  "meta": {
    "title": "ROSE-AI — Architecture of Intelligence",
    "description": "비즈니스의 본질을 설계하는 하이엔드 AI 솔루션. 인력 운영, 그룹웨어, 지식 관리, 게시판, 모바일 모니터링을 단일 아키텍처로 제공합니다."
  },
  "hero": {
    "sub": "비즈니스의 본질을 설계하는 하이엔드 AI 솔루션. 밀리초 단위로 시간을 측정하는 기업을 위해 만들어집니다."
  },
  "modules": {
    "headingMain": "Five systems.",
    "headingEm": "One architecture.",
    "liveDemo": "LIVE DEMO",
    "previewLabel": "MODULE PREVIEW",
    "workforcePlanner": {
      "title": "Workforce Planner",
      "em": "인력 운영 관제 — People Control Plane",
      "desc": "임상·운영 스태프의 시프트 단위 가시성을 제공합니다. 인력이 부족해질 구간을 예측하고 로스터를 재배치하며, 매니저가 인지하기 전에 가장 작은 개입으로 커버리지를 복원합니다."
    },
    "groupware": {
      "title": "Groupware",
      "em": "협업 및 결재 — Seamless Collaboration & Approval",
      "desc": "결재·문서·팀 커뮤니케이션을 하나의 표면으로. 다섯 개 도구를 넘나들던 결재 체인이 단일 타임라인으로 수렴하며, 결정론적 SLA와 완전한 감사 추적을 보장합니다."
    },
    "intranet": {
      "title": "Intranet",
      "em": "내부 지식 관리 — Internal Knowledge Management",
      "desc": "조직을 위한 검색 가능·버전 관리 지식 레이어. 문서는 청크 단위로 분할·임베딩되어 상호 연결되며, 작성자가 떠나도 남는 조직의 기억을 만듭니다."
    },
    "boardArchive": {
      "title": "Board / Archive",
      "em": "고가독성 게시판 — Text-dense Bulletin Systems",
      "desc": "텍스트 밀도가 높은 팀을 위한 고가독성 퍼블리싱. 타이포그래피 중심 레이아웃, 규제된 위계, 엄격한 칼럼, 30분 세션에 맞춰 보정된 리더 모드."
    },
    "mobileHub": {
      "title": "Mobile Hub",
      "em": "실시간 모니터링 — Real-time Operations on the Go",
      "desc": "플로어 매니저와 온콜 엔지니어를 위한 목적 특화 모바일 표면. 푸시 네이티브 알림, 한 손가락 결재, 컨트롤룸 화면을 그대로 반영하는 인시던트 뷰."
    }
  },
  "contact": {
    "headingLineOne": "Let's redesign",
    "headingLineTwoIntro": "your",
    "headingLineTwoAccent": "system.",
    "headingEm": "당신의 시스템을 다시 설계합니다.",
    "sub": "ROSE-AI는 귀사의 비즈니스 본질을 분석하고, 가장 정밀한 AI 솔루션을 설계합니다. 먼저 대화를 시작하세요.",
    "form": {
      "labels": {
        "company": "회사 / COMPANY",
        "email": "이메일 / EMAIL",
        "message": "문의 내용 / MESSAGE"
      },
      "placeholders": {
        "company": "귀사명을 입력하세요",
        "email": "이메일 주소를 입력하세요",
        "message": "문의 내용을 입력하세요"
      },
      "send": "전송",
      "cancel": "취소",
      "required": "모든 필수 항목을 입력해 주세요.",
      "invalidEmail": "유효한 이메일 주소를 입력해 주세요.",
      "success": "문의가 접수되었습니다. 24시간 이내에 연락드리겠습니다.",
      "error": "전송 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
    }
  }
}
```

## messages/en.json

_English strings_

```json
{
  "common": {
    "skipToContent": "Skip to content",
    "siteName": "ROSE·AI"
  },
  "nav": {
    "modules": "MODULES",
    "philosophy": "PHILOSOPHY",
    "contact": "CONTACT"
  },
  "footer": {
    "copyright": "© 2026 ROSE-AI · ALL SYSTEMS NOMINAL",
    "office": "SEOUL · KR",
    "links": {
      "modules": "MODULES",
      "philosophy": "PHILOSOPHY",
      "evidence": "EVIDENCE",
      "contact": "CONTACT"
    }
  },
  "meta": {
    "title": "ROSE-AI — Architecture of Intelligence",
    "description": "High-end AI solutions that redesign the essence of your business — engineered for the enterprises that measure time in milliseconds."
  },
  "hero": {
    "sub": "High-end AI solutions that redesign the essence of your business — engineered for the enterprises that measure time in milliseconds."
  },
  "modules": {
    "headingMain": "Five systems.",
    "headingEm": "One architecture.",
    "liveDemo": "LIVE DEMO",
    "previewLabel": "MODULE PREVIEW",
    "workforcePlanner": {
      "title": "Workforce Planner",
      "em": "People Control Plane",
      "desc": "Shift-level visibility across clinical and operational staff. Predicts short-handed windows, rebalances rosters, and surfaces the smallest possible intervention to restore coverage — typically before a manager notices."
    },
    "groupware": {
      "title": "Groupware",
      "em": "Seamless Collaboration & Approval",
      "desc": "A single surface for approvals, documents, and team comms. Chains that used to cross five tools collapse into one timeline with deterministic SLAs and full audit trail."
    },
    "intranet": {
      "title": "Intranet",
      "em": "Internal Knowledge Management",
      "desc": "A searchable, versioned knowledge layer for the organisation. Documents are chunked, embedded, and cross-linked — institutional memory that does not leave with the author."
    },
    "boardArchive": {
      "title": "Board / Archive",
      "em": "Text-dense Bulletin Systems",
      "desc": "High-readability publishing for text-dense teams. Typography-first layouts with regulated hierarchy, strict columns, and a reader mode calibrated for 30-minute sessions."
    },
    "mobileHub": {
      "title": "Mobile Hub",
      "em": "Real-time Operations on the Go",
      "desc": "A purpose-built mobile surface for floor managers and on-call engineers. Push-native alerts, one-thumb approvals, and an incident view that mirrors the control-room screen exactly."
    }
  },
  "contact": {
    "headingLineOne": "Let's redesign",
    "headingLineTwoIntro": "your",
    "headingLineTwoAccent": "system.",
    "headingEm": "",
    "sub": "ROSE-AI analyzes the essence of your business and designs the most precise AI solution. Start the conversation.",
    "form": {
      "labels": {
        "company": "COMPANY",
        "email": "EMAIL",
        "message": "MESSAGE"
      },
      "placeholders": {
        "company": "Enter your company name",
        "email": "Enter your email address",
        "message": "Enter your message"
      },
      "send": "SEND",
      "cancel": "Cancel",
      "required": "Please fill in all required fields.",
      "invalidEmail": "Please enter a valid email address.",
      "success": "Thank you — we'll reach out within 24 hours.",
      "error": "Something went wrong. Please try again shortly."
    }
  }
}
```

## styles/tokens.css

_Raw CSS variables (ink/paper/brand/g50/g500/hair)_

```css
:root {
  --ink: #000000;
  --paper: #ffffff;
  --brand: #e03131;
  --g50: #f4f4f4;
  --g500: #737373;
  --hair: #e5e5e5;

  --ease-out-quint: cubic-bezier(0.2, 0.8, 0.2, 1);
  --dur-micro: 150ms;
  --dur-std: 250ms;
  --dur-layout: 400ms;
}
```

## app/globals.css

_Tailwind v4 @theme mapping + base styles_

```css
@import "../styles/tokens.css";
@import "tailwindcss";
@source not "../.claude";

@theme {
  --color-ink: var(--ink);
  --color-paper: var(--paper);
  --color-brand: var(--brand);
  --color-g50: var(--g50);
  --color-g500: var(--g500);
  --color-hair: var(--hair);

  --font-sans: var(--font-pretendard), var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;
  --font-display: var(--font-inter), var(--font-pretendard), sans-serif;

  --default-transition-duration: 250ms;
  --default-transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
}

html,
body {
  background: var(--paper);
  color: var(--ink);
}

body {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  word-break: keep-all;
  overflow-wrap: anywhere;
}

.mono {
  font-family: var(--font-mono);
  font-variant-ligatures: none;
  letter-spacing: 0;
}

.cap {
  text-transform: uppercase;
}

:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

.skip-link {
  position: absolute;
  left: 0;
  top: -40px;
  background: var(--ink);
  color: var(--paper);
  padding: 8px 16px;
  font-size: 13px;
  z-index: 100;
  transition: top var(--dur-micro) var(--ease-out-quint);
}

.skip-link:focus {
  top: 0;
}
```

## next.config.ts

_Next.js config with next-intl plugin_

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
```

