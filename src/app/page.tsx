import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechSection } from "@/components/sections/TechSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col bg-background transition-colors duration-300">
      {/* Full-page ambient glow orbs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[700px] h-[700px] bg-teal-400/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Navigation */}
      <Navbar />

      {/* Main Page Stack */}
      <main className="flex-grow flex flex-col">
        <HeroSection />
        <AboutSection />
        <TechSection />
        <CapabilitiesSection />
        <ImpactSection />
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
