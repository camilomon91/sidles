import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function Section({ blok }: any) {
  return (
    <section {...storyblokEditable(blok)} className="p-8 border-t">
      <h2 className="text-2xl font-semibold">{blok.heading}</h2>
      <div className="mt-6 grid gap-4">
        {blok.items?.map((nestedBlok: any) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </section>
  );
}
