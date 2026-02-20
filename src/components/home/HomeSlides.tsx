"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";

type Slide = {
  id: string;
  kicker: string;
  title: string;
  description: string;
};

const SCROLL_LOCK_CLASS = "overflow-hidden";
const WHEEL_THRESHOLD = 16;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function HomeSlides() {
  const prefersReducedMotion = useReducedMotion();

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
        kicker: "Card 02",
        title: "Storyblok-driven components",
        description:
          "Reusable Storyblok blocks drive hero, sections, and project cards while keeping content controlled from the CMS.",
      },
      {
        id: "contact",
        kicker: "Card 03",
        title: "Fast lead capture",
        description:
          "The contact flow is optimized for speed, with validation and backend handling that keeps drop-off low.",
      },
      {
        id: "aesthetic",
        kicker: "Card 04",
        title: "Dual visual identity",
        description:
          "Clean mode feels editorial and warm, while brutal mode shifts into a neon-tech visual language instantly.",
      },
      {
        id: "motion",
        kicker: "Card 05",
        title: "Floating motion narrative",
        description:
          "Cards stack like a deck, slide in from the right, and push older cards upward to create a fluent reading rhythm.",
      },
    ],
    [],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.body.classList.add(SCROLL_LOCK_CLASS);
    return () => document.body.classList.remove(SCROLL_LOCK_CLASS);
  }, []);

  useEffect(() => {
    let locked = false;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (locked || Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;

      const nextIndex = clamp(index + (event.deltaY > 0 ? 1 : -1), 0, slides.length - 1);
      if (nextIndex === index) return;

      locked = true;
      setIndex(nextIndex);
      window.setTimeout(() => {
        locked = false;
      }, prefersReducedMotion ? 80 : 460);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [index, prefersReducedMotion, slides.length]);

  return (
    <main className="site-texture flex h-dvh items-center py-8">
      <div className="page-container w-full">
        <section className="relative h-[560px] overflow-hidden rounded-[2rem] border-2 border-black bg-zinc-100/70 p-4 md:p-6">
          <div className="relative h-full w-full" style={{ perspective: "1200px" }}>
            {slides.map((slide, slideIndex) => {
              const relative = slideIndex - index;
              const isActive = relative === 0;
              const isPast = relative < 0;
              const depth = Math.min(Math.abs(relative), 4);

              return (
                <motion.article
                  key={slide.id}
                  className="absolute inset-0 rounded-[1.65rem] border-2 border-black bg-white p-6 shadow-[0_18px_42px_rgba(0,0,0,0.2)] md:p-10"
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPast ? -36 - depth * 8 : 120 + relative * 26,
                    y: isActive ? 0 : isPast ? -180 - depth * 34 : 28 + relative * 18,
                    scale: isActive ? 1 : isPast ? 0.92 - depth * 0.015 : 0.97 - depth * 0.02,
                    opacity: isActive ? 1 : isPast ? 0.12 : 0.92 - depth * 0.12,
                    rotateX: prefersReducedMotion ? 0 : isActive ? 0 : isPast ? 8 : -6,
                    rotateY: prefersReducedMotion ? 0 : isActive ? 0 : isPast ? -6 : 10,
                    zIndex: 120 - depth,
                  }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.12 }
                      : { type: "spring", stiffness: 170, damping: 22, mass: 0.7 }
                  }
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <p className="section-kicker">{slide.kicker}</p>
                  <h1 className="hero-title mt-5">{slide.title}</h1>
                  <p className="mt-6 max-w-3xl text-lg font-medium">{slide.description}</p>

                  {slideIndex === 0 ? (
                    <div className="mt-8">
                      <Button href="/sidlee">Open SIDLEE page</Button>
                    </div>
                  ) : null}
                </motion.article>
              );
            })}
          </div>

          <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-70 md:bottom-8 md:left-8 md:right-8">
            <span>
              {index + 1} / {slides.length}
            </span>
            <span>Scroll to move deck</span>
          </div>
        </section>
      </div>
    </main>
  );
}
