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
          ? "inline-flex min-h-11 items-center justify-center rounded-2xl border-2 border-black bg-lime-300 px-6 py-3 text-sm font-bold uppercase tracking-wide transition active:scale-95 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#111] focus-visible:outline-2 focus-visible:outline-offset-2"
          : "inline-flex min-h-11 items-center justify-center rounded-2xl border-2 border-black bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide transition active:scale-95 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2"
      }
    >
      {children}
    </Link>
  );
}
