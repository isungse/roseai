import {
  Archive,
  Award,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CalendarClock,
  CalendarDays,
  ChartLine,
  CheckSquare,
  ClipboardList,
  Contact,
  DatabaseBackup,
  DoorOpen,
  FileCheck,
  FileClock,
  FileCog,
  FilePen,
  FileSignature,
  FileText,
  FolderClosed,
  FolderOpen,
  Hash,
  Headset,
  Inbox,
  LayoutDashboard,
  LayoutGrid,
  LayoutTemplate,
  ListTodo,
  Lock,
  Mail,
  MailOpen,
  Megaphone,
  MessageSquare,
  MonitorSmartphone,
  Network,
  Newspaper,
  RefreshCw,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  Users,
  Vote,
  type LucideIcon,
} from "lucide-react";

// Locale-invariant product metadata for the site. Human-readable strings live
// under `works.*` in messages/ko.json (Korean-only, see i18n.md). Icons mirror
// the product's own sidebar so the tour reads as the real menu.

/** Latin letters only, by owner decision — never transliterated. */
export const WORKS_PRODUCT_NAME = "ROSE-AI WORKS";

export const WORKS_FEATURE_SLUGS = [
  "approval",
  "messenger",
  "attendance",
  "board",
  "support",
] as const;

export type WorksFeatureSlug = (typeof WORKS_FEATURE_SLUGS)[number];

// Site paths. The product is the whole site, so the feature pages sit at the
// top level; every link is built here rather than spelled out in components.
export const TOUR_HREF = "/tour";

export function featureHref(slug: WorksFeatureSlug): string {
  return `/${slug}`;
}

/** Deep link into the tour with one menu selected (`TourExplorer` reads `?menu=`). */
export function tourMenuHref(menuKey: string): string {
  return `${TOUR_HREF}?menu=${menuKey}`;
}

export interface WorksFeature {
  slug: WorksFeatureSlug;
  icon: LucideIcon;
  /** Desktop capture shown in the feature hero (see spec §8 for sizes). */
  hero: string;
  /** Tab keys → `works.features.<slug>.tabs.<key>` and an image per tab. */
  tabs: readonly { key: string; image: string }[];
  /** Deep-dive sections → `works.features.<slug>.sections.<key>`. */
  sections: readonly { key: string; image: string }[];
}

export const WORKS_FEATURES: readonly WorksFeature[] = [
  {
    slug: "approval",
    icon: FileSignature,
    hero: "/images/works/approval/01-hero.jpg",
    tabs: [
      { key: "builder", image: "/images/works/approval/02-builder.jpg" },
      { key: "line", image: "/images/works/approval/03-line.jpg" },
      { key: "preapprove", image: "/images/works/approval/04-preapprove.jpg" },
      { key: "bulk", image: "/images/works/approval/05-bulk.jpg" },
      { key: "proofread", image: "/images/works/approval/06-proofread.jpg" },
    ],
    sections: [
      { key: "numbering", image: "/images/works/approval/07-numbering.jpg" },
      { key: "backup", image: "/images/works/approval/08-backup.jpg" },
      { key: "stats", image: "/images/works/approval/09-stats.jpg" },
    ],
  },
  {
    slug: "messenger",
    icon: MessageSquare,
    hero: "/images/works/messenger/01-hero.jpg",
    tabs: [
      { key: "rooms", image: "/images/works/messenger/02-rooms.jpg" },
      { key: "files", image: "/images/works/messenger/03-files.jpg" },
      { key: "deletion", image: "/images/works/messenger/04-deletion.jpg" },
      { key: "badges", image: "/images/works/messenger/05-badges.jpg" },
      { key: "desktop", image: "/images/works/messenger/06-desktop.jpg" },
    ],
    sections: [
      { key: "orgchart", image: "/images/works/messenger/07-orgchart.jpg" },
      { key: "retention", image: "/images/works/messenger/08-retention.jpg" },
      { key: "mobile", image: "/images/works/messenger/09-mobile.jpg" },
    ],
  },
  {
    slug: "attendance",
    icon: CalendarClock,
    hero: "/images/works/attendance/01-hero.jpg",
    tabs: [
      { key: "schedule", image: "/images/works/attendance/02-schedule.jpg" },
      { key: "leave", image: "/images/works/attendance/03-leave.jpg" },
      { key: "wifi", image: "/images/works/attendance/04-wifi.jpg" },
      { key: "records", image: "/images/works/attendance/05-records.jpg" },
    ],
    sections: [
      { key: "manager", image: "/images/works/attendance/06-manager.jpg" },
      { key: "checkin", image: "/images/works/attendance/07-checkin.jpg" },
      { key: "exceptions", image: "/images/works/attendance/08-exceptions.jpg" },
    ],
  },
  {
    slug: "board",
    icon: Newspaper,
    hero: "/images/works/board/01-hero.jpg",
    tabs: [
      { key: "boards", image: "/images/works/board/02-boards.jpg" },
      { key: "notice", image: "/images/works/board/03-notice.jpg" },
      { key: "editor", image: "/images/works/board/04-editor.jpg" },
      { key: "comments", image: "/images/works/board/05-comments.jpg" },
      { key: "moderators", image: "/images/works/board/06-moderators.jpg" },
    ],
    sections: [
      { key: "writing", image: "/images/works/board/07-writing.jpg" },
      { key: "admin", image: "/images/works/board/08-admin.jpg" },
      { key: "print", image: "/images/works/board/09-print.jpg" },
    ],
  },
  {
    slug: "support",
    icon: Headset,
    hero: "/images/works/support/01-hero.jpg",
    tabs: [
      { key: "intake", image: "/images/works/support/02-intake.jpg" },
      { key: "routing", image: "/images/works/support/03-routing.jpg" },
      { key: "badge", image: "/images/works/support/04-badge.jpg" },
      { key: "status", image: "/images/works/support/05-status.jpg" },
      { key: "manuals", image: "/images/works/support/06-manuals.jpg" },
    ],
    sections: [
      { key: "detail", image: "/images/works/support/07-detail.jpg" },
      { key: "assignee", image: "/images/works/support/08-assignee.jpg" },
      { key: "tasks", image: "/images/works/support/09-tasks.jpg" },
    ],
  },
];

export function findWorksFeature(slug: string): WorksFeature | undefined {
  return WORKS_FEATURES.find((f) => f.slug === slug);
}

export interface WorksMenuItem {
  /** → `works.menu.items.<key>.{label,blurb}` */
  key: string;
  icon: LucideIcon;
  /** Static snapshot slug under /demos/works/<slug>/index.html; `null` = admin-only panel. */
  snapshot: string | null;
  /** External system reached through the product (SSO / portal) — label only. */
  external?: true;
  /** Core feature with its own detail page. */
  feature?: WorksFeatureSlug;
}

export interface WorksMenuGroup {
  /** → `works.menu.groups.<key>` */
  key: string;
  icon: LucideIcon | null;
  adminOnly?: true;
  items: readonly WorksMenuItem[];
}

// Order and grouping follow the product sidebar (AppLayout.tsx, 2026-10-27).
export const WORKS_MENU: readonly WorksMenuGroup[] = [
  {
    key: "home",
    icon: null,
    items: [{ key: "dashboard", icon: LayoutDashboard, snapshot: "dashboard" }],
  },
  {
    key: "approval",
    icon: FileSignature,
    items: [
      { key: "approvalInbox", icon: Inbox, snapshot: "approval-inbox", feature: "approval" },
      { key: "approvalMine", icon: FolderClosed, snapshot: "approval-my-documents" },
      { key: "approvalDrafts", icon: FilePen, snapshot: "approval-drafts" },
    ],
  },
  {
    key: "certificates",
    icon: FileCheck,
    items: [
      { key: "employmentCert", icon: BadgeCheck, snapshot: "certificate-employment" },
      { key: "incomeTax", icon: FileText, snapshot: "income-tax" },
    ],
  },
  {
    key: "attendance",
    icon: CalendarClock,
    items: [
      { key: "schedule", icon: CalendarDays, snapshot: "attendance-schedule", feature: "attendance" },
      { key: "attendanceManage", icon: ClipboardList, snapshot: "attendance-manage" },
    ],
  },
  {
    key: "drawer",
    icon: Briefcase,
    items: [
      { key: "todo", icon: CheckSquare, snapshot: "todo" },
      { key: "businessCards", icon: Contact, snapshot: "business-cards" },
      { key: "dispatches", icon: Send, snapshot: "document-dispatches" },
      { key: "receipts", icon: MailOpen, snapshot: "document-receipts" },
      { key: "sharedDocs", icon: FolderOpen, snapshot: "shared-documents" },
    ],
  },
  {
    key: "boards",
    icon: Newspaper,
    items: [
      { key: "noticeBoard", icon: Megaphone, snapshot: "board-notice", feature: "board" },
      { key: "departmentBoard", icon: Archive, snapshot: "board-department" },
    ],
  },
  {
    key: "community",
    icon: Users,
    items: [
      { key: "calendar", icon: Calendar, snapshot: "calendar" },
      { key: "reservations", icon: DoorOpen, snapshot: "reservations" },
      { key: "departmentTasks", icon: ListTodo, snapshot: "department-tasks" },
      { key: "support", icon: Headset, snapshot: "support", feature: "support" },
      { key: "manuals", icon: BookOpen, snapshot: "manuals" },
      { key: "polls", icon: Vote, snapshot: "polls" },
      { key: "messenger", icon: MessageSquare, snapshot: "messenger", feature: "messenger" },
      { key: "mail", icon: Mail, snapshot: null, external: true },
      { key: "portal", icon: LayoutGrid, snapshot: null, external: true },
    ],
  },
  {
    key: "statistics",
    icon: ChartLine,
    items: [{ key: "statistics", icon: BarChart3, snapshot: "statistics" }],
  },
  {
    key: "orgAdmin",
    icon: Settings,
    adminOnly: true,
    items: [
      { key: "companies", icon: Building2, snapshot: null },
      { key: "departments", icon: Network, snapshot: "admin-departments" },
      { key: "positions", icon: Award, snapshot: null },
      { key: "users", icon: Users, snapshot: "admin-users" },
      { key: "access", icon: ShieldCheck, snapshot: "admin-access" },
      { key: "accessSecurity", icon: MonitorSmartphone, snapshot: null },
      { key: "securitySettings", icon: Lock, snapshot: "admin-security-settings" },
    ],
  },
  {
    key: "approvalAdmin",
    icon: FileCog,
    adminOnly: true,
    items: [
      { key: "approvalDocuments", icon: FileText, snapshot: null },
      { key: "deletedDocuments", icon: Trash2, snapshot: null },
      { key: "approvalTemplates", icon: LayoutTemplate, snapshot: "admin-approval-templates" },
      { key: "numbering", icon: Hash, snapshot: null },
      { key: "backups", icon: DatabaseBackup, snapshot: null },
      { key: "retention", icon: FileClock, snapshot: null },
    ],
  },
  {
    key: "generalAdmin",
    icon: SlidersHorizontal,
    adminOnly: true,
    items: [
      { key: "boardAdmin", icon: Settings, snapshot: "admin-boards" },
      { key: "releaseNotes", icon: RefreshCw, snapshot: null },
      { key: "meetingRooms", icon: DoorOpen, snapshot: null },
    ],
  },
];

/** Screens the hub and tour show before the feature pages: hub hero + value sections. */
export const WORKS_HUB_IMAGES = {
  heroDesktop: "/images/works/hub/01-dashboard.jpg",
  heroMobile: "/images/works/hub/02-dashboard-mobile.jpg",
  collab: "/images/works/hub/03-messenger.jpg",
  flow: "/images/works/hub/04-approval.jpg",
  hr: "/images/works/hub/05-attendance.jpg",
  tailored: "/images/works/hub/06-admin-templates.jpg",
  sidebar: "/images/works/hub/07-sidebar.jpg",
} as const;
