import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { Workflow } from "@/components/site/Workflow";
import { Demo } from "@/components/site/Demo";
import { Microservices } from "@/components/site/Microservices";
import { Industries } from "@/components/site/Industries";
import { WhyUs } from "@/components/site/WhyUs";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sentinel.AI — AI Carpool Compliance & Mobility Enforcement Platform" },
      { name: "description", content: "Real-time AI for vehicle detection, occupancy counting, ANPR/OCR and HOV violation enforcement. Built for smart cities, traffic authorities and enterprises." },
      { property: "og:title", content: "Sentinel.AI — AI Carpool Compliance Platform" },
      { property: "og:description", content: "Detect. Track. Count. Enforce. Enterprise-grade mobility compliance infrastructure." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <Workflow />
      <Demo />
      <Microservices />
      <Industries />
      <WhyUs />
      <CTA />
      <Footer />
    </main>
  );
}
