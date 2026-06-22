import { Header } from "@/components/site/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-28 pb-32">
        <div className="mb-12">
          <Badge variant="secondary" className="mb-4">Documentation</Badge>
          <h1 className="text-4xl font-semibold tracking-tight mb-4">
            Getting started
          </h1>
          <p className="text-sub text-lg leading-relaxed">
            Sentry UI is a collection of copy-paste agentic dashboard blocks
            built on Next.js, Tailwind v4, and shadcn/ui. There is no package to
            install.
          </p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-3">How it works</h2>
            <p className="text-sub leading-relaxed">
              Browse a template or block, open the source on GitHub, and paste it
              into your project. Each block is self-contained — it brings its own
              types, mock data, and sub-components, so you can drop it straight
              into any Next.js App Router project.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Prerequisites</h2>
            <ul className="space-y-2 text-sub text-sm">
              {[
                "Next.js 15+ with App Router",
                "Tailwind CSS v4",
                "shadcn/ui (new-york style, neutral base)",
                "lucide-react",
                "recharts (for chart blocks)",
                "motion (for animated blocks)",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-white/30 shrink-0" />
                  <span className="font-mono text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">CSS variables</h2>
            <p className="text-sub leading-relaxed text-sm mb-4">
              Blocks use the Sentry brand token set. Copy the{" "}
              <code className="text-white/70 bg-white/5 px-1 py-0.5 rounded text-xs">
                globals.css
              </code>{" "}
              from this repo into your project to get the correct colour system.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link
                href="https://github.com/JamesWeb3/sentry-ui/blob/main/src/app/globals.css"
                target="_blank"
                rel="noopener"
              >
                View globals.css
              </Link>
            </Button>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Brand system</h2>
            <p className="text-sub leading-relaxed text-sm">
              All blocks follow the Sentry brand system. Background:{" "}
              <code className="text-white/70 bg-white/5 px-1 py-0.5 rounded text-xs">#0a0a0b</code>,
              cards:{" "}
              <code className="text-white/70 bg-white/5 px-1 py-0.5 rounded text-xs">bg-white/5 border border-white/10 rounded-xl</code>,
              fonts: Geist + Instrument Serif for accent headlines.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">AI blocks</h2>
            <p className="text-sub leading-relaxed text-sm">
              Blocks tagged AI use a local typewriter simulation for demo purposes.
              In production, wire the{" "}
              <code className="text-white/70 bg-white/5 px-1 py-0.5 rounded text-xs">
                generate
              </code>{" "}
              function to your own API route — Claude, OpenAI, or any streaming
              endpoint. The streaming output pattern is identical to a{" "}
              <code className="text-white/70 bg-white/5 px-1 py-0.5 rounded text-xs">
                text/event-stream
              </code>{" "}
              response consumed with{" "}
              <code className="text-white/70 bg-white/5 px-1 py-0.5 rounded text-xs">
                ReadableStream
              </code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
