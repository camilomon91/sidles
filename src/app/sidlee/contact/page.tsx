"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.currentTarget);
    const payload = {
      email: form.get("email"),
      message: form.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStatus(res.ok ? "ok" : "error");
  }

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-3xl font-bold">Contact</h1>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-1">
          <span>Email</span>
          <input name="email" type="email" required className="border p-3 rounded-lg" />
        </label>

        <label className="grid gap-1">
          <span>Message</span>
          <textarea name="message" required className="border p-3 rounded-lg min-h-[140px]" />
        </label>

        <button
          className="rounded-lg border px-4 py-3 font-semibold"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send"}
        </button>

        {status === "ok" && <p className="opacity-80">Sent ✅</p>}
        {status === "error" && <p className="opacity-80">Error ❌</p>}
      </form>
    </div>
  );
}
