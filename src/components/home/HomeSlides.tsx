"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";

type Direction = 1 | -1;

type Slide = {
  id: string;
  kicker: string;
  title: string;
  description: string;
};

const SCROLL_LOCK_CLASS = "overflow-hidden";

export default function HomeSlides() {
  const slides = useMemo<Slide[]>(
    () => [
      {
        id: "intro",
        kicker: "SIDLEE Microsite",
        title: "Storyblok page + contact flow",
        description:
          "This app has two main routes: the Storyblok page at /sidlee and the contact form at /sidlee/contact.",
      },
      {
        id: "storyblok",
        kicker: "Slide 02",
        title: "Storyblok-driven components",
        description:
          "Explore reusable Storyblok components that render hero, sections, and project cards with aesthetic mode support.",
      },
      {
        id: "contact",
        kicker: "Slide 03",
        title: "Fast contact workflow",
        description:
          "The contact experience includes validation and API handling so leads can quickly reach out without friction.",
      },
      {
        id: "cta",
        kicker: "Slide 04",
        title: "Ready to explore?",
        description: "Jump into the SIDLEE page or open the contact form directly from here.",
      },
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);

  useEffect(() => {
    document.body.classList.add(SCROLL_LOCK_CLASS);
    return () => document.body.classList.remove(SCROLL_LOCK_CLASS);
  }, []);

  useEffect(() => {
    let locked = false;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (locked) return;
      if (Math.abs(event.deltaY) < 10) return;

      const nextIndex = event.deltaY > 0 ? Math.min(index + 1, slides.length - 1) : Math.max(index - 1, 0);
      if (nextIndex === index) return;

      locked = true;
      setDirection(event.deltaY > 0 ? 1 : -1);
      setIndex(nextIndex);

      window.setTimeout(() => {
        locked = false;
      }, 560);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [index, slides.length]);

  return (
    <main className="site-texture flex h-dvh items-center py-8">
      <div className="page-container w-full">
        <section
          className="section-space relative overflow-hidden border-2 border-black bg-white p-0"
          style={{ perspective: "1400px" }}
        >
          <motion.div
            className="flex w-full"
            animate={{ x: `-${index * 100}%`, rotateY: direction > 0 ? -2.5 : 2.5 }}
            transition={{ x: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }, rotateY: { duration: 0.28 } }}
            onAnimationComplete={() => setDirection(1)}
            style={{ transformStyle: "preserve-3d" }}
          >
            {slides.map((slide, slideIndex) => (
              <article
                key={slide.id}
                className="relative w-full shrink-0 p-6 md:p-10"
                style={{ transform: `translateZ(${slideIndex === index ? 18 : -14}px) scale(${slideIndex === index ? 1 : 0.97})` }}
              >
                <p className="section-kicker">{slide.kicker}</p>
                <h1 className="hero-title mt-6">{slide.title}</h1>
                <p className="mt-6 max-w-3xl text-lg font-medium">{slide.description}</p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/sidlee">Open SIDLEE page</Button>
                  <Button href="/sidlee/contact" variant="ghost">
                    Open contact form
                  </Button>
                </div>
              </article>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-0 border-x-8 border-white/70" />

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-70 md:left-10 md:right-10">
            <span>
              {index + 1} / {slides.length}
            </span>
            <span>Scroll to move carousel</span>
          </div>
        </section>
      </div>
    </main>
  );
}
