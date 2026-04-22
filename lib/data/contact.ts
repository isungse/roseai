export const CONTACT_FIELDS = [
  { name: "company", type: "text" },
  { name: "email", type: "email" },
  { name: "message", type: "textarea" },
] as const;

export type ContactFieldName = (typeof CONTACT_FIELDS)[number]["name"];
