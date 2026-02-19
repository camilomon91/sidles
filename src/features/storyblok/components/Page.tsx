import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

type NestedBlok = {
  _uid: string;
};

type PageBlok = {
  _uid: string;
  body?: NestedBlok[];
};

export default function Page({ blok }: { blok: PageBlok }) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
