import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sentry UI — Agentic Workflow Blocks",
  description:
    "Copy-paste agentic dashboard blocks and workflow templates. Built for AI-powered applications.",
  openGraph: {
    title: "Sentry UI — Agentic Workflow Blocks",
    description: "Copy-paste agentic dashboard blocks and workflow templates.",
    url: "https://ui.sentrysolutions.ai",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased bg-[#0a0a0b] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
