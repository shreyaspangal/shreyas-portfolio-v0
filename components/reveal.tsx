"use client";

import { motion } from "motion/react";
import { SPRING_CONFIG, REVEAL_VARIANT } from "@/lib/motion-config";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

/** Scroll-triggered reveal — animates once when the element enters the viewport. */
export function Reveal({ children, className }: RevealProps) {
  return (
    <motion.div
      initial={REVEAL_VARIANT.initial}
      whileInView={REVEAL_VARIANT.animate}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={SPRING_CONFIG}
      className={className}
    >
      {children}
    </motion.div>
  );
}
