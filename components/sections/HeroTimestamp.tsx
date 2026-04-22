"use client";

import { useSyncExternalStore } from "react";

const KST_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Seoul",
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatKst(d: Date): string {
  const parts = KST_FORMATTER.formatToParts(d).reduce<Record<string, string>>(
    (acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    },
    {},
  );
  return `${parts.month}.${parts.day}.${parts.year} · ${parts.hour}:${parts.minute} KST`;
}

const PLACEHOLDER = "——.——.—— · ——:—— KST";

function subscribe(notify: () => void) {
  const id = setInterval(notify, 60_000);
  return () => clearInterval(id);
}

function getClientSnapshot(): string {
  return formatKst(new Date());
}

function getServerSnapshot(): string {
  return PLACEHOLDER;
}

export function HeroTimestamp() {
  const ts = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  return <span suppressHydrationWarning>{ts}</span>;
}
