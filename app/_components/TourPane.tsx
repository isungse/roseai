import Link from "next/link";
import type { ReactNode } from "react";

import { ExternalLink, Lock } from "lucide-react";

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

interface TourPaneProps {
  item: TourItemView;
  labels: TourLabels;
}

export function TourPane({ item, labels }: TourPaneProps) {
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
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hair bg-paper px-4 py-3">
              <span className="text-xs font-medium text-g500">
                {labels.previewLabel}
              </span>
              <a
                href={item.snapshotUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold hover:text-brand"
              >
                {labels.openNewTab}
                <ExternalLink size={16} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
            <iframe
              key={item.key}
              src={item.snapshotUrl}
              title={labels.frameTitle.replace("{label}", item.label)}
              loading="lazy"
              className="block h-128 w-full bg-paper sm:h-144 lg:aspect-[16/10] lg:h-auto"
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
