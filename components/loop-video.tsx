"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type LoopVideoProps = {
  /** path prefix in public/; expects .mp4, .webm and -poster.jpg next to it */
  src: string;
  label: string;
  className?: string;
};

/**
 * Muted, looping app preview. Plays only while on screen, and stays on the
 * poster frame when the visitor prefers reduced motion.
 */
export function LoopVideo({ src, label, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced.matches) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={`${src}-poster.jpg`}
      aria-label={label}
      width={960}
      height={608}
      className={cn("aspect-[960/608] w-full bg-elev object-cover", className)}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
