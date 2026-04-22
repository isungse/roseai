import { HERO_DIAGRAM_TAG } from "@/lib/data/hero";

const NODES = [
  { top: "25%", left: "25%", red: false },
  { top: "25%", left: "50%", red: false },
  { top: "50%", left: "50%", red: true },
  { top: "50%", left: "75%", red: false },
  { top: "75%", left: "25%", red: false },
  { top: "75%", left: "50%", red: false },
] as const;

export function HeroDiagram() {
  return (
    <div
      aria-hidden="true"
      className="relative hidden aspect-square border border-hair lg:block"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-hair) 1px, transparent 1px), linear-gradient(to bottom, var(--color-hair) 1px, transparent 1px)",
          backgroundSize: "25% 25%",
        }}
      />
      {NODES.map((node, i) => (
        <span
          key={i}
          className={`absolute h-2.5 w-2.5 ${node.red ? "bg-brand" : "bg-ink"}`}
          style={{ top: node.top, left: node.left }}
        />
      ))}
      <span className="mono absolute bottom-2 left-2 text-[10px] text-g500">
        {HERO_DIAGRAM_TAG}
      </span>
    </div>
  );
}
