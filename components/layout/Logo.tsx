import { Link } from "@/i18n/navigation";

interface LogoProps {
  size?: "sm" | "md";
}

export function Logo({ size = "md" }: LogoProps) {
  const mark = size === "sm" ? "h-4 w-4" : "h-6 w-6";
  const hair = size === "sm" ? "h-4" : "h-[22px]";
  const word = size === "sm" ? "text-sm" : "text-lg";

  return (
    <Link
      href="/"
      aria-label="ROSE-AI home"
      className="flex items-center gap-3"
    >
      <span
        aria-hidden="true"
        className={`grid grid-cols-2 grid-rows-2 gap-px ${mark}`}
      >
        <span className="bg-ink" />
        <span className="bg-brand" />
        <span className="bg-ink" />
        <span className="bg-ink" />
      </span>
      <span className={`block w-px bg-ink ${hair}`} aria-hidden="true" />
      <span
        className={`font-extrabold leading-none tracking-[-0.02em] pl-3 ${word}`}
      >
        ROSE<span className="text-brand">·AI</span>
      </span>
    </Link>
  );
}
