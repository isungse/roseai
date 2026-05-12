export const MODULES = [
  {
    id: "01",
    i18nKey: "serviceDesk",
    stack: ["NEXT.JS 15", "NESTJS", "POSTGRES", "REDIS", "WEBSOCKET"],
  },
  {
    id: "02",
    i18nKey: "performance",
    stack: ["NEXT.JS 15", "POSTGRES", "REDIS", "BULL · QUEUE", "EXCEL · SHEETJS"],
  },
  {
    id: "03",
    i18nKey: "workforceMonitor",
    stack: ["NEXT.JS 15", "WEBSOCKET", "POSTGRES", "TIMESCALE", "REDIS"],
  },
  {
    id: "04",
    i18nKey: "mobileSolution",
    stack: ["REACT NATIVE", "EXPO 51", "NESTJS", "POSTGRES", "APNS · FCM"],
  },
  {
    id: "05",
    i18nKey: "hospitalQps",
    stack: ["NEXT.JS 15", "POSTGRES", "TIMESCALE", "RECHARTS", "FHIR · HL7"],
  },
] as const;

export type Module = (typeof MODULES)[number];
