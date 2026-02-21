"use client";

import { useRef, useState } from "react";

type FieldErrors = Partial<Record<"email" | "message", string[]>>;

function validateField(name: "email" | "message", value: string) {
  if (name === "email") {
    const trimmed = value.trim();
    if (!trimmed) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) return "Enter a valid email address";
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) return "Message is required";
  if (trimmed.length < 10) return "Message must be at least 10 characters";
  if (trimmed.length > 1200) return "Message must be 1200 characters or less";
  return null;
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function setClientFieldError(name: "email" | "message", value: string) {
    const maybeError = validateField(name, value);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: maybeError ? [maybeError] : undefined,
    }));
    return maybeError;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
      website: String(form.get("website") || ""),
    };

    const emailError = setClientFieldError("email", payload.email);
    const messageError = setClientFieldError("message", payload.message);

    if (emailError || messageError) {
      setStatus("error");
      setErrorMessage("Please fix the highlighted fields.");
      if (emailError) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

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

      formElement.reset();
      setFieldErrors({});
      setStatus("ok");
    } catch {
      setStatus("error");
      setErrorMessage("We couldn't send your message. Please try again.");
    }
  }

  async function onCopyMessage() {
    const message = messageRef.current?.value?.trim();
    if (!message) return;

    await navigator.clipboard.writeText(message);
    setCopyState("copied");
    setTimeout(() => setCopyState("idle"), 1500);
  }

  return (
    <div className="mt-8 grid gap-5">
      <button
        type="button"
        onClick={onCopyMessage}
        className="min-h-11 w-fit rounded-2xl border-2 border-black bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide transition active:scale-95 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Copy message
      </button>
      {copyState === "copied" ? <p className="text-sm font-bold">Copied to clipboard ✅</p> : null}

      <form noValidate onSubmit={onSubmit} className="grid gap-5" aria-live="polite">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-bold uppercase tracking-wide">
            Email
          </label>
          <input
            id="email"
            name="email"
            ref={emailRef}
            type="email"
            required
            onBlur={(event) => setClientFieldError("email", event.target.value)}
            aria-invalid={Boolean(fieldErrors.email?.length)}
            aria-describedby={fieldErrors.email?.length ? "email-error" : undefined}
            className="min-h-12 rounded-2xl border-2 border-black bg-white px-4 text-base focus-visible:outline-2 focus-visible:outline-offset-2"
          />
          {fieldErrors.email?.length ? (
            <p id="email-error" className="text-sm font-semibold text-red-600">
              {fieldErrors.email[0]}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-bold uppercase tracking-wide">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            ref={messageRef}
            required
            onBlur={(event) => setClientFieldError("message", event.target.value)}
            aria-invalid={Boolean(fieldErrors.message?.length)}
            aria-describedby={fieldErrors.message?.length ? "message-error" : undefined}
            className="min-h-[180px] rounded-2xl border-2 border-black bg-white p-4 text-base focus-visible:outline-2 focus-visible:outline-offset-2"
          />
          {fieldErrors.message?.length ? (
            <p id="message-error" className="text-sm font-semibold text-red-600">
              {fieldErrors.message[0]}
            </p>
          ) : null}
        </div>

        <button
          className="min-h-12 rounded-2xl border-2 border-black bg-lime-300 px-6 py-3 text-sm font-bold uppercase tracking-wide transition active:scale-95 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#111] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-70"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send message"}
        </button>

        {status === "ok" && <p className="animate-fade-up text-base font-bold">Sent. ✅ I&apos;ll reply soon.</p>}
        {status === "error" && <p className="text-base font-semibold text-red-700">{errorMessage}</p>}
      </form>
    </div>
  );
}
