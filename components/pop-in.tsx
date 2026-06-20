"use client";

import { motion } from "motion/react";
import { SPRING_CONFIG, POP_IN_VARIANT } from "@/lib/motion-config";

type PopInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

/** Staggered entrance for hero elements. Respects prefers-reduced-motion via Motion's built-in handling. */
export function PopIn({ children, delay = 0, className }: PopInProps) {
  return (
    <motion.div
      initial={POP_IN_VARIANT.initial}
      animate={POP_IN_VARIANT.animate}
      transition={{ ...SPRING_CONFIG, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
