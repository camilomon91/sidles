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

type PackPhase = "idle" | "tearing" | "revealed";

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
  const [packPhase, setPackPhase] = useState<PackPhase>("idle");
  const [openingToken, setOpeningToken] = useState(0);

  function openPack() {
    if (packPhase === "tearing" || cardPool.length === 0) {
      return;
    }

    const nextPack = buildPack(cardPool);
    setPackPhase("tearing");
    setOpeningToken((prev) => prev + 1);

    window.setTimeout(() => {
      setPack(nextPack);
      setFlipped({});
      setPackPhase("revealed");
    }, 900);
  }

  function toggleCard(id: string) {
    setFlipped((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <section className="section-space border-2 border-black bg-white p-6 md:p-10">
      <p className="section-kicker">Pokémon Inspired Experience</p>
      <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Rip Open a SIDLEE Tag Pack</h1>
      <p className="mt-5 max-w-3xl text-lg font-medium">
        Cards are generated from Storyblok&apos;s <strong>projects</strong> section. Tear open the pack, then flip each pull to inspect stats.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[360px_1fr]">
        <div className="rounded-2xl border-2 border-black bg-zinc-50 p-5">
          <div className="relative mx-auto h-[460px] w-[280px] [perspective:1200px]">
            <button
              type="button"
              onClick={openPack}
              disabled={cardPool.length === 0 || packPhase === "tearing"}
              aria-label="Open tag pack"
              className="absolute inset-0"
            >
              <div
                className={`absolute inset-0 overflow-hidden rounded-3xl border-2 border-black bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 p-4 text-left transition duration-700 ${
                  packPhase === "tearing" ? "-translate-y-10 rotate-2 scale-105 opacity-50" : ""
                }`}
              >
                <div className="h-full rounded-2xl border-2 border-black bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.9),rgba(255,255,255,0)_40%),linear-gradient(145deg,rgba(0,0,0,0.15),rgba(0,0,0,0.05))] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em]">SIDLEE Trading Pack</p>
                  <p className="mt-2 text-4xl font-black leading-none">PROJECT</p>
                  <p className="text-4xl font-black leading-none">COLLECTOR</p>
                  <div className="mt-6 rounded-xl border-2 border-black bg-white/80 p-3">
                    <p className="text-xs font-bold uppercase tracking-wide">Guaranteed:</p>
                    <ul className="mt-2 text-sm font-bold">
                      <li>• 5 Project pulls</li>
                      <li>• 1+ shiny rarity</li>
                      <li>• Flip interaction</li>
                    </ul>
                  </div>
                  <p className="mt-6 text-sm font-black uppercase tracking-widest">Tap to tear</p>
                </div>
                <div
                  className={`absolute left-0 right-0 top-0 h-11 border-b-2 border-black bg-yellow-100 transition duration-700 ${
                    packPhase === "tearing" ? "-translate-y-7" : ""
                  }`}
                >
                  <div className="mx-auto mt-3 h-1.5 w-28 rounded-full bg-black/60" />
                </div>
              </div>
            </button>

            <div
              className={`pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-300/30 via-fuchsia-300/20 to-transparent blur-2xl transition ${
                packPhase === "tearing" ? "opacity-100" : "opacity-40"
              }`}
            />
          </div>

          <p className="mt-5 text-center text-xs font-semibold uppercase tracking-widest opacity-70">
            {packPhase === "tearing" ? "Opening..." : "Pack size: 5 cards"}
          </p>
          {usingFallback ? (
            <p className="mt-4 rounded-lg border-2 border-black bg-white p-3 text-xs font-semibold">
              Storyblok project cards are unavailable, so a demo card pool is active.
            </p>
          ) : null}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pack.length === 0 ? (
            <p className="rounded-2xl border-2 border-dashed border-black p-5 text-sm font-semibold opacity-70 md:col-span-2 xl:col-span-3">
              Tear the tag pack to reveal your project pulls.
            </p>
          ) : null}

          {pack.map((card, index) => {
            const isFlipped = Boolean(flipped[card.id]);

            return (
              <article
                key={`${openingToken}-${card.id}`}
                className={`group [perspective:1200px] transition duration-500 ${rarityToGlow(card.rarity)} ${
                  packPhase === "revealed" ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 110}ms` }}
              >
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
                      <a
                        href={card.link}
                        className="mt-4 inline-block rounded-lg border border-white px-3 py-2 text-xs font-bold uppercase tracking-widest"
                      >
                        Visit Project
                      </a>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
