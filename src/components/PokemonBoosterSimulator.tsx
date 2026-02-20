"use client";

import { useMemo, useState } from "react";
import type { ProjectCardBlok } from "@/types/storyblok";

type PullCard = {
  id: string;
  name: string;
  description: string;
  stack: string;
  link: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Ultra Rare";
  hue: number;
};


const FALLBACK_PROJECTS: ProjectCardBlok[] = [
  {
    _uid: "fallback-1",
    component: "project_card",
    name: "Neon Pokédex",
    description: "Interactive encyclopedia prototype with animated search and filters.",
    stack: "Next.js / Storyblok",
    link: { url: "/sidlee" },
  },
  {
    _uid: "fallback-2",
    component: "project_card",
    name: "Battle Arena UI",
    description: "High-energy campaign interface for live event score tracking.",
    stack: "React / Motion",
    link: { url: "/sidlee" },
  },
  {
    _uid: "fallback-3",
    component: "project_card",
    name: "Holo Card Builder",
    description: "Custom card composer tool with theme presets and export pipeline.",
    stack: "TypeScript / Canvas",
    link: { url: "/sidlee" },
  },
  {
    _uid: "fallback-4",
    component: "project_card",
    name: "Trainer Portal",
    description: "Portal for onboarding brand ambassadors with journey milestones.",
    stack: "Next.js / API",
    link: { url: "/sidlee/contact" },
  },
  {
    _uid: "fallback-5",
    component: "project_card",
    name: "Mythic Launch Kit",
    description: "Global launch toolkit microsite with localization and analytics.",
    stack: "Headless CMS",
    link: { url: "/sidlee" },
  },
];

const RARITY_WEIGHTS: Array<{ rarity: PullCard["rarity"]; weight: number }> = [
  { rarity: "Common", weight: 52 },
  { rarity: "Uncommon", weight: 28 },
  { rarity: "Rare", weight: 14 },
  { rarity: "Ultra Rare", weight: 6 },
];

function rarityToGlow(rarity: PullCard["rarity"]) {
  switch (rarity) {
    case "Ultra Rare":
      return "shadow-[0_0_40px_rgba(255,0,180,0.45)]";
    case "Rare":
      return "shadow-[0_0_28px_rgba(0,153,255,0.32)]";
    case "Uncommon":
      return "shadow-[0_0_20px_rgba(97,160,53,0.28)]";
    default:
      return "shadow-[0_0_14px_rgba(0,0,0,0.18)]";
  }
}

function pickWeightedRarity() {
  const total = RARITY_WEIGHTS.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * total;

  for (const entry of RARITY_WEIGHTS) {
    roll -= entry.weight;
    if (roll <= 0) {
      return entry.rarity;
    }
  }

  return "Common";
}

function toPullCards(projects: ProjectCardBlok[]) {
  return projects.map((project, index) => ({
    id: project._uid ?? `${project.name ?? "project"}-${index}`,
    name: project.name ?? "Mystery Project",
    description: project.description ?? "Details loading from the Pokédex.",
    stack: project.stack ?? "Unknown Type",
    link: project.link?.url || "/sidlee",
    rarity: pickWeightedRarity(),
    hue: (index * 67 + 25) % 360,
  }));
}

function buildPack(pool: PullCard[], packSize = 5) {
  const copy = [...pool];
  const pack: PullCard[] = [];

  while (copy.length > 0 && pack.length < packSize) {
    const idx = Math.floor(Math.random() * copy.length);
    const [selected] = copy.splice(idx, 1);
    pack.push({ ...selected, rarity: pickWeightedRarity() });
  }

  return pack;
}

export default function PokemonBoosterSimulator({ projects }: { projects: ProjectCardBlok[] }) {
  const usingFallback = projects.length === 0;
  const cardPool = useMemo(() => toPullCards(usingFallback ? FALLBACK_PROJECTS : projects), [projects, usingFallback]);
  const [pack, setPack] = useState<PullCard[]>([]);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const canOpen = cardPool.length > 0;

  function openPack() {
    const nextPack = buildPack(cardPool);
    setPack(nextPack);
    setFlipped({});
  }

  function toggleCard(id: string) {
    setFlipped((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <section className="section-space border-2 border-black bg-white p-6 md:p-10">
      <p className="section-kicker">Pokémon Inspired Experience</p>
      <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Open a SIDLEE Booster Pack</h1>
      <p className="mt-5 max-w-3xl text-lg font-medium">
        Pull cards sourced from Storyblok&apos;s <strong>projects</strong> section, then click each card to flip and reveal project stats.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={openPack}
          disabled={!canOpen}
          className="rounded-xl border-2 border-black bg-yellow-300 px-5 py-3 text-sm font-black uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-50"
        >
          Open Booster Pack
        </button>
        <p className="text-sm font-semibold uppercase tracking-wider opacity-70">Pack size: {Math.min(5, cardPool.length)} cards</p>
      </div>

      {usingFallback ? (
        <p className="mt-8 rounded-xl border-2 border-black bg-zinc-50 p-4 font-semibold">
          Storyblok project cards are unavailable right now, so a demo card pool is loaded.
        </p>
      ) : null}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {pack.map((card) => {
          const isFlipped = Boolean(flipped[card.id]);

          return (
            <article key={card.id} className={`group [perspective:1200px] ${rarityToGlow(card.rarity)}`}>
              <button
                type="button"
                onClick={() => toggleCard(card.id)}
                className="relative h-72 w-full rounded-2xl border-2 border-black text-left"
                aria-label={`Flip ${card.name}`}
              >
                <div
                  className={`relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  <div
                    className="absolute inset-0 rounded-2xl border-2 border-black p-4 [backface-visibility:hidden]"
                    style={{ background: `linear-gradient(145deg, hsl(${card.hue} 88% 88%), #fff)` }}
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em]">SIDLEE MON</p>
                    <h2 className="mt-2 text-2xl font-black">{card.name}</h2>
                    <p className="mt-20 text-sm font-bold uppercase tracking-wide">Tap to reveal</p>
                    <p className="mt-2 inline-block rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase">
                      {card.rarity}
                    </p>
                  </div>

                  <div className="absolute inset-0 rounded-2xl border-2 border-black bg-zinc-900 p-4 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-200">Project Stats</p>
                    <h3 className="mt-2 text-xl font-black">{card.name}</h3>
                    <p className="mt-3 text-sm">{card.description}</p>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wide text-cyan-200">Type: {card.stack}</p>
                    <a href={card.link} className="mt-4 inline-block rounded-lg border border-white px-3 py-2 text-xs font-bold uppercase tracking-widest">
                      Visit Project
                    </a>
                  </div>
                </div>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
