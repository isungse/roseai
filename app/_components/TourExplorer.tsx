"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";

import { ArrowLeft, ExternalLink, Lock } from "lucide-react";

import { cn } from "@/lib/utils";

export interface TourItemView {
  key: string;
  label: string;
  blurb: string;
  icon: ReactNode;
  /** `/demos/works/<slug>/index.html`, or null for admin-only / external menus. */
  snapshotUrl: string | null;
  external: boolean;
  /** Whether the snapshot file exists yet (checked at build time). */
  available: boolean;
  featureHref: string | null;
}

export interface TourGroupView {
  key: string;
  label: string;
  icon: ReactNode | null;
  adminOnly: boolean;
  items: TourItemView[];
}

export interface TourLabels {
  sidebar: string;
  role: string;
  roleEmployee: string;
  roleAdmin: string;
  previewLabel: string;
  openNewTab: string;
  external: string;
  adminPanelTitle: string;
  adminPanelBody: string;
  pending: string;
  back: string;
  /** Contains `{label}`. */
  frameTitle: string;
  detail: string;
}

interface TourExplorerProps {
  groups: TourGroupView[];
  labels: TourLabels;
  defaultKey: string;
}

type Role = "employee" | "admin";

const ROLES: readonly Role[] = ["employee", "admin"];

export function TourExplorer({ groups, labels, defaultKey }: TourExplorerProps) {
  const requested = useSearchParams().get("menu");

  const entries = useMemo(
    () =>
      groups.flatMap((g) =>
        g.items.map((item) => ({ item, admin: g.adminOnly })),
      ),
    [groups],
  );
  const initial =
    entries.find((e) => e.item.key === requested) ??
    entries.find((e) => e.item.key === defaultKey) ??
    entries[0];

  const [role, setRole] = useState<Role>(initial.admin ? "admin" : "employee");
  const [selectedKey, setSelectedKey] = useState(initial.item.key);
  // On phones the menu and the preview are two screens; a deep link opens the preview.
  const [mobileDetail, setMobileDetail] = useState(requested !== null);

  const visibleGroups = groups.filter((g) => role === "admin" || !g.adminOnly);
  const selected =
    entries.find((e) => e.item.key === selectedKey)?.item ?? initial.item;

  function switchRole(next: Role) {
    setRole(next);
    const current = entries.find((e) => e.item.key === selectedKey);
    if (next === "employee" && current?.admin) setSelectedKey(defaultKey);
  }

  function select(key: string) {
    setSelectedKey(key);
    setMobileDetail(true);
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
                        type="button"
                        aria-current={on ? "true" : undefined}
                        onClick={() => select(item.key)}
                        className={cn(
                          "flex min-h-10 w-full items-center gap-3 border-l-2 px-3 text-left text-sm transition-colors",
                          group.icon && "pl-8",
                          on
                            ? "border-brand bg-brand/5 font-semibold text-brand"
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

      <div className={cn(!mobileDetail && "hidden lg:block")}>
        <button
          type="button"
          onClick={() => setMobileDetail(false)}
          className="mb-4 inline-flex items-center gap-2 text-sm text-g500 hover:text-ink lg:hidden"
        >
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
          {labels.back}
        </button>
        <TourPane item={selected} labels={labels} />
      </div>
    </div>
  );
}

function TourPane({ item, labels }: { item: TourItemView; labels: TourLabels }) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-h3 font-bold tracking-[-0.01em]">
            {item.icon}
            {item.label}
          </h2>
          <p className="mt-1 text-body text-g500">{item.blurb}</p>
        </div>
        {item.featureHref && (
          <Link
            href={item.featureHref}
            className="mono cap inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.06em] hover:text-brand"
          >
            {labels.detail} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>

      {/* Paper, not g50: the empty-state copy is g500 and must keep 4.5:1. */}
      <div className="mt-5 overflow-hidden rounded-lg border border-hair bg-paper shadow-md">
        {item.snapshotUrl && item.available ? (
          <>
            <div className="flex items-center justify-between border-b border-hair bg-paper px-4 py-2">
              <span className="mono cap text-[11px] font-medium tracking-[0.06em] text-g500">
                {labels.previewLabel}
              </span>
              <a
                href={item.snapshotUrl}
                target="_blank"
                rel="noreferrer"
                className="mono cap inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.06em] hover:text-brand"
              >
                {labels.openNewTab}
                <ExternalLink size={12} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
            <iframe
              key={item.key}
              src={item.snapshotUrl}
              title={labels.frameTitle.replace("{label}", item.label)}
              loading="lazy"
              className="block aspect-[16/10] w-full bg-paper"
            />
          </>
        ) : (
          <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 px-6 text-center">
            {item.snapshotUrl === null && !item.external ? (
              <>
                <Lock size={24} strokeWidth={1.75} aria-hidden="true" className="text-g500" />
                <p className="text-body font-semibold">{labels.adminPanelTitle}</p>
                <p className="text-sm text-g500">{labels.adminPanelBody}</p>
              </>
            ) : (
              <p className="text-sm text-g500">
                {item.external ? labels.external : labels.pending}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
