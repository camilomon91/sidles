# SIDLEE Microsite

A clean Next.js App Router project with two primary pages:

- `/sidlee` → renders Storyblok blocks
- `/sidlee/contact` → contact form posting to `/api/contact`

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
