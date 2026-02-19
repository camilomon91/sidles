import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const sectionPosterWords = ["SHIP", "QUALITY", "CRAFT", "IMPACT"];

export default function Section({ blok }: any) {
  const posterWord =
    sectionPosterWords[Number.parseInt(blok?._uid?.slice(-1) || "0", 16) % sectionPosterWords.length] ||
    "SHIP";

  return (
    <section
      {...storyblokEditable(blok)}
      data-poster-word={posterWord}
      className="narrative-section motif-host poster-type border-t p-8"
    >
      <span aria-hidden className="accent-motif" />
      <h2 className="relative text-2xl font-semibold">{blok.heading}</h2>
      <div className="relative mt-6 grid gap-4">
        {blok.items?.map((nestedBlok: any) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </section>
  );
}
