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
      href={blok.link?.url || "/portfolio/contact"}
      className="project-card-root group relative block min-h-44 overflow-hidden p-6 md:p-7 focus-visible:outline-none"
      initial={{ y: 0, rotate: 0 }}
      style={{ transformPerspective: 900, rotateX, rotateY }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      whileHover={{ y: -7, rotate: -0.22, boxShadow: "0 24px 42px -26px rgba(24, 32, 63, 0.58)" }}
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
        <motion.div className="project-card-media relative mb-5 overflow-hidden" whileHover={{ scale: 1.018 }}>
          <Image
            alt={blok.image.alt || `${blok.name || "Project"} image`}
            className="project-card-image h-auto w-full"
            height={384}
            src={blok.image.filename}
            width={640}
          />
        </motion.div>
      ) : null}

      <h3
        className="relative text-[clamp(1.3rem,2.1vw,1.9rem)] leading-tight tracking-[-0.01em]"
        style={{ fontFamily: "var(--font-app-display), serif", fontWeight: 560 }}
      >
        {blok.name}
      </h3>
      <p className="relative mt-3 text-[0.99rem] leading-relaxed text-[var(--ink-muted)]">{blok.description}</p>
      <motion.div
        className="project-card-stack relative mt-4 inline-flex min-h-9 items-center px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
        transition={{ duration: 0.22, ease: "easeOut" }}
        whileHover={{ scale: 1.05, y: -1 }}
      >
        {blok.stack}
      </motion.div>
    </motion.a>
  );
}
