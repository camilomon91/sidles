import PokemonBoosterSimulator from "@/components/PokemonBoosterSimulator";
import { getSidleeStory } from "@/lib/storyblok";
import type { PageBlok, ProjectCardBlok, SectionBlok } from "@/types/storyblok";

function isSectionBlok(block: PageBlok["body"][number]): block is SectionBlok {
  return block?.component === "section";
}

function collectProjectCards(content: PageBlok): ProjectCardBlok[] {
  if (!content.body) {
    return [];
  }

  const sections = content.body.filter(isSectionBlok);

  const projectsSection = sections.find((section) =>
    section.heading?.toLowerCase().includes("projects"),
  );

  return projectsSection?.items ?? [];
}

export default async function Home() {
  const result = await getSidleeStory();
  const projects = result.ok ? collectProjectCards(result.content) : [];

  return (
    <main className="site-texture py-16 md:py-24">
      <div className="page-container">
        <PokemonBoosterSimulator projects={projects} />
      </div>
    </main>
  );
}
