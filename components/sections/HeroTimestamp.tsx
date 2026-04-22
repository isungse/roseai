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
