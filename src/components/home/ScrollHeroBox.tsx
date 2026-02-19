"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ScrollHeroBox() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = window.innerHeight * 1.2;
      const next = clamp(window.scrollY / max, 0, 1);
      setProgress(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scale = 1 + progress * 0.12;
  const radius = 28 - progress * 20;
  const minHeight = 460 + progress * 300;

  return (
    <section className="hero-scroll-wrap">
      <div
        className="hero-scroll-box border-2 border-black bg-white p-6 md:p-10"
        style={{
          borderRadius: `${radius}px`,
          minHeight: `${minHeight}px`,
          transform: `scale(${scale})`,
        }}
      >
        <p className="section-kicker">SIDLEE Microsite</p>
        <h1 className="hero-title mt-4">Storyblok page + contact flow</h1>
        <p className="mt-6 max-w-3xl text-lg font-medium">
          As you scroll, this central panel grows to become the main stage while the background video adapts to
          the selected aesthetic.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/sidlee">Open SIDLEE page</Button>
          <Button href="/sidlee/contact" variant="ghost">
            Open contact form
          </Button>
        </div>
      </div>
    </section>
  );
}
