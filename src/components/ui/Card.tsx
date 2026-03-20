export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <article
      className={`group border border-[var(--line-strong)] bg-[color-mix(in_oklch,var(--paper-soft)_82%,var(--paper))] p-6 shadow-[0_14px_24px_-20px_var(--shadow-hard)] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_22px_36px_-24px_var(--shadow-hard)] ${className}`}
    >
      {children}
    </article>
  );
}
