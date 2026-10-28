import { featureHref, WORKS_MENU } from "@/lib/data/works";
import { snapshotAvailable } from "@/lib/works/images";

import type { TourGroupView } from "./TourExplorer";

type Translate = (key: string) => string;

// Builds the serializable view model for the client explorer: strings are
// resolved here and icons are rendered to elements so no component
// references cross the client boundary.
export function buildTourGroups(t: Translate): TourGroupView[] {
  return WORKS_MENU.map((group) => {
    const GroupIcon = group.icon;
    return {
      key: group.key,
      label: t(`menu.groups.${group.key}`),
      icon: GroupIcon ? (
        <GroupIcon size={20} strokeWidth={1.75} aria-hidden="true" />
      ) : null,
      adminOnly: group.adminOnly === true,
      items: group.items.map((item) => {
        const Icon = item.icon;
        return {
          key: item.key,
          label: t(`menu.items.${item.key}.label`),
          blurb: t(`menu.items.${item.key}.blurb`),
          icon: (
            <Icon
              size={20}
              strokeWidth={1.75}
              aria-hidden="true"
              className="shrink-0"
            />
          ),
          snapshotUrl: item.snapshot
            ? `/demos/works/${item.snapshot}/index.html`
            : null,
          external: item.external === true,
          available: item.snapshot ? snapshotAvailable(item.snapshot) : false,
          featureHref: item.feature ? featureHref(item.feature) : null,
        };
      }),
    };
  });
}
