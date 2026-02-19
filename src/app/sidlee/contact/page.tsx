import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="p-8 max-w-xl" aria-labelledby="contact-title">
      <h1 id="contact-title" className="text-3xl font-bold">
        Contact
      </h1>
      <ContactForm />
    </main>
  );
}
