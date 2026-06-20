# Shreyas Pangal — Portfolio

Next.js 16 (App Router) · React 19.2 · TypeScript · Tailwind v4 · MDX

Same core stack as manuarora.in (verified from the open-sourced repo), trimmed
to what this site actually needs.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Adding a project

Open `data/work.ts` and append an object to the `work` array:

```ts
{
  slug: "new-project",
  title: "Project Name",
  role: "Your role / company",
  period: "2026",
  evidenceLabel: "one-word-claim",
  evidenceDetail: "the specific receipt that backs the claim",
  href: "https://...",
  chip: "care", // pick an existing chip color, or add a new one (see below)
}
```

That's it — the row renders automatically with the icon, gradient chip, and
hover arrow. No component edits needed.

**To add a new chip color:** add a `from`/`to` pair in `app/globals.css`
under `@theme`, add the key to the `chip` type union in `data/work.ts`, add
a matching gradient entry in `components/chip.tsx`, and an icon case in
`components/icons.tsx`. Four small, mechanical edits — no design decisions.

## Adding a blog post

Drop a new `.mdx` file into `data/blog/`:

```mdx
---
title: "Post title"
date: "2026-06-20"
summary: "One-line summary"
published: true
---

Your content here. Standard Markdown.
```

It appears in the Writing section and at `/blog/<filename>` automatically —
`lib/blog.ts` reads the whole folder at build time. Set `published: false`
to keep a draft out of the list without deleting it.

## Filling in placeholders

Search the repo for `[` to find every placeholder needing a real value:

- `app/page.tsx` — avatar image comment, if you want a photo instead of "SP"
- `data/socials.ts` — email, LinkedIn URL/handle, Twitter URL/handle
- `data/blog/on-not-outsourcing-judgment.mdx` — date + actual post content
- `data/work.ts` — confirm project years/hrefs are accurate

## Honest flags

- **Not run or built in this environment** — the sandbox this was generated
  in has no network access, so `npm install` / `next build` could not be
  executed here. Run `npm run build` locally as a first check before
  deploying; I can debug any errors you paste back.
- **Next 16 + Tailwind v4 + React 19.2** are current as of writing
  (verified via Next.js's own release notes), but versions in
  `package.json` are caret-ranged (`^`) — if something breaks after
  `npm install`, pin the exact versions from `package-lock.json` once
  generated.
- **Design fidelity**: visual system (palette, spacing, motion) was ported
  from the locked HTML mock by hand, not auto-converted — worth a side-by-
  side check against the mock once `npm run dev` is up.
