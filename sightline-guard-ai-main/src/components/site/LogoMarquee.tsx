const logos = [
  "MINISTRY OF TRANSPORT",
  "BENGALURU SMART CITY",
  "NHAI",
  "DELHI TRAFFIC POLICE",
  "TATA REALTY",
  "SINGAPORE LTA",
  "DUBAI RTA",
  "L&T URBAN",
];

export function LogoMarquee() {
  return (
    <section className="relative border-y border-border bg-black/20">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <p className="text-center text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Trusted by transport authorities & enterprises
        </p>
        <div className="overflow-hidden mask-fade">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="text-sm font-semibold tracking-[0.18em] text-muted-foreground/70 hover:text-foreground transition-colors">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`.mask-fade{ -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);} `}</style>
    </section>
  );
}
