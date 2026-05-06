import { Link } from "@tanstack/react-router";
import logo from "@/assets/sls_logo.png";

const links = [
  { label: "Platform", href: "#workflow" },
  { label: "Live Demo", href: "#demo" },
  { label: "Microservices", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Why Us", href: "#why" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 backdrop-blur-xl bg-background/60 border-b border-border" />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--electric)] to-[var(--neon)] grid place-items-center shadow-[0_0_24px_-4px_var(--electric)]">
            <img src={logo} alt="SLSYN Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-semibold tracking-tight">SENTINEL<span className="text-gradient">.AI</span></span>
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">compliance os</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1 glass rounded-full px-1.5 py-1.5">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="px-3.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground rounded-full hover:bg-white/5 transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden sm:inline-flex text-[13px] text-muted-foreground hover:text-foreground px-3 py-2">Sign in</a>
          <a href="#demo" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--electric)] to-[var(--neon)] text-background text-[13px] font-medium px-4 py-2 shadow-[0_0_24px_-6px_var(--electric)] hover:opacity-90 transition">
            Book Demo
            <span aria-hidden>→</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
