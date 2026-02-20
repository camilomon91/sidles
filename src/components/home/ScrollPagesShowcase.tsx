"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";

type Panel = {
  title: string;
  description: string;
  kicker: string;
};

const PANELS: Panel[] = [
  {
    kicker: "PAGE 01",
    title: "Landing intro",
    description: "Your first personalized screen can present a bold campaign headline and value proposition.",
  },
  {
    kicker: "PAGE 02",
    title: "Portfolio highlight",
    description: "Use this area to show case studies, visuals, and key conversion proof points.",
  },
  {
    kicker: "PAGE 03",
    title: "Service breakdown",
    description: "Explain your process, timeline, and deliverables before driving users to action.",
  },
  {
    kicker: "PAGE 04",
    title: "Final CTA",
    description: "Finish with a personalized closing page that sends visitors directly to your contact flow.",
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function ScrollPagesShowcase() {
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    let ticking = false;

    const updatePanels = () => {
      sectionRefs.current.forEach((section) => {
        if (!section) {
          return;
        }

        const panel = section.querySelector<HTMLElement>("[data-panel]");
        if (!panel) {
          return;
        }

        const rect = section.getBoundingClientRect();
        const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1);
        const translateX = 120 - progress * 150;
        panel.style.transform = `translate3d(${translateX}%, 0, 0)`;
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePanels);
        ticking = true;
      }
    };

    updatePanels();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <main className="site-texture py-10 md:py-14">
      <div className="page-container">
        <div className="sticky top-6 z-30 border-2 border-black bg-white/95 p-4 shadow-[6px_6px_0_0_#000] backdrop-blur-sm md:p-6">
          <p className="section-kicker">SIDLEE MENU</p>
          <h1 className="mt-2 text-3xl font-black md:text-5xl">Static action menu</h1>
          <p className="mt-3 max-w-3xl font-medium">
            Scroll down: each new page slides from right to left over this menu. Replace panel content with your own
            personalized sections.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/sidlee">Open SIDLEE page</Button>
            <Button href="/sidlee/contact" variant="ghost">
              Open contact form
            </Button>
          </div>
        </div>

        <div className="relative mt-8 space-y-24">
          {PANELS.map((panel, index) => (
            <section
              key={panel.title}
              ref={(node) => {
                sectionRefs.current[index] = node;
              }}
              className="relative h-[95vh]"
            >
              <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <article
                  data-panel
                  className="w-full border-2 border-black bg-[#ffe2af]/95 p-6 shadow-[10px_10px_0_0_#000] will-change-transform md:p-10"
                >
                  <p className="section-kicker">{panel.kicker}</p>
                  <h2 className="mt-2 text-4xl font-black leading-[0.95] md:text-6xl">{panel.title}</h2>
                  <p className="mt-4 max-w-2xl text-lg font-medium">{panel.description}</p>
                </article>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
