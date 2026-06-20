export const SPRING_CONFIG = {
  type: "spring" as const,
  visualDuration: 0.6,
  bounce: 0.18,
};

/** Page-load entrance for hero elements (avatar, name, nav, bio lines). */
export const POP_IN_VARIANT = {
  initial: { opacity: 0, y: 14, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

/** Scroll-triggered reveal for section content below the fold. */
export const REVEAL_VARIANT = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};
