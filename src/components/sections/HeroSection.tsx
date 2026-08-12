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
  "XNA",
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
    transition: { staggerChildren: 0.1, delayChildren: 0.18 },
  },
};

// Spring physics avoids Framer Motion v13's strict Easing literal union
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
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
      {/*
        min-h-[90vh] keeps the section tall enough for all content on typical
        screens without overflowing into the next section.
        pt-36 / md:pt-40 clears the fixed navbar (≈72px) plus breathing room.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[90vh] pt-36 pb-20 md:pt-40 md:pb-28 px-6 max-w-7xl mx-auto">

        {/* ── Left Column (60%) ──────────────────────────────────────────────── */}
        <motion.div
          className="lg:col-span-7 flex flex-col space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 1 · Live Status Badge */}
          <motion.div variants={itemVariants}>
            <Badge variant="default">
              AI-DRIVEN GENOMIC THERAPEUTICS V3.2
            </Badge>
          </motion.div>

          {/* 2 · Display Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl sm:text-6xl xl:text-[4.25rem] font-bold tracking-tight leading-[1.06] text-slate-900 dark:text-white"
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

          {/* 3 · Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300 max-w-xl"
          >
            AuraGen&apos;s precision bio-platform synthesises next-generation
            therapeutics through hardware-accelerated CRISPR editing,
            AI-optimised protein folding, and ultra-high-throughput drug
            discovery at unprecedented molecular fidelity.
          </motion.p>

          {/* 4 · CTA Buttons */}
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

          {/* 5 · Bio-Discipline Pill Tags */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {BIO_TAGS.map((tag) => (
              <button
                key={tag}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer select-none",
                  // Light base
                  "border-slate-200 bg-slate-50 text-slate-600",
                  // Dark base
                  "dark:border-white/10 dark:bg-white/5 dark:text-slate-400",
                  // Light hover
                  "hover:border-teal-400/60 hover:text-teal-700 hover:bg-teal-50 hover:shadow-sm hover:shadow-teal-400/15",
                  // Dark hover
                  "dark:hover:border-cyan-400/50 dark:hover:text-cyan-400 dark:hover:bg-cyan-400/5 dark:hover:shadow-sm dark:hover:shadow-cyan-400/10"
                )}
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* 6 · Micro Metrics */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-0"
          >
            {METRICS.map((metric, i) => (
              <div key={metric.label} className="flex items-center">
                {i > 0 && (
                  <div className="w-px h-10 bg-slate-200 dark:bg-white/10 mx-6" />
                )}
                <div className="flex flex-col">
                  <span className="font-heading text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {metric.value}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                    {metric.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right Column (40%) ─────────────────────────────────────────────── */}
        <motion.div
          className="lg:col-span-5 relative h-[400px] sm:h-[500px] lg:h-[640px]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.22, ease: "easeOut" }}
        >
          {/* Primary radial glow behind the canvas */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.13) 0%, transparent 65%)",
            }}
          />
          {/* Secondary soft bloom */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(0,242,254,0.06) 0%, transparent 72%)",
              filter: "blur(28px)",
            }}
          />

          {/* WebGL Canvas */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden">
            <HeroCanvas />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
