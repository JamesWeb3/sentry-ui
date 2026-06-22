import Link from "next/link";
import { Header } from "@/components/site/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, CalendarDays, ArrowRight } from "lucide-react";

const TEMPLATES = [
  {
    slug: "ecommerce",
    label: "Ecommerce",
    title: "Sales Summary Dashboard",
    description:
      "Revenue metrics, MoM delta cards, area + bar charts, top products table, and a streaming AI business summary panel. Drop this into any ecommerce or SaaS analytics view.",
    icon: BarChart3,
    tags: ["Dashboard", "AI Summary", "Charts", "Tables", "Recharts"],
    accent: "from-amber-400/8 to-transparent",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-400/10 border-amber-400/20",
    blocks: ["Metric Card Grid", "Area Chart", "Bar Chart", "Data Table", "AI Summary Panel"],
  },
  {
    slug: "content",
    label: "Content",
    title: "Content Calendar",
    description:
      "Monthly content planner with status-aware items (draft, scheduled, published), channel tags, AI ideation panel with streaming output, and engagement scoring.",
    icon: CalendarDays,
    tags: ["Calendar", "AI Ideation", "Scheduler", "Content", "Streaming"],
    accent: "from-violet-400/8 to-transparent",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-400/10 border-violet-400/20",
    blocks: ["Calendar Grid", "Content List", "Status Badges", "AI Ideation Panel"],
  },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-28 pb-32">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-white/30 font-mono mb-3">
            Templates
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Agentic dashboard{" "}
            <span className="font-[var(--font-instrument-serif,serif)] italic font-normal">
              templates
            </span>
          </h1>
          <p className="text-sub text-lg max-w-2xl leading-relaxed">
            Full-page dashboard shells with AI wired in. Copy the whole template
            or pull individual blocks into your own layout.
          </p>
        </div>

        <div className="space-y-5">
          {TEMPLATES.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.slug}
                className={`group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden relative`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${t.accent} pointer-events-none`}
                />
                <div className="relative p-8 flex items-start gap-8">
                  <div
                    className={`size-14 rounded-2xl border flex items-center justify-center shrink-0 ${t.iconBg}`}
                  >
                    <Icon className={`size-7 ${t.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="secondary">{t.label}</Badge>
                      <Badge variant="success">Live</Badge>
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight mb-2">
                      {t.title}
                    </h2>
                    <p className="text-sub leading-relaxed mb-5 max-w-2xl">
                      {t.description}
                    </p>
                    <div className="mb-5">
                      <p className="text-xs text-white/30 font-mono mb-2">Blocks included</p>
                      <div className="flex flex-wrap gap-2">
                        {t.blocks.map((b) => (
                          <span
                            key={b}
                            className="text-xs text-white/50 border border-white/8 rounded-full px-2.5 py-1 font-mono"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-white/30 border border-white/6 rounded-full px-2 py-0.5 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <Button asChild>
                        <Link href={`/templates/${t.slug}`}>
                          Open template <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link
                          href={`https://github.com/JamesWeb3/sentry-ui/tree/main/src/app/templates/${t.slug}`}
                          target="_blank"
                          rel="noopener"
                        >
                          View source
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
