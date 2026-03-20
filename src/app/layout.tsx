import type { Metadata } from "next";
import BrutalModeToggle from "@/components/home/BrutalModeToggle";
import { initStoryblok } from "@/storyblok/initStoryblok";
import "./globals.css";

initStoryblok();

export const metadata: Metadata = {
  title: "Camilo Montero Portfolio",
  description: "Storyblok-powered portfolio and contact microsite.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="theme-toggle-wrap">
          <BrutalModeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
