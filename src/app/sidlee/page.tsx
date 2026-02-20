import Page from "@/storyblok/Page";
import StaticSidleeFallback from "@/components/StaticSidleeFallback";
import { getSidleeStory } from "@/lib/storyblok";

function mapFailureReason(reason: string | undefined) {
  switch (reason) {
    case "missing-token":
      return "Missing Storyblok token";
    case "bad-status":
      return "Storyblok returned an error status";
    case "invalid-data":
      return "Storyblok response shape is invalid";
    case "missing-story":
      return "Story not found";
    case "network-error":
      return "Network error while contacting Storyblok";
    default:
      return "Unknown Storyblok error";
  }
}

export default async function SidleePage() {
  const story = await getSidleeStory();

  if (!story.ok) {
    return <StaticSidleeFallback reason={mapFailureReason(story.reason)} />;
  }

  return (
    <main className="site-texture py-16 md:py-20">
      <div className="page-container">
        <Page blok={story.content} />
      </div>
    </main>
  );
}
