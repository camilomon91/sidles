import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export default function Button({ href, children, variant = "primary" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={
        variant === "primary"
          ? "inline-flex min-h-11 items-center justify-center border border-[var(--line-strong)] bg-[color-mix(in_oklch,var(--accent-soft)_62%,var(--paper-soft))] px-6 py-3 text-xs font-semibold uppercase tracking-[0.17em] text-[var(--ink)] transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_22px_-18px_var(--shadow-hard)] active:scale-[0.985]"
          : "inline-flex min-h-11 items-center justify-center border border-[var(--line)] bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.17em] text-[var(--ink-muted)] transition-[transform,border-color,color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:bg-[color-mix(in_oklch,var(--paper-strong)_65%,var(--paper-soft))] hover:text-[var(--ink)] active:scale-[0.985]"
      }
    >
      {children}
    </Link>
  );
}
