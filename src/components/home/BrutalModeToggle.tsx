"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "sidlee-aesthetic";

function getInitialMode() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "brutal";
}

export default function BrutalModeToggle() {
  const [enabled, setEnabled] = useState(getInitialMode);

  useEffect(() => {
    document.documentElement.dataset.brutal = enabled ? "on" : "off";
    window.localStorage.setItem(STORAGE_KEY, enabled ? "brutal" : "clean");
  }, [enabled]);

  return (
    <button
      type="button"
      onClick={() => setEnabled((value) => !value)}
      aria-pressed={enabled}
      className="min-h-11 rounded-2xl border-2 border-black bg-white px-4 text-xs font-bold uppercase tracking-wider transition active:scale-95 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      Aesthetic: {enabled ? "Brutal" : "Clean"}
    </button>
  );
}
