"use client";

import { useRef, useState } from "react";

type FieldErrors = Partial<Record<"email" | "message", string[]>>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    setFieldErrors({});

    const form = new FormData(event.currentTarget);
    const payload = {
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
      website: String(form.get("website") || ""),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setErrorMessage(data?.error?.message || "Something went wrong.");
      const nextFieldErrors = (data?.error?.fieldErrors || {}) as FieldErrors;
      setFieldErrors(nextFieldErrors);

      if (nextFieldErrors.email?.length) {
        emailRef.current?.focus();
      } else if (nextFieldErrors.message?.length) {
        messageRef.current?.focus();
      }
      return;
    }

    event.currentTarget.reset();
    setStatus("ok");
  }

  return (
    <form noValidate onSubmit={onSubmit} className="mt-6 grid gap-4" aria-live="polite">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

      <div className="grid gap-1">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          ref={emailRef}
          type="email"
          required
          aria-invalid={Boolean(fieldErrors.email?.length)}
          aria-describedby={fieldErrors.email?.length ? "email-error" : undefined}
          className="rounded-lg border p-3 focus-visible:outline-2 focus-visible:outline-offset-2"
        />
        {fieldErrors.email?.length ? (
          <p id="email-error" className="text-sm text-red-600">
            {fieldErrors.email[0]}
          </p>
        ) : null}
      </div>

      <div className="grid gap-1">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          ref={messageRef}
          required
          aria-invalid={Boolean(fieldErrors.message?.length)}
          aria-describedby={fieldErrors.message?.length ? "message-error" : undefined}
          className="min-h-[140px] rounded-lg border p-3 focus-visible:outline-2 focus-visible:outline-offset-2"
        />
        {fieldErrors.message?.length ? (
          <p id="message-error" className="text-sm text-red-600">
            {fieldErrors.message[0]}
          </p>
        ) : null}
      </div>

      <button
        className="rounded-lg border px-4 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Send"}
      </button>

      {status === "ok" && <p className="opacity-80">Sent ✅</p>}
      {status === "error" && <p className="opacity-80 text-red-700">{errorMessage}</p>}
    </form>
  );
}
