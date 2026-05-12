"use client";

import { type ReactNode } from "react";

import { useContactDialog } from "./ContactDialog";

interface ContactTriggerProps {
  children: ReactNode;
  className?: string;
}

export function ContactTrigger({ children, className }: ContactTriggerProps) {
  const { open } = useContactDialog();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
