import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="site-texture py-16" aria-labelledby="contact-title">
      <div className="page-container">
        <section className="studio-sheet section-space motion-enter">
          <p className="section-kicker">04 / CONTACT</p>
          <h1 id="contact-title" className="hero-title mt-3 max-w-4xl">
            Let&apos;s build something precise, bold, and impossible to ignore.
          </h1>
          <p className="mt-5 max-w-3xl text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-[var(--ink-muted)]">
            Share your outcome, constraints, and timeline. I&apos;ll reply with a focused execution path you can act on
            immediately.
          </p>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
