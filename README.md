# SIDLEE Microsite

Production-minded Next.js App Router project demonstrating Storyblok integration and a hardened contact flow.

## What this program does

- Renders a CMS-driven page at `/sidlee` using Storyblok blok components.
- Falls back to a static experience when Storyblok is unavailable.
- Provides a contact form at `/sidlee/contact` posting to `/api/contact`.

## Why it was failing before

Main issues addressed:
- Storyblok fetch flow was not defensive enough (timeouts, invalid data, bad responses).
- No app-level `not-found`/`error` UI.
- Contact API lacked robust validation/anti-spam/rate-limiting and consistent error shapes.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_STORYBLOK_TOKEN=your_storyblok_preview_or_public_token
```

The app validates env shape at startup with Zod.

## Scripts

- `npm run lint` - lint with Next.js + TypeScript rules
- `npm run test` - unit tests (Vitest)
- `npm run e2e` - Playwright smoke tests
- `npm run build` - production build

## Architecture

```text
src/
  app/
    api/contact/route.ts        # API route (validation + rate limit + error contract)
    error.tsx                   # App Router error boundary
    not-found.tsx               # Not found UI
    sidlee/page.tsx             # Storyblok page with fallback mode
    sidlee/contact/page.tsx     # server route rendering client form
  components/
    StaticSidleeFallback.tsx
    contact/ContactForm.tsx     # isolated client component
  lib/
    contact.ts                  # zod validation + API error types
    env.ts                      # startup env validation
    rate-limit.ts               # in-memory demo limiter
    storyblok.ts                # timeout + status + zod runtime validation
  storyblok/
    *.tsx                       # blok renderers
    initStoryblok.ts
  types/
    storyblok.ts
```

## Decisions / tradeoffs

- **Rate limit**: in-memory per IP for demo simplicity (not distributed).
- **Storyblok fallback**: static UI ensures graceful degradation over hard failures.
- **Validation**: runtime Zod checks prevent malformed CMS/API payload crashes.
- **Dynamic client form**: keeps most pages server-rendered and limits client bundle impact.

## CI

GitHub Actions workflow runs on PRs/pushes:
- `npm ci`
- `npm run lint`
- `npm run test`
