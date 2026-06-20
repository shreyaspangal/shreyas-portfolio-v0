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
    slug: "carealign",
    title: "CareAlign",
    role: "Frontend & AI engineering",
    period: "2025 — now",
    evidenceLabel: "grounded",
    evidenceDetail:
      "every AI-written claim carries a verbatim quote from the source report",
    href: "https://github.com/shreyaspangal/care-align",
    chip: "care",
  },
  {
    slug: "superlend",
    title: "Real-time lending interface",
    role: "Superlend",
    period: "2024 — 25",
    evidenceLabel: "real-time",
    evidenceDetail:
      "sub-second updates, liquidation-aware states, no stale numbers",
    href: "#",
    chip: "lend",
  },
  {
    slug: "yoda-diagnostics",
    title: "Genomic results portal",
    role: "Yoda Diagnostics",
    period: "2022 — 24",
    evidenceLabel: "clinical",
    evidenceDetail:
      "complex results made readable for the people they're actually about",
    href: "#",
    chip: "dna",
  },
];
