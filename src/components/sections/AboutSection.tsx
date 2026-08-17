"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TargetingArchitecture } from "@/components/sections/TargetingArchitecture";
import { cn } from "@/lib/utils";
import {
  Zap,
  ShieldCheck,
  Target,
  Activity,
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

function NarrativeReveal({ progress }: { progress: MotionValue<number> }) {
  const textProgress = useTransform(progress, [0, 0.25], [0, 1]);
  const words = NARRATIVE_TEXT.split(" ");

  return (
    <div className="my-8 max-w-4xl">
      <p className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold leading-relaxed tracking-tight text-slate-800 dark:text-slate-100">
        {words.map((word, i) => (
          <WordReveal
            key={i}
            word={word}
            index={i}
            total={words.length}
            progress={textProgress}
          />
        ))}
      </p>
    </div>
  );
}

// ─── Main AboutSection Component ────────────────────────────────────────────

export function AboutSection() {
  const [isHoveredCard1, setIsHoveredCard1] = useState(false);

  const narrativeRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: narrativeRef,
    offset: ["start 0.85", "start 0.35"],
  });

  return (
    <section
      id="about"
      className="relative w-full dark:bg-[#0F172A] px-[4%] bg-[#EBF1F7] transition-colors duration-300 py-12"
    >
      <div className="w-full flex flex-col justify-center overflow-visible">
        {/* Luminous Section Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 dark:via-cyan-400/20 to-transparent absolute top-0 left-0 right-0" />
        
        <div className="max-w-7xl mx-auto w-full">
          
          {/* ── 1. Section Header & Narrative Reveal ─────────────────────────── */}
          <ScrollReveal direction="up" margin="-10%" className="flex flex-col gap-4">
            <div>
              <Badge variant="muted">OUR INNOVATION PARADIGM</Badge>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl xl:text-[3.5rem] font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl leading-[1.1]">
              Unlocking the precision code of{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-violet-500 dark:from-cyan-400 dark:via-teal-400 dark:to-violet-500 bg-clip-text text-transparent">
                human cellular biology.
              </span>
            </h2>

            <div ref={narrativeRef}>
              <NarrativeReveal progress={scrollYProgress} />
            </div>
          </ScrollReveal>

        {/* ── 2. Side-by-side Innovation Cards ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-12">
          {/* Card 1: Discovery Speed Comparison */}
          <div className="lg:sticky lg:top-12 lg:max-h-[calc(100vh-64px)] self-start w-full flex flex-col justify-between">
          <motion.div
            onMouseEnter={() => setIsHoveredCard1(true)}
            onMouseLeave={() => setIsHoveredCard1(false)}
            className={cn(
              "flex flex-col justify-between rounded-3xl border transition-all duration-300 relative overflow-hidden group shadow-xl h-full",
              "p-6 lg:py-4 lg:px-6 lg:max-h-[calc(100vh-64px)]",
              "bg-white border-slate-300/80 hover:border-slate-400",
              "dark:bg-[#121826]/95 dark:border-slate-700/80 dark:hover:border-cyan-500/50 dark:shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            )}
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-400/10 rounded-full blur-3xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />

            <div>
              <div className="flex items-center justify-between mb-4 lg:mb-3">
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

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 lg:mb-4">
                Traditional drug target validation takes over 4 years of wet-lab trial and error. AuraGen&apos;s predictive generative engine simulates multi-million binding states in-silico, compressing validation down to 48 days.
              </p>
            </div>

            {/* Interactive Progress Micro-Graph */}
            <div className="p-4 lg:p-4 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex flex-col gap-3 shrink-0">
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
          </div>

          {/* Card 2: Radial Research Network — scroll-pinned in column */}
          <TargetingArchitecture />
        </div>

        {/* ── 3. Full-Width Impact Stats Strip ─────────────────────────────── */}
        <ScrollReveal direction="up" delay={0.1} className="mt-8">
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-3 gap-6 rounded-3xl p-4 sm:p-8 border transition-all duration-300 shadow-xl",
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
        </ScrollReveal>

        </div>
      </div>
    </section>
);
}
