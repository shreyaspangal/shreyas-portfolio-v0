export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4.5 font-mono text-xs tracking-[0.12em] text-faint uppercase">
      {children}
    </p>
  );
}
