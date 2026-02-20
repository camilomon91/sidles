"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";

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
        kicker: "Card 02",
        title: "Storyblok-driven components",
        description:
          "Reusable Storyblok blocks power the hero, sections, and project cards while preserving visual mode behavior.",
      },
      {
        id: "contact",
        kicker: "Card 03",
        title: "Fast lead capture",
        description: "Validation and API handling keep the contact flow fast, resilient, and easy to complete.",
      },
      {
        id: "aesthetic",
        kicker: "Card 04",
        title: "Dual aesthetic modes",
        description:
          "Clean and brutal modes alter visual tonality so the same content can feel editorial or neon-tech.",
      },
      {
        id: "motion",
        kicker: "Card 05",
        title: "Motion-first experience",
        description:
          "Cards float, layer, and transition like a deck to create a tactile, modern narrative on the homepage.",
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
      if (locked) return;
      if (Math.abs(event.deltaY) < 10) return;

      const nextIndex = event.deltaY > 0 ? Math.min(index + 1, slides.length - 1) : Math.max(index - 1, 0);
      if (nextIndex === index) return;

      locked = true;
      setIndex(nextIndex);
      window.setTimeout(() => {
        locked = false;
      }, 520);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [index, slides.length]);

  return (
    <main className="site-texture flex h-dvh items-center py-8">
      <div className="page-container w-full">
        <section className="relative h-[560px] overflow-hidden rounded-3xl border-2 border-black bg-zinc-100/60 p-4 md:p-6">
          <div className="relative h-full w-full [perspective:1300px]">
            {slides.map((slide, slideIndex) => {
              const relativeIndex = slideIndex - index;
              const isPast = relativeIndex < 0;
              const isActive = relativeIndex === 0;

              return (
                <motion.article
                  key={slide.id}
                  className="absolute inset-0 rounded-3xl border-2 border-black bg-white p-6 shadow-[0_14px_34px_rgba(0,0,0,0.16)] md:p-10"
                  initial={
                    slideIndex === 0
                      ? { x: 0, y: 0, opacity: 1 }
                      : { x: 180, y: 90 + slideIndex * 26, opacity: 0.8, scale: 0.96 }
                  }
                  animate={{
                    x: isActive ? 0 : isPast ? -70 : 90 + relativeIndex * 14,
                    y: isActive ? 0 : isPast ? -230 - Math.abs(relativeIndex) * 28 : relativeIndex * 38,
                    scale: isActive ? 1 : isPast ? 0.94 : Math.max(0.9, 1 - relativeIndex * 0.03),
                    opacity: isActive ? 1 : isPast ? 0.25 : Math.max(0.5, 1 - relativeIndex * 0.12),
                    zIndex: 120 - Math.abs(relativeIndex),
                    rotateX: isActive ? 0 : isPast ? 7 : -6,
                    rotateY: isActive ? 0 : isPast ? -8 : 8,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <p className="section-kicker">{slide.kicker}</p>
                  <h1 className="hero-title mt-6">{slide.title}</h1>
                  <p className="mt-6 max-w-3xl text-lg font-medium">{slide.description}</p>

                  {slideIndex === 0 ? (
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Button href="/sidlee">Open SIDLEE page</Button>
                    </div>
                  ) : null}
                </motion.article>
              );
            })}
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-70 md:bottom-8 md:left-8 md:right-8">
            <span>
              {index + 1} / {slides.length}
            </span>
            <span>Scroll to move floating deck</span>
          </div>
        </section>
      </div>
    </main>
  );
}
