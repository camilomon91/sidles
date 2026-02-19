import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";

export default async function SidleePage() {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.get("cdn/stories/sidlee", {
    version: "draft",
  });

  return <StoryblokComponent blok={data.story.content} />;
}
