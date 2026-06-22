import { Header } from "@/components/site/header";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  CalendarDays,
  Bot,
  Layers,
  Sparkles,
  GitBranch,
  MessageSquare,
  Table2,
  Bell,
  Gauge,
} from "lucide-react";

const BLOCKS = [
  {
    title: "AI Summary Panel",
    description: "Streams a business-context narrative from any structured data payload. Configurable prompt, typewriter output, and re-run trigger.",
    icon: Sparkles,
    tag: "AI",
    status: "live",
    template: "ecommerce",
  },
  {
    title: "Metric Card Grid",
    description: "MoM delta cards with up/down trend indicators and tabular number formatting. Responsive 2 or 4 column grid.",
    icon: BarChart3,
    tag: "Data",
    status: "live",
    template: "ecommerce",
  },
  {
    title: "Content Calendar",
    description: "Monthly planner with status-aware content items, channel icons, and click-to-filter day selection.",
    icon: CalendarDays,
    tag: "Content",
    status: "live",
    template: "content",
  },
  {
    title: "AI Ideation Panel",
    description: "Streaming content idea generator with channel assignment and calendar add action. One-click regeneration.",
    icon: MessageSquare,
    tag: "AI",
    status: "live",
    template: "content",
  },
  {
    title: "Data Table",
    description: "Ranked product/entity table with trend badges, tabular numbers, and hover states. Sortable column headers.",
    icon: Table2,
    tag: "Data",
    status: "live",
    template: "ecommerce",
  },
  {
    title: "Agent Status Rail",
    description: "Live-updating agent run list with claim, log tail, outcome badges, and error states.",
    icon: Bot,
    tag: "Agents",
    status: "soon",
  },
  {
    title: "Knowledge Graph",
    description: "Force-directed graph for visualising entity relationships using react-force-graph-2d with canvas rendering.",
    icon: GitBranch,
    tag: "Graph",
    status: "soon",
  },
  {
    title: "Workflow Stepper",
    description: "Step-by-step pipeline visualiser for multi-agent workflows with status per step.",
    icon: Layers,
    tag: "Workflow",
    status: "soon",
  },
  {
    title: "Notification Rail",
    description: "Real-time notification stream with type badges, read/unread state, and dismiss actions.",
    icon: Bell,
    tag: "UI",
    status: "soon",
  },
  {
    title: "Performance Gauge",
    description: "Circular gauge for AI performance scores, latency, and efficiency metrics.",
    icon: Gauge,
    tag: "Data",
    status: "soon",
  },
];

const TAG_COLORS: Record<string, string> = {
  AI: "text-violet-400 border-violet-400/20 bg-violet-400/8",
  Data: "text-amber-400 border-amber-400/20 bg-amber-400/8",
  Content: "text-pink-400 border-pink-400/20 bg-pink-400/8",
  Agents: "text-sky-400 border-sky-400/20 bg-sky-400/8",
  Graph: "text-emerald-400 border-emerald-400/20 bg-emerald-400/8",
  Workflow: "text-blue-400 border-blue-400/20 bg-blue-400/8",
  UI: "text-white/50 border-white/15 bg-white/5",
};

export default function BlocksPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-28 pb-32">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-white/30 font-mono mb-3">
            Blocks
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Individual{" "}
            <span className="font-[var(--font-instrument-serif,serif)] italic font-normal">
              blocks
            </span>
          </h1>
          <p className="text-sub text-lg max-w-2xl leading-relaxed">
            Composable, copy-paste components for building your own agentic
            dashboards. Each block is self-contained and production-ready.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BLOCKS.map((block) => {
            const Icon = block.icon;
            const tagColor = TAG_COLORS[block.tag] ?? "text-white/50 border-white/10";
            return (
              <div
                key={block.title}
                className={`rounded-xl border bg-white/[0.02] p-5 flex flex-col gap-4 transition-all duration-200 ${
                  block.status === "live"
                    ? "border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                    : "border-white/5 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="size-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
                    <Icon className="size-5 text-white/55" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono border rounded-full px-2 py-0.5 ${tagColor}`}
                    >
                      {block.tag}
                    </span>
                    {block.status === "live" ? (
                      <Badge variant="success" className="text-[10px] py-0">
                        Live
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px] py-0">
                        Soon
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1.5">{block.title}</h3>
                  <p className="text-xs text-sub leading-relaxed">{block.description}</p>
                </div>
                {block.template && (
                  <p className="text-[11px] text-white/25 font-mono mt-auto">
                    Used in{" "}
                    <a
                      href={`/templates/${block.template}`}
                      className="text-white/40 hover:text-white transition-colors underline underline-offset-2"
                    >
                      {block.template} template
                    </a>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
