"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
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

const STAGE_COUNT = TECH_STAGES.length;

function progressToStageIndex(progress: number): number {
  const segment = 1 / STAGE_COUNT;
  let idx = Math.floor(progress / segment);
  if (idx >= STAGE_COUNT) idx = STAGE_COUNT - 1;
  if (idx < 0) idx = 0;
  return idx;
}

function stageIndexToProgress(index: number): number {
  return (index + 0.5) / STAGE_COUNT;
}

// ─── Mobile / Tablet horizontal tab bar ──────────────────────────────────────

function MobileTechTabBar({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-1.5 mb-3 lg:hidden">
      {TECH_STAGES.map((stage, index) => {
        const IconComponent = stage.icon;
        const isActive = activeIndex === index;

        return (
          <button
            key={stage.id}
            type="button"
            onClick={() => onSelect(index)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-lg border py-2 px-1 touch-manipulation transition-all duration-300",
              isActive
                ? "border-cyan-500/80 bg-slate-900/80 dark:bg-slate-900/80 shadow-[0_0_12px_rgba(34,211,238,0.35)] text-cyan-400"
                : "border-slate-200/80 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/30 text-slate-500 opacity-80"
            )}
          >
            <IconComponent className="w-3.5 h-3.5" />
            <span className="text-[9px] font-mono font-bold">{stage.stepNumber}</span>
            <span className="text-[8px] font-semibold leading-tight text-center line-clamp-1 w-full px-0.5">
              {stage.title.split(" ")[0]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

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
    <div className="flex h-full flex-col gap-2 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-white">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
          </span>
          <span className="text-[10px] font-mono text-cyan-400 tracking-wider">LIVE_SEQUENCE_STREAM</span>
        </div>
        <button
          onClick={rescanSequence}
          disabled={isScanning}
          className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <RefreshCw className={cn("w-3 h-3", isScanning && "animate-spin text-cyan-400")} />
          <span>Rescan</span>
        </button>
      </div>

      <div className="grid grid-cols-8 sm:grid-cols-16 gap-0.5 font-mono text-[10px] flex-1 min-h-0 content-center">
        {seq.map((base, idx) => {
          const isMotif = idx >= 8 && idx <= 15;
          return (
            <div
              key={idx}
              className={cn(
                "h-5 rounded flex items-center justify-center font-bold border",
                isMotif
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                  : "bg-slate-800/80 border-slate-700/60 text-slate-300"
              )}
            >
              {base}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-800 text-[9px] text-slate-400 font-mono shrink-0">
        <span>Promoter: <span className="text-cyan-400">99.7%</span></span>
        <span>Motif: <span className="text-emerald-400">POS_8-15</span></span>
        <span className="text-slate-500">CONF: HIGH</span>
      </div>
    </div>
  );
}

// ─── Stage 02 Widget: In-Silico Folding Precision Slider ────────────────────

function Stage02Widget() {
  const [foldProgress, setFoldProgress] = useState(94);

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-white">
      <div className="flex items-center justify-between shrink-0">
        <span className="text-[10px] font-mono text-teal-400 tracking-wider">pLDDT_PRECISION</span>
        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
          <Sliders className="w-3 h-3" /> Drag
        </span>
      </div>

      <div className="flex items-baseline justify-between shrink-0">
        <div>
          <span className="font-heading text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            {foldProgress.toFixed(1)}%
          </span>
          <span className="text-[10px] text-slate-400 ml-1.5 font-mono">pLDDT</span>
        </div>
        <div className="text-right text-[10px]">
          <div className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> High Confidence
          </div>
          <div className="text-slate-400 font-mono">RMSD: {(1.2 - (foldProgress / 100) * 0.5).toFixed(2)} Å</div>
        </div>
      </div>

      <div className="mt-auto space-y-1 shrink-0">
        <input
          type="range"
          min="40"
          max="99.8"
          step="0.1"
          value={foldProgress}
          onChange={(e) => setFoldProgress(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="grid grid-cols-12 gap-0.5 h-3">
          {Array.from({ length: 24 }).map((_, i) => {
            const val = (i * 4 + foldProgress) % 100;
            return (
              <div
                key={i}
                className={cn(
                  "h-full rounded-sm",
                  val > 80 ? "bg-cyan-400" : val > 50 ? "bg-teal-500 opacity-70" : "bg-blue-600 opacity-40"
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Stage 03 Widget: CRISPR Precision Split View ────────────────────────────

function Stage03Widget() {
  const [mode, setMode] = useState<"wild" | "auragen">("auragen");

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-white">
      <div className="flex items-center justify-between shrink-0 gap-2">
        <span className="text-[10px] font-mono text-cyan-400 tracking-wider">OFF_TARGET_SIM</span>
        <div className="flex rounded-md bg-slate-800 p-0.5 border border-slate-700 shrink-0">
          <button
            onClick={() => setMode("wild")}
            className={cn(
              "px-2 py-0.5 rounded text-[10px] font-medium transition-all cursor-pointer",
              mode === "wild" ? "bg-slate-700 text-slate-200" : "text-slate-400"
            )}
          >
            Wild-Type
          </button>
          <button
            onClick={() => setMode("auragen")}
            className={cn(
              "px-2 py-0.5 rounded text-[10px] font-medium transition-all cursor-pointer",
              mode === "auragen" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400"
            )}
          >
            Cas13+
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {mode === "wild" ? (
            <motion.div
              key="wild"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full p-2.5 rounded-lg bg-red-950/30 border border-red-500/30 flex flex-col justify-center gap-1.5"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-red-400 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Off-Target Risk
                </span>
                <span className="font-mono text-red-400 font-bold">4.20%</span>
              </div>
              <div className="font-mono text-[9px] text-slate-300 bg-slate-950/60 p-2 rounded border border-red-500/20">
                5&apos;- G A T C C <span className="text-red-400 font-bold">T A G C</span> C T A G A - 3&apos;
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="auragen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex flex-col justify-center gap-1.5"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Precision Verified
                </span>
                <span className="font-mono text-emerald-400 font-bold">&lt; 0.01%</span>
              </div>
              <div className="font-mono text-[9px] text-slate-300 bg-slate-950/60 p-2 rounded border border-emerald-500/20">
                5&apos;- G A T C C <span className="text-emerald-400 font-bold">C G A T</span> C T A G A - 3&apos;
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono shrink-0">
        <span>Locus: <span className="text-white">EXON_4</span></span>
        <span>PAM: <span className="text-cyan-400">NGG</span></span>
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
    <div className="flex h-full flex-col gap-2 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-white">
      <div className="flex items-center justify-between shrink-0">
        <span className="text-[10px] font-mono text-teal-400 tracking-wider">LNP_TROPISM</span>
        <button
          onClick={triggerDelivery}
          disabled={delivering}
          className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r from-teal-500 to-blue-600 text-white transition-all cursor-pointer"
        >
          <Sparkles className="w-3 h-3" />
          <span>{delivering ? "Fusing..." : "Simulate Uptake"}</span>
        </button>
      </div>

      <div className="relative flex-1 min-h-0 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ scale: delivering ? [1, 1.15, 0.9, 1] : [1, 1.04, 1] }}
          transition={{ duration: delivering ? 1.2 : 3, repeat: delivering ? 0 : Infinity }}
          className={cn(
            "w-14 h-14 rounded-full border-2 flex items-center justify-center transition-colors duration-500",
            delivered
              ? "border-emerald-400 bg-emerald-500/10"
              : "border-cyan-400/60 bg-cyan-500/10"
          )}
        >
          <div className="flex gap-0.5">
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={cn("w-2 h-2 rounded-full", delivered ? "bg-emerald-400" : "bg-cyan-400")}
            />
            <motion.div
              animate={{ y: [0, 2, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className={cn("w-2 h-2 rounded-full", delivered ? "bg-teal-300" : "bg-blue-400")}
            />
          </div>
        </motion.div>
        {delivering && (
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute w-16 h-16 rounded-full border-2 border-cyan-400"
          />
        )}
      </div>

      <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono shrink-0">
        <span>Tropism: <span className="text-white">HEPATIC</span></span>
        <span>Release: <span className="text-emerald-400 font-bold">98.4%</span></span>
      </div>
    </div>
  );
}

// ─── Main TechSection Component ─────────────────────────────────────────────

export function TechSection() {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [manualIndex, setManualIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (manualIndex !== null) return;
    setScrollIndex(progressToStageIndex(progress));
  });

  const scrollToTab = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    const targetProgress = stageIndexToProgress(index);
    const targetScroll = containerTop + scrollableDistance * targetProgress;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  const handleTabClick = useCallback(
    (index: number) => {
      setManualIndex(index);
      setScrollIndex(index);
      scrollToTab(index);
      window.setTimeout(() => setManualIndex(null), 800);
    },
    [scrollToTab]
  );

  const activeIndex = scrollIndex;
  const activeStage = TECH_STAGES[activeIndex];

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
        "h-[300vh] lg:h-[400vh]"
      )}
    >
      {/* Sticky viewport wrapper — touch + desktop scroll pinning */}
      <div className="sticky top-4 lg:top-0 h-[calc(100dvh-32px)] lg:h-screen w-full px-[4%] flex flex-col justify-center overflow-hidden py-2 lg:py-6">
        {/* Luminous Section Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 dark:via-cyan-400/20 to-transparent absolute top-0 left-0 right-0" />
        <div className="relative z-10">

          {/* ── Section Header — fade-up on first viewport entry ────────── */}
          <motion.div
            className="flex flex-col max-w-3xl mb-2 lg:mb-6"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-1 lg:mb-2">
              <Badge variant="default">PROPRIETARY TECH STACK</Badge>
            </div>

            <h2 className="font-heading text-xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-1 lg:mb-2">
              AI-powered molecular{" "}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:via-cyan-400 dark:to-teal-300 bg-clip-text text-transparent">
                engineering engine.
              </span>
            </h2>

            <p className="hidden sm:block text-sm text-slate-400 mb-3 lg:mb-6">
              From genomic sequence decoding to synthetic cell delivery in four integrated phases.
            </p>
          </motion.div>

          <MobileTechTabBar activeIndex={activeIndex} onSelect={handleTabClick} />

          {/* ── Pipeline Showcase Layout (Grid) ─────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-stretch">

            {/* Left Column: vertical tabs — desktop only */}
            <div className="hidden lg:flex lg:col-span-4 flex-col gap-2 lg:h-[420px]">
              {TECH_STAGES.map((stage, index) => {
                const isActive = activeIndex === index;
                const IconComponent = stage.icon;

                return (
                  <button
                    key={stage.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex-1 min-h-[72px] max-h-[100px] p-3 rounded-xl border text-left transition-colors duration-300 cursor-pointer overflow-hidden shrink-0",
                      isActive
                        ? "border-cyan-500/80 bg-white dark:bg-slate-900/80 text-slate-900 dark:text-white shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                        : "border-slate-200/80 bg-white/50 dark:border-slate-800/60 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 opacity-80 hover:opacity-100"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-tech-tab"
                        className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-400"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    <div className="flex h-full items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                          isActive
                            ? "bg-gradient-to-tr from-violet-600 to-cyan-500 text-white"
                            : "bg-slate-800 text-slate-500"
                        )}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>

                      <div className="flex min-w-0 flex-col justify-center">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-cyan-400 shrink-0">
                            {stage.stepNumber}
                          </span>
                          <h3 className="font-heading font-bold text-sm text-inherit truncate">
                            {stage.title}
                          </h3>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-1">
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
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex flex-col justify-between h-[340px] sm:h-[400px] lg:h-[420px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 p-4 lg:p-6 relative overflow-hidden shadow-xl"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex shrink-0 flex-col gap-2 relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded-full border border-cyan-500/30">
                        PHASE {activeStage.stepNumber} // {activeStage.badge}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                        <span>Interactive Sandbox</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>

                    <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
                      {activeStage.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                      {activeStage.fullDesc}
                    </p>
                  </div>

                  {/* Sandbox — fixed height, pinned to bottom */}
                  <div className="relative z-10 mt-auto h-[120px] sm:h-[140px] lg:h-[180px] w-full shrink-0">
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
