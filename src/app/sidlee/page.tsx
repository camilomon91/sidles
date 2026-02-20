"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const slides = [
  {
    kicker: "01 — Discover",
    title: "Decode the brief before touching code.",
    body: "Map goals, constraints, and user tension first so every implementation decision has strategic intent.",
  },
  {
    kicker: "02 — Concept",
    title: "Design an idea that can survive production.",
    body: "Strong art direction is paired with realistic architecture so the concept remains bold at launch.",
  },
  {
    kicker: "03 — Build",
    title: "Ship front-end and back-end in one rhythm.",
    body: "Progressive integration, resilient APIs, and QA checkpoints keep pace high without sacrificing quality.",
  },
  {
    kicker: "04 — Iterate",
    title: "Measure impact, then sharpen the work.",
    body: "Post-launch learnings become the next sprint input, keeping the product alive and useful.",
  },
] as const;

export default function SidleePage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  function next() {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  }

  function prev() {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

  const active = slides[index];

  return (
    <main className="canvas">
      <section className="shell section">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          CREATIVE EXECUTION
        </motion.p>
        <motion.h1 className="headline" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          Slider + overlap transition, built for right-to-left narrative momentum.
        </motion.h1>
        <motion.p className="lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          The viewport stays fixed while pages change in layers. The incoming slide starts off-screen on the right,
          then covers the previous one with motion + z-index.
        </motion.p>
      </section>

      <section className="shell section" aria-label="Overlap carousel demo">
        <div className="carouselViewport">
          <div className="carouselBase" aria-live="polite">
            <p className="eyebrow">{active.kicker}</p>
            <h3>{active.title}</h3>
            <p>{active.body}</p>
          </div>

          <AnimatePresence custom={direction} mode="wait">
            <motion.article
              key={index}
              className="carouselCover"
              custom={direction}
              initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0.75 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow">{active.kicker}</p>
              <h3>{active.title}</h3>
              <p>{active.body}</p>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="carouselActions">
          <button type="button" className="cta cta-ghost" onClick={prev}>
            Previous
          </button>
          <p className="carouselMeta">
            {index + 1} / {slides.length}
          </p>
          <button type="button" className="cta cta-primary" onClick={next}>
            Next
          </button>
        </div>
      </section>

      <section className="shell section" aria-label="Call to action">
        <h2 className="sectionTitle">Want this mindset on your next brief?</h2>
        <p className="lede">I’m ready to design, build, and iterate with your team from day one.</p>
        <Link href="/sidlee/contact" className="cta cta-primary mt-6">
          Start a conversation
        </Link>
      </section>
    </main>
  );
}
