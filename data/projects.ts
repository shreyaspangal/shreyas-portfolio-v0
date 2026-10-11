export type Project = {
  slug: string;
  title: string;
  role: string;
  period: string;
  evidenceLabel: string;
  evidenceDetail: string;
  /**
   * Looping preview, as a path prefix in public/ (no extension).
   * Expects <video>.mp4, <video>.webm and <video>-poster.jpg, 960x608.
   */
  video: string;
  /** paragraphs for the project page: what it's for and what you can do with it */
  brief: string[];
  preview: string;
  /** omit when the code isn't public; the project page hides the link */
  github?: string;
};

/**
 * Add a new project by appending an object here and dropping its preview
 * video files into public/projects/. Its page at /projects/[slug] is
 * generated from this entry.
 */
export const projects: Project[] = [
  {
    slug: "plasis",
    title: "Plasis",
    role: "Text-to-UI intent interface",
    period: "Oct 2026",
    evidenceLabel: "intent",
    evidenceDetail:
      "type what you need, get the right card; two intents in one line become two cards",
    video: "/projects/plasis",
    brief: [
      "Plasis is one text box that turns what you type into the right card, with no type, mode or menu to pick first. Write \"dinner with priya friday 8pm on zoom\" and you get an event with the day, time, person and a video-call badge already filled in.",
      "It covers events, reminders, work items, checklists, bill splits, expenses, unit conversions, time zones, polls and more. Type two things in one line, like \"lunch with sam friday 1pm and remind me to book a table\", and you get two cards. When it spots something it won't set on its own, it asks \"Did you mean?\" instead of guessing.",
      "A model picks the card and code works out the values, so dates, amounts and math are always exact. It runs fully offline by default, and your saved cards stay in your browser.",
    ],
    preview: "https://plasisui.vercel.app",
    github: "https://github.com/shreyaspangal/plasis",
  },
  {
    slug: "yoda-diagnostics",
    title: "Yoda Diagnostics",
    role: "Genomic results portal",
    period: "2022 — 24",
    evidenceLabel: "clinical",
    evidenceDetail:
      "complex results made readable for the people they're actually about",
    video: "/projects/yoda-diagnostics",
    brief: [
      "Leveraging genomics data, DNA Decoder identifies disease risks, enhances medication safety, and tailors lifestyle choices for optimal health.",
    ],
    preview: "https://www.yodadiagnostics.com/",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
