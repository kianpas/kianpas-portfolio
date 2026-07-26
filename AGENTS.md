# AGENTS.md

Guidance for AI agents working in this repository. Follow the mandatory rules
first; everything below them is supporting context.

## Project

Developer blog + portfolio built with **Next.js 16 (App Router)** and
**React 19**, written in TypeScript and styled with Tailwind CSS.

Goals: showcase engineering quality, keep content highly readable, and stay
maintainable over the long term.

## Mandatory rules

1. **Do not rename existing routes or post slugs.** Canonical URLs must stay
   stable. Note the `/blog` → `/blog/page/1` rewrite in `next.config.ts`.
2. **Do not change the markdown frontmatter schema** (keys/format) parsed by
   `gray-matter`. Content lives in `src/posts/*.md`.
3. **Do not edit existing articles** unless explicitly asked.
4. **Do not add dependencies** without a clear, stated justification. Prefer
   built-in Next.js / React features.
5. **No broad refactors** unless explicitly requested. Keep changes scoped.
6. **Never claim work is done without running the verification commands below
   and reporting their actual output.**

## Verification

Package manager is **npm** (`package-lock.json`). Before considering work
complete, run and report:

- `npm run build` — production build succeeds.
- `npx tsc --noEmit` — no TypeScript errors. (There is no dedicated typecheck
  script.)
- `npm run lint` — ESLint passes. (Flat config in `eslint.config.mjs`,
  ESLint 9 + `eslint-config-next`.)

Also sanity-check manually when relevant:

- Existing routes still resolve.
- Sitemap generation still works — it runs via the `postbuild` hook
  (`next-sitemap`), not an app route.
- Light and dark mode both work (`next-themes`; see `ThemeToggle`).
- Mobile and desktop layouts are preserved.

There is **no test suite** in this repo — do not claim tests were run.

## Architecture

- Prefer React Server Components by default; use Client Components only where
  interactivity requires it (`"use client"`).
- Prefer static rendering (SSG) wherever the data allows it.
- Avoid unnecessary client-side state and hydration.
- Don't duplicate business logic; keep data/content access in existing
  helpers (`src/services`, `src/utils`, `src/data`).

## Content

- Markdown posts in `src/posts/`, parsed with `gray-matter`; rendered through
  the `remark`/`rehype` pipeline already configured.
- Preserve frontmatter keys, post formatting, and code-block formatting.

## Code style

- Small, reusable, clearly named components.
- Composition over premature abstraction; readability over cleverness.
- Avoid deep component nesting and over-engineering.

## UI / Design

Direction: a content-first **editorial tech blog**. Posts come first; there is
no personal-promo hero section.

- Single column with hairline dividers — not cards. No shadows, no hover lift.
- Hierarchy comes from whitespace and typography, not background blocks.
- One accent color only: orange (`orange-600` light / `orange-400` dark).
- High readability and fast loading come first.

Avoid: heavy animations, glassmorphism, excessive gradients, and large hero
images that hurt readability.

> **Read `DESIGN.md` before touching UI.** It documents the shipped system —
> colors, typography, layout rules, and the shared components listed below.
> Confirm against `tailwind.config.ts` and `globals.css` rather than inventing
> new values.

## Shared components

Check these before writing new markup — duplicating them is a common mistake:

- `layout/PageContainer` — every page's outer wrapper (`max-w-5xl`, standard padding).
- `layout/PageHeader` — eyebrow + title + description + hairline.
- `ArticleBody` — the markdown prose block (posts and projects share it).
- `PostRow` — post list rows (`featured` / `row` / `compact`).
- `TagList`, `ArrowLink`, `LoadMoreButton` + `hooks/useLoadMore`, `utils/date`.

`components/ui` (`Card`, `Badge`, `Button`, `Input`) is legacy from the old
card-based design and is only used by the `/design-system` demo page. Do not
use it in new screens.

## When unsure

Do not guess. Inspect the existing implementation, state your assumptions, and
ask only when a decision genuinely can't be made from the code.

## Change output format

When proposing or making changes, provide:

- **Files changed** — list of paths.
- **Why** — the reasoning.
- **Verification** — which commands were run and their result.
- **Trade-offs** — any downsides, if applicable.
