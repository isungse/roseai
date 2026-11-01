import "server-only";

import homeHero from "@/public/images/home-hero.jpg";
import approvalHero from "@/public/images/works/approval/01-hero.jpg";
import approvalBuilder from "@/public/images/works/approval/02-builder.jpg";
import approvalLine from "@/public/images/works/approval/03-line.jpg";
import approvalProgress from "@/public/images/works/approval/04-progress.jpg";
import approvalNumbering from "@/public/images/works/approval/07-numbering.jpg";
import attendanceHero from "@/public/images/works/attendance/01-hero.jpg";
import attendanceSchedule from "@/public/images/works/attendance/02-schedule.jpg";
import attendanceLeave from "@/public/images/works/attendance/03-leave.jpg";
import attendanceWifi from "@/public/images/works/attendance/04-wifi.jpg";
import attendanceManager from "@/public/images/works/attendance/06-manager.jpg";
import boardHero from "@/public/images/works/board/01-hero.jpg";
import boardBoards from "@/public/images/works/board/02-boards.jpg";
import boardNotice from "@/public/images/works/board/03-notice.jpg";
import boardComments from "@/public/images/works/board/05-comments.jpg";
import boardWriting from "@/public/images/works/board/07-writing.jpg";
import hubDashboard from "@/public/images/works/hub/01-dashboard.jpg";
import hubDashboardMobile from "@/public/images/works/hub/02-dashboard-mobile.jpg";
import hubMessenger from "@/public/images/works/hub/03-messenger.jpg";
import hubApproval from "@/public/images/works/hub/04-approval.jpg";
import hubAttendance from "@/public/images/works/hub/05-attendance.jpg";
import hubTemplates from "@/public/images/works/hub/06-admin-templates.jpg";
import hubSidebar from "@/public/images/works/hub/07-sidebar.jpg";
import messengerHero from "@/public/images/works/messenger/01-hero.jpg";
import messengerRooms from "@/public/images/works/messenger/02-rooms.jpg";
import messengerFiles from "@/public/images/works/messenger/03-files.jpg";
import messengerDesktop from "@/public/images/works/messenger/06-desktop.jpg";
import messengerMobile from "@/public/images/works/messenger/09-mobile.jpg";
import supportHero from "@/public/images/works/support/01-hero.jpg";
import supportIntake from "@/public/images/works/support/02-intake.jpg";
import supportRouting from "@/public/images/works/support/03-routing.jpg";
import supportStatus from "@/public/images/works/support/05-status.jpg";
import supportDetail from "@/public/images/works/support/07-detail.jpg";

import type { StaticImageData } from "next/image";

export type WorksImageKind = "desktop" | "mobile" | "sidebar" | "panel" | "artwork";

interface WorksImageMetadata {
  asset: StaticImageData;
  kind: WorksImageKind;
}

// Static imports keep intrinsic dimensions in sync with every capture replacement.
// Only dimensions and the original public URL cross the server boundary.
export const WORKS_IMAGE_METADATA: Readonly<
  Record<string, WorksImageMetadata | undefined>
> = {
  "/images/home-hero.jpg": { asset: homeHero, kind: "artwork" },
  "/images/works/approval/01-hero.jpg": { asset: approvalHero, kind: "desktop" },
  "/images/works/approval/02-builder.jpg": { asset: approvalBuilder, kind: "desktop" },
  "/images/works/approval/03-line.jpg": { asset: approvalLine, kind: "desktop" },
  "/images/works/approval/04-progress.jpg": { asset: approvalProgress, kind: "desktop" },
  "/images/works/approval/07-numbering.jpg": { asset: approvalNumbering, kind: "desktop" },
  "/images/works/attendance/01-hero.jpg": { asset: attendanceHero, kind: "desktop" },
  "/images/works/attendance/02-schedule.jpg": { asset: attendanceSchedule, kind: "desktop" },
  "/images/works/attendance/03-leave.jpg": { asset: attendanceLeave, kind: "desktop" },
  "/images/works/attendance/04-wifi.jpg": { asset: attendanceWifi, kind: "mobile" },
  "/images/works/attendance/06-manager.jpg": { asset: attendanceManager, kind: "desktop" },
  "/images/works/board/01-hero.jpg": { asset: boardHero, kind: "desktop" },
  "/images/works/board/02-boards.jpg": { asset: boardBoards, kind: "desktop" },
  "/images/works/board/03-notice.jpg": { asset: boardNotice, kind: "desktop" },
  "/images/works/board/05-comments.jpg": { asset: boardComments, kind: "desktop" },
  "/images/works/board/07-writing.jpg": { asset: boardWriting, kind: "desktop" },
  "/images/works/hub/01-dashboard.jpg": { asset: hubDashboard, kind: "desktop" },
  "/images/works/hub/02-dashboard-mobile.jpg": { asset: hubDashboardMobile, kind: "mobile" },
  "/images/works/hub/03-messenger.jpg": { asset: hubMessenger, kind: "desktop" },
  "/images/works/hub/04-approval.jpg": { asset: hubApproval, kind: "desktop" },
  "/images/works/hub/05-attendance.jpg": { asset: hubAttendance, kind: "desktop" },
  "/images/works/hub/06-admin-templates.jpg": { asset: hubTemplates, kind: "desktop" },
  "/images/works/hub/07-sidebar.jpg": { asset: hubSidebar, kind: "sidebar" },
  "/images/works/messenger/01-hero.jpg": { asset: messengerHero, kind: "desktop" },
  "/images/works/messenger/02-rooms.jpg": { asset: messengerRooms, kind: "panel" },
  "/images/works/messenger/03-files.jpg": { asset: messengerFiles, kind: "desktop" },
  "/images/works/messenger/06-desktop.jpg": { asset: messengerDesktop, kind: "desktop" },
  "/images/works/messenger/09-mobile.jpg": { asset: messengerMobile, kind: "mobile" },
  "/images/works/support/01-hero.jpg": { asset: supportHero, kind: "desktop" },
  "/images/works/support/02-intake.jpg": { asset: supportIntake, kind: "desktop" },
  "/images/works/support/03-routing.jpg": { asset: supportRouting, kind: "desktop" },
  "/images/works/support/05-status.jpg": { asset: supportStatus, kind: "desktop" },
  "/images/works/support/07-detail.jpg": { asset: supportDetail, kind: "desktop" },
};
