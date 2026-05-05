import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-black/30">
      <div className="mx-auto max-w-7xl px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--electric)] to-[var(--neon)] grid place-items-center">
              <Activity className="h-4 w-4 text-background" strokeWidth={2.75} />
            </div>
            <span className="text-sm font-semibold tracking-tight">SENTINEL<span className="text-gradient">.AI</span></span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            AI-powered mobility compliance infrastructure for governments, smart cities, and global enterprises.
          </p>
          <div className="mt-5 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] animate-pulse" /> All systems operational
          </div>
        </div>
        {[
          { h: "Platform", l: ["Workflow", "Live Demo", "Microservices", "API Docs"] },
          { h: "Company", l: ["About", "Careers", "Press", "Contact"] },
        ].map(c => (
          <div key={c.h}>
            <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{c.h}</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.l.map(i => <li key={i}><a href="#" className="hover:text-foreground text-muted-foreground transition">{i}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
          <span>© 2026 Sentinel.AI · Built for the world's enforcement infrastructure</span>
          <span>SOC 2 · ISO 27001 · GDPR · DPDPA</span>
        </div>
      </div>
    </footer>
  );
}
