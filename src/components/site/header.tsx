import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/8 bg-[#0a0a0b]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="size-6 rounded bg-white/10 border border-white/15 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white tracking-tight">S</span>
            </div>
            <span className="text-sm font-semibold text-white">Sentry UI</span>
            <span className="text-white/20 text-xs">|</span>
            <span className="text-xs text-white/40 font-mono">v0.1</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/templates", label: "Templates" },
              { href: "/blocks", label: "Blocks" },
              { href: "/docs", label: "Docs" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-sm text-white/55 hover:text-white transition-colors rounded-md hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/JamesWeb3/sentry-ui"
            target="_blank"
            rel="noopener"
            className="text-white/40 hover:text-white transition-colors"
          >
            <ExternalLink className="size-4" />
          </Link>
          <Button size="sm" asChild>
            <Link href="https://sentrysolutions.ai" target="_blank" rel="noopener">
              Sentry AI
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
