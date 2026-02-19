export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <article
      className={`group rounded-3xl border-2 border-black bg-white p-6 shadow-[8px_8px_0_0_#111] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_0_#111] ${className}`}
    >
      {children}
    </article>
  );
}
