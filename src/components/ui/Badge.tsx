export default function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex min-h-11 items-center rounded-full border-2 border-black px-4 text-xs font-bold uppercase tracking-wide">
      {label}
    </span>
  );
}
