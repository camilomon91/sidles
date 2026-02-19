import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import type { HeroBlok } from "@/types/storyblok";

export default function Hero({ blok }: { blok: HeroBlok }) {
  return (
    <section {...storyblokEditable(blok)} className="section-space border-2 border-black bg-white p-6 md:p-10">
      <p className="section-kicker">01 / HERO</p>
      <h1 className="mt-3 text-5xl font-black leading-[0.95] md:text-7xl">{blok.title}</h1>
      <p className="mt-5 max-w-3xl text-lg font-medium opacity-90">{blok.subtitle}</p>
      {blok.image?.filename ? (
        <Image
          alt={blok.image.alt || "Hero image"}
          className="mt-8 w-full rounded-3xl border-2 border-black"
          height={720}
          src={blok.image.filename}
          width={1280}
        />
      ) : null}
    </section>
  );
}
