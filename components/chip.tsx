import { cn } from "@/lib/utils";

const GRADIENTS: Record<string, string> = {
  care: "from-[var(--color-chip-care-from)] to-[var(--color-chip-care-to)]",
  lend: "from-[var(--color-chip-lend-from)] to-[var(--color-chip-lend-to)]",
  dna: "from-[var(--color-chip-dna-from)] to-[var(--color-chip-dna-to)]",
  write: "from-[var(--color-chip-write-from)] to-[var(--color-chip-write-to)]",
  mail: "from-[var(--color-chip-mail-from)] to-[var(--color-chip-mail-to)]",
  linkedin:
    "from-[var(--color-chip-linkedin-from)] to-[var(--color-chip-linkedin-to)]",
  x: "from-[var(--color-chip-x-from)] to-[var(--color-chip-x-to)]",
  github: "from-[var(--color-chip-github-from)] to-[var(--color-chip-github-to)]",
};

type ChipProps = {
  variant: keyof typeof GRADIENTS;
  children: React.ReactNode;
};

export function Chip({ variant, children }: ChipProps) {
  return (
    <span
      className={cn(
        "flex size-9.5 shrink-0 items-center justify-center rounded-[10px]",
        "border border-white/15 shadow-[0_2px_10px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)]",
        "transition-transform duration-250 ease-out",
        "bg-gradient-to-br",
        GRADIENTS[variant]
      )}
    >
      <span className="size-[18px] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)] [&_svg]:size-full">
        {children}
      </span>
    </span>
  );
}
