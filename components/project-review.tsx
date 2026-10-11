"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, MotionConfig, motion, useAnimationControls } from "motion/react";
import posthog from "posthog-js";
import { cn } from "@/lib/utils";
import { SPRING_CONFIG } from "@/lib/motion-config";
import { submitReview } from "@/app/projects/[slug]/actions";

const MOODS = ["Not for me", "Could be better", "It's alright", "Pretty good", "Loved it"];
const MAX_LENGTH = 500;
const SPARKS = 6;

/** Remembers locally that this visitor already reviewed, so the thank-you shows on return. */
const storageKey = (slug: string) => `project-reviewed:${slug}`;

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.45 6.2 20.5l1.1-6.47L2.6 9.45l6.5-.95z" />
    </svg>
  );
}

/** Dots that fly out of a star when it's picked. */
function Sparks() {
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden>
      {Array.from({ length: SPARKS }, (_, i) => {
        const angle = (i / SPARKS) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute top-1/2 left-1/2 size-1 rounded-full bg-star"
            initial={{ x: "-50%", y: "-50%", opacity: 1, scale: 1 }}
            animate={{
              x: `calc(-50% + ${Math.cos(angle) * 20}px)`,
              y: `calc(-50% + ${Math.sin(angle) * 20}px)`,
              opacity: 0,
              scale: 0.4,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        );
      })}
    </span>
  );
}

export function ProjectReview({ slug, title }: { slug: string; title: string }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [website, setWebsite] = useState("");
  // bumps on every pick so the pop + sparks replay even when re-picking the same star
  const [pickId, setPickId] = useState(0);
  const starsControls = useAnimationControls();
  const starRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey(slug))) setSubmitted(true);
    } catch {}
  }, [slug]);

  const shown = hovered || rating;

  function pick(value: number) {
    setRating(value);
    setPickId((id) => id + 1);
    setNudge(false);
  }

  function onStarKey(e: React.KeyboardEvent, value: number) {
    const step = e.key === "ArrowRight" || e.key === "ArrowUp" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = Math.min(5, Math.max(1, value + step));
    pick(next);
    starRefs.current[next - 1]?.focus();
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) {
      setNudge(true);
      starsControls.start({ x: [0, -7, 7, -5, 5, 0], transition: { duration: 0.4 } });
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await submitReview({ slug, rating, review, website }).catch(() => ({
        ok: false as const,
        error: "Couldn't reach the server. Try again?",
      }));
      if (!result.ok) {
        setError(result.error);
        starsControls.start({ x: [0, -5, 5, -3, 3, 0], transition: { duration: 0.35 } });
        return;
      }
      posthog.capture("project_reviewed", {
        slug,
        title,
        rating,
        review: review.trim() || undefined,
      });
      try {
        localStorage.setItem(storageKey(slug), String(rating));
      } catch {}
      setSubmitted(true);
    });
  }

  function reset() {
    try {
      localStorage.removeItem(storageKey(slug));
    } catch {}
    setRating(0);
    setReview("");
    setSubmitted(false);
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="rounded-[20px] border border-hairline p-1.25">
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-surface px-5 py-5.5">
          <AnimatePresence mode="wait" initial={false}>
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={SPRING_CONFIG}
                className="flex flex-col items-center gap-3 py-6 text-center"
                role="status"
              >
                <motion.span
                  className="flex size-11 items-center justify-center rounded-full bg-accent-soft text-accent"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5, visualDuration: 0.5, delay: 0.1 }}
                >
                  <svg viewBox="0 0 24 24" className="size-5.5" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <motion.path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                    />
                  </svg>
                </motion.span>
                <p className="text-[16px] font-medium tracking-tight">Thanks, that helps.</p>
                <p className="text-sm text-muted">I read every one of these.</p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-1 font-mono text-xs text-faint transition-colors hover:text-accent"
                >
                  review again
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={SPRING_CONFIG}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2.5">
                  <p id={`rate-${slug}`} className="text-[16px] font-medium tracking-tight">
                    How was {title}?
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
                    <motion.div
                      role="radiogroup"
                      aria-labelledby={`rate-${slug}`}
                      animate={starsControls}
                      className="flex items-center gap-0.5"
                      onMouseLeave={() => setHovered(0)}
                    >
                      {[1, 2, 3, 4, 5].map((value) => {
                        const lit = value <= shown;
                        const justPicked = value <= rating && pickId > 0;
                        return (
                          <motion.button
                            key={value}
                            ref={(el) => {
                              starRefs.current[value - 1] = el;
                            }}
                            type="button"
                            role="radio"
                            aria-checked={rating === value}
                            aria-label={`${value} star${value > 1 ? "s" : ""}`}
                            tabIndex={value === (rating || 1) ? 0 : -1}
                            onClick={() => pick(value)}
                            onMouseEnter={() => setHovered(value)}
                            onKeyDown={(e) => onStarKey(e, value)}
                            whileHover={{ scale: 1.18, rotate: value % 2 ? -8 : 8 }}
                            whileTap={{ scale: 0.85 }}
                            transition={{ type: "spring", bounce: 0.5, visualDuration: 0.3 }}
                            className="relative rounded-md p-1 outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                          >
                            <motion.span
                              key={justPicked ? `${pickId}-${value}` : value}
                              className="block"
                              initial={justPicked ? { scale: 0.6 } : false}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", bounce: 0.6, visualDuration: 0.35, delay: justPicked ? (value - 1) * 0.04 : 0 }}
                            >
                              <StarIcon
                                className={cn(
                                  "size-7 transition-colors duration-150",
                                  lit
                                    ? "text-star drop-shadow-[0_0_10px_rgba(251,191,36,0.35)]"
                                    : "text-white/12"
                                )}
                              />
                            </motion.span>
                            {value === rating && pickId > 0 && <Sparks key={pickId} />}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                    <span className="relative h-5 min-w-28 overflow-hidden text-sm" aria-live="polite">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={nudge ? "nudge" : shown}
                          initial={{ y: 14, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -14, opacity: 0 }}
                          transition={{ type: "spring", bounce: 0.3, visualDuration: 0.3 }}
                          className={cn("absolute inset-0 whitespace-nowrap", nudge ? "text-star" : shown ? "text-fg" : "text-faint")}
                        >
                          {nudge ? "Pick a star first" : shown ? MOODS[shown - 1] : "Tap a star"}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </div>
                </div>

                <motion.label
                  className={cn(
                    "block rounded-[13px] border bg-white/2 px-3.5 py-3 transition-colors duration-250",
                    focused ? "border-accent/50 bg-accent-soft/40" : "border-hairline hover:border-white/15"
                  )}
                  animate={{ scale: focused ? 1.01 : 1 }}
                  transition={SPRING_CONFIG}
                >
                  <span className="sr-only">Review</span>
                  <motion.textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value.slice(0, MAX_LENGTH))}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="What worked, what didn't? (optional)"
                    maxLength={MAX_LENGTH}
                    animate={{ height: focused || review ? 112 : 48 }}
                    transition={SPRING_CONFIG}
                    className="block w-full resize-none bg-transparent text-[15px] leading-relaxed text-fg outline-none placeholder:text-faint"
                  />
                  <AnimatePresence>
                    {(focused || review) && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className={cn(
                          "mt-1 block text-right font-mono text-[11px]",
                          review.length > MAX_LENGTH * 0.9 ? "text-star" : "text-faint"
                        )}
                      >
                        {review.length}/{MAX_LENGTH}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.label>

                {/* honeypot: off-screen and skipped by keyboard and screen readers */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute -left-[9999px] size-px opacity-0"
                />

                <div className="flex items-center justify-between gap-3">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={error ?? "hint"}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      role={error ? "alert" : undefined}
                      className={cn("text-xs", error ? "text-star" : "text-faint")}
                    >
                      {error ?? "Only I see this."}
                    </motion.p>
                  </AnimatePresence>
                  <motion.button
                    type="submit"
                    disabled={pending}
                    aria-busy={pending}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", bounce: 0.5, visualDuration: 0.3 }}
                    className={cn(
                      "overflow-hidden rounded-full border px-4.5 py-2 text-sm disabled:cursor-wait font-medium transition-colors duration-250 outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                      rating
                        ? "border-accent/40 bg-accent text-bg hover:bg-accent/90"
                        : "border-hairline bg-white/3 text-muted"
                    )}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={pending ? "sending" : "send"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.3, visualDuration: 0.25 }}
                        className="inline-flex items-center gap-1.5"
                      >
                        {pending && (
                          <motion.span
                            className="size-3 rounded-full border-[1.5px] border-current border-t-transparent"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                          />
                        )}
                        {pending ? "Sending" : "Send review"}
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
