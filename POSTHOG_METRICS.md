# PostHog on this site

## Setup

- Project: dedicated PostHog project, EU Cloud (`https://eu.posthog.com`)
- Client init: `instrumentation-client.ts` — gated behind a Do Not Track check, so nothing fires if the visitor's browser sends `DNT: 1`
- Ingest is reverse-proxied through `/ingest` (see `next.config.ts` rewrites) to `eu.i.posthog.com`, so requests come from `shreyaspangal.com` instead of a third-party domain — meaningfully reduces ad-blocker loss
- Env vars live in `.env.local` (gitignored): `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and the token used by `instrumentation-client.ts`. Public key, safe to expose client-side — this is not a secret in the usual sense, but keep it out of the repo anyway since it's project-specific.
- Package manager is pnpm-only (`packageManager` pinned in `package.json`) — don't reintroduce a `package-lock.json`.

## What's tracked today

Automatic (no code, PostHog default capture):
- `$pageview` / `$pageleave` — every page, every navigation
- Web Analytics tab in PostHog (pageviews, sessions, referrers, top pages, bounce rate, device/browser/country breakdown) — this is free and needs zero extra setup, check it before building custom insights
- Exception capture (`capture_exceptions: true`) — client JS errors show up in PostHog's Error Tracking automatically

Custom events (all in `components/tracked-link.tsx`, `social-row.tsx`, `work-row.tsx`, `blog-view-tracker.tsx`, `app/page.tsx`):

| Event | Fires when | Key properties |
|---|---|---|
| `nav_link_clicked` | Work/Writing/Socials header nav clicked | `section` |
| `contact_link_clicked` | X / email / GitHub link in bio clicked | `channel` |
| `work_item_clicked` | A project row (Superlend/Yoda) clicked | `title`, `slug`, `role` |
| `blog_post_clicked` | Blog post card clicked from the list | `slug`, `title` |
| `blog_post_viewed` | Blog post page actually loads | `slug`, `title` |
| `social_link_clicked` | Any social row clicked (email/LinkedIn/Twitter/GitHub) | `platform`, `label` |
| `email_copied` | Email address copied via the social row | — |

Pre-built dashboard/insights (created during setup, in the PostHog project):
- Analytics basics dashboard
- Social link clicks by platform
- Work item clicks by project
- Contact intent over time
- Blog engagement
- Nav link clicks by section

## How to add a new event

- Wrapping a `<Link>` or `<a>`: use `<TrackedLink event="..." properties={{...}}>` or `<TrackedAnchor event="..." properties={{...}}>` from `components/tracked-link.tsx` — drop-in replacements for `Link`/`a`.
- Anything else (a button, a copy action, a form submit): call `posthog.capture("event_name", { ...properties })` directly, same pattern as `social-row.tsx`.
- No dashboard config needed to start capturing — new event names just show up in PostHog once they fire at least once. Build an Insight/dashboard for them from the UI when you want to look at them regularly.

## Reasonable next additions (not built yet — build only if you actually want the signal)

- **Scroll depth on the homepage** — whether visitors reach the Writing/Socials sections at all, useful for judging whether the page is too long or the ordering is wrong. PostHog has no built-in scroll tracker for React; would need a small `IntersectionObserver` hook firing `section_viewed` per `<section id>`.
- **Session recordings** — free tier includes 5,000/month, which is far more than a portfolio will use. Turn on in PostHog project settings if you ever want to watch someone actually browse the site (e.g. after a redesign, to see if the new layout confuses anyone). Off by default; enabling doesn't require a code change.
- **Feature flags / A/B tests** — if you ever want to test two versions of the bio copy or headline, PostHog flags can drive that without a deploy. Not worth setting up until there's an actual variant to test.
- **UTM/campaign tracking** — if you start sharing this link with a `?utm_source=...` (e.g. in a job application, a tweet, a newsletter), PostHog captures UTM params automatically on `$pageview` — no code needed, just start appending UTM params to links you share and filter by them in Web Analytics.
- **Resume/CV download event** — not applicable yet since there's no resume link on the site today; if one gets added, wrap it the same way as `work-row.tsx` (`posthog.capture("resume_downloaded")`).

## Things intentionally left out

- No consent banner — the DNT check is the compliance posture here, not an opt-in banner. Revisit if this site's traffic profile or your risk tolerance changes.
- No `posthog-node` / server-side capture — everything here is client events, appropriate for a static/mostly-client portfolio with no backend logic worth instrumenting server-side.
