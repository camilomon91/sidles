import StaticSidleeFallback from "@/components/StaticSidleeFallback";
import Hero from "@/storyblok/Hero";
import ProjectCard from "@/storyblok/ProjectCard";
import Section from "@/storyblok/Section";
import { getSidleeStory } from "@/lib/storyblok";

export default async function SidleePage() {
  const story = await getSidleeStory();

  if (!story.ok) {
    return <StaticSidleeFallback reason={story.reason} />;
  }

  return (
    <main className="site-texture py-16 md:py-20" aria-labelledby="sidlee-title">
      <div className="page-container">
        <h1 id="sidlee-title" className="sr-only">
          Sidlee
        </h1>

        {story.content.body?.map((blok) => {
          if (blok.component === "hero") {
            return <Hero blok={blok} key={blok._uid} />;
          }

          if (blok.component === "section") {
            return <Section blok={blok} key={blok._uid} />;
          }

          if (blok.component === "project_card") {
            return <ProjectCard blok={blok} key={blok._uid} />;
          }

          return null;
        })}
      </div>
    </main>
  );
}
