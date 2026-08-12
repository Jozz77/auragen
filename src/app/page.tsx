import { Navbar } from "@/components/ui/Navbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col bg-background transition-colors duration-300">
      {/* Background Glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none -z-10 transition-colors duration-300" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-[150px] pointer-events-none -z-10 transition-colors duration-300" />

      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col pt-32">
        {/* Hero Section */}
        <section className="relative min-h-[75vh] flex items-center justify-center px-6 py-20">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            {/* Custom Premium Badge */}
            <Badge variant="default" className="mb-8">
              Genetic Engineering v2.0 Platform
            </Badge>

            {/* Heading */}
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl leading-[1.1] text-foreground transition-colors duration-300">
              Synthesizing the Future of{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary animate-gradient">
                Genetic Intelligence
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted max-w-2xl mb-12 leading-relaxed transition-colors duration-300">
              AuraGen accelerates molecular development by combining deep generative biology models with hardware-accelerated synthesis pathways.
            </p>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-lg shadow-accent-primary/20"
              >
                Explore Technology
              </Button>
              <Button
                variant="secondary"
                icon={<FileText className="w-4 h-4" />}
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Read Whitepaper
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-glass bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <div>
            © {new Date().getFullYear()} AuraGen Inc. All biological assets protected.
          </div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-accent-primary transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-accent-primary transition-colors">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
}


