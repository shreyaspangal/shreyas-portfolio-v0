const STARS = (rating: number) => "★".repeat(rating) + "☆".repeat(5 - rating);

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

/** Emails a new review via Resend. Logs instead of throwing: the review is already saved. */
export async function sendReviewAlert(review: {
  title: string;
  slug: string;
  rating: number;
  text: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.REVIEW_ALERT_TO;
  const from = process.env.REVIEW_ALERT_FROM ?? "Portfolio reviews <reviews@shreyaspangal.com>";
  if (!apiKey || !to) {
    console.warn("[review-alert] RESEND_API_KEY or REVIEW_ALERT_TO not set, skipping email");
    return;
  }

  const body = review.text ? escapeHtml(review.text) : "<em>No written review.</em>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject: `${STARS(review.rating)} new review on ${review.title}`,
      html: `<p style="font-size:20px;margin:0 0 12px">${STARS(review.rating)}</p>
<p style="margin:0 0 16px;white-space:pre-wrap">${body}</p>
<p style="color:#888;font-size:13px;margin:0">${escapeHtml(review.title)} · <a href="https://shreyaspangal.com/projects/${review.slug}">/projects/${review.slug}</a></p>`,
      text: `${STARS(review.rating)}\n\n${review.text ?? "No written review."}\n\n${review.title} · https://shreyaspangal.com/projects/${review.slug}`,
    }),
  });

  if (!res.ok) console.error("[review-alert] Resend failed", res.status, await res.text());
}
