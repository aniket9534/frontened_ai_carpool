import { Calendar, Key, Handshake, ArrowRight } from "lucide-react";

const options = [
  { icon: Calendar, t: "Book a Demo", d: "30-min walkthrough with our solutions engineer.", cta: "Schedule" },
  { icon: Key, t: "Request API Access", d: "Sandbox keys with 10k free inferences/mo.", cta: "Get keys" },
  { icon: Handshake, t: "Partner with Us", d: "Integrators, OEMs, and government channels.", cta: "Apply" },
];

export function CTA() {
  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in oklab, var(--electric) 18%, transparent), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="glass-strong rounded-3xl p-10 md:p-16 text-center shadow-card relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] animate-pulse" /> Now onboarding · Q2 2026
            </div>
            <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-[-0.025em] leading-[1.05]">
              Deploy compliance infrastructure
              <br /><span className="text-gradient">that your auditors will love.</span>
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-muted-foreground">
              Bring AI-grade enforcement to your roads, tolls, and campuses. Talk to a solutions engineer or start with sandbox API keys today.
            </p>

            <div className="mt-10 grid md:grid-cols-3 gap-3 text-left">
              {options.map(o => {
                const Icon = o.icon;
                return (
                  <div key={o.t} className="glass rounded-xl p-5 group hover:bg-white/[0.05] transition cursor-pointer">
                    <Icon className="h-5 w-5 text-[var(--electric)]" />
                    <div className="mt-3 font-medium">{o.t}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{o.d}</div>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--electric)] group-hover:gap-2.5 transition-all">
                      {o.cta} <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
