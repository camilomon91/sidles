import ContactForm from "@/components/contact/ContactForm";
import CreativeBriefGenerator from "@/components/contact/CreativeBriefGenerator";

export default function ContactPage() {
  return (
    <main className="site-texture py-16" aria-labelledby="contact-title">
      <div className="page-container">
        <section className="section-space border-2 border-black bg-white p-6 md:p-10">
          <p className="section-kicker">04 / CONTACT</p>
          <h1 id="contact-title" className="mt-3 text-5xl font-black leading-[0.95] md:text-7xl">
            Let&apos;s build something loud.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium">
            Tell me your goal, your constraints, and what success looks like. I&apos;ll reply with a sharp execution
            plan.
          </p>

          <CreativeBriefGenerator />
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
