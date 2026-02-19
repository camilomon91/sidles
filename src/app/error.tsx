"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Unhandled app error", error.message);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 opacity-80">Please retry. If it keeps happening, contact support.</p>
      <button className="mt-6 rounded-lg border px-4 py-2" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
