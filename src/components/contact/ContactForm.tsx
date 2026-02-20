"use client";

import { motion } from "framer-motion";
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

    const form = new FormData(event.currentTarget);
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

      if (nextFieldErrors.email?.length) emailRef.current?.focus();
      else if (nextFieldErrors.message?.length) messageRef.current?.focus();
      return;
    }

    event.currentTarget.reset();
    setFieldErrors({});
    setStatus("ok");
  }

  return (
    <motion.form
      noValidate
      onSubmit={onSubmit}
      className="contactForm"
      aria-live="polite"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          ref={emailRef}
          type="email"
          required
          onBlur={(event) => setClientFieldError("email", event.target.value)}
          aria-invalid={Boolean(fieldErrors.email?.length)}
          aria-describedby={fieldErrors.email?.length ? "email-error" : undefined}
          placeholder="you@domain.com"
        />
        {fieldErrors.email?.length ? (
          <p id="email-error" className="errorText">
            {fieldErrors.email[0]}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          ref={messageRef}
          required
          onBlur={(event) => setClientFieldError("message", event.target.value)}
          aria-invalid={Boolean(fieldErrors.message?.length)}
          aria-describedby={fieldErrors.message?.length ? "message-error" : undefined}
          placeholder="Tell me about your project, constraints, and objective."
        />
        {fieldErrors.message?.length ? (
          <p id="message-error" className="errorText">
            {fieldErrors.message[0]}
          </p>
        ) : null}
      </div>

      <button className="cta cta-primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send"}
      </button>

      {status === "ok" && <p className="successText">Sent ✅</p>}
      {status === "error" && <p className="errorText">{errorMessage}</p>}
    </motion.form>
  );
}
