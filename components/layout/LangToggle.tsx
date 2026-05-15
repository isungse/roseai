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
              <span aria-hidden="true" className="mx-1 h-3.5 w-px bg-hair" />
            )}
            <button
              type="button"
              disabled={isPending}
              onClick={() => switchTo(code)}
              aria-pressed={on ? "true" : "false"}
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
