import { Camera, Car, MoveRight, Users, ScanLine, FileText, AlertTriangle, BarChart3 } from "lucide-react";

const steps = [
  { icon: Camera, label: "Input Source", desc: "Image · Video · CCTV · Live Feed", color: "var(--electric)" },
  { icon: Car, label: "Vehicle Detection", desc: "YOLOv9 · 98.2% mAP", color: "var(--electric)" },
  { icon: MoveRight, label: "Vehicle Tracking", desc: "ByteTrack · Multi-object", color: "var(--electric)" },
  { icon: Users, label: "Occupant Counting", desc: "Pose + Cabin segmentation", color: "var(--neon)" },
  { icon: ScanLine, label: "Plate Detection", desc: "ANPR · Region-aware", color: "var(--neon)" },
  { icon: FileText, label: "OCR Extraction", desc: "TrOCR · 99.1% on Indian plates", color: "var(--neon)" },
  { icon: AlertTriangle, label: "Violation Engine", desc: "HOV · Carpool · Lane rules", color: "var(--warning)" },
  { icon: BarChart3, label: "Dashboard Analytics", desc: "Real-time · Audit trail", color: "var(--electric)" },
];

export function Workflow() {
  return (
    <section id="workflow" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Pipeline" title="Enterprise AI infrastructure, end-to-end" sub="Eight composable inference stages — deployable on edge boxes, regional clusters, or our managed cloud." />

        <div className="mt-14 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="group relative glass-strong rounded-xl p-5 hover:translate-y-[-2px] transition-transform shadow-card">
                  <div className="absolute top-3 right-3 font-mono text-[10px] text-muted-foreground">0{i + 1}</div>
                  <div className="h-10 w-10 rounded-lg grid place-items-center mb-4" style={{ background: `color-mix(in oklab, ${s.color} 18%, transparent)`, color: s.color, boxShadow: `0 0 24px -8px ${s.color}` }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-medium text-[15px]">{s.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.desc}</div>
                  <div className="mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {[0,1,2,3,4].map(d => <span key={d} className="h-1 w-1 rounded-full animate-flow" style={{ background: s.color, animationDelay: `${d*0.1}s` }} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, sub, center = true }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--electric)]" /> {eyebrow}
      </div>
      <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05]">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground text-pretty">{sub}</p>}
    </div>
  );
}
