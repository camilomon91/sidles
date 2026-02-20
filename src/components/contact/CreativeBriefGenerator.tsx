"use client";

import { useMemo, useState } from "react";

const GOALS = ["launch", "rebrand", "convert", "delight", "disrupt"];
const AUDIENCES = ["early adopters", "enterprise buyers", "busy parents", "Gen Z creators", "curious skeptics"];
const TONES = ["bold", "playful", "minimal", "cinematic", "rebellious"];
const CONSTRAINTS = ["tiny budget", "2-week deadline", "legacy stack", "strict brand rules", "complex approvals"];

function randomFrom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function CreativeBriefGenerator() {
  const [seed, setSeed] = useState(1);

  const brief = useMemo(() => {
    const picks = Array.from({ length: seed }).map(() => ({
      goal: randomFrom(GOALS),
      audience: randomFrom(AUDIENCES),
      tone: randomFrom(TONES),
      constraint: randomFrom(CONSTRAINTS),
    }));

    return picks[picks.length - 1];
  }, [seed]);

  return (
    <section className="mt-10 border-2 border-black bg-lime-200 p-5 md:p-6" aria-labelledby="brief-generator-title">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em]">Creative warm-up</p>
          <h2 id="brief-generator-title" className="mt-1 text-2xl font-black md:text-3xl">
            Instant brief remix
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setSeed((value) => value + 1)}
          className="inline-flex min-h-11 items-center justify-center border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wide transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#111] active:translate-y-0"
        >
          Remix idea
        </button>
      </div>

      <p className="mt-5 text-base font-medium leading-relaxed md:text-lg">
        Build a <span className="font-black">{brief.tone}</span> campaign to <span className="font-black">{brief.goal}</span>
        &nbsp;for <span className="font-black">{brief.audience}</span>, while navigating a&nbsp;
        <span className="font-black">{brief.constraint}</span>.
      </p>
    </section>
  );
}
