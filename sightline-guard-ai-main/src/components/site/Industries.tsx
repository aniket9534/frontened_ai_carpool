import { Building2, Siren, Coins, Briefcase, ParkingCircle, Landmark } from "lucide-react";
import { SectionHeader } from "./Workflow";

const items = [
  { icon: Building2, t: "Smart Cities", d: "City-wide vehicle intelligence and lane compliance." },
  { icon: Siren, t: "Traffic Police", d: "Automated e-Challan with court-ready evidence." },
  { icon: Coins, t: "Toll Systems", d: "Plate-based, occupancy-tiered tolling at gantry speed." },
  { icon: Briefcase, t: "Corporate Campuses", d: "Carpool incentives, gate access, ESG reporting." },
  { icon: ParkingCircle, t: "Parking Compliance", d: "Lot occupancy, permit checks, overstay alerts." },
  { icon: Landmark, t: "Government Enforcement", d: "Multi-jurisdiction policy, region-aware models." },
];

export function Industries() {
  return (
    <section id="industries" className="relative py-28 border-t border-border bg-black/20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Industries" title="Deployed where mobility meets compliance" sub="From a single intersection to a national rollout — the platform scales horizontally across geographies and policy regimes." />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div key={it.t} className="group glass-strong rounded-xl p-6 shadow-card hover:bg-white/[0.04] transition relative overflow-hidden">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--electric)]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon className="h-6 w-6 text-[var(--electric)]" />
                <div className="mt-4 font-medium text-lg tracking-tight">{it.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{it.d}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
