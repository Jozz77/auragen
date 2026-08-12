import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col">
      {/* Background Glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Header / Navbar */}
      <header className="sticky top-0 w-full z-50 border-b border-glass bg-background/80 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Biotech Helix Logo Placeholder */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center font-bold text-background text-sm">
              AG
            </div>
            <span className="font-heading font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              Aura<span className="text-accent-primary">Gen</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted hover:text-foreground">
            <a href="#about" className="hover:text-accent-primary transition-colors">Platform</a>
            <a href="#technology" className="hover:text-accent-primary transition-colors">Technology</a>
            <a href="#capabilities" className="hover:text-accent-primary transition-colors">Capabilities</a>
            <a href="#stats" className="hover:text-accent-primary transition-colors">Insights</a>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-accent-primary text-background font-semibold text-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-accent-primary/25">
              Launch Portal
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {/* Placeholder Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-20">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-glass bg-card/50 text-xs font-semibold text-accent-primary mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
              Genetic Engineering v2.0 Platform
            </div>

            {/* Heading */}
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl leading-[1.1] text-foreground">
              Synthesizing the Future of{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary animate-gradient">
                Genetic Intelligence
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted max-w-2xl mb-12 leading-relaxed">
              AuraGen accelerates molecular development by combining deep generative biology models with hardware-accelerated synthesis pathways.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-background font-bold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-accent-primary/20">
                Explore Technology
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl border border-glass bg-card hover:bg-card/80 text-foreground font-semibold hover:border-accent-primary/20 transition-all cursor-pointer">
                Read Whitepaper
              </button>
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

