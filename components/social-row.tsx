"use client";

import { useState } from "react";
import type { SocialLink } from "@/data/socials";
import { Chip } from "@/components/chip";
import { SocialIcon } from "@/components/icons";
import { CardGlow } from "@/components/card-glow";

export function SocialRow({ link }: { link: SocialLink }) {
  const [copied, setCopied] = useState(false);

  async function handleClick(e: React.MouseEvent) {
    if (!link.copyOnClick) return;
    const addr = link.href.replace("mailto:", "");
    if (addr.includes("[")) return; // unfilled placeholder, let it navigate/no-op
    if (!navigator.clipboard) return;
    e.preventDefault();
    await navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <CardGlow className="-mx-3.5 rounded-[13px]">
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group grid grid-cols-[38px_1fr] items-center gap-4 rounded-[13px] border border-transparent px-3.5 py-4 transition-colors duration-250 hover:border-white/10 hover:bg-white/3"
    >
      <Chip variant={link.chip}>
        <SocialIcon chip={link.chip} />
      </Chip>
      <span className="flex items-center justify-between gap-3.5">
        <span className="text-[15.5px] group-hover:text-accent transition-colors">
          {link.label}
        </span>
        <span className="font-mono text-xs text-faint group-hover:text-accent transition-colors whitespace-nowrap">
          {copied ? "copied ✓" : link.value}
        </span>
      </span>
    </a>
    </CardGlow>
  );
}
