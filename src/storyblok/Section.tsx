import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import type { SectionBlok } from "@/types/storyblok";

export default function Section({ blok }: { blok: SectionBlok }) {
  return (
    <section {...storyblokEditable(blok)} className="section-space border-2 border-black bg-zinc-50 p-6 md:p-10">
      <h2 className="text-4xl font-black leading-[0.95] md:text-5xl">{blok.heading}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {blok.items?.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </section>
  );
}
