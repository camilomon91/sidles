import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import type { SectionBlok } from "@/types/storyblok";

export default function Section({ blok }: { blok: SectionBlok }) {
  return (
    <section {...storyblokEditable(blok)} className="studio-sheet studio-sheet--muted section-space motion-enter">
      <p className="section-kicker">SECTION</p>
      <h2
        className="mt-2 max-w-4xl text-[clamp(1.9rem,4.6vw,4rem)] leading-[0.94] tracking-[-0.02em]"
        style={{ fontFamily: "var(--font-app-display), serif", fontWeight: 540 }}
      >
        {blok.heading}
      </h2>
      <div className="project-grid mt-8 grid gap-5 md:grid-cols-2">
        {blok.items?.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </section>
  );
}
