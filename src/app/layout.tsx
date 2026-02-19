import type { Metadata } from "next";
import BrutalModeToggle from "@/components/home/BrutalModeToggle";
import { initStoryblok } from "@/storyblok/initStoryblok";
import "./globals.css";

initStoryblok();

export const metadata: Metadata = {
  title: "SIDLEE Microsite",
  description: "Storyblok-powered SIDLEE microsite with contact form",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="fixed right-4 top-4 z-50">
          <BrutalModeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
