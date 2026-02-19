import { z } from "zod";
import { env } from "@/lib/env";
import type { PageBlok } from "@/types/storyblok";

const storySchema = z.object({
  data: z.object({
    story: z.object({
      content: z.custom<PageBlok>((value) => typeof value === "object" && value !== null),
    }),
  }),
});

async function fetchWithTimeout(url: string, timeoutMs = 5000) {
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

export async function getSidleeStory() {
  if (!env.NEXT_PUBLIC_STORYBLOK_TOKEN) {
    return { ok: false as const, reason: "missing-token" as const };
  }

  const url = new URL("https://api.storyblok.com/v2/cdn/stories/sidlee");
  url.searchParams.set("token", env.NEXT_PUBLIC_STORYBLOK_TOKEN);
  url.searchParams.set("version", "draft");

  try {
    const response = await fetchWithTimeout(url.toString());

    if (!response.ok) {
      return { ok: false as const, reason: "bad-status" as const, status: response.status };
    }

    const data = await response.json();
    const parsed = storySchema.safeParse(data);

    if (!parsed.success) {
      return { ok: false as const, reason: "invalid-data" as const };
    }

    if (!parsed.data.data.story?.content) {
      return { ok: false as const, reason: "missing-story" as const };
    }

    return { ok: true as const, content: parsed.data.data.story.content };
  } catch {
    return { ok: false as const, reason: "network-error" as const };
  }
}
