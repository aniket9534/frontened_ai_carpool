import { ArrowRight, Play, ShieldCheck, Cpu, Radio } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-28">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-x-0 top-0 h-[80vh]" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute left-1/2 top-32 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-3xl opacity-40" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--electric) 50%, transparent), transparent 70%)" }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full pl-1.5 pr-4 py-1.5 text-xs">
            <span className="rounded-full bg-[var(--neon)]/15 text-[var(--neon)] px-2 py-0.5 font-mono uppercase tracking-wider text-[10px]">Live</span>
            <span className="text-muted-foreground">v4.2 · Edge inference now sub-80ms</span>
          </div>

          <h1 className="mt-6 max-w-5xl text-balance text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[1.02]">
            AI Carpool Compliance.
            <br />
            <span className="text-gradient">Detect. Track. Count. Enforce.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base md:text-lg text-muted-foreground leading-relaxed">
            Real-time vehicle occupancy enforcement powered by computer vision, OCR, and violation analytics — built for governments, traffic authorities, smart cities, toll systems, and enterprises.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#demo" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--electric)] to-[var(--neon)] text-background font-medium px-5 py-3 text-sm shadow-[0_10px_40px_-10px_var(--electric)] hover:scale-[1.02] transition">
              <Play className="h-4 w-4" /> Try Live Demo
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full glass-strong px-5 py-3 text-sm font-medium hover:bg-white/[0.06] transition">
              Book Enterprise Solution
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground font-mono uppercase tracking-wider">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-[var(--neon)]"/> SOC 2 Type II</span>
            <span className="inline-flex items-center gap-2"><Cpu className="h-3.5 w-3.5 text-[var(--electric)]"/> NVIDIA Metropolis</span>
            <span className="inline-flex items-center gap-2"><Radio className="h-3.5 w-3.5 text-[var(--neon)]"/> ISO 27001</span>
            <span>· GDPR · DPDPA</span>
          </div>
        </div>

        <HeroDashboard />
      </div>
    </section>
  );
}

function HeroDashboard() {
  return (
    <div className="relative mx-auto mt-16 max-w-6xl">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[var(--electric)]/40 via-white/5 to-transparent blur-sm" />
      <div className="relative glass-strong rounded-2xl p-3 shadow-card">
        <div className="rounded-xl overflow-hidden bg-[oklch(0.14_0.02_250)] border border-border">
          {/* Top status bar */}
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5 bg-black/20">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--neon)] animate-pulse" />
              <span className="font-mono text-[11px] text-muted-foreground">CAM-04 · MG ROAD JUNCTION · 12.9716°N 77.5946°E</span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
              <span>FPS <span className="text-foreground">60</span></span>
              <span>LATENCY <span className="text-[var(--neon)]">74ms</span></span>
              <span>UPTIME <span className="text-foreground">99.98%</span></span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.6fr_1fr]">
            {/* Live feed simulation */}
            <div className="relative aspect-[16/10] bg-gradient-to-br from-[oklch(0.18_0.04_240)] to-[oklch(0.10_0.03_250)] overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-50" />
              {/* Road lines */}
              <div className="absolute inset-x-0 top-1/3 h-px bg-white/10" />
              <div className="absolute inset-x-0 top-2/3 h-px bg-white/10" />
              {/* Scan line */}
              <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--electric)] to-transparent animate-scan" style={{ boxShadow: "0 0 12px var(--electric)" }} />

              {/* Detection boxes */}
              {[
                { top: "30%", left: "12%", w: "22%", h: "30%", plate: "KA01·HZ·4521", occ: 1, viol: true },
                { top: "44%", left: "44%", w: "26%", h: "36%", plate: "KA05·MN·2210", occ: 3, viol: false },
                { top: "22%", left: "72%", w: "18%", h: "26%", plate: "MH12·DE·9087", occ: 2, viol: true },
              ].map((b, i) => (
                <div key={i} className="absolute" style={{ top: b.top, left: b.left, width: b.w, height: b.h }}>
                  <div className={`absolute inset-0 rounded border-2 ${b.viol ? "border-[var(--destructive)]" : "border-[var(--neon)]"}`} style={{ boxShadow: `0 0 16px ${b.viol ? "oklch(0.65 0.24 25 / 0.6)" : "oklch(0.82 0.20 155 / 0.6)"}` }}>
                    <div className={`absolute -top-6 left-0 px-1.5 py-0.5 rounded font-mono text-[10px] ${b.viol ? "bg-[var(--destructive)] text-white" : "bg-[var(--neon)] text-background"}`}>
                      {b.plate} · {b.occ}p {b.viol && "· HOV"}
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-3 left-3 glass rounded-md px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground">REC ● 14:22:08 IST</div>
              <div className="absolute bottom-3 right-3 glass rounded-md px-2.5 py-1.5 font-mono text-[10px]">Active vehicles: <span className="text-foreground">3</span></div>
            </div>

            {/* Side panel */}
            <div className="border-t lg:border-t-0 lg:border-l border-border p-4 space-y-4 bg-black/10">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Today · Violations</span>
                  <span className="text-xs text-[var(--neon)] font-mono">+12.4%</span>
                </div>
                <div className="text-3xl font-semibold tracking-tight">1,284</div>
                <Sparkline />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Recent</span>
                {[
                  { p: "KA01·HZ·4521", t: "14:22:08", v: "HOV-2" },
                  { p: "MH12·DE·9087", t: "14:21:55", v: "HOV-2" },
                  { p: "DL08·CA·1132", t: "14:21:30", v: "Solo" },
                ].map((r) => (
                  <div key={r.t} className="flex items-center justify-between py-1.5 border-b border-border/50 text-xs">
                    <span className="font-mono">{r.p}</span>
                    <span className="text-muted-foreground font-mono">{r.t}</span>
                    <span className="rounded bg-[var(--destructive)]/15 text-[var(--destructive)] px-1.5 py-0.5 font-mono text-[10px]">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkline() {
  const points = [10, 14, 9, 18, 22, 17, 26, 21, 30, 28, 36, 34, 42, 38, 48];
  const max = Math.max(...points);
  const path = points.map((p, i) => `${(i / (points.length - 1)) * 100},${50 - (p / max) * 40}`).join(" ");
  return (
    <svg viewBox="0 0 100 50" className="mt-2 w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--electric)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--electric)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke="var(--electric)" strokeWidth="1.2" points={path} />
      <polygon fill="url(#sg)" points={`0,50 ${path} 100,50`} />
    </svg>
  );
}
