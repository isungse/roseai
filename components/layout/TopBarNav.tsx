"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface TopBarLink {
  href: string;
  label: string;
}

interface TopBarNavProps {
  /** Accessible name of the product nav landmark (i18n). */
  label: string;
  links: readonly TopBarLink[];
  previousLabel: string;
  nextLabel: string;
}

export function TopBarNav({ label, links, previousLabel, nextLabel }: TopBarNavProps) {
  const pathname = usePathname();
  const listId = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ before: false, after: false });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    function updateEdges() {
      if (!list) return;
      const before = list.scrollLeft > 1;
      const after = list.scrollLeft + list.clientWidth < list.scrollWidth - 1;
      setEdges((current) => current.before === before && current.after === after ? current : { before, after });
    }

    function revealCurrent() {
      if (!list || list.scrollWidth <= list.clientWidth) return;
      const current = list.querySelector<HTMLElement>('[aria-current="page"]');
      if (!current) return;
      const item = current.getBoundingClientRect();
      const viewport = list.getBoundingClientRect();
      list.scrollLeft += item.left - viewport.left - (viewport.width - item.width) / 2;
    }

    const observer = new ResizeObserver(() => {
      revealCurrent();
      updateEdges();
    });
    observer.observe(list);
    list.addEventListener("scroll", updateEdges, { passive: true });
    revealCurrent();
    return () => {
      observer.disconnect();
      list.removeEventListener("scroll", updateEdges);
    };
  }, [pathname]);

  function scrollMenus(direction: number) {
    const list = listRef.current;
    if (!list) return;
    list.scrollBy({
      left: direction * list.clientWidth * 0.7,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <nav aria-label={label} className="relative min-w-0 border-t border-hair lg:border-t-0">
      <ul
        id={listId}
        ref={listRef}
        className="hide-scrollbar flex h-12 items-center gap-1 overflow-x-auto px-12 lg:h-16 lg:overflow-visible lg:px-0"
      >
        {links.map((link) => {
          const on =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                aria-current={on ? "page" : undefined}
                onFocus={(event) => {
                  const list = listRef.current;
                  if (!list || list.scrollWidth <= list.clientWidth) return;
                  const item = event.currentTarget.getBoundingClientRect();
                  const viewport = list.getBoundingClientRect();
                  list.scrollLeft += item.left - viewport.left - (viewport.width - item.width) / 2;
                }}
                className={cn(
                  "inline-flex h-12 items-center border-b-2 px-3 text-sm font-medium transition-colors lg:h-16",
                  on
                    ? "border-brand text-ink"
                    : "border-transparent text-g500 hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        aria-label={previousLabel}
        aria-controls={listId}
        disabled={!edges.before}
        onClick={() => scrollMenus(-1)}
        className={cn("absolute inset-y-0 left-0 flex w-10 items-center justify-center bg-paper text-ink lg:hidden", !edges.before && "invisible")}
      >
        <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        aria-controls={listId}
        disabled={!edges.after}
        onClick={() => scrollMenus(1)}
        className={cn("absolute inset-y-0 right-0 flex w-10 items-center justify-center bg-paper text-ink lg:hidden", !edges.after && "invisible")}
      >
        <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" />
      </button>
    </nav>
  );
}
