import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";

const fallbackSidleeStory = {
  component: "page",
  _uid: "fallback-page",
  body: [
    {
      component: "hero",
      _uid: "fallback-hero",
      title: "Designing digital products with clarity.",
      subtitle: "We build, ship, and refine high-quality web experiences.",
    },
    {
      component: "section",
      _uid: "fallback-section-1",
      heading: "Selected work",
      items: [
        {
          component: "project_card",
          _uid: "fallback-card-1",
          name: "Brand Platform",
          description: "A scalable marketing platform with fast authoring workflows.",
          stack: "Next.js · Storyblok · Tailwind",
          link: { url: "#" },
        },
        {
          component: "project_card",
          _uid: "fallback-card-2",
          name: "Commerce Refresh",
          description: "Conversion-focused storefront redesign with performance-first execution.",
          stack: "React · TypeScript · Analytics",
          link: { url: "#" },
        },
      ],
    },
  ],
};

export default async function SidleePage() {
  const hasStoryblokToken = Boolean(process.env.NEXT_PUBLIC_STORYBLOK_TOKEN);

  if (hasStoryblokToken) {
    try {
      const storyblokApi = getStoryblokApi();
      const { data } = await storyblokApi.get("cdn/stories/sidlee", {
        version: "draft",
      });

      if (data?.story?.content) {
        return <StoryblokComponent blok={data.story.content} />;
      }
    } catch {
      // fall back to local static content when Storyblok is unavailable
    }
  }

  return <StoryblokComponent blok={fallbackSidleeStory} />;
}
