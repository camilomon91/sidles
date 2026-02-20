"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import type { ProjectCardBlok } from "@/types/storyblok";

export default function ProjectCard({ blok }: { blok: ProjectCardBlok }) {
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  const rotateX = useSpring(useTransform(pointerY, [0, 100], [8, -8]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [0, 100], [-8, 8]), { stiffness: 220, damping: 22 });

  const glareX = useTransform(pointerX, (value) => `${value}%`);
  const glareY = useTransform(pointerY, (value) => `${value}%`);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.38), rgba(255,255,255,0) 42%)`;

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    pointerX.set(Math.min(100, Math.max(0, x)));
    pointerY.set(Math.min(100, Math.max(0, y)));
  }

  function onPointerLeave() {
    pointerX.set(50);
    pointerY.set(50);
  }

  return (
    <motion.a
      {...storyblokEditable(blok)}
      href={blok.link?.url || "/sidlee/contact"}
      className="project-card-root group relative block min-h-44 overflow-hidden rounded-3xl border-2 border-black bg-white p-6 shadow-[8px_8px_0_0_#111] focus-visible:outline-2 focus-visible:outline-offset-2"
      initial={{ y: 0, rotate: 0 }}
      style={{ transformPerspective: 900, rotateX, rotateY }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      whileHover={{ y: -8, rotate: -0.35, boxShadow: "16px 16px 0 0 #111" }}
      whileTap={{ scale: 0.985 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        style={{ background: glareBackground }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        whileHover={{ opacity: 1 }}
      />

      {blok.image?.filename ? (
        <motion.div className="project-card-media relative mb-5 overflow-hidden rounded-2xl border-2 border-black" whileHover={{ scale: 1.02 }}>
          <Image
            alt={blok.image.alt || `${blok.name || "Project"} image`}
            className="project-card-image h-48 w-full object-cover"
            height={384}
            src={blok.image.filename}
            width={640}
          />
          <div className="project-card-media-overlay pointer-events-none absolute inset-0" />
        </motion.div>
      ) : null}

      <h3 className="relative text-2xl font-black leading-tight">{blok.name}</h3>
      <p className="relative mt-3 text-base font-medium opacity-90">{blok.description}</p>
      <motion.div
        className="relative mt-4 inline-block rounded-full border-2 border-black bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-wide"
        transition={{ duration: 0.22, ease: "easeOut" }}
        whileHover={{ scale: 1.05, y: -1 }}
      >
        {blok.stack}
      </motion.div>
    </motion.a>
  );
}
