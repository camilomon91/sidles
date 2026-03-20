import Page from "@/storyblok/Page";
import StaticPortfolioFallback from "@/components/StaticPortfolioFallback";
import { getPortfolioStory } from "@/lib/storyblok";

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

export default async function PortfolioPage() {
  const story = await getPortfolioStory();

  if (!story.ok) {
    return <StaticPortfolioFallback reason={mapFailureReason(story.reason)} />;
  }

  return (
    <main className="site-texture py-16 md:py-20">
      <div className="page-container">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <p className="section-kicker">PORTFOLIO / STORYBLOK</p>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--ink-muted)]">
            Live content from Storyblok, rendered with a custom editorial interface system.
          </p>
        </header>
        <Page blok={story.content} />
      </div>
    </main>
  );
}
