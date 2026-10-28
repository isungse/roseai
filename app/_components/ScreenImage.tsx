import Image from "next/image";
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
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  className,
}: ScreenImageProps) {
  const t = useTranslations("works.common");

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-lg border border-hair bg-g50 shadow-md",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        // SVG placeholders bypass the optimizer; real JPEG captures go through it.
        unoptimized={image.placeholder}
        className="block h-auto w-full"
      />
      {image.placeholder && (
        <figcaption className="mono cap absolute left-3 top-3 rounded-sm border border-hair bg-paper/90 px-2 py-1 text-[11px] font-medium tracking-[0.04em] text-g500">
          {t("placeholder")}
        </figcaption>
      )}
    </figure>
  );
}
