"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import {
  LucideIcon,
  Dna,
  Zap,
  ShieldCheck,
  Cpu,
  Target,
  Share2,
  Activity,
  ArrowUpRight,
  Layers,
} from "lucide-react";

// ─── Narrative Text Reveal Component ────────────────────────────────────────

const NARRATIVE_TEXT =
  "AuraGen bridges deep computational biology and clinical-grade synthetic engineering. By combining transformer-based generative algorithms with high-throughput bio-foundry automation, we systematically discover, validate, and manufacture targeted cellular therapeutics with zero off-target ambiguity.";

function WordReveal({ word, index, total, progress }: { word: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const end = Math.min(1, (index + 1.5) / total);
  
  const opacity = useTransform(progress, [start, end], [0.25, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(148, 163, 184, 0.4)", "rgba(255, 255, 255, 1)"]
  );

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block mr-[0.28em] transition-colors duration-150"
    >
      {word}
    </motion.span>
  );
}

function NarrativeReveal() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = NARRATIVE_TEXT.split(" ");

  return (
    <div ref={targetRef} className="my-8 max-w-4xl">
      <p className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold leading-relaxed tracking-tight text-slate-800 dark:text-slate-100">
        {words.map((word, i) => (
          <WordReveal
            key={i}
            word={word}
            index={i}
            total={words.length}
            progress={scrollYProgress}
          />
        ))}
      </p>
    </div>
  );
}

// ─── Radial Target Network Data ──────────────────────────────────────────────

interface VectorNode {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  icon: LucideIcon;
  angle: number; // in degrees
}

const RESEARCH_VECTORS: VectorNode[] = [
  {
    id: "crispr",
    name: "CRISPR Delivery",
    shortDesc: "RNA-guided target insertion",
    fullDesc:
      "RNA-guided precision insertion utilizing optimized non-viral lipid nanoparticle transport systems for tissue-specific cell entry.",
    icon: Dna,
    angle: 270, // Top
  },
  {
    id: "epigenetic",
    name: "Epigenetic Rewriting",
    shortDesc: "Locus-specific tuning",
    fullDesc:
      "Direct locus-specific transcriptional modulation without permanent DNA double-strand breaks, maintaining genomic integrity.",
    icon: Zap,
    angle: 342, // Top Right
  },
  {
    id: "synthetic",
    name: "Synthetic Vectoring",
    shortDesc: "Programmable tropism capsid",
    fullDesc:
      "De-novo synthetic capsid design allowing engineered cell-type tropism and selective therapeutic payload delivery.",
    icon: Share2,
    angle: 54, // Bottom Right
  },
  {
    id: "insilico",
    name: "In-Silico Folding",
    shortDesc: "Predictive structural AI",
    fullDesc:
      "Biophysical structure prediction trained on multi-billion amino acid sequences to compute atomic-scale binding free energy.",
    icon: Cpu,
    angle: 126, // Bottom Left
  },
  {
    id: "oncology",
    name: "Oncology Precision",
    shortDesc: "CAR-T Neoantigen targeting",
    fullDesc:
      "Patient-specific tumor neoantigen mapping enabling highly selective CAR-T cell receptor engineering with minimal systemic toxicity.",
    icon: Target,
    angle: 198, // Top Left
  },
];

// ─── Main AboutSection Component ────────────────────────────────────────────

export function AboutSection() {
  const [activeVector, setActiveVector] = useState<VectorNode>(RESEARCH_VECTORS[0]);
  const [isHoveredCard1, setIsHoveredCard1] = useState(false);

  return (
    <section id="about" className="relative px-[4%] w-full dark:bg-[#0F172A] bg-[#EBF1F7] transition-colors duration-300">
      {/* Luminous Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 dark:via-cyan-400/20 to-transparent" />
      <div className=" py-20 sm:py-24">
        
        {/* ── 1. Section Header & Narrative Reveal ─────────────────────────── */}
        <div className="flex flex-col gap-4">
          <div>
            <Badge variant="muted">OUR INNOVATION PARADIGM</Badge>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl xl:text-[3.5rem] font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl leading-[1.1]">
            Unlocking the precision code of{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-violet-500 dark:from-cyan-400 dark:via-teal-400 dark:to-violet-500 bg-clip-text text-transparent">
              human cellular biology.
            </span>
          </h2>

          <NarrativeReveal />
        </div>

        {/* ── 2. Interactive Bento Innovation Grid ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12">
          
          {/* Card 1: Philosophy & Speed (col-span-5) */}
          <motion.div
            onMouseEnter={() => setIsHoveredCard1(true)}
            onMouseLeave={() => setIsHoveredCard1(false)}
            className={cn(
              "lg:col-span-5 flex flex-col justify-between rounded-3xl p-8 border transition-all duration-300 relative overflow-hidden group shadow-xl",
              "bg-white border-slate-300/80 hover:border-slate-400",
              "dark:bg-[#121826]/95 dark:border-slate-700/80 dark:hover:border-cyan-500/50 dark:shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            )}
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-400/10 rounded-full blur-3xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 dark:bg-cyan-400/10 border border-teal-500/20 dark:border-cyan-400/20 flex items-center justify-center text-teal-600 dark:text-cyan-400">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-teal-600 dark:text-cyan-400 bg-teal-500/10 dark:bg-cyan-400/10 border border-teal-500/20 dark:border-cyan-400/20 px-3 py-1 rounded-full">
                  Timeline Compression
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-3">
                AI-Accelerated Target Identification
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8">
                Traditional drug target validation takes over 4 years of wet-lab trial and error. AuraGen&apos;s predictive generative engine simulates multi-million binding states in-silico, compressing validation down to 48 days.
              </p>
            </div>

            {/* Interactive Progress Micro-Graph */}
            <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex flex-col gap-4">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500 dark:text-slate-400">Discovery Speed Comparison</span>
                <span className="text-teal-600 dark:text-cyan-400">96.7% Acceleration</span>
              </div>

              {/* Bar 1: Traditional */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>Traditional Discovery</span>
                  <span className="tabular-nums">1,460 Days (4 Yrs)</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden w-full">
                  <div className="h-full bg-slate-400 dark:bg-slate-600 rounded-full w-full opacity-60" />
                </div>
              </div>

              {/* Bar 2: AuraGen Engine */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-900 dark:text-white">
                  <span className="flex items-center gap-1.5 text-teal-600 dark:text-cyan-400">
                    <Zap className="w-3.5 h-3.5" /> AuraGen Engine
                  </span>
                  <span className="tabular-nums text-teal-600 dark:text-cyan-400">48 Days</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden w-full relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-blue-600 dark:from-cyan-400 dark:to-teal-300 rounded-full shadow-[0_0_12px_rgba(0,242,254,0.6)]"
                    initial={{ width: "3.3%" }}
                    animate={{ width: isHoveredCard1 ? "3.3%" : "3.3%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Interactive Radial Target Network (col-span-7) */}
          <div
            className={cn(
              "lg:col-span-7 flex flex-col justify-between rounded-3xl p-8 border transition-all duration-300 relative overflow-hidden shadow-xl",
              "bg-white border-slate-300/80 hover:border-slate-400",
              "dark:bg-[#121826]/95 dark:border-slate-700/80 dark:hover:border-cyan-500/50 dark:shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            )}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between mb-4 z-10">
              <div>
                <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-teal-600 dark:text-cyan-400">
                  Targeting Architecture
                </span>
                <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                  Radial Research Network
                </h3>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Hover nodes to inspect vectors
              </div>
            </div>

            {/* Radial SVG Diagram & Center Node */}
            <div className="relative min-h-[320px] sm:min-h-[360px] flex items-center justify-center my-4">
              
              {/* Central AuraCore Node */}
              <div className="absolute z-20 flex flex-col items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-18 h-18 rounded-full bg-gradient-to-tr from-teal-500 to-blue-600 dark:from-cyan-400 dark:to-teal-400 p-0.5 shadow-[0_0_30px_rgba(0,242,254,0.4)] flex items-center justify-center cursor-pointer"
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-[#0A0D14] flex flex-col items-center justify-center p-2 text-center">
                    <Layers className="w-4 h-4 text-teal-600 dark:text-cyan-400 mb-0.5" />
                    <span className="text-[0.6rem] font-bold font-heading text-slate-900 dark:text-white tracking-tight">
                      AuraCore
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Radial Vectors SVG Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 360">
                <defs>
                  <linearGradient id="activeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F2FE" />
                    <stop offset="100%" stopColor="#00F5A0" />
                  </linearGradient>
                </defs>

                {RESEARCH_VECTORS.map((vector) => {
                  const rad = (vector.angle * Math.PI) / 180;
                  const radius = 125;
                  const cx = 200;
                  const cy = 180;
                  const x = cx + radius * Math.cos(rad);
                  const y = cy + radius * Math.sin(rad);
                  const isActive = activeVector.id === vector.id;

                  return (
                    <g key={vector.id}>
                      <line
                        x1={cx}
                        y1={cy}
                        x2={x}
                        y2={y}
                        stroke={isActive ? "url(#activeLineGrad)" : "rgba(148, 163, 184, 0.25)"}
                        strokeWidth={isActive ? "2.5" : "1"}
                        strokeDasharray={isActive ? "none" : "4 4"}
                        className="transition-all duration-300"
                      />
                      {isActive && (
                        <circle
                          cx={x}
                          cy={y}
                          r="12"
                          fill="rgba(0, 242, 254, 0.15)"
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Radial Nodes */}
              {RESEARCH_VECTORS.map((vector) => {
                const rad = (vector.angle * Math.PI) / 180;
                const radius = 125; // radius in px matching SVG viewBox 400x360 center (200, 180)
                // Calculate percentage offsets for responsive layout
                const leftPercent = 50 + (radius / 200) * 50 * Math.cos(rad);
                const topPercent = 50 + (radius / 180) * 50 * Math.sin(rad);

                const isActive = activeVector.id === vector.id;
                const IconComponent = vector.icon;

                return (
                  <button
                    key={vector.id}
                    onMouseEnter={() => setActiveVector(vector)}
                    onClick={() => setActiveVector(vector)}
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    className={cn(
                      "absolute z-30 flex items-center gap-2 p-2.5 rounded-2xl border transition-all duration-300 cursor-pointer group/node",
                      isActive
                        ? "bg-teal-500/10 dark:bg-cyan-400/10 border-teal-500/50 dark:border-cyan-400/60 shadow-[0_0_20px_rgba(0,242,254,0.3)] text-teal-600 dark:text-cyan-400 scale-110"
                        : "bg-white/90 dark:bg-[#111622]/90 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/30"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
                        isActive
                          ? "bg-teal-600 text-white dark:bg-cyan-400 dark:text-slate-950"
                          : "bg-slate-100 dark:bg-white/5 group-hover/node:text-slate-900 dark:group-hover/node:text-white"
                      )}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[0.7rem] font-semibold whitespace-nowrap hidden sm:inline">
                      {vector.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Description Box */}
            <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 z-10 transition-all duration-300">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-teal-600 dark:text-cyan-400 flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> {activeVector.name}
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                  VECTOR_ID // {activeVector.id.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeVector.fullDesc}
              </p>
            </div>
          </div>

          {/* Card 3: Full-Width Impact Stats Strip (col-span-12) */}
          <div
            className={cn(
              "lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-3xl p-8 border transition-all duration-300 shadow-xl",
              "bg-white border-slate-300/80 hover:border-slate-400",
              "dark:bg-[#121826]/95 dark:border-slate-700/80 dark:hover:border-cyan-500/50 dark:shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            )}
          >
            {/* Stat 1 */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-teal-600 dark:text-cyan-400">
                <Zap className="w-4 h-4" />
                <span className="text-[0.65rem] font-bold uppercase tracking-wider">Screening Speed</span>
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                10x
              </div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                Faster Molecular Screening
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                High-throughput parallel simulation pipelines capable of evaluating 10M+ candidates per day.
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-teal-600 dark:text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[0.65rem] font-bold uppercase tracking-wider">Fidelity & Safety</span>
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                &lt; 0.01%
              </div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                Off-Target Effect
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Single-nucleotide precision editing fidelity verified across whole-genome sequencing assays.
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-teal-600 dark:text-cyan-400">
                <Target className="w-4 h-4" />
                <span className="text-[0.65rem] font-bold uppercase tracking-wider">Target Conformation</span>
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                100%
              </div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                Deterministic Binding
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Guaranteed biophysical conformation matching validated via cryo-EM structural analysis.
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
