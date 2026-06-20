import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shreyas Pangal — Frontend Engineer",
  description:
    "Frontend engineer in Bengaluru building trust-critical, real-time, and AI-assisted product UIs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="relative min-h-screen bg-bg font-sans text-fg antialiased">
        {/* ambient glow — restrained, from the dark.design/shadergradient reference */}
        <div
          aria-hidden
          className="pointer-events-none fixed -top-45 left-1/2 z-0 h-135 w-195 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--color-accent-soft),transparent_72%)]"
        />
        <div aria-hidden className="grain pointer-events-none fixed inset-0 z-0" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
