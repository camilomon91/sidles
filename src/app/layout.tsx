import type { Metadata } from "next";
import "./globals.css";
import { initStoryblok } from "@/storyblok/initStoryblok";

initStoryblok();

export const metadata: Metadata = {
  title: "SIDLEE Microsite",
  description: "Storyblok-powered SIDLEE microsite with contact form",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
