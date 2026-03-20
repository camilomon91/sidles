import { z } from "zod";
import { env } from "@/lib/env";
import type { PageBlok } from "@/types/storyblok";

const storyContentSchema = z.custom<PageBlok>((value) => typeof value === "object" && value !== null);

const nestedDataResponseSchema = z.object({
  data: z.object({
    story: z.object({
      content: storyContentSchema,
    }),
  }),
});

const directResponseSchema = z.object({
  story: z.object({
    content: storyContentSchema,
  }),
});

type StoryblokFailureReason =
  | "missing-token"
  | "bad-status"
  | "invalid-data"
  | "missing-story"
  | "network-error";

async function fetchWithTimeout(url: string, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
  } finally {
    clearTimeout(timer);
  }
}

function parseStoryContent(payload: unknown): PageBlok | null {
  const nested = nestedDataResponseSchema.safeParse(payload);
  if (nested.success) return nested.data.data.story.content;

  const direct = directResponseSchema.safeParse(payload);
  if (direct.success) return direct.data.story.content;

  return null;
}

async function fetchStory(version: "published" | "draft") {
  if (!env.NEXT_PUBLIC_STORYBLOK_TOKEN) {
    return { ok: false as const, reason: "missing-token" as StoryblokFailureReason };
  }

  const storySlug = env.STORYBLOK_STORY_SLUG || "portfolio";
  const url = new URL(`https://api.storyblok.com/v2/cdn/stories/${storySlug}`);
  url.searchParams.set("token", env.NEXT_PUBLIC_STORYBLOK_TOKEN);
  url.searchParams.set("version", version);

  try {
    const response = await fetchWithTimeout(url.toString());

    if (!response.ok) {
      return {
        ok: false as const,
        reason: "bad-status" as StoryblokFailureReason,
        status: response.status,
      };
    }

    const data = await response.json();
    const content = parseStoryContent(data);

    if (!content) {
      return { ok: false as const, reason: "invalid-data" as StoryblokFailureReason };
    }

    return { ok: true as const, content };
  } catch {
    return { ok: false as const, reason: "network-error" as StoryblokFailureReason };
  }
}

export async function getPortfolioStory() {
  const publishedStory = await fetchStory("published");

  if (publishedStory.ok) {
    return publishedStory;
  }

  const draftStory = await fetchStory("draft");
  if (draftStory.ok) {
    return draftStory;
  }

  return draftStory;
}
