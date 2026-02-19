import { storyblokEditable } from "@storyblok/react";
import type { StoryblokBlok, StoryblokLink } from "./types";

type ProjectCardBlok = StoryblokBlok & {
  name?: string;
  description?: string;
  stack?: string;
  link?: StoryblokLink;
};

type ProjectCardProps = {
  blok: ProjectCardBlok;
};

export default function ProjectCard({ blok }: ProjectCardProps) {
  return (
    <a
      {...storyblokEditable(blok)}
      href={blok.link?.url || "#"}
      className="block rounded-xl border p-5 transition hover:shadow-sm"
    >
      <h3 className="text-lg font-semibold">{blok.name}</h3>
      <p className="mt-2 opacity-80">{blok.description}</p>
      <div className="mt-3 text-sm opacity-60">{blok.stack}</div>
    </a>
  );
}
