import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import type { StoryblokBlok } from "./types";

type PageBlok = StoryblokBlok & {
  body?: StoryblokBlok[];
};

type PageProps = {
  blok: PageBlok;
};

export default function Page({ blok }: PageProps) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
