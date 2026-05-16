interface SectionLabelProps {
  code: string;
}

export function SectionLabel({ code }: SectionLabelProps) {
  return (
    <div className="mono cap absolute left-7 top-5 z-10 flex items-center gap-2 text-[11px] font-semibold tracking-[0.02em] md:left-10">
      <span aria-hidden="true" className="h-1.5 w-1.5 bg-brand" />
      {code}
    </div>
  );
}
