"use client";

import { useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "portfolio-aesthetic";
const THEME_CHANGE_EVENT = "portfolio-theme-change";

type Mode = "clean" | "brutal";

function subscribe(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      onStoreChange();
    }
  };

  const onThemeChange = () => onStoreChange();

  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
  };
}

function getSnapshot(): Mode {
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "brutal" ? "brutal" : "clean";
}

function getServerSnapshot(): Mode {
  return "clean";
}

export default function BrutalModeToggle() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isBrutal = mode === "brutal";

  useEffect(() => {
    document.documentElement.dataset.brutal = isBrutal ? "on" : "off";
  }, [isBrutal]);

  function onToggle() {
    const nextMode: Mode = isBrutal ? "clean" : "brutal";
    window.localStorage.setItem(STORAGE_KEY, nextMode);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isBrutal}
      className="min-h-11 border border-[var(--line-strong)] bg-[color-mix(in_oklch,var(--paper)_72%,var(--paper-soft))] px-4 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)] shadow-[0_12px_20px_-18px_var(--shadow-hard)] transition-[transform,border-color,background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[var(--line)] hover:text-[var(--ink)] active:scale-[0.98]"
    >
      Palette: {isBrutal ? "Nocturne" : "Studio"}
    </button>
  );
}
