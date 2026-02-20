"use client";

import { AnimatePresence, motion } from "framer-motion";
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
      if (Math.abs(event.deltaY) < 12) return;

      locked = true;
      if (event.deltaY > 0) {
        setDirection(1);
        setIndex((value) => Math.min(value + 1, slides.length - 1));
      } else {
        setDirection(-1);
        setIndex((value) => Math.max(value - 1, 0));
      }

      window.setTimeout(() => {
        locked = false;
      }, 500);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [slides.length]);

  const slide = slides[index];

  return (
    <main className="site-texture flex h-dvh items-center py-8">
      <div className="page-container w-full">
        <section className="section-space relative overflow-hidden border-2 border-black bg-white p-6 md:p-10">
          <p className="section-kicker">{slide.kicker}</p>

          <div className="mt-6 min-h-[280px] md:min-h-[320px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={slide.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 140 : -140 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <h1 className="hero-title">{slide.title}</h1>
                <p className="mt-6 max-w-3xl text-lg font-medium">{slide.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/sidlee">Open SIDLEE page</Button>
            <Button href="/sidlee/contact" variant="ghost">
              Open contact form
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-70">
            <span>
              {index + 1} / {slides.length}
            </span>
            <span>Scroll to switch slide</span>
          </div>
        </section>
      </div>
    </main>
  );
}
