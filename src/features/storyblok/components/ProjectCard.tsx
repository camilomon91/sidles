import { storyblokEditable } from "@storyblok/react";

type ProjectCardBlok = {
  _uid: string;
  description?: string;
  link?: {
    url?: string;
  };
  name?: string;
  stack?: string;
};

export default function ProjectCard({ blok }: { blok: ProjectCardBlok }) {
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
