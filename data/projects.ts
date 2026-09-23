export type WorkItem = {
  slug: string;
  title: string;
  role: string;
  period: string;
  evidenceLabel: string;
  evidenceDetail: string;
  href: string;
  /** key into the chip-* color tokens defined in app/globals.css */
  chip: "care" | "lend" | "dna";
};

/**
 * Add a new project by appending an object here.
 * Then add a matching icon case in components/work-icon.tsx
 * and a matching gradient pair in app/globals.css if it needs a new color.
 */
export const work: WorkItem[] = [
  {
    slug: "superlend",
    title: "Superlend",
    role: "Real-time lending interface",
    period: "Aug 2024 — Apr 2026",
    evidenceLabel: "real-time",
    evidenceDetail:
      "aggregated real-time data, liquidation-aware states, no stale numbers",
    href: "https://app.superlend.xyz/",
    chip: "lend",
  },
  {
    slug: "yoda-diagnostics",
    title: "Yoda Diagnostics",
    role: "Genomic results portal",
    period: "2022 — 24",
    evidenceLabel: "clinical",
    evidenceDetail:
      "complex results made readable for the people they're actually about",
    href: "https://www.yodadiagnostics.com/",
    chip: "dna",
  },
];
