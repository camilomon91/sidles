import { storyblokEditable } from "@storyblok/react";
import type { ProjectCardBlok } from "@/types/storyblok";

export default function ProjectCard({ blok }: { blok: ProjectCardBlok }) {
  return (
    <a
      {...storyblokEditable(blok)}
      href={blok.link?.url || "#"}
      className="block rounded-xl border p-5 transition hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <h3 className="text-lg font-semibold">{blok.name}</h3>
      <p className="mt-2 opacity-80">{blok.description}</p>
      <div className="mt-3 text-sm opacity-60">{blok.stack}</div>
    </a>
  );
}
