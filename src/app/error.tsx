"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-black">Something broke.</h1>
      <p className="mt-4 text-base">{error.message || "Unexpected error"}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase"
      >
        Try again
      </button>
    </main>
  );
}
