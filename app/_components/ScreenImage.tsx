import Image from "next/image";

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
        className="block h-auto w-full"
      />
    </figure>
  );
}
