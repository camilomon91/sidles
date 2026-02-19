import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-3 opacity-80">The page you requested does not exist.</p>
      <Link className="mt-6 inline-block rounded-lg border px-4 py-2" href="/">
        Back to home
      </Link>
    </main>
  );
}
