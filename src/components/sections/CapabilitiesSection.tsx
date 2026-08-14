"use client";

import React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import {
  LucideIcon,
  Dna,
  Cpu,
  Target,
  Activity,
  BarChart3,
  Zap,
  ArrowUpRight,
} from "lucide-react";

// ─── Capability Item Interface & Data ──────────────────────────────────────

interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  metric: string;
  icon: LucideIcon;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "target-id",
    title: "Target Identification & Validation",
    description:
      "Deep learning multi-omic models mapping disease-causing genetic variants with single-cell precision.",
    metric: "99.8% Precision Target Score",
    icon: Dna,
  },
  {
    id: "epigenetic",
    title: "Epigenetic Rewriting",
    description:
      "Transient transcriptional modulation without double-stranded DNA breaks or genomic risk.",
    metric: "< 0.01% Off-Target",
    icon: Cpu,
  },
  {
    id: "delivery-vectoring",
    title: "Targeted Delivery Vectoring",
    description:
      "Engineered tissue-specific lipid nanoparticles (LNPs) for organ-level therapeutic targeting.",
    metric: "8.4x Organ Tropism",
    icon: Target,
  },
  {
    id: "insilico-screening",
    title: "In-Silico Molecular Screening",
    description:
      "Simulating billions of candidate protein interactions in hours via proprietary quantum fold models.",
    metric: "10M+ Compounds / Sec",
    icon: Activity,
  },
  {
    id: "bioinformatics",
    title: "Translational Bioinformatics",
    description:
      "Automated biomarker synthesis connecting clinical trial multi-omic cohorts to phenotypic outcomes.",
    metric: "Real-time Cohort Sync",
    icon: BarChart3,
  },
  {
    id: "biomanufacturing",
    title: "Custom Bio-Asset Biomanufacturing",
    description:
      "Rapid-scale synthetic mRNA, viral vector, and cellular therapy prototyping built to GMP standards.",
    metric: "GMP Grade Ready",
    icon: Zap,
  },
];

// ─── Stagger parent variants ─────────────────────────────────────────────────

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ─── Interactive 3D Tilt Card Component ─────────────────────────────────────

function CapabilityCard({ item }: { item: CapabilityItem }) {
  const IconComponent = item.icon;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 22,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    // Each card is itself a motion.div so it receives gridVariants stagger
    <motion.div
      variants={cardVariants}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between h-full cursor-pointer shadow-xl",
        // Base styling
        "bg-white border-slate-300/80 hover:border-slate-400",
        // Dark mode — border glows on hover (50 → 80 opacity)
        "dark:bg-[#121826]/95 dark:border-slate-700/80 dark:hover:border-cyan-500/80",
        // Glowing box-shadow on hover
        "dark:hover:shadow-[0_0_28px_rgba(0,242,254,0.18)]"
      )}
    >
      {/* Outer gradient glow border on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 via-cyan-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-teal-50 dark:bg-cyan-500/10 text-teal-600 dark:text-cyan-400 border border-teal-500/20 dark:border-cyan-400/20 shadow-sm">
            <IconComponent className="w-5 h-5" />
          </div>

          <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 group-hover:text-teal-600 dark:group-hover:text-cyan-400 group-hover:border-teal-500/40 dark:group-hover:border-cyan-400/40 transition-colors">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading text-[1.1rem] font-bold text-slate-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-[0.8rem] leading-relaxed text-slate-600 dark:text-slate-300">
          {item.description}
        </p>
      </div>

      {/* Micro Metric Pill Footer */}
      <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between">
        <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          METRIC SPEC
        </span>
        <span className="text-[0.65rem] font-semibold px-3 py-1 rounded-full bg-teal-500/10 dark:bg-cyan-400/10 border border-teal-500/20 dark:border-cyan-400/20 text-teal-700 dark:text-cyan-400 group-hover:shadow-[0_0_12px_rgba(0,242,254,0.25)] transition-shadow">
          {item.metric}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main CapabilitiesSection Component ────────────────────────────────────

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="relative w-full py-12 sm:py-24 px-[4%] overflow-hidden dark:bg-[#0F172A] bg-[#EBF1F7] transition-colors duration-300"
    >
      {/* Luminous Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 dark:via-cyan-400/20 to-transparent absolute top-0 left-0 right-0" />
      <div className="relative z-10">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <ScrollReveal direction="up" className="flex flex-col gap-4 max-w-3xl mb-16">
          <div>
            <Badge variant="muted">PLATFORM CAPABILITIES</Badge>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            End-to-end cellular{" "}
            <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-cyan-500 dark:from-cyan-400 dark:via-teal-300 dark:to-blue-400 bg-clip-text text-transparent">
              engineering solutions.
            </span>
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Integrating multi-omic AI models with high-throughput wet-lab automation to accelerate therapeutics from bench to bedside.
          </p>
        </ScrollReveal>

        {/* ── 6-Card Interactive Deck — staggered assembly ────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {CAPABILITIES.map((item) => (
            <CapabilityCard key={item.id} item={item} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
