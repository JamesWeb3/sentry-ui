"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  Package,
  Users,
  Sparkles,
  RefreshCw,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

// ─── Mock data ─────────────────────────────────────────────────────────────

const REVENUE_DATA = [
  { month: "Jan", revenue: 42800, orders: 312 },
  { month: "Feb", revenue: 38400, orders: 289 },
  { month: "Mar", revenue: 51200, orders: 381 },
  { month: "Apr", revenue: 61700, orders: 445 },
  { month: "May", revenue: 55300, orders: 402 },
  { month: "Jun", revenue: 68900, orders: 518 },
  { month: "Jul", revenue: 72100, orders: 543 },
  { month: "Aug", revenue: 67400, orders: 494 },
  { month: "Sep", revenue: 78300, orders: 579 },
  { month: "Oct", revenue: 84600, orders: 621 },
  { month: "Nov", revenue: 91200, orders: 688 },
  { month: "Dec", revenue: 103400, orders: 779 },
];

const PRODUCTS = [
  { name: "AI Workflow Starter Kit", sku: "AWK-001", sales: 1284, revenue: 89880, trend: 12.4, stock: 482 },
  { name: "Enterprise AIOS License", sku: "EAL-002", sales: 213, revenue: 213000, trend: 8.1, stock: "—" },
  { name: "MCP Connector Bundle", sku: "MCB-003", sales: 956, revenue: 47800, trend: 24.7, stock: 1204 },
  { name: "Knowledge Graph Module", sku: "KGM-004", sales: 648, revenue: 58320, trend: -3.2, stock: 389 },
  { name: "Voice Agent Platform", sku: "VAP-005", sales: 187, revenue: 130900, trend: 31.6, stock: "—" },
];

const METRICS = [
  {
    label: "Total Revenue",
    value: "$815,700",
    delta: "+18.3%",
    up: true,
    icon: DollarSign,
    sub: "vs last year",
  },
  {
    label: "Total Orders",
    value: "5,650",
    delta: "+12.7%",
    up: true,
    icon: ShoppingCart,
    sub: "vs last year",
  },
  {
    label: "Avg Order Value",
    value: "$144.37",
    delta: "+4.9%",
    up: true,
    icon: Package,
    sub: "vs last year",
  },
  {
    label: "Active Customers",
    value: "3,218",
    delta: "-2.1%",
    up: false,
    icon: Users,
    sub: "vs last year",
  },
];

const AI_SUMMARY_LINES = [
  "Revenue grew 18.3% year-over-year to $815,700, driven primarily by strong Q4 performance and the Voice Agent Platform launch in September.",
  "The MCP Connector Bundle saw the highest unit growth at +24.7%, suggesting strong developer adoption of the integration layer.",
  "Average order value increased 4.9% to $144.37, a positive signal given the volume growth — customers are adding more to each order.",
  "The Knowledge Graph Module is the only product with a negative trend (-3.2%). Consider refreshing positioning or bundling with the Starter Kit.",
  "December outperformed all prior months at $103,400 — a 13.6% jump over November. Enterprise renewals and seasonal uplift were the primary drivers.",
  "Recommendation: prioritise Voice Agent and MCP Connector in Q1 marketing spend. Both products are growing fast and have the highest margin profile.",
];

// ─── Custom chart tooltip ────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111] border border-white/10 rounded-lg p-3 shadow-xl text-xs">
      <p className="text-white/40 mb-1">{label}</p>
      <p className="text-white font-medium tabular-nums">
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

// ─── AI Summary block ────────────────────────────────────────────────────────

function AISummaryPanel() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  function start() {
    setLines([]);
    setCurrentLine(0);
    setCharIndex(0);
    setDone(false);
    setRunning(true);
  }

  useEffect(() => {
    if (!running || done) return;
    if (currentLine >= AI_SUMMARY_LINES.length) {
      setDone(true);
      setRunning(false);
      return;
    }
    const target = AI_SUMMARY_LINES[currentLine];
    if (charIndex < target.length) {
      timerRef.current = setTimeout(() => {
        setLines((prev) => {
          const next = [...prev];
          next[currentLine] = (next[currentLine] ?? "") + target[charIndex];
          return next;
        });
        setCharIndex((c) => c + 1);
      }, 12);
    } else {
      timerRef.current = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCharIndex(0);
      }, 80);
    }
    return () => clearTimeout(timerRef.current);
  }, [running, done, currentLine, charIndex]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Sparkles className="size-4 text-violet-400" />
          <span className="text-sm font-medium">AI Business Summary</span>
          {running && (
            <span className="text-xs text-white/30 font-mono flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
              Analysing
            </span>
          )}
          {done && (
            <Badge variant="success" className="text-[10px] py-0">
              Complete
            </Badge>
          )}
        </div>
        <Button size="icon-sm" variant="ghost" onClick={start} disabled={running}>
          <RefreshCw className={`size-3.5 ${running ? "animate-spin" : ""}`} />
        </Button>
      </div>
      <div className="p-6 min-h-[200px]">
        {lines.length === 0 && !running && (
          <div className="flex flex-col items-center justify-center h-36 gap-3">
            <Sparkles className="size-8 text-white/15" />
            <p className="text-sm text-white/30 text-center">
              Run the AI analysis to surface insights from your sales data.
            </p>
            <Button size="sm" onClick={start}>
              <Sparkles className="size-3.5" /> Generate summary
            </Button>
          </div>
        )}
        {lines.length > 0 && (
          <ul className="space-y-3">
            {lines.map((line, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="text-violet-400/60 font-mono text-xs mt-0.5 shrink-0">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span className="text-sub leading-relaxed">
                  {line}
                  {i === currentLine && !done && (
                    <span className="cursor-blink" />
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function EcommerceDashboard() {
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
          <span className="text-sm text-white/60">Ecommerce</span>
          <span className="text-white/15">/</span>
          <span className="text-sm font-medium">Sales Summary Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">Live template</Badge>
          <Button size="sm" variant="outline">
            Copy code
          </Button>
        </div>
      </div>

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Sales Overview</h1>
            <p className="text-sub text-sm mt-1">Full year 2024 — updated daily</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/30 font-mono">FY 2024</span>
            <Button size="sm" variant="outline">
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="rounded-xl border border-white/8 bg-white/[0.02] p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-sub">{m.label}</span>
                  <div className="size-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center">
                    <Icon className="size-3.5 text-white/50" />
                  </div>
                </div>
                <p className="text-2xl font-semibold tabular-nums tracking-tight">
                  {m.value}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {m.up ? (
                    <TrendingUp className="size-3 text-emerald-400" />
                  ) : (
                    <TrendingDown className="size-3 text-rose-400" />
                  )}
                  <span
                    className={`text-xs font-mono ${m.up ? "text-emerald-400" : "text-rose-400"}`}
                  >
                    {m.delta}
                  </span>
                  <span className="text-xs text-white/30">{m.sub}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Revenue area chart */}
          <div className="lg:col-span-2 rounded-2xl border border-white/8 bg-white/[0.02] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-medium">Monthly Revenue</h3>
                <p className="text-xs text-sub mt-0.5">Full year 2024</p>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                $815,700 total
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={REVENUE_DATA} margin={{ left: -20, right: 0, top: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgba(255,255,255,0.12)" />
                    <stop offset="95%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth={1.5}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Orders bar chart */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
            <div className="mb-6">
              <h3 className="text-sm font-medium">Orders per Month</h3>
              <p className="text-xs text-sub mt-0.5">5,650 total</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={REVENUE_DATA} margin={{ left: -30, right: 0, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Bar
                  dataKey="orders"
                  fill="rgba(255,255,255,0.15)"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Products table + AI Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Top products */}
          <div className="lg:col-span-3 rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
              <h3 className="text-sm font-medium">Top Products</h3>
              <span className="text-xs text-white/30 font-mono">by revenue</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left px-6 py-3 text-xs text-white/30 font-normal">Product</th>
                  <th className="text-right px-4 py-3 text-xs text-white/30 font-normal">Sales</th>
                  <th className="text-right px-4 py-3 text-xs text-white/30 font-normal">Revenue</th>
                  <th className="text-right px-6 py-3 text-xs text-white/30 font-normal">Trend</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p, i) => (
                  <tr key={p.sku} className="border-b border-white/4 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="text-white/20 font-mono text-xs w-4">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-white/90 text-xs font-medium leading-tight">{p.name}</p>
                          <p className="text-white/30 text-[10px] font-mono">{p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right text-white/60 tabular-nums text-xs">
                      {p.sales.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 text-right text-white tabular-nums text-xs font-medium">
                      ${p.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <span
                        className={`text-xs font-mono flex items-center justify-end gap-0.5 ${
                          p.trend > 0 ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {p.trend > 0 ? (
                          <TrendingUp className="size-3" />
                        ) : (
                          <TrendingDown className="size-3" />
                        )}
                        {p.trend > 0 ? "+" : ""}
                        {p.trend}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI Summary */}
          <div className="lg:col-span-2">
            <AISummaryPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
