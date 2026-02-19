import { storyblokEditable } from "@storyblok/react";

type HeroBlok = {
  _uid: string;
  subtitle?: string;
  title?: string;
};

export default function Hero({ blok }: { blok: HeroBlok }) {
  return (
    <section {...storyblokEditable(blok)} className="p-8">
      <h1 className="text-4xl font-bold">{blok.title}</h1>
      <p className="mt-4 text-lg opacity-80">{blok.subtitle}</p>
    </section>
  );
}
