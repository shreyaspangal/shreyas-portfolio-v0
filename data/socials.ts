export type SocialLink = {
  label: string;
  /** value shown on the right — handle, email, etc. */
  value: string;
  href: string;
  chip: "mail" | "linkedin" | "x" | "github";
  /** if true, clicking copies `value` to clipboard instead of navigating */
  copyOnClick?: boolean;
};

export const socials: SocialLink[] = [
  {
    label: "Email",
    value: "shreyaspangal03@gmail.com",
    href: "mailto:shreyaspangal03@gmail.com",
    chip: "mail",
    copyOnClick: true,
  },
  {
    label: "LinkedIn",
    value: "in/shreyaspangal",
    href: "https://linkedin.com/in/shreyaspangal",
    chip: "linkedin",
  },
  {
    label: "Twitter",
    value: "@ShreyasPangal",
    href: "https://x.com/ShreyasPangal",
    chip: "x",
  },
  {
    label: "GitHub",
    value: "@shreyaspangal",
    href: "https://github.com/shreyaspangal",
    chip: "github",
  },
];
