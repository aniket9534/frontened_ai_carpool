import { useState } from "react";
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
  const [showContactForm, setShowContactForm] = useState(false);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name,
      company,
      phone,
      email,
      message,
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwk3dhlAn0yrIRKjlzC49stxxuN32TobKKwmgpBCHc46l444KSKpNeoBrG9IZOyhANc1Q/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      alert("Thank you! Our team will contact you soon.");

      setName("");
      setCompany("");
      setPhone("");
      setEmail("");
      setMessage("");

      setShowContactForm(false);
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div className="absolute inset-0 backdrop-blur-xl bg-background/60 border-b border-border" />

        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-black/40 border border-border grid place-items-center p-1 shadow-[0_0_24px_-4px_var(--electric)]">
              <img
                src={logo}
                alt="SLSYN Logo"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-[13px] font-semibold tracking-tight">
                SENTINEL<span className="text-gradient">.AI</span>
              </span>

              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                compliance os
              </span>
            </div>
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-1 glass rounded-full px-1.5 py-1.5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground rounded-full hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:sales@slsyn.com"
              className="hidden lg:inline-flex text-[13px] text-[var(--electric)] font-medium hover:opacity-80 transition"
            >
              sales@slsyn.com
            </a>

            <a
              href="#contact"
              className="hidden sm:inline-flex text-[13px] text-muted-foreground hover:text-foreground px-3 py-2 transition"
            >
              Sign in
            </a>

            {/* Let's Talk Button */}
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--electric)] to-[var(--neon)] text-background text-[13px] font-medium px-4 py-2 shadow-[0_0_24px_-6px_var(--electric)] hover:opacity-90 transition"
            >
              Let’s Talk
              <span aria-hidden>→</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-border bg-background p-8 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold tracking-tight">
              Let’s Talk
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Tell us about your business needs and our team will reach out.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Your Name */}
              <div>
                <label className="block text-sm mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-border bg-black/20 px-4 py-3 outline-none focus:border-[var(--electric)]"
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm mb-2">Company Name</label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="w-full rounded-lg border border-border bg-black/20 px-4 py-3 outline-none focus:border-[var(--electric)]"
                />
              </div>

              {/* Phone + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full rounded-lg border border-border bg-black/20 px-4 py-3 outline-none focus:border-[var(--electric)]"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-border bg-black/20 px-4 py-3 outline-none focus:border-[var(--electric)]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full rounded-lg border border-border bg-black/20 px-4 py-3 outline-none focus:border-[var(--electric)]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-[var(--electric)] to-[var(--neon)] py-3 text-sm font-semibold text-background shadow-[0_0_24px_-6px_var(--electric)] hover:opacity-90 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}