"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

import { ArrowLeft, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

import { TourPane } from "./TourPane";
import type { TourGroupView, TourLabels } from "./TourPane";
export type { TourGroupView, TourItemView, TourLabels } from "./TourPane";

interface TourUrlState {
  menu: string | null;
  role: string | null;
  showMenu: boolean;
}

const DEFAULT_URL: TourUrlState = { menu: null, role: null, showMenu: false };

interface TourExplorerProps {
  groups: TourGroupView[];
  labels: TourLabels;
  defaultKey: string;
  url?: TourUrlState;
}

type Role = "employee" | "admin";

const ROLES: readonly Role[] = ["employee", "admin"];

function updateTourUrl(values: Record<string, string | null>) {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(values)) {
    if (value === null) url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  }
  if (url.href !== window.location.href) {
    // Next's native History integration updates useSearchParams without refetching the static tour.
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }
}

/** The URL owns selection, role and mobile view, including browser Back/Forward. */
export function TourExplorerFromUrl(props: Omit<TourExplorerProps, "url">) {
  const params = useSearchParams();
  return (
    <TourExplorer
      {...props}
      url={{ menu: params.get("menu"), role: params.get("role"), showMenu: params.get("view") === "menu" }}
    />
  );
}

export function TourExplorer({ groups, labels, defaultKey, url = DEFAULT_URL }: TourExplorerProps) {
  const { menu: requested, role: requestedRole, showMenu } = url;
  const entries = useMemo(
    () =>
      groups.flatMap((g) =>
        g.items.map((item) => ({ item, admin: g.adminOnly })),
      ),
    [groups],
  );
  const selectedEntry =
    entries.find((e) => e.item.key === requested) ??
    entries.find((e) => e.item.key === defaultKey) ??
    entries[0];

  const role: Role = selectedEntry.admin || requestedRole === "admin" ? "admin" : "employee";
  const selected = selectedEntry.item;
  const mobileDetail = requested !== null && !showMenu;
  const visibleGroups = groups.filter((g) => role === "admin" || !g.adminOnly);
  const previewRef = useRef<HTMLDivElement>(null);
  const selectedMenuRef = useRef<HTMLButtonElement>(null);
  const pendingFocus = useRef<"preview" | "menu" | null>(null);

  useEffect(() => {
    const target = pendingFocus.current === "preview" ? previewRef.current : selectedMenuRef.current;
    if (pendingFocus.current && window.matchMedia("(max-width: 1023px)").matches) {
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ block: "nearest" });
    }
    pendingFocus.current = null;
  }, [requested, requestedRole, showMenu]);

  function switchRole(next: Role) {
    updateTourUrl({
      role: next === "admin" ? "admin" : null,
      menu: next === "employee" && selectedEntry.admin ? defaultKey : requested,
    });
  }

  function select(key: string) {
    pendingFocus.current = "preview";
    updateTourUrl({ menu: key, role: role === "admin" ? "admin" : null, view: null });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
      <aside className={cn(mobileDetail && "hidden lg:block")}>
        <div
          role="group"
          aria-label={labels.role}
          className="mb-4 grid grid-cols-2 rounded-md border border-hair p-1 text-sm"
        >
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={role === r}
              onClick={() => switchRole(r)}
              className={cn(
                "rounded-sm py-2 font-medium transition-colors",
                role === r ? "bg-ink text-paper" : "text-g500 hover:text-ink",
              )}
            >
              {r === "employee" ? labels.roleEmployee : labels.roleAdmin}
            </button>
          ))}
        </div>

        {/* Replica of the product sidebar: group header rows, indented items,
            a brand bar on the selected row (dimensions transcribed to tokens). */}
        <nav
          aria-label={labels.sidebar}
          className="rounded-lg border border-hair bg-paper py-2"
        >
          {visibleGroups.map((group) => (
            <div key={group.key} className="px-2 py-1">
              {group.icon && (
                <div className="flex min-h-11 items-center gap-3 px-3 text-sm font-semibold">
                  {group.icon}
                  <span>{group.label}</span>
                </div>
              )}
              <ul>
                {group.items.map((item) => {
                  const on = item.key === selected.key;
                  return (
                    <li key={item.key}>
                      <button
                        ref={on ? selectedMenuRef : undefined}
                        type="button"
                        aria-current={on ? "true" : undefined}
                        onClick={() => select(item.key)}
                        className={cn(
                          "flex min-h-10 w-full items-center gap-3 border-l-2 px-3 text-left text-sm transition-colors",
                          group.icon && "pl-8",
                          // Brand text on the brand tint is 4.2:1 — the bar and the tint mark the row, the text stays ink.
                          on
                            ? "border-brand bg-brand/5 font-semibold text-ink"
                            : "border-transparent font-medium text-ink hover:bg-g50",
                        )}
                      >
                        {item.icon}
                        <span className="min-w-0 flex-1">{item.label}</span>
                        {item.external && (
                          <ExternalLink
                            size={16}
                            strokeWidth={1.75}
                            aria-hidden="true"
                            className="text-g500"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div
        ref={previewRef}
        tabIndex={-1}
        className={cn("scroll-mt-32 lg:scroll-mt-20", !mobileDetail && "hidden lg:block")}
      >
        <button
          type="button"
          onClick={() => {
            pendingFocus.current = "menu";
            updateTourUrl({ view: "menu" });
          }}
          className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm text-g500 hover:text-ink lg:hidden"
        >
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
          {labels.back}
        </button>
        <TourPane item={selected} labels={labels} />
      </div>
    </div>
  );
}
