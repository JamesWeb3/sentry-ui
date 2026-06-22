import Link from "next/link";
import { Header } from "@/components/site/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Bot,
  Layers,
  Sparkles,
  GitBranch,
} from "lucide-react";

const TEMPLATES = [
  {
    slug: "ecommerce",
    label: "Ecommerce",
    title: "Sales Summary Dashboard",
    description:
      "Revenue metrics, sales chart, top products table, and a streaming AI summary that reads your numbers and surfaces what matters.",
    icon: BarChart3,
    tags: ["Dashboard", "AI Summary", "Charts", "Tables"],
    status: "live",
    accent: "from-amber-400/10 to-transparent",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-400/10 border-amber-400/20",
  },
  {
    slug: "content",
    label: "Content",
    title: "Content Calendar",
    description:
      "Monthly content plan with AI ideation, status tracking across draft, scheduled, and published, plus AI performance summarisation.",
    icon: CalendarDays,
    tags: ["Calendar", "AI Ideation", "Scheduler", "Content"],
    status: "live",
    accent: "from-violet-400/10 to-transparent",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-400/10 border-violet-400/20",
  },
];

const BLOCKS = [
  {
    title: "AI Summary Panel",
    description: "Streams a business-context summary from any structured data payload.",
    icon: Sparkles,
    tag: "AI",
  },
  {
    title: "Metric Card Grid",
    description: "MoM delta cards with trend sparklines and tabular number formatting.",
    icon: BarChart3,
    tag: "Data",
  },
  {
    title: "Agent Status Rail",
    description: "Live-updating agent run status with log tail and outcome badges.",
    icon: Bot,
    tag: "Agents",
  },
  {
    title: "Knowledge Graph",
    description: "Force-directed graph for visualising entity relationships.",
    icon: GitBranch,
    tag: "Graph",
  },
  {
    title: "Content Calendar",
    description: "Monthly planner with status-aware content items and AI ideation.",
    icon: CalendarDays,
    tag: "Content",
  },
  {
    title: "Workflow Block",
    description: "Composable step-by-step workflow visualiser for multi-agent pipelines.",
    icon: Layers,
    tag: "Workflow",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 md:px-8 overflow-hidden">
        <div className="radial-glow absolute inset-0 pointer-events-none" />
        <div className="bg-dot-grid absolute inset-0 pointer-events-none opacity-60" />
        <div className="max-w-7xl mx-auto relative">
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-3 py-1 mb-8 bg-white/5">
            <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/60 font-mono">v0.1 — Early access</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] max-w-3xl mb-6">
            Agentic workflow{" "}
            <span className="font-[var(--font-instrument-serif,serif)] italic font-normal">
              blocks
            </span>
            <br />
            for AI applications.
          </h1>
          <p className="text-lg text-sub max-w-xl mb-10 leading-relaxed">
            Copy-paste dashboard templates and composable blocks built for AI-powered
            products. Open source, built on shadcn/ui, styled for the Sentry brand
            system.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Button size="lg" asChild>
              <Link href="/templates">
                Browse templates <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href="https://github.com/JamesWeb3/sentry-ui"
                target="_blank"
                rel="noopener"
              >
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="px-6 md:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-white/30 font-mono mb-2">
              Templates
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Full agentic dashboards
            </h2>
            <p className="text-sub mt-2">
              Complete, copy-paste dashboard shells with AI wired in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TEMPLATES.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.slug}
                  href={`/templates/${t.slug}`}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 transition-all duration-300 hover:bg-white/[0.04]"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${t.accent} pointer-events-none`}
                  />
                  <div className="relative p-7">
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={`size-10 rounded-xl border flex items-center justify-center ${t.iconBg}`}
                      >
                        <Icon className={`size-5 ${t.iconColor}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{t.label}</Badge>
                        {t.status === "live" && (
                          <Badge variant="success">Live</Badge>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t.title}</h3>
                    <p className="text-sub text-sm leading-relaxed mb-6">
                      {t.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {t.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] text-white/40 border border-white/8 rounded-full px-2 py-0.5 font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-white/30 group-hover:text-white/60 transition-colors flex items-center gap-1">
                        View <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blocks */}
      <section className="px-6 md:px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-white/30 font-mono mb-2">
              Blocks
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Individual components
            </h2>
            <p className="text-sub mt-2">
              Composable blocks for building your own agentic dashboards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLOCKS.map((block) => {
              const Icon = block.icon;
              return (
                <div
                  key={block.title}
                  className="group rounded-xl border border-white/8 bg-white/[0.02] p-5 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="size-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                      <Icon className="size-4 text-white/60" />
                    </div>
                    <span className="text-[10px] font-mono text-white/30 border border-white/8 rounded-full px-2 py-0.5">
                      {block.tag}
                    </span>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{block.title}</h4>
                  <p className="text-xs text-sub leading-relaxed">
                    {block.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 px-6 md:px-8 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-xs text-white/30">
            Sentry UI — built by{" "}
            <a
              href="https://sentrysolutions.ai"
              target="_blank"
              rel="noopener"
              className="text-white/50 hover:text-white transition-colors"
            >
              Sentry AI
            </a>
          </span>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/JamesWeb3/sentry-ui"
              target="_blank"
              rel="noopener"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://sentrysolutions.ai"
              target="_blank"
              rel="noopener"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Sentry AI
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
