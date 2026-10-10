"use server";

import { after } from "next/server";
import { getProjectBySlug } from "@/data/projects";
import { getSql } from "@/lib/db";
import { sendReviewAlert } from "@/lib/review-alert";

const MAX_LENGTH = 500;

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
    await getSql()`insert into reviews (project, rating, review) values (${project.slug}, ${input.rating}, ${text})`;
  } catch (error) {
    console.error("[submitReview] insert failed", error);
    return { ok: false, error: "Couldn't save that. Try again?" };
  }

  after(() => sendReviewAlert({ title: project.title, slug: project.slug, rating: input.rating, text }));
  return { ok: true };
}
