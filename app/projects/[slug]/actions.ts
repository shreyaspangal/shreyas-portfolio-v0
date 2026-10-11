"use server";

import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { after } from "next/server";
import { getProjectBySlug } from "@/data/projects";
import { getSql } from "@/lib/db";
import { sendReviewAlert } from "@/lib/review-alert";

const MAX_LENGTH = 500;
/** reviews allowed per visitor (hashed IP) per hour */
const HOURLY_LIMIT = 3;

/** Vercel sets x-forwarded-for from the connection itself, so visitors can't spoof it. */
async function hashedVisitorIp() {
  const secret = process.env.IP_HASH_SECRET;
  if (!secret) throw new Error("IP_HASH_SECRET is not set");
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return createHmac("sha256", secret).update(ip).digest("hex");
}

export type ReviewResult = { ok: true } | { ok: false; error: string };

export async function submitReview(input: {
  slug: string;
  rating: number;
  review: string;
  /** honeypot: hidden from people, bots fill it in */
  website?: string;
}): Promise<ReviewResult> {
  const project = getProjectBySlug(input.slug);
  if (!project) return { ok: false, error: "Unknown project." };
  if (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5) {
    return { ok: false, error: "Pick between 1 and 5 stars." };
  }
  // pretend it worked so bots don't learn to skip the field
  if (input.website) return { ok: true };

  const text = input.review.trim().slice(0, MAX_LENGTH) || null;

  try {
    const ipHash = await hashedVisitorIp();
    // count + insert in one round trip; truly simultaneous submits can overshoot by one, fine for a spam guard
    const inserted = await getSql()`
      insert into reviews (project, rating, review, ip_hash)
      select ${project.slug}, ${input.rating}, ${text}, ${ipHash}
      where (
        select count(*) from reviews
        where ip_hash = ${ipHash} and created_at > now() - interval '1 hour'
      ) < ${HOURLY_LIMIT}
      returning id`;
    if (inserted.length === 0) {
      return { ok: false, error: "That's a few reviews already. Try again in an hour?" };
    }
  } catch (error) {
    console.error("[submitReview] insert failed", error);
    return { ok: false, error: "Couldn't save that. Try again?" };
  }

  after(() => sendReviewAlert({ title: project.title, slug: project.slug, rating: input.rating, text }));
  return { ok: true };
}
