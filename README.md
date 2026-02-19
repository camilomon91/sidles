# SIDLEE Microsite

A clean Next.js App Router project with two primary pages:

- `/sidlee` → renders Storyblok blocks
- `/sidlee/contact` → contact form posting to `/api/contact`

## Storyblok setup (exact model)

Create these Storyblok components:

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
2. Name: **Sid Lee**
3. Slug: **sidlee**
4. In `body`:
   - add `hero`
     - title: `Camilo Montero`
     - subtitle: `Full-stack dev building fast, accessible campaign sites (Next.js/Node/Storyblok).`
   - add `section`
     - heading: `Projects`
     - add 2–3 `project_card` blocks in `items`
   - add another `section`
     - heading: `How I work`
     - add `project_card` items (as principles for now)
5. Save and publish.

## Environment

Create `.env.local`:

```bash
NEXT_PUBLIC_STORYBLOK_TOKEN=your_storyblok_token
```

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
