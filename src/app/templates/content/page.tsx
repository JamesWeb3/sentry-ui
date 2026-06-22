"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Send,
  RefreshCw,
  Instagram,
  Linkedin,
  Twitter,
  Globe,
  Clock,
  CheckCircle2,
  FileText,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ─── Types & data ────────────────────────────────────────────────────────────

type ContentStatus = "draft" | "scheduled" | "published";
type ContentChannel = "linkedin" | "instagram" | "twitter" | "blog";

interface ContentItem {
  id: number;
  day: number;
  title: string;
  channel: ContentChannel;
  status: ContentStatus;
  time?: string;
  score?: number;
}

const CHANNEL_META: Record<ContentChannel, { icon: React.ElementType; color: string; label: string }> = {
  linkedin: { icon: Linkedin, color: "text-sky-400", label: "LinkedIn" },
  instagram: { icon: Instagram, color: "text-pink-400", label: "Instagram" },
  twitter: { icon: Twitter, color: "text-blue-400", label: "X / Twitter" },
  blog: { icon: Globe, color: "text-emerald-400", label: "Blog" },
};

const STATUS_META: Record<ContentStatus, { label: string; variant: "success" | "warning" | "secondary"; icon: React.ElementType }> = {
  draft: { label: "Draft", variant: "secondary", icon: FileText },
  scheduled: { label: "Scheduled", variant: "warning", icon: Clock },
  published: { label: "Published", variant: "success", icon: CheckCircle2 },
};

const CONTENT_ITEMS: ContentItem[] = [
  { id: 1, day: 2, title: "How we reduced client onboarding time by 70% with AI agents", channel: "linkedin", status: "published", time: "9:00 AM", score: 91 },
  { id: 2, day: 2, title: "Behind-the-scenes: building an MCP connector", channel: "instagram", status: "published", time: "12:00 PM", score: 74 },
  { id: 3, day: 5, title: "Knowledge graphs explained in 5 diagrams", channel: "blog", status: "published", time: "8:00 AM", score: 88 },
  { id: 4, day: 7, title: "What does an AI Operating System actually do?", channel: "linkedin", status: "published", time: "9:30 AM", score: 96 },
  { id: 5, day: 9, title: "Voice agent call volume milestone thread", channel: "twitter", status: "published", time: "11:00 AM", score: 82 },
  { id: 6, day: 12, title: "3 signs your business is ready for AI infrastructure", channel: "linkedin", status: "scheduled", time: "9:00 AM" },
  { id: 7, day: 14, title: "Agent architecture breakdown — real client build", channel: "blog", status: "scheduled", time: "8:00 AM" },
  { id: 8, day: 16, title: "Reel: live demo of our discovery tool", channel: "instagram", status: "scheduled", time: "7:00 PM" },
  { id: 9, day: 19, title: "The difference between automation and an AIOS", channel: "linkedin", status: "draft" },
  { id: 10, day: 21, title: "Quarterly AI audit — are you getting ROI?", channel: "blog", status: "draft" },
  { id: 11, day: 23, title: "Hot take: most AI chatbots are glorified search bars", channel: "twitter", status: "draft" },
  { id: 12, day: 26, title: "Case study drop: ecommerce brand + AI agents", channel: "linkedin", status: "draft" },
];

const DAYS_OF_WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const AI_IDEAS = [
  "Write about the ROI of connecting your existing AI subscription (Copilot, Claude, ChatGPT) to your company data — most businesses pay for tools they use at 30% of their potential.",
  "Create a comparison post: manual data retrieval vs. AI agent retrieval. Show a concrete before/after for a sales team pulling pipeline context.",
  "Share a short breakdown of what a Knowledge Graph actually stores — dispel the mystery with a real diagram and three concrete examples from a client build.",
  "Post a behind-the-scenes thread on what happens during a Discovery Week — the process, the artefacts, and what the output looks like for the client.",
  "Write a myth-busting post: 'You need a massive budget to deploy AI agents.' Walk through a real lean setup that delivered ROI inside 30 days.",
];

// ─── Calendar ────────────────────────────────────────────────────────────────

function Calendar({
  year,
  month,
  items,
  selectedDay,
  onSelect,
}: {
  year: number;
  month: number;
  items: ContentItem[];
  selectedDay: number | null;
  onSelect: (day: number) => void;
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = 15;

  const itemsByDay = items.reduce<Record<number, ContentItem[]>>((acc, item) => {
    acc[item.day] = acc[item.day] ?? [];
    acc[item.day].push(item);
    return acc;
  }, {});

  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="text-center text-[11px] text-white/25 font-mono py-2">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-white/6 rounded-xl overflow-hidden border border-white/6">
        {cells.map((day, i) => {
          const dayItems = day ? (itemsByDay[day] ?? []) : [];
          const isToday = day === today;
          const isSelected = day === selectedDay;
          return (
            <button
              key={i}
              onClick={() => day && onSelect(day)}
              disabled={!day}
              className={`relative min-h-[72px] p-2 text-left transition-colors ${
                day ? "bg-[#0d0d0e] hover:bg-white/[0.04]" : "bg-[#0a0a0b]"
              } ${isSelected ? "!bg-white/[0.07]" : ""}`}
            >
              {day && (
                <>
                  <span
                    className={`text-xs font-mono block mb-1.5 ${
                      isToday
                        ? "w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold"
                        : isSelected
                        ? "text-white"
                        : "text-white/30"
                    }`}
                  >
                    {day}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    {dayItems.slice(0, 2).map((item) => {
                      const ch = CHANNEL_META[item.channel];
                      return (
                        <div
                          key={item.id}
                          className={`w-full h-1.5 rounded-full opacity-70 ${
                            item.status === "published"
                              ? "bg-emerald-400"
                              : item.status === "scheduled"
                              ? "bg-amber-400"
                              : "bg-white/20"
                          }`}
                        />
                      );
                    })}
                    {dayItems.length > 2 && (
                      <span className="text-[9px] text-white/25 font-mono">
                        +{dayItems.length - 2}
                      </span>
                    )}
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 px-1">
        {[
          { color: "bg-emerald-400", label: "Published" },
          { color: "bg-amber-400", label: "Scheduled" },
          { color: "bg-white/20", label: "Draft" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`size-1.5 rounded-full ${l.color}`} />
            <span className="text-[10px] text-white/30">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── AI Ideation panel ───────────────────────────────────────────────────────

function AIIdeationPanel() {
  const [input, setInput] = useState("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const charRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  function generate() {
    if (streaming) return;
    const target = AI_IDEAS[Math.floor(Math.random() * AI_IDEAS.length)];
    setCurrentText("");
    charRef.current = 0;
    setStreaming(true);

    function tick() {
      if (charRef.current < target.length) {
        setCurrentText(target.slice(0, charRef.current + 1));
        charRef.current++;
        timerRef.current = setTimeout(tick, 14);
      } else {
        setIdeas((prev) => [target, ...prev].slice(0, 4));
        setCurrentText("");
        setStreaming(false);
      }
    }
    tick();
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden h-full flex flex-col">
      <div className="px-5 py-4 border-b border-white/8 flex items-center gap-2.5">
        <Sparkles className="size-4 text-violet-400" />
        <span className="text-sm font-medium">AI Content Ideation</span>
        {streaming && (
          <span className="size-1.5 rounded-full bg-violet-400 animate-pulse inline-block ml-auto" />
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-b border-white/6">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Topic, goal, or audience..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/20 transition-colors"
            onKeyDown={(e) => e.key === "Enter" && generate()}
          />
          <Button size="icon-sm" onClick={generate} disabled={streaming}>
            {streaming ? <RefreshCw className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
          </Button>
        </div>
      </div>

      {/* Ideas */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {streaming && (
          <div className="rounded-xl border border-violet-400/20 bg-violet-400/5 p-4">
            <p className="text-sm text-white/80 leading-relaxed">
              {currentText}
              <span className="cursor-blink" />
            </p>
          </div>
        )}
        {ideas.map((idea, i) => (
          <div
            key={i}
            className="group rounded-xl border border-white/8 bg-white/[0.02] p-4 hover:border-white/15 transition-colors"
          >
            <p className="text-sm text-sub leading-relaxed mb-3">{idea}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {(["linkedin", "blog", "twitter"] as ContentChannel[]).map((ch) => {
                  const meta = CHANNEL_META[ch];
                  const Icon = meta.icon;
                  return (
                    <button key={ch} className={`text-white/20 hover:${meta.color} transition-colors`}>
                      <Icon className="size-3.5" />
                    </button>
                  );
                })}
              </div>
              <button className="text-xs text-white/30 hover:text-white/60 transition-colors flex items-center gap-1">
                <Plus className="size-3" /> Add to calendar
              </button>
            </div>
          </div>
        ))}
        {ideas.length === 0 && !streaming && (
          <div className="flex flex-col items-center justify-center h-32 gap-2 text-center">
            <Sparkles className="size-7 text-white/10" />
            <p className="text-xs text-white/25">
              Describe your goal and generate content ideas.
            </p>
            <Button size="sm" variant="outline" onClick={generate}>
              Generate idea
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Content list ─────────────────────────────────────────────────────────────

function ContentList({
  items,
  selectedDay,
}: {
  items: ContentItem[];
  selectedDay: number | null;
}) {
  const filtered = selectedDay
    ? items.filter((i) => i.day === selectedDay)
    : items;

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">
            {selectedDay ? `June ${selectedDay} — Content` : "All content"}
          </h3>
          <p className="text-[11px] text-white/30 mt-0.5 font-mono">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        {selectedDay && (
          <Button size="sm" variant="ghost" className="text-xs">
            Clear filter
          </Button>
        )}
      </div>
      <div className="divide-y divide-white/5">
        {filtered.map((item) => {
          const ch = CHANNEL_META[item.channel];
          const ChIcon = ch.icon;
          const st = STATUS_META[item.status];
          const StIcon = st.icon;
          return (
            <div
              key={item.id}
              className="px-6 py-4 flex items-start gap-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="size-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0 mt-0.5">
                <ChIcon className={`size-3.5 ${ch.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/90 font-medium leading-snug line-clamp-1">
                  {item.title}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs text-white/30">{ch.label}</span>
                  {item.time && (
                    <>
                      <span className="text-white/15">·</span>
                      <span className="text-xs text-white/30 font-mono">{item.time}</span>
                    </>
                  )}
                  {item.score && (
                    <>
                      <span className="text-white/15">·</span>
                      <span className="text-xs text-emerald-400 font-mono">{item.score} score</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={st.variant} className="text-[10px] gap-1 py-0">
                  <StIcon className="size-2.5" />
                  {st.label}
                </Badge>
                <button className="text-white/15 hover:text-white/40 transition-colors">
                  <MoreHorizontal className="size-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Stats row ────────────────────────────────────────────────────────────────

const STAT_ITEMS = [
  { label: "Published", value: "5", variant: "success" as const },
  { label: "Scheduled", value: "3", variant: "warning" as const },
  { label: "Draft", value: "4", variant: "secondary" as const },
  { label: "Avg score", value: "86.2", variant: "default" as const },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ContentCalendarPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  function handleDaySelect(day: number) {
    setSelectedDay((prev) => (prev === day ? null : day));
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Topbar */}
      <div className="border-b border-white/8 px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 z-40 bg-[#0a0a0b]/90 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-white/40 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
          >
            <ArrowLeft className="size-3.5" /> Sentry UI
          </Link>
          <span className="text-white/15">/</span>
          <span className="text-sm text-white/60">Content</span>
          <span className="text-white/15">/</span>
          <span className="text-sm font-medium">Content Calendar</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">Live template</Badge>
          <Button size="sm" variant="outline">
            Copy code
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Content Calendar</h1>
            <p className="text-sub text-sm mt-1">June 2025 — AI-assisted content planning</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-white/30 hover:text-white transition-colors">
              <ChevronLeft className="size-5" />
            </button>
            <span className="text-sm font-mono text-white/60 w-24 text-center">Jun 2025</span>
            <button className="text-white/30 hover:text-white transition-colors">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 flex-wrap">
          {STAT_ITEMS.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2.5 border border-white/8 rounded-lg px-4 py-2.5"
            >
              <span className="text-xl font-semibold tabular-nums">{s.value}</span>
              <Badge variant={s.variant} className="text-[10px]">
                {s.label}
              </Badge>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Calendar */}
          <div className="xl:col-span-3">
            <Calendar
              year={2025}
              month={5}
              items={CONTENT_ITEMS}
              selectedDay={selectedDay}
              onSelect={handleDaySelect}
            />
          </div>

          {/* AI Ideation */}
          <div className="xl:col-span-2 min-h-[460px]">
            <AIIdeationPanel />
          </div>
        </div>

        {/* Content list */}
        <ContentList items={CONTENT_ITEMS} selectedDay={selectedDay} />
      </div>
    </div>
  );
}
