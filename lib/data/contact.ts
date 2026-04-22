export type ContactField =
  | { name: "company"; kind: "input"; type: "text" }
  | { name: "email"; kind: "input"; type: "email" }
  | { name: "message"; kind: "textarea" };

export const CONTACT_FIELDS: readonly ContactField[] = [
  { name: "company", kind: "input", type: "text" },
  { name: "email", kind: "input", type: "email" },
  { name: "message", kind: "textarea" },
] as const;

export type ContactFieldName = ContactField["name"];
