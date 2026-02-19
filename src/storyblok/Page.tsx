import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import type { PageBlok } from "@/types/storyblok";

export default function Page({ blok }: { blok: PageBlok }) {
  return (
    <div {...storyblokEditable(blok)} className="space-y-10 md:space-y-14">
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
