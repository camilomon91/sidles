import { storyblokEditable } from "@storyblok/react";

export default function Hero({ blok }: any) {
  return (
    <section {...storyblokEditable(blok)} className="p-8">
      <h1 className="text-4xl font-bold">{blok.title}</h1>
      <p className="mt-4 text-lg opacity-80">{blok.subtitle}</p>
    </section>
  );
}
