import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import type { ProjectCardBlok } from "@/types/storyblok";

export default function ProjectCard({ blok }: { blok: ProjectCardBlok }) {
  return (
    <a
      {...storyblokEditable(blok)}
      href={blok.link?.url || "/sidlee/contact"}
      className="block min-h-44 rounded-3xl border-2 border-black bg-white p-6 shadow-[8px_8px_0_0_#111] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_0_#111] focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {blok.image?.filename ? (
        <Image
          alt={blok.image.alt || `${blok.name || "Project"} image`}
          className="mb-5 h-48 w-full rounded-2xl border-2 border-black object-cover"
          height={384}
          src={blok.image.filename}
          width={640}
        />
      ) : null}
      <h3 className="text-2xl font-black leading-tight">{blok.name}</h3>
      <p className="mt-3 text-base font-medium opacity-90">{blok.description}</p>
      <div className="mt-4 text-xs font-bold uppercase tracking-wide opacity-70">{blok.stack}</div>
    </a>
  );
}
