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
        <div className="video-bg" aria-hidden>
          <video autoPlay loop muted playsInline className="video-bg__media">
            <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
          </video>
          <div className="video-bg__filter" />
        </div>

        <div className="fixed right-4 top-4 z-50">
          <BrutalModeToggle />
        </div>

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
