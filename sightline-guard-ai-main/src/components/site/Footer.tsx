import logo from "@/assets/sls_logo.png";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-black/30">
      <div className="mx-auto max-w-7xl px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-lg overflow-hidden bg-black/40 border border-border grid place-items-center p-1">
              <img
                src={logo}
                alt="SLSYN Logo"
                className="h-full w-full object-contain"
              />
            </div>

            <span className="text-sm font-semibold tracking-tight">
              SENTINEL<span className="text-gradient">.AI</span>
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground max-w-md">
              AI-powered mobility compliance infrastructure for governments,
              smart cities, and global enterprises.
            </p>

            <p className="text-sm text-[var(--electric)] font-medium">
              sales@slsyn.com
            </p>npm 
          </div>

          <div className="mt-5 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] animate-pulse" />
            All systems operational
          </div>
        </div>

        {[
          {
            h: "Platform",
            l: ["Workflow", "Live Demo", "Microservices", "API Docs"],
          },
          {
            h: "Company",
            l: ["About", "Careers", "Press", "Contact"],
          },
        ].map((c) => (
          <div key={c.h}>
            <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              {c.h}
            </div>

            <ul className="mt-4 space-y-2.5 text-sm">
              {c.l.map((i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-foreground text-muted-foreground transition"
                  >
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
          <span>
            © 2026 Sentinel.AI · Built for the world's enforcement infrastructure
          </span>

          <span>SOC 2 · ISO 27001 · GDPR · DPDPA</span>
        </div>
      </div>
    </footer>
  );
}