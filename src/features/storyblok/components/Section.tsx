import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

type NestedBlok = {
  _uid: string;
};

type SectionBlok = {
  _uid: string;
  heading?: string;
  items?: NestedBlok[];
};

export default function Section({ blok }: { blok: SectionBlok }) {
  return (
    <section {...storyblokEditable(blok)} className="border-t p-8">
      <h2 className="text-2xl font-semibold">{blok.heading}</h2>
      <div className="mt-6 grid gap-4">
        {blok.items?.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </section>
  );
}
