# Sidlee Microsite

A small Next.js microsite starter focused on a clean structure and reliable local builds.

## What this program does

This app renders a single landing page with:

- a project headline and short description,
- two call-to-action links (docs and deploy),
- light/dark theme-aware styling.

It uses the Next.js App Router and Tailwind CSS v4.

## Why it was failing

The previous scaffold used `next/font/google` (`Geist` and `Geist Mono`).
During production builds, Next.js fetches those fonts from Google Fonts.
In restricted or offline environments this request fails, which causes `next build` to fail.

This version removes remote font fetching and uses a local/system font stack instead.

## Project structure

```text
src/
  app/
    globals.css       # Global styles + theme tokens
    layout.tsx        # App shell and metadata
    page.tsx          # Route entrypoint
  components/
    site/
      cta-link.tsx    # Reusable button-style link component
      home-page.tsx   # Landing page UI
  content/
    site.ts           # Centralized page copy + link data
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```
