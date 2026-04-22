export const CONTACT_META_LABELS = {
  office: "OFFICE",
  mail: "MAIL",
  response: "RESPONSE",
  languages: "LANGUAGES",
} as const;

export const CONTACT_META_VALUES = {
  office: "SEOUL · GANGNAM",
  response: "< 24 HRS",
  languages: "KO · EN · JA",
} as const;

export const CONTACT_FIELDS = [
  { name: "company", idx: "01", label: "01 / COMPANY · 회사", type: "text" },
  { name: "email", idx: "02", label: "02 / EMAIL · 이메일", type: "email" },
  {
    name: "message",
    idx: "03",
    label: "03 / MESSAGE · 문의 내용",
    type: "textarea",
  },
] as const;

export const CONTACT_SEND_LABEL = "SEND";
export const CONTACT_PRIVACY_LINK = "/privacy";

export type ContactFieldName = (typeof CONTACT_FIELDS)[number]["name"];
