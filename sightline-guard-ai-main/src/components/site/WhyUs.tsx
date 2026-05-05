import { Zap, Cloud, Code2, ShieldCheck, TrendingUp, Layers } from "lucide-react";
import { SectionHeader } from "./Workflow";

const reasons = [
  { icon: Zap, t: "Real-Time AI", d: "Sub-100ms end-to-end inference at 60 FPS per camera." },
  { icon: Cloud, t: "Edge + Cloud", d: "Deploy on Jetson, on-prem clusters, or our managed cloud." },
  { icon: Code2, t: "API-first", d: "Typed REST + gRPC, OpenAPI specs, idiomatic SDKs." },
  { icon: ShieldCheck, t: "Compliance-grade", d: "SOC 2, ISO 27001, GDPR, DPDPA. Tamper-evident logs." },
  { icon: TrendingUp, t: "Scalable", d: "Proven from 1 lane to 5,000 cameras. Horizontally elastic." },
  { icon: Layers, t: "Modular Microservices", d: "Pick exactly the models you need. No bloat, no lock-in." },
];

export function WhyUs() {
  return (
    <section id="why" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeader eyebrow="Why Sentinel" title="Built like Stripe. Trusted like Verkada." sub="An infrastructure layer for compliance — engineered to disappear into your stack while delivering measurable outcomes." center={false} />

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { v: "99.98%", l: "Uptime SLA" },
                { v: "<80ms", l: "P95 latency" },
                { v: "5,000+", l: "Cameras live" },
              ].map(s => (
                <div key={s.l} className="glass rounded-xl p-4">
                  <div className="text-2xl font-semibold tracking-tight text-gradient">{s.v}</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {reasons.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.t} className="glass-strong rounded-xl p-5 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg grid place-items-center bg-[var(--electric)]/15 text-[var(--electric)]">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="font-medium">{r.t}</div>
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.d}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
