import type { WorkItem } from "@/data/work";
import type { SocialLink } from "@/data/socials";

type WorkIconProps = { chip: WorkItem["chip"]; className?: string };

/** Solid icon per project domain. Add a case here when you add a new chip key in data/work.ts. */
export function WorkIcon({ chip, className }: WorkIconProps) {
  switch (chip) {
    case "care":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M9.6 2.4h4.8a1.2 1.2 0 0 1 1.2 1.2v4.8h4.8a1.2 1.2 0 0 1 1.2 1.2v4.8a1.2 1.2 0 0 1-1.2 1.2h-4.8v4.8a1.2 1.2 0 0 1-1.2 1.2H9.6a1.2 1.2 0 0 1-1.2-1.2v-4.8H3.6a1.2 1.2 0 0 1-1.2-1.2V9.6a1.2 1.2 0 0 1 1.2-1.2h4.8V3.6a1.2 1.2 0 0 1 1.2-1.2z" />
        </svg>
      );
    case "lend":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <rect x="2.5" y="12" width="4.4" height="9.5" rx="1.3" />
          <rect x="9.8" y="6" width="4.4" height="15.5" rx="1.3" />
          <rect x="17.1" y="2.5" width="4.4" height="19" rx="1.3" />
        </svg>
      );
    case "dna":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 2.2c0 0 7 8.1 7 12.6a7 7 0 0 1-14 0C5 10.3 12 2.2 12 2.2z" />
        </svg>
      );
  }
}

type SocialIconProps = { chip: SocialLink["chip"]; className?: string };

export function SocialIcon({ chip, className }: SocialIconProps) {
  switch (chip) {
    case "mail":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M3 5h18a1 1 0 0 1 1 1v.35l-10 6.1L2 6.35V6a1 1 0 0 1 1-1z" />
          <path d="M22 8.25V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8.25l10 6.1 10-6.1z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.56v-2.2c-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.72-1.34-1.72-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.79 2.81 1.27 3.5.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.25 2.86.12 3.16.77.83 1.23 1.88 1.23 3.17 0 4.53-2.81 5.52-5.49 5.81.43.37.81 1.1.81 2.22v3.29c0 .31.21.69.83.56C20.57 21.88 24 17.48 24 12.29 24 5.78 18.63.5 12 .5z" />
        </svg>
      );
  }
}

export function PencilIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M3 17.3V21h3.7L17.6 10.1l-3.7-3.7L3 17.3zM20.7 7a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.8 1.8 3.7 3.7L20.7 7z" />
    </svg>
  );
}
