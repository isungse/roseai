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
