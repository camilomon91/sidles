"use client";

import { useEffect, useState } from "react";

export default function BrutalModeToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.brutal = enabled ? "on" : "off";
  }, [enabled]);

  return (
    <button
      type="button"
      onClick={() => setEnabled((value) => !value)}
      aria-pressed={enabled}
      className="min-h-11 rounded-2xl border-2 border-black bg-white px-4 text-xs font-bold uppercase tracking-wider transition active:scale-95 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      Brutal mode: {enabled ? "on" : "off"}
    </button>
  );
}
