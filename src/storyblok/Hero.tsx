import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import type { HeroBlok } from "@/types/storyblok";

export default function Hero({ blok }: { blok: HeroBlok }) {
  return (
    <section {...storyblokEditable(blok)} className="p-8">
      <h1 className="text-4xl font-bold">{blok.title}</h1>
      <p className="mt-4 text-lg opacity-80">{blok.subtitle}</p>
      {blok.image?.filename ? (
        <Image
          alt={blok.image.alt || "Hero image"}
          className="mt-6 rounded-lg"
          height={420}
          src={blok.image.filename}
          width={780}
        />
      ) : null}
    </section>
  );
}
