import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function Page({ blok }: any) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
