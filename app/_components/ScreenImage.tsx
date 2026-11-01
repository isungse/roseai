import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { WorksImage } from "@/lib/works/images";

interface ScreenImageProps {
  image: WorksImage;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

// Product screens are shown as-is inside a hairline card (works spec §9);
// the brand never tints the capture itself.
export function ScreenImage({
  image,
  alt,
  sizes,
  priority,
  className,
}: ScreenImageProps) {
  const t = useTranslations("works.screenImage");
  const isCompact = image.kind === "mobile" || image.kind === "panel";
  const isSidebar = image.kind === "sidebar";
  const imageSizes = sizes ?? (
    isCompact ? "288px" : isSidebar ? "192px" : "(min-width: 1360px) 608px, (min-width: 1024px) 45vw, calc(100vw - 56px)"
  );

  return (
    <figure
      className={cn(
        "relative min-w-0 rounded-lg border border-hair bg-paper shadow-sm",
        isCompact && "mx-auto w-full max-w-72",
        isSidebar && "mx-auto w-full max-w-48",
        className,
      )}
    >
      <Link
        href={image.src}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
        aria-label={t("openOriginalLabel", { name: alt })}
        className="group block overflow-hidden rounded-[inherit]"
      >
        <Image
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          sizes={imageSizes}
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : undefined}
          className="block h-auto w-full"
        />
        <span className="flex min-h-11 items-center justify-end gap-2 border-t border-hair px-4 py-2 text-sm font-medium text-g500 transition-colors group-hover:text-ink">
          {t("openOriginal")}
          <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
        </span>
      </Link>
    </figure>
  );
}
