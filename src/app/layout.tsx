import "./globals.css";
import { initStoryblok } from "@/lib/storyblok";

initStoryblok();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
