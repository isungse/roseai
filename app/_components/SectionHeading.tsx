interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lead?: string;
  id?: string;
}

export function SectionHeading({ eyebrow, title, lead, id }: SectionHeadingProps) {
  return (
    <div className="max-w-prose">
      <p className="mono cap text-xs font-medium tracking-[0.08em] text-brand">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 text-h2 font-bold tracking-[-0.02em] md:text-h1"
      >
        {title}
      </h2>
      {lead && <p className="mt-5 text-body-lg text-g500">{lead}</p>}
    </div>
  );
}
