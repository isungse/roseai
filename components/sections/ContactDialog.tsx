"use client";

import { useTranslations } from "next-intl";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { ContactForm } from "./ContactForm";

type Ctx = { open: () => void };
const ContactDialogContext = createContext<Ctx | null>(null);

export function useContactDialog(): Ctx {
  const ctx = useContext(ContactDialogContext);
  if (!ctx) {
    throw new Error(
      "useContactDialog must be used within ContactDialogProvider",
    );
  }
  return ctx;
}

export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactDialogContext.Provider value={{ open }}>
      {children}
      {isOpen && <DialogShell onClose={close} />}
    </ContactDialogContext.Provider>
  );
}

function DialogShell({ onClose }: { onClose: () => void }) {
  const t = useTranslations("contact");
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // showModal() activates native modal: backdrop, focus trap, ESC-to-close.
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    // m-auto restores center positioning: native <dialog> relies on UA
    // `margin: auto` with `inset: 0`, which Tailwind v4 preflight resets.
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        // Backdrop click: when the target is the dialog element itself
        // (not a descendant), the click landed on the ::backdrop area.
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="contact-dialog-title"
      className="m-auto w-[min(560px,92vw)] max-h-[90vh] overflow-y-auto rounded-lg bg-paper p-0 text-ink shadow-lg backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-8 md:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label={t("closeLabel")}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-g500 transition-colors hover:bg-g50 hover:text-ink md:right-4 md:top-4"
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            ×
          </span>
        </button>

        <p
          id="contact-dialog-title"
          className="mono cap mb-8 text-[11px] font-medium tracking-[0.08em] text-g500"
        >
          {t("dialogLabel")}
        </p>

        <ContactForm />
      </div>
    </dialog>
  );
}
