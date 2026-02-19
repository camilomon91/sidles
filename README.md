# SIDLEE Microsite

A Next.js app with:
- A Storyblok-rendered page at `/sidlee`.
- A basic contact form at `/sidlee/contact` that posts to `/api/contact`.

## Why it was not working

The app depends on `@storyblok/react` to render Storyblok components. If dependencies are not installed or `NEXT_PUBLIC_STORYBLOK_TOKEN` is missing, `/sidlee` fails to render.

## Project structure

```text
src/
  app/
    api/contact/route.ts
    sidlee/
      contact/page.tsx
      page.tsx
  features/
    storyblok/
      components/
        Hero.tsx
        Page.tsx
        ProjectCard.tsx
        Section.tsx
      lib/
        initStoryblok.ts
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add environment variables in `.env.local`:
   ```bash
   NEXT_PUBLIC_STORYBLOK_TOKEN=your_preview_or_public_token
   ```
3. Run:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).
