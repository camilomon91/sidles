import { StoryblokComponent, getStoryblokApi } from "@storyblok/react";

function StoryblokErrorMessage({ message }: { message: string }) {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">SIDLEE page</h1>
      <p className="mt-4 text-red-600">{message}</p>
    </main>
  );
}

export default async function SidleePage() {
  if (!process.env.NEXT_PUBLIC_STORYBLOK_TOKEN) {
    return (
      <StoryblokErrorMessage message="Missing NEXT_PUBLIC_STORYBLOK_TOKEN. Add it to your environment to load content." />
    );
  }

  let storyContent: unknown;

  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories/sidlee", {
      version: "draft",
    });

    storyContent = data.story.content;
  } catch {
    storyContent = null;
  }

  if (!storyContent) {
    return (
      <StoryblokErrorMessage message="Storyblok content could not be loaded. Check your token and Story slug." />
    );
  }

  return <StoryblokComponent blok={storyContent} />;
}
