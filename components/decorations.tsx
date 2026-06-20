export function DottedSeparator() {
  return <div className="dotted-sep my-10" />;
}

export function AvailablePill() {
  return (
    <span className="inline-flex items-center gap-1.75 rounded-full border border-hairline px-2.5 py-1 pl-2.25 font-mono text-[11px] text-muted">
      <span className="relative size-1.75">
        <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
        <span className="absolute inset-0 rounded-full bg-accent" />
      </span>
      Available for work
    </span>
  );
}
