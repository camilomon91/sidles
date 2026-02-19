"use client";

import { useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "sidlee-aesthetic";
const THEME_CHANGE_EVENT = "sidlee-theme-change";

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
      className="min-h-11 rounded-2xl border-2 border-black bg-white px-4 text-xs font-bold uppercase tracking-wider transition active:scale-95 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      Aesthetic: {isBrutal ? "Brutal" : "Clean"}
    </button>
  );
}
