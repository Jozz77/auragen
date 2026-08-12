"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Dynamically import the canvas with ssr:false to prevent WebGL hydration errors
const HeroCanvas = dynamic(
  () => import("@/components/canvas/HeroCanvas").then((m) => m.HeroCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
      </div>
    ),
  }
);

// ─── Data ────────────────────────────────────────────────────────────────────

const BIO_TAGS = [
  "CRISPR-Cas13",
  "Synthetic Bio",
  "Microbiome",
  "XNA Therapeutics",
  "Bioinformatics",
];

const METRICS = [
  { value: "140k+", label: "Genomes Sequenced" },
  { value: "99.4%", label: "Target Precision" },
];

// ─── Motion Variants ─────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.2 },
  },
};

// Spring physics avoids Framer Motion v13's strict Easing literal union
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen pt-32 pb-16 px-6 max-w-7xl mx-auto">

        {/* ── Left Column (60%) ──────────────────────────────────────────────── */}
        <motion.div
          className="lg:col-span-7 flex flex-col gap-7"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Live Status Badge */}
          <motion.div variants={itemVariants}>
            <Badge variant="default">
              AI-DRIVEN GENOMIC THERAPEUTICS V3.2
            </Badge>
          </motion.div>

          {/* Display Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl sm:text-6xl xl:text-[4.5rem] font-bold tracking-tight leading-[1.04] text-slate-900 dark:text-white"
          >
            Engineering{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
              targeted cellular
              <br className="hidden sm:block" />
              therapies
            </span>{" "}
            at
            <br />
            molecular scale.
          </motion.h1>

          {/* Narrative Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-[520px]"
          >
            AuraGen's precision bio-platform synthesises next-generation
            therapeutics through hardware-accelerated CRISPR editing,
            AI-optimised protein folding, and ultra-high-throughput drug
            discovery at unprecedented molecular fidelity.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              variant="primary"
              icon={<ArrowRight className="w-4 h-4" />}
              className="text-white font-semibold shadow-lg shadow-cyan-500/25 px-7 py-3.5"
            >
              Explore Pipeline
            </Button>
            <Button
              variant="secondary"
              icon={<Play className="w-4 h-4 fill-current" />}
              iconPosition="left"
              className="px-7 py-3.5"
            >
              Watch Scientific Briefing
            </Button>
          </motion.div>

          {/* Micro Metrics */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 pt-1"
          >
            {METRICS.map((metric, i) => (
              <div key={metric.label} className="flex items-center gap-6">
                {i > 0 && (
                  <div className="w-px h-9 bg-slate-200 dark:bg-white/10" />
                )}
                <div className="flex flex-col">
                  <span className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
                    {metric.value}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                    {metric.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Bio-Discipline Pill Tags */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {BIO_TAGS.map((tag) => (
              <button
                key={tag}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer",
                  // Light mode base
                  "border-slate-200 bg-slate-50 text-slate-600",
                  // Dark mode base
                  "dark:border-white/10 dark:bg-white/5 dark:text-slate-400",
                  // Light mode hover
                  "hover:border-teal-400/60 hover:text-teal-700 hover:bg-teal-50 hover:shadow-sm hover:shadow-teal-400/15",
                  // Dark mode hover
                  "dark:hover:border-cyan-400/50 dark:hover:text-cyan-400 dark:hover:bg-cyan-400/5 dark:hover:shadow-sm dark:hover:shadow-cyan-400/10"
                )}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right Column (40%) ─────────────────────────────────────────────── */}
        <motion.div
          className="lg:col-span-5 relative h-[440px] sm:h-[520px] lg:h-[660px]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
        >
          {/* Ambient radial glow behind the canvas */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.12) 0%, transparent 68%)",
            }}
          />
          {/* Secondary glow ring */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(0,242,254,0.07) 0%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />

          {/* WebGL Canvas — renders the DNA helix scene */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden">
            <HeroCanvas />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
