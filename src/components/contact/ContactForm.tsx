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

    try {
      await navigator.clipboard.writeText(message);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1500);
    } catch {
      setCopyState("idle");
    }
  }

  return (
    <div className="mt-8 grid gap-5">
      <button
        type="button"
        onClick={onCopyMessage}
        className="min-h-11 w-fit border border-[var(--line)] bg-transparent px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)] transition-[transform,border-color,color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:bg-[color-mix(in_oklch,var(--paper-strong)_65%,var(--paper-soft))] hover:text-[var(--ink)] active:scale-[0.985]"
      >
        Copy message
      </button>
      {copyState === "copied" ? <p className="form-status is-success">Copied message to clipboard.</p> : null}

      <form noValidate onSubmit={onSubmit} className="grid gap-5" aria-live="polite">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

        <div className="grid gap-2">
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">
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
            className="form-field"
          />
          {fieldErrors.email?.length ? (
            <p id="email-error" className="text-sm font-semibold text-[color-mix(in_oklch,var(--danger)_76%,var(--ink))]">
              {fieldErrors.email[0]}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">
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
            className="form-area"
          />
          {fieldErrors.message?.length ? (
            <p id="message-error" className="text-sm font-semibold text-[color-mix(in_oklch,var(--danger)_76%,var(--ink))]">
              {fieldErrors.message[0]}
            </p>
          ) : null}
        </div>

        <button
          className="min-h-12 border border-[var(--line-strong)] bg-[color-mix(in_oklch,var(--accent-soft)_72%,var(--paper-soft))] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink)] transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_24px_-20px_var(--shadow-hard)] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send message"}
        </button>

        {status === "ok" && <p className="form-status is-success animate-fade-up">Sent. I&apos;ll reply soon.</p>}
        {status === "error" && <p className="form-status is-error">{errorMessage}</p>}
      </form>
    </div>
  );
}
