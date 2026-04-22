export const HERO_EYEBROW = {
  seoul: "SEOUL · KR",
  est: "EST. 2023",
  status: "STATUS · OPERATIONAL",
} as const;

export const HERO_META = [
  { label: "BUILD", value: "v 4.11.0" },
  { label: "REGION", value: "APAC · KR-01" },
  { label: "COMPLIANCE", value: "ISO 27001 · SOC 2" },
  { label: "FCP", value: "782 ms" },
] as const;

export const HERO_KPI = [
  { tag: "01 / DEPLOYED", num: "12", unit: "ENT.", i18nKey: "deployed" },
  { tag: "02 / MODULES", num: "48", unit: "SYS.", i18nKey: "modules" },
  { tag: "03 / UPTIME", num: "99.97", unit: "%", i18nKey: "uptime" },
  { tag: "04 / LATENCY", num: "<150", unit: "ms", i18nKey: "latency" },
] as const;

export const HERO_DIAGRAM_TAG = "FIG. 01 / SYSTEM TOPOLOGY";
