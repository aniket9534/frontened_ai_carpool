import { Car, ScanLine, FileText, ShieldCheck, ArrowRight, Code2 } from "lucide-react";
import { SectionHeader } from "./Workflow";

const services = [
  {
    icon: Car,
    title: "Vehicle Detection",
    code: "vd-core",
    desc: "Detect, classify and track vehicles across cameras with 98.2% mAP. Sedan, SUV, truck, two-wheeler, bus.",
    cases: ["Traffic counting", "Parking analytics", "Highway surveys"],
  },
  {
    icon: ScanLine,
    title: "Number Plate Detection",
    code: "npd-core",
    desc: "High-recall plate localization, region-aware, robust to motion blur, rain, low light, oblique angles.",
    cases: ["Toll gantries", "Gated communities", "Fleet yards"],
  },
  {
    icon: FileText,
    title: "Number Plate + OCR",
    code: "anpr-pro",
    desc: "End-to-end ANPR with TrOCR — 99.1% character accuracy on Indian plates, 30+ country formats supported.",
    cases: ["e-Challan", "Toll collection", "Border crossings"],
  },
  {
    icon: ShieldCheck,
    title: "Carpool Compliance",
    code: "ccx-suite",
    desc: "Full pipeline: vehicle + occupant + plate + violation engine + audit dashboard. The complete platform.",
    cases: ["HOV lanes", "Smart cities", "Government enforcement"],
    flagship: true,
  },
];

export function Microservices() {
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Microservices" title="Modular by design. Composable by default." sub="Every model ships as an independent microservice with a typed REST/gRPC API. Deploy one or all — on our cloud, your VPC, or air-gapped edge." />

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.code} className={`group relative glass-strong rounded-2xl p-6 shadow-card hover:translate-y-[-2px] transition-transform overflow-hidden ${s.flagship ? "ring-electric" : ""}`}>
                {s.flagship && (
                  <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-wider rounded-full bg-gradient-to-r from-[var(--electric)] to-[var(--neon)] text-background px-2 py-0.5">Flagship</div>
                )}
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-lg grid place-items-center bg-white/5 text-[var(--electric)] shrink-0" style={{ boxShadow: "0 0 24px -10px var(--electric)" }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                      <span className="font-mono text-[10px] text-muted-foreground rounded bg-white/5 px-1.5 py-0.5">{s.code}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.cases.map(c => (
                    <span key={c} className="text-[11px] font-mono rounded-full glass px-2.5 py-1 text-muted-foreground">{c}</span>
                  ))}
                </div>

                <div className="mt-5 rounded-lg bg-[oklch(0.12_0.02_250)] border border-border font-mono text-[11px] p-3 overflow-x-auto">
                  <div className="text-muted-foreground"># deploy as standalone microservice</div>
                  <div><span className="text-[var(--neon)]">$</span> sentinel deploy {s.code} <span className="text-muted-foreground">--region edge --replicas 3</span></div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <a href="#demo" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--electric)] hover:gap-2.5 transition-all">
                    Try demo <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#contact" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                    <Code2 className="h-3.5 w-3.5" /> API docs
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
