"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, animate, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  Award,
  Layers,
  Activity,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ─── Animated Number Counter Component ──────────────────────────────────────

interface CounterProps {
  from?: number;
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

function AnimatedCounter({
  from = 0,
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Trigger when 20 % of the section is in view
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [displayValue, setDisplayValue] = useState(
    `${prefix}${from.toFixed(decimals)}${suffix}`
  );

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(from, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (decimals === 0) {
          setDisplayValue(
            `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`
          );
        } else {
          setDisplayValue(`${prefix}${latest.toFixed(decimals)}${suffix}`);
        }
      },
    });

    return () => controls.stop();
  }, [isInView, from, to, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={cn("font-mono font-extrabold tabular-nums", className)}>
      {displayValue}
    </span>
  );
}

// ─── Stagger variants for the bento card grid ────────────────────────────────

const bentoGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const bentoCardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Main ImpactSection Component ───────────────────────────────────────────

export function ImpactSection() {
  const [timelineYear, setTimelineYear] = useState<number>(0.3);

  return (
    <section
      id="impact"
      className="relative w-full py-12 sm:py-24 px-[4%] transition-colors duration-300 overflow-hidden dark:bg-[#030508] bg-[#F8FAFC]"
    >
      {/* Luminous Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 dark:via-cyan-400/20 to-transparent absolute top-0 left-0 right-0" />
      {/* Ambient background radial glow in dark mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="relative z-10">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <ScrollReveal direction="up" className="flex flex-col gap-4 max-w-3xl mb-16">
          <div>
            <Badge variant="default">MEASURABLE IMPACT</Badge>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            Quantifiable breakthroughs in{" "}
            <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-cyan-500 dark:from-cyan-400 dark:via-teal-300 dark:to-blue-400 bg-clip-text text-transparent">
              therapeutic delivery.
            </span>
          </h2>

          <p className="text-[1rem] text-slate-600 dark:text-slate-300 leading-relaxed">
            Validating clinical efficacy, speed, and precision across multi-omic discovery pipelines.
          </p>
        </ScrollReveal>

        {/* ── 4-Card Bento Metrics Grid — staggered entrance ──────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={bentoGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
        >

          {/* Stat 1: Target Efficacy */}
          <motion.div
            variants={bentoCardVariants}
            className={cn(
              "rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 group shadow-xl",
              "bg-white border-slate-300/80 hover:border-slate-400",
              "dark:bg-[#121826]/95 dark:border-slate-700/80 dark:hover:border-cyan-500/50 dark:shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-cyan-400">
                  ACCURACY
                </span>
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 dark:bg-cyan-400/10 text-teal-600 dark:text-cyan-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              <div className="font-heading text-3xl sm:text-4xl text-slate-900 dark:text-white mb-2">
                <AnimatedCounter to={99.4} decimals={1} suffix="%" />
              </div>

              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                Target Binding Accuracy
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Zero off-target toxicity across in-vitro validation models.
              </p>
            </div>

            {/* Visual Indicator: Live mini progress bar */}
            <div className="mt-6 space-y-1.5 pt-4 border-t border-slate-100 dark:border-white/5">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>In-Vitro Fidelity</span>
                <span className="text-teal-600 dark:text-cyan-400 font-bold">99.4%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden w-full">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "99.4%" }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full shadow-[0_0_8px_rgba(0,242,254,0.5)]"
                />
              </div>
            </div>
          </motion.div>

          {/* Stat 2: Velocity */}
          <motion.div
            variants={bentoCardVariants}
            className={cn(
              "rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 group shadow-xl",
              "bg-white border-slate-300/80 hover:border-slate-400",
              "dark:bg-[#121826]/95 dark:border-slate-700/80 dark:hover:border-cyan-500/50 dark:shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-cyan-400">
                  VELOCITY
                </span>
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 dark:bg-cyan-400/10 text-teal-600 dark:text-cyan-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>

              <div className="font-heading text-3xl sm:text-4xl text-slate-900 dark:text-white mb-2">
                <AnimatedCounter to={10} suffix="x" />
              </div>

              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                Accelerated Discovery Rate
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Target validation compressed from 4 years to 48 days.
              </p>
            </div>

            {/* Visual Indicator: Speed pill tag */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Timeline Impact</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                +900% Speed
              </span>
            </div>
          </motion.div>

          {/* Stat 3: Scale */}
          <motion.div
            variants={bentoCardVariants}
            className={cn(
              "rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 group shadow-xl",
              "bg-white border-slate-300/80 hover:border-slate-400",
              "dark:bg-[#121826]/95 dark:border-slate-700/80 dark:hover:border-cyan-500/50 dark:shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-cyan-400">
                  SCALE
                </span>
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 dark:bg-cyan-400/10 text-teal-600 dark:text-cyan-400 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
              </div>

              <div className="font-heading text-3xl sm:text-4xl text-slate-900 dark:text-white mb-2">
                <AnimatedCounter to={140000} suffix="+" />
              </div>

              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                Genomes Sequenced
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Proprietary multi-omic dataset training AuraCore models.
              </p>
            </div>

            {/* Visual Indicator: Floating micro-nodes */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Dataset Scope</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse delay-150" />
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-300" />
              </div>
            </div>
          </motion.div>

          {/* Stat 4: Clinical Value */}
          <motion.div
            variants={bentoCardVariants}
            className={cn(
              "rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 group shadow-xl",
              "bg-white border-slate-300/80 hover:border-slate-400",
              "dark:bg-[#121826]/95 dark:border-slate-700/80 dark:hover:border-cyan-500/50 dark:shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-cyan-400">
                  PIPELINE VALUE
                </span>
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 dark:bg-cyan-400/10 text-teal-600 dark:text-cyan-400 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
              </div>

              <div className="font-heading text-3xl sm:text-4xl text-slate-900 dark:text-white mb-2">
                <AnimatedCounter prefix="$" to={2.4} decimals={1} suffix="B" />
              </div>

              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                Partnered Pipeline Value
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Partnered therapeutics progressing through FDA Phase II trials.
              </p>
            </div>

            {/* Visual Indicator: Status badge */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">FDA Pipeline</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-500/10 dark:bg-cyan-400/10 text-teal-700 dark:text-cyan-400 border border-teal-500/20 dark:border-cyan-400/20">
                ● 3 Phase II Programs
              </span>
            </div>
          </motion.div>

        </motion.div>

        {/* ── 5. High-Impact Full-Width Metric Highlight Card ─────────────── */}
        <ScrollReveal direction="up" delay={0.15} className="mt-6">
          <div
            className={cn(
              "rounded-3xl p-8 sm:p-10 border shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden",
              "bg-white border-slate-200/90",
              "dark:bg-[#0A0D14]/90 dark:border-white/10"
            )}
          >
            {/* Ambient inner gradient glow */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/10 dark:bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

            {/* Left Column Callout */}
            <div className="lg:col-span-6 flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600 dark:text-cyan-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-cyan-400">
                  TIMELINE ACCELERATION MODEL
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                From in-silico hypothesis to clinical candidate in{" "}
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 dark:from-cyan-400 dark:to-teal-300 bg-clip-text text-transparent">
                  record timelines.
                </span>
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                Our automated bio-engine runs 24/7 parallel synthesis pathways, eliminating traditional wet-lab trial bottlenecks and compressing multi-year development cycles into months.
              </p>
            </div>

            {/* Right Column: Interactive Comparison Chart */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/90 dark:bg-black/80 border border-slate-800 dark:border-white/10 text-white relative z-10 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">DEVELOPMENT_DURATION_COMPARISON</span>
                <span className="text-xs font-mono text-cyan-400 font-bold">15x FASTER ENTRY</span>
              </div>

              {/* Bar 1: Legacy Drug Discovery */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Legacy Pharma Discovery</span>
                  <span className="font-mono text-slate-300">4.5 Years</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800 overflow-hidden w-full">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
                    className="h-full bg-slate-600 rounded-full opacity-50"
                  />
                </div>
              </div>

              {/* Bar 2: AuraGen Bio-Engine */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-200">
                  <span className="text-cyan-400 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5" /> AuraGen Bio-Engine
                  </span>
                  <span className="font-mono text-cyan-400">0.3 Years (110 Days)</span>
                </div>
                <div className="h-3.5 rounded-full bg-slate-800 overflow-hidden w-full">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "15%" }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.35 }}
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full shadow-[0_0_12px_rgba(0,242,254,0.6)]"
                  />
                </div>
              </div>

              {/* Interactive Timeline Slider */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Scrub Target Phase:</span>
                <div className="flex gap-2">
                  {[0.3, 0.8, 1.2].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setTimelineYear(yr)}
                      className={cn(
                        "px-2.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer",
                        timelineYear === yr
                          ? "bg-cyan-500 text-slate-950 font-bold"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      )}
                    >
                      Phase {yr === 0.3 ? "I" : yr === 0.8 ? "II" : "IND"} ({yr}y)
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
