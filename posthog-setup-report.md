<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into your Next.js portfolio. PostHog is initialized via `instrumentation-client.ts` (Next.js 15.3+ pattern), with a reverse proxy configured in `next.config.ts` to route events through `/ingest` so they're less likely to be blocked by ad blockers. Eight events are now tracked across five files, covering every meaningful user action: social link clicks (including email copies), project visits, nav navigation, blog reading, and contact intent.

| Event Name | Description | File |
|---|---|---|
| `social_link_clicked` | User clicks on a social link row (email, LinkedIn, Twitter, or GitHub). | `components/social-row.tsx` |
| `email_copied` | User copies the email address to their clipboard via the social row. | `components/social-row.tsx` |
| `work_item_clicked` | User clicks on a project card to visit the external project URL. | `components/project-card.tsx` |
| `blog_post_clicked` | User clicks on a blog post card to read the full article. | `app/page.tsx` |
| `nav_link_clicked` | User clicks a navigation anchor link (Projects, Writing, or Socials). | `app/page.tsx` |
| `carealign_link_clicked` | User clicks the CareAlign inline link in the bio section. | `app/page.tsx` |
| `contact_link_clicked` | User clicks the 'Get in touch' anchor link at the bottom of the bio. | `app/page.tsx` |
| `blog_post_viewed` | User views a blog post page — top of the reading funnel. | `app/blog/[slug]/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://eu.posthog.com/project/215321/dashboard/792426)
- [Social link clicks by platform](https://eu.posthog.com/project/215321/insights/Ogqux5aZ)
- [Work item clicks by project](https://eu.posthog.com/project/215321/insights/68E1AxWX)
- [Contact intent over time](https://eu.posthog.com/project/215321/insights/Jajdtw2H)
- [Blog engagement](https://eu.posthog.com/project/215321/insights/hKhuT5xs)
- [Nav link clicks by section](https://eu.posthog.com/project/215321/insights/tNIiZoYx)

## Verify before merging

- [ ] Run a full production build (`pnpm build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
