import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import type { HeroBlok } from "@/types/storyblok";

export default function Hero({ blok }: { blok: HeroBlok }) {
  const hasImage = Boolean(blok.image?.filename);

  return (
    <section {...storyblokEditable(blok)} className="studio-sheet section-space motion-enter">
      <p className="section-kicker">01 / HERO</p>
      <div className={hasImage ? "mt-4 grid gap-7 lg:grid-cols-[1.18fr_0.82fr] lg:items-end" : "mt-4"}>
        <div>
          <h1 className="hero-title max-w-4xl">{blok.title}</h1>
          <p className="mt-6 max-w-3xl text-[clamp(1rem,1.3vw,1.16rem)] leading-relaxed text-[var(--ink-muted)]">
            {blok.subtitle}
          </p>
        </div>

        {hasImage ? (
          <div className="hero-frame">
            <Image
              alt={blok.image?.alt || "Hero image"}
              className="hero-image"
              height={720}
              src={blok.image?.filename || ""}
              width={1280}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
