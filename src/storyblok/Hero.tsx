import { storyblokEditable } from "@storyblok/react";

export default function Hero({ blok }: any) {
  return (
    <section
      {...storyblokEditable(blok)}
      data-poster-word="BUILD"
      className="narrative-section motif-host poster-type p-8"
    >
      <span aria-hidden className="accent-motif" />
      <h1 className="relative text-4xl font-bold">{blok.title}</h1>
      <p className="relative mt-4 text-lg opacity-80">{blok.subtitle}</p>
    </section>
  );
}
