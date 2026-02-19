import { StoryblokComponent } from "@storyblok/react";
import StaticSidleeFallback from "@/components/StaticSidleeFallback";
import { getSidleeStory } from "@/lib/storyblok";

export default async function SidleePage() {
  const result = await getSidleeStory();

  if (!result.ok) {
    return <StaticSidleeFallback reason={result.reason} />;
  }

  return <StoryblokComponent blok={result.content} />;
}
