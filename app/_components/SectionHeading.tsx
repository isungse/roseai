interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lead?: string;
  id?: string;
}

export function SectionHeading({ eyebrow, title, lead, id }: SectionHeadingProps) {
  return (
    <div className="max-w-prose">
      <p className="text-sm font-semibold text-brand">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-h3 font-bold tracking-tight md:text-section"
      >
        {title}
      </h2>
      {lead && <p className="mt-5 text-body text-copy md:text-body-lg">{lead}</p>}
    </div>
  );
}
