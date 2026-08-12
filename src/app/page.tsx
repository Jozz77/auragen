import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechSection } from "@/components/sections/TechSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ImpactSection } from "@/components/sections/ImpactSection";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col bg-background transition-colors duration-300">
      {/* Full-page ambient glow orbs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[700px] h-[700px] bg-teal-400/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Navigation */}
      <Navbar />

      {/* Main */}
      <main className="flex-grow flex flex-col">
        <HeroSection />
        <AboutSection />
        <TechSection />
        <CapabilitiesSection />
        <ImpactSection />
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-slate-100 dark:border-white/5 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-500">
          <div>
            © {new Date().getFullYear()} AuraGen Inc. All biological assets protected.
          </div>
          <div className="flex gap-6">
            <a
              href="#privacy"
              className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
