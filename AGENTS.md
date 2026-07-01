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

Design direction (author's intent):

- Minimal, "retro-futurism" / engineering-dashboard feel.
- High readability and fast loading come first.
- Accent palette: orange with white / silver over a neutral grayscale base.

Avoid: heavy animations, glassmorphism everywhere, excessive gradients, and
large hero images that hurt readability.

> Before adding design tokens or colors, confirm against the existing
> `tailwind.config.ts` and `globals.css` rather than inventing new values.

## When unsure

Do not guess. Inspect the existing implementation, state your assumptions, and
ask only when a decision genuinely can't be made from the code.

## Change output format

When proposing or making changes, provide:

- **Files changed** — list of paths.
- **Why** — the reasoning.
- **Verification** — which commands were run and their result.
- **Trade-offs** — any downsides, if applicable.
