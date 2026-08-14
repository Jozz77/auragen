"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import {
  LucideIcon,
  Cpu,
  Dna,
  Zap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Share2,
} from "lucide-react";

// ─── Stage Data ──────────────────────────────────────────────────────────────

interface TechStage {
  id: string;
  stepNumber: string;
  title: string;
  shortDesc: string;
  badge: string;
  fullDesc: string;
  icon: LucideIcon;
}

const TECH_STAGES: TechStage[] = [
  {
    id: "stage-1",
    stepNumber: "01",
    title: "Genomic AI Decoder",
    shortDesc: "Deep-learning sequence prediction",
    badge: "SEQUENCE DECODING",
    fullDesc:
      "Trained on over 2.4 trillion nucleotide sequences across 85,000 organism genomes, our transformer model decodes non-coding regulatory regions and predicts promoter-enhancer interactions with atomic precision.",
    icon: Cpu,
  },
  {
    id: "stage-2",
    stepNumber: "02",
    title: "In-Silico Molecular Folding",
    shortDesc: "Real-time 3D protein structure prediction",
    badge: "BIOPHYSICAL SIMULATION",
    fullDesc:
      "Predict atomic residue positions and side-chain conformations in seconds. Computes thermodynamic energy minimization to guarantee binding affinity before wet-lab synthesis.",
    icon: Dna,
  },
  {
    id: "stage-3",
    stepNumber: "03",
    title: "CRISPR-Cas Precision",
    shortDesc: "Zero off-target genetic rewriting",
    badge: "GENOME EDITING",
    fullDesc:
      "Engineered Cas13 & Cas12 variant nucleases designed via evolutionary algorithms to eliminate bystander cleavage and achieve single-nucleotide target specificity.",
    icon: ShieldCheck,
  },
  {
    id: "stage-4",
    stepNumber: "04",
    title: "Targeted Delivery",
    shortDesc: "Lipid nanoparticle encapsulation",
    badge: "NANOPARTICLE TRANSPORT",
    fullDesc:
      "Ionizable lipid nanoparticles engineered with ligand-directed surface receptors to achieve organ-specific cell tropism and immune-evasive cytosolic payload delivery.",
    icon: Share2,
  },
];

// ─── Stage 01 Widget: Live DNA Sequence Stream ────────────────────────────────

const DNA_BASES = ["A", "T", "C", "G"];
const INITIAL_SEQUENCE = [
  "A", "T", "G", "C", "C", "A", "T", "G", "G", "C", "T", "A", "C", "G", "T", "A",
  "T", "G", "C", "A", "A", "T", "G", "C", "C", "G", "T", "A", "C", "G", "A", "T"
];

function Stage01Widget() {
  const [seq, setSeq] = useState(INITIAL_SEQUENCE);
  const [isScanning, setIsScanning] = useState(false);

  const rescanSequence = () => {
    setIsScanning(true);
    setTimeout(() => {
      const newSeq = Array.from({ length: 32 }, () =>
        DNA_BASES[Math.floor(Math.random() * DNA_BASES.length)]
      );
      setSeq(newSeq);
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-5 p-6 rounded-2xl bg-slate-900/90 dark:bg-black/80 border border-slate-800 dark:border-white/10 text-white shadow-inner">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="text-xs font-mono text-cyan-400 tracking-wider">LIVE_SEQUENCE_STREAM // 2.4TB/s</span>
        </div>
        <button
          onClick={rescanSequence}
          disabled={isScanning}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", isScanning && "animate-spin text-cyan-400")} />
          <span>Rescan Motif</span>
        </button>
      </div>

      {/* Sequence grid display */}
      <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 font-mono text-sm py-2">
        {seq.map((base, idx) => {
          const isMotif = idx >= 8 && idx <= 15;
          return (
            <motion.div
              key={idx}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.015 }}
              className={cn(
                "h-9 rounded-lg flex items-center justify-center font-bold border transition-all select-none",
                isMotif
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,242,254,0.3)]"
                  : "bg-slate-800/80 border-slate-700/60 text-slate-300"
              )}
            >
              {base}
            </motion.div>
          );
        })}
      </div>

      {/* Metrics footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-4">
          <div className="px-2.5 py-1 rounded-md dark:bg-cyan-950/40 dark:border-cyan-500/40 border border-cyan-500/20 dark:text-cyan-300 font-mono">
            Promoter Match: <span className="text-cyan-400 font-semibold">99.7%</span>
          </div>
          <div className="px-2.5 py-1 rounded-md dark:bg-emerald-950/40 dark:border-emerald-500/40 border border-emerald-500/20 dark:text-emerald-300 font-mono">
            Enhancer Motif: <span className="text-emerald-400 font-semibold">POS_8-15</span>
          </div>
        </div>
        <div className="text-slate-400 font-mono px-2 py-0.5 rounded border border-slate-700/60">MODEL_CONFIDENCE: HIGH</div>
      </div>
    </div>
  );
}

// ─── Stage 02 Widget: In-Silico Folding Precision Slider ────────────────────

function Stage02Widget() {
  const [foldProgress, setFoldProgress] = useState(94);

  return (
    <div className="flex flex-col gap-5 p-6 rounded-2xl bg-slate-900/90 dark:bg-black/80 border border-slate-800 dark:border-white/10 text-white">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-teal-400 tracking-wider">pLDDT_STRUCTURE_PRECISION</span>
        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
          <Sliders className="w-3.5 h-3.5" /> Drag fold resolution
        </span>
      </div>

      {/* Fold completion display */}
      <div className="flex items-baseline justify-between py-1">
        <div>
          <span className="font-heading text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            {foldProgress.toFixed(1)}%
          </span>
          <span className="text-xs text-slate-400 ml-2 font-mono">pLDDT Score</span>
        </div>
        <div className="text-right">
          <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> High Confidence Alignment
          </div>
          <div className="text-[11px] text-slate-400 font-mono">RMSD: {(1.2 - (foldProgress / 100) * 0.5).toFixed(2)} Å</div>
        </div>
      </div>

      {/* Interactive slider */}
      <div className="space-y-2">
        <input
          type="range"
          min="40"
          max="99.8"
          step="0.1"
          value={foldProgress}
          onChange={(e) => setFoldProgress(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>40% (Coarse Alpha)</span>
          <span>70% (High Confidence)</span>
          <span>99.8% (Atomic Resolution)</span>
        </div>
      </div>

      {/* Simulated Residue Heatmap */}
      <div className="grid grid-cols-12 gap-1 h-4">
        {Array.from({ length: 24 }).map((_, i) => {
          const val = (i * 4 + foldProgress) % 100;
          return (
            <div
              key={i}
              className={cn(
                "h-full rounded-sm transition-colors duration-200",
                val > 80 ? "bg-cyan-400" : val > 50 ? "bg-teal-500 opacity-70" : "bg-blue-600 opacity-40"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Stage 03 Widget: CRISPR Precision Split View ────────────────────────────

function Stage03Widget() {
  const [mode, setMode] = useState<"wild" | "auragen">("auragen");

  return (
    <div className="flex flex-col gap-5 p-6 rounded-2xl bg-slate-900/90 dark:bg-black/80 border border-slate-800 dark:border-white/10 text-white">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-cyan-400 tracking-wider">OFF_TARGET_CLEAVAGE_SIMULATION</span>
        
        {/* Toggle Switch */}
        <div className="flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
          <button
            onClick={() => setMode("wild")}
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer",
              mode === "wild"
                ? "bg-slate-700 text-slate-200 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            Wild-Type Cas9
          </button>
          <button
            onClick={() => setMode("auragen")}
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer",
              mode === "auragen"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            AuraGen Cas13+
          </button>
        </div>
      </div>

      {/* Comparison Panel */}
      <AnimatePresence mode="wait">
        {mode === "wild" ? (
          <motion.div
            key="wild"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-xs">
                <AlertCircle className="w-4 h-4" /> Bystander Off-Target Risk Detected
              </div>
              <span className="text-xs font-mono text-red-400 font-bold">4.20% Off-Target</span>
            </div>
            <div className="font-mono text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-red-500/20">
              5&apos;- G A T C C <span className="text-red-400 underline font-bold bg-red-500/20 px-1">T A G C</span> C T A G A - 3&apos;
              <div className="text-[10px] text-red-400 mt-1 font-sans">▲ Unintended cleavage at secondary loci 14 &amp; 18</div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="auragen"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4" /> Single-Nucleotide Precision Verified
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">&lt; 0.01% Off-Target</span>
            </div>
            <div className="font-mono text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-emerald-500/20">
              5&apos;- G A T C C <span className="text-emerald-400 font-bold bg-emerald-500/20 px-1">C G A T</span> C T A G A - 3&apos;
              <div className="text-[10px] text-emerald-400 mt-1 font-sans">✓ Zero off-target cleavage across whole-genome assay</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <span>Target Locus: <span className="text-white font-mono">EXON_4_MUTATION</span></span>
        <span>PAM Recognition: <span className="text-cyan-400 font-mono">NGG_VERIFIED</span></span>
      </div>
    </div>
  );
}

// ─── Stage 04 Widget: Targeted Delivery Nanoparticle Simulation ──────────────

function Stage04Widget() {
  const [delivering, setDelivering] = useState(false);
  const [delivered, setDelivered] = useState(false);

  const triggerDelivery = () => {
    setDelivering(true);
    setDelivered(false);
    setTimeout(() => {
      setDelivering(false);
      setDelivered(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-5 p-6 rounded-2xl bg-slate-900/90 dark:bg-black/80 border border-slate-800 dark:border-white/10 text-white">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-teal-400 tracking-wider">LIPID_NANOPARTICLE_TROPISM</span>
        <button
          onClick={triggerDelivery}
          disabled={delivering}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white transition-all cursor-pointer shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{delivering ? "Fusing..." : "Simulate Uptake"}</span>
        </button>
      </div>

      {/* Visual LNP Shell Representation */}
      <div className="relative h-28 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
        {/* Outer lipid shell ring */}
        <motion.div
          animate={{ scale: delivering ? [1, 1.15, 0.9, 1] : [1, 1.04, 1] }}
          transition={{ duration: delivering ? 1.2 : 3, repeat: delivering ? 0 : Infinity }}
          className={cn(
            "w-20 h-20 rounded-full border-2 flex items-center justify-center transition-colors duration-500",
            delivered
              ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_24px_rgba(16,185,129,0.4)]"
              : "border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,242,254,0.2)]"
          )}
        >
          {/* Inner RNA payload particles */}
          <div className="flex gap-1">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={cn("w-2.5 h-2.5 rounded-full", delivered ? "bg-emerald-400" : "bg-cyan-400")}
            />
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className={cn("w-2.5 h-2.5 rounded-full", delivered ? "bg-teal-300" : "bg-blue-400")}
            />
          </div>
        </motion.div>

        {/* Pulse wave during delivery */}
        {delivering && (
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute w-24 h-24 rounded-full border-2 border-cyan-400"
          />
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <span>Tissue Tropism: <span className="text-white font-mono">HEPATIC_STELLATE</span></span>
        <span>Cytosolic Release: <span className="text-emerald-400 font-mono font-bold">98.4%</span></span>
      </div>
    </div>
  );
}

// ─── Main TechSection Component ─────────────────────────────────────────────

export function TechSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile viewport on mount/resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint matches user request "< md"
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Desktop scroll-driven phase stepper ─────────────────────────────────────
  // We use a native scroll listener + getBoundingClientRect() to get exact pixel
  // measurements. The dead zone is expressed in PIXELS (65 % of the viewport
  // height) so it is viewport-size-independent. Phase-switching only begins once
  // the user has scrolled that many pixels past the section's pin point — i.e.
  // roughly when the interactive grid area is near the top of the viewport.
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      // rect.top > 0 → section hasn't pinned yet; skip.
      if (rect.top > 0) {
        setScrollIndex(0);
        return;
      }

      // How many px the user has scrolled PAST the section's pin point.
      const scrolledPx = Math.abs(rect.top);
      const totalScrollPx = el.scrollHeight - window.innerHeight;

      // Dead zone: wait until the user has scrolled 65% of the viewport height
      // into the section. This corresponds approximately to the section header
      // scrolling out of the "spotlight" and the interactive grid becoming
      // the dominant element near the top of the viewport.
      const DEAD_ZONE_PX = window.innerHeight * 0.65;

      if (scrolledPx < DEAD_ZONE_PX) {
        setScrollIndex(0);
        return;
      }

      const activePx = scrolledPx - DEAD_ZONE_PX;
      const activeRangePx = totalScrollPx - DEAD_ZONE_PX;
      const adjusted = Math.min(activePx / activeRangePx, 1);

      const total = TECH_STAGES.length;
      let idx = Math.floor(adjusted * total);
      if (idx >= total) idx = total - 1;
      setScrollIndex(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount in case page is already partially scrolled.
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Determine active stage index
  const activeIndex = isMobile ? mobileActiveIndex : scrollIndex;
  const activeStage = TECH_STAGES[activeIndex];

  // Tab click handler with smooth scroll on desktop
  const handleTabClick = (index: number) => {
    if (isMobile) {
      setMobileActiveIndex(index);
      return;
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const sectionScrollTop = window.scrollY + rect.top;
      const totalScrollPx = containerRef.current.scrollHeight - window.innerHeight;
      const DEAD_ZONE_PX = window.innerHeight * 0.65;
      const activeRangePx = totalScrollPx - DEAD_ZONE_PX;
      const segmentPx = activeRangePx / TECH_STAGES.length;
      // Target is the section's document-top + dead zone + the tab's segment offset.
      const targetY = sectionScrollTop + DEAD_ZONE_PX + index * segmentPx + 10;

      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const renderWidget = (stageId: string) => {
    switch (stageId) {
      case "stage-1":
        return <Stage01Widget />;
      case "stage-2":
        return <Stage02Widget />;
      case "stage-3":
        return <Stage03Widget />;
      case "stage-4":
        return <Stage04Widget />;
      default:
        return <Stage01Widget />;
    }
  };

  return (
    <section
      ref={containerRef}
      id="technology"
      className={cn(
        "relative w-full transition-colors duration-300 dark:bg-[#030508] bg-[#F8FAFC] [background-image:radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] dark:[background-image:linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] dark:[background-size:32px_32px]",
        isMobile ? "py-12" : "h-[400vh]"
      )}
    >
      {/* Sticky viewport wrapper */}
      <div 
        className={cn(
          "w-full flex flex-col justify-center overflow-visible px-[4%]",
          !isMobile ? "sticky top-0 min-h-screen py-12" : ""
        )}
      >
        {/* Luminous Section Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 dark:via-cyan-400/20 to-transparent absolute top-0 left-0 right-0" />
        <div className="relative z-10">

          {/* ── Section Header ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-4 max-w-3xl mb-16">
            <div>
              <Badge variant="default">PROPRIETARY TECH STACK</Badge>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08] text-balance">
              AI-powered molecular{" "}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:via-cyan-400 dark:to-teal-300 bg-clip-text text-transparent">
                engineering engine.
              </span>
            </h2>

            <p className="text-[1.12rem] text-slate-600 dark:text-slate-300 leading-relaxed">
              From genomic sequence decoding to synthetic cell delivery in four integrated phases.
            </p>
          </div>

          {/* ── Pipeline Showcase Layout (Grid) ─────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Stage Selector Tabs (col-span-4) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {TECH_STAGES.map((stage, index) => {
                const isActive = activeIndex === index;
                const IconComponent = stage.icon;

                return (
                  <button
                    key={stage.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer overflow-hidden",
                      isActive
                        ? [
                            "bg-white shadow-lg border-teal-500/40 text-slate-900",
                            "dark:bg-[#0D121F] dark:border-cyan-400/50 dark:text-white dark:shadow-[0_0_24px_rgba(0,242,254,0.15)]",
                          ].join(" ")
                        : [
                            "bg-white/60 hover:bg-white border-slate-200/80 text-slate-600",
                            "dark:bg-[#0A0D14]/50 dark:hover:bg-[#0D121F]/70 dark:border-white/5 dark:text-slate-400 dark:hover:text-slate-200",
                          ].join(" ")
                    )}
                  >
                    {/* Left accent indicator bar when active */}
                    {isActive && (
                      <motion.div
                        layoutId="active-tech-tab"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors mt-0.5",
                          isActive
                            ? "bg-gradient-to-tr from-violet-600 to-cyan-500 dark:from-violet-500 dark:to-cyan-400 text-white font-bold shadow-md"
                            : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                        )}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-teal-600 dark:text-cyan-400">
                            {stage.stepNumber}
                          </span>
                          <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                            {stage.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                          {stage.shortDesc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Active Stage Interactive Card (col-span-8) */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={cn(
                    "rounded-3xl p-4 sm:p-8 border shadow-xl flex flex-col justify-between gap-8 relative overflow-hidden backdrop-blur-xl",
                    "bg-white border-slate-200/90",
                    "dark:bg-[#0D121F]/80 dark:border-white/10"
                  )}
                >
                  {/* Background soft ambient glow */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row items-start sm:items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-cyan-400 bg-teal-500/10 dark:bg-cyan-400/10 px-3 py-1 rounded-full border border-teal-500/20 dark:border-cyan-400/20">
                        PHASE {activeStage.stepNumber} // {activeStage.badge}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 font-mono">
                        <span>Interactive Sandbox</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      {activeStage.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 text-[0.9rem] leading-relaxed max-w-2xl">
                      {activeStage.fullDesc}
                    </p>
                  </div>

                  {/* Live Micro-Widget Area */}
                  <div className="relative z-10">
                    {renderWidget(activeStage.id)}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
