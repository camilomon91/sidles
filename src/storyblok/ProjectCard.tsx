import Image from "next/image";
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import type { ProjectCardBlok } from "@/types/storyblok";

export default function ProjectCard({ blok }: { blok: ProjectCardBlok }) {
  return (
    <motion.a
      {...storyblokEditable(blok)}
      href={blok.link?.url || "/sidlee/contact"}
      className="group relative block min-h-44 overflow-hidden rounded-3xl border-2 border-black bg-white p-6 shadow-[8px_8px_0_0_#111] focus-visible:outline-2 focus-visible:outline-offset-2"
      initial={{ y: 0, rotate: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      whileHover={{ y: -6, rotate: -0.35, boxShadow: "14px 14px 0 0 #111" }}
      whileTap={{ scale: 0.99 }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-200/30 via-cyan-200/15 to-emerald-200/20"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        whileHover={{ opacity: 1 }}
      />

      {blok.image?.filename ? (
        <motion.div transition={{ duration: 0.25, ease: "easeOut" }} whileHover={{ scale: 1.015 }}>
          <Image
            alt={blok.image.alt || `${blok.name || "Project"} image`}
            className="mb-5 h-48 w-full rounded-2xl border-2 border-black object-cover"
            height={384}
            src={blok.image.filename}
            width={640}
          />
        </motion.div>
      ) : null}

      <h3 className="relative text-2xl font-black leading-tight">{blok.name}</h3>
      <p className="relative mt-3 text-base font-medium opacity-90">{blok.description}</p>
      <motion.div
        className="relative mt-4 inline-block rounded-full border-2 border-black bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-wide"
        transition={{ duration: 0.22, ease: "easeOut" }}
        whileHover={{ scale: 1.04 }}
      >
        {blok.stack}
      </motion.div>
    </motion.a>
  );
}
