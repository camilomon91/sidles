import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import type { StoryblokBlok } from "./types";

const sectionPosterWords = ["SHIP", "QUALITY", "CRAFT", "IMPACT"];

type SectionBlok = StoryblokBlok & {
  heading?: string;
  items?: StoryblokBlok[];
};

type SectionProps = {
  blok: SectionBlok;
};

export default function Section({ blok }: SectionProps) {
  const posterWord =
    sectionPosterWords[Number.parseInt(blok._uid.slice(-1), 16) % sectionPosterWords.length] || "SHIP";

  return (
    <section
      {...storyblokEditable(blok)}
      data-poster-word={posterWord}
      className="narrative-section motif-host poster-type border-t p-8"
    >
      <span aria-hidden className="accent-motif" />
      <h2 className="relative text-2xl font-semibold">{blok.heading}</h2>
      <div className="relative mt-6 grid gap-4">
        {blok.items?.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </section>
  );
}
