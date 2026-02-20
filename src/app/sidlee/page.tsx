"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const horizontalPanels = [
  {
    title: "01 — Discover",
    text: "Break the brief into audience signals, business constraints, and measurable actions.",
  },
  {
    title: "02 — Concept",
    text: "Shape a creative direction that can pitch well and still survive technical realities.",
  },
  {
    title: "03 — Build",
    text: "Ship front-end and back-end in parallel with quality checks and collaboration rituals.",
  },
  {
    title: "04 — Ship + Learn",
    text: "Validate cross-device behavior, monitor outcomes, and iterate based on real feedback.",
  },
] as const;

function OverlapPanelItem({
  title,
  text,
  scrollYProgress,
  index,
}: {
  title: string;
  text: string;
  scrollYProgress: MotionValue<number>;
  index: number;
}) {
  const start = index / horizontalPanels.length;
  const end = start + 0.35;
  const x = useTransform(scrollYProgress, [start, end], ["105%", "0%"]);
  const opacity = useTransform(scrollYProgress, [start, end], [0.35, 1]);

  return (
    <div className="overlapSlot">
      <motion.article className="overlapPanel" style={{ x, opacity, zIndex: 10 + index }}>
        <p className="eyebrow">{title}</p>
        <h3>{text}</h3>
      </motion.article>
    </div>
  );
}

function OverlapHorizontalSections() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="overlapScroll" aria-label="Horizontal overlap experience">
      {horizontalPanels.map((panel, index) => (
        <OverlapPanelItem
          key={panel.title}
          title={panel.title}
          text={panel.text}
          index={index}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

export default function SidleePage() {
  return (
    <main className="canvas">
      <section className="shell section">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          CREATIVE EXECUTION
        </motion.p>
        <motion.h1 className="headline" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          Horizontally moving sections that slide in from the right and overlap each other.
        </motion.h1>
        <motion.p className="lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          This interaction mirrors agency momentum: each phase arrives with force, stacks over the previous one, and
          pushes the narrative forward while you scroll.
        </motion.p>
      </section>

      <OverlapHorizontalSections />

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
