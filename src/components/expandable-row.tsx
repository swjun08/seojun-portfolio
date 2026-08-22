export function ExpandableRow({
  date,
  title,
  subtitle,
  desc,
  detail,
}: {
  date?: string;
  title: string;
  subtitle?: string;
  desc?: string;
  detail?: string;
}) {
  // ponytail: 더보기 detail text is being rewritten, hide expansion for now — revert this line to re-enable
  detail = undefined;

  const mainBlock = (
    <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[5.5rem_1fr] sm:gap-4">
      <span className="text-xs leading-snug text-foreground/45 sm:pt-0.5">{date}</span>
      <div>
        <p className="text-lg font-semibold text-foreground">{title}</p>
        {subtitle && <p className="mt-0.5 text-sm text-foreground/60">{subtitle}</p>}
        {desc && <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">{desc}</p>}
        {detail && (
          <>
            <span className="mt-1.5 inline-block text-xs font-medium text-accent group-open:hidden">더보기</span>
            <span className="mt-1.5 hidden text-xs font-medium text-foreground/45 group-open:inline">접기</span>
          </>
        )}
      </div>
    </div>
  );

  if (!detail) {
    return <div className="border-b border-border py-5 last:border-none">{mainBlock}</div>;
  }

  return (
    <details className="group border-b border-border py-5 last:border-none">
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">{mainBlock}</summary>
      <div className="mt-4 sm:pl-[6.5rem]">
        <p className="text-sm leading-relaxed text-foreground/70">{detail}</p>
      </div>
    </details>
  );
}
