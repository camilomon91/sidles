# Portfolio Microsite

A clean Next.js App Router project with two primary pages:

- `/portfolio` → renders Storyblok blocks
- `/portfolio/contact` → contact form posting to `/api/contact`

## Storyblok setup


### 1) `page` (Content type)
- `body` → **Blocks**
- allow inside `body`: `hero`, `section`

### 2) `hero` (Nestable)
- `title` → Text
- `subtitle` → Textarea (or Text)

### 3) `section` (Nestable)
- `heading` → Text
- `items` → Blocks
- allow inside `items`: `project_card`

### 4) `project_card` (Nestable)
- `name` → Text
- `description` → Textarea
- `stack` → Text
- `link` → Link (URL)

## Create content story

In Storyblok Content:

1. Create new story using `page`
2. Name: **Portfolio**
3. Slug: **portfolio** (or any slug you prefer)
4. In `body`:
   - add `hero`
     - title: `Camilo Montero`
     - subtitle: `Full-stack developer building fast, accessible campaign sites with Next.js and Storyblok.`
   - add `section`
     - heading: `Projects`
     - add 2–3 `project_card` blocks in `items`
   - add another `section`
     - heading: `How I Work`
     - add `project_card` items (as principles for now)
5. Save and publish.

## Environment

Create `.env.local`:

```bash
NEXT_PUBLIC_STORYBLOK_TOKEN=your_storyblok_token
STORYBLOK_STORY_SLUG=portfolio
```

`STORYBLOK_STORY_SLUG` is optional. It defaults to `portfolio`.

## Contact form delivery setup

The contact form posts to `/api/contact`, and the API sends email through [Resend](https://resend.com).

Add these variables in your deployment environment (and in `.env.local` for local testing):

```bash
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=you@yourdomain.com
CONTACT_FROM_EMAIL=Portfolio Contact <noreply@yourdomain.com>
```

Notes:
- `CONTACT_TO_EMAIL` is where you receive messages.
- `CONTACT_FROM_EMAIL` must be a sender your Resend account/domain allows.
- The sender should be on a verified domain in Resend.

After setting env vars, restart the app and submit `/portfolio/contact`.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Storyblok Visual Editor on Vercel

Storyblok does not accept `http` preview URLs for hosted sites.

Set your **Preview URL** and **Real path** to HTTPS, for example:

- Preview URL: `https://your-domain.com`
- Real path: `/portfolio`
