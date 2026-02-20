import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Propel — Sid Lee Internship Creative Execution",
  description: "An interactive full-stack concept built for the Sid Lee Full-Stack Developer internship.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
