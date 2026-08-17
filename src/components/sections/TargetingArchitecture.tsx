"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LucideIcon,
  Dna,
  Zap,
  Cpu,
  Target,
  Share2,
  ArrowUpRight,
  Layers,
} from "lucide-react";

// ─── Research Vectors (strict clockwise order) ───────────────────────────────

interface VectorNode {
  id: string;
  vectorId: string;
  name: string;
  fullDesc: string;
  icon: LucideIcon;
  angle: number;
}

const RESEARCH_VECTORS: VectorNode[] = [
  {
    id: "oncology",
    vectorId: "ONCOLOGY",
    name: "Oncology Precision",
    fullDesc:
      "Patient-specific tumor neoantigen mapping enabling highly selective CAR-T cell receptor engineering with minimal systemic toxicity.",
    icon: Target,
    angle: 270,
  },
  {
    id: "epigenetic",
    vectorId: "EPIGENETIC",
    name: "Epigenetic Rewriting",
    fullDesc:
      "Direct locus-specific transcriptional modulation without permanent DNA double-strand breaks, maintaining genomic integrity.",
    icon: Zap,
    angle: 330,
  },
  {
    id: "synthetic",
    vectorId: "SYNTHETIC",
    name: "Synthetic Vectoring",
    fullDesc:
      "De-novo synthetic capsid design allowing engineered cell-type tropism and selective therapeutic payload delivery.",
    icon: Share2,
    angle: 30,
  },
  {
    id: "insilico",
    vectorId: "IN_SILICO",
    name: "In-Silico Folding",
    fullDesc:
      "Biophysical structure prediction trained on multi-billion amino acid sequences to compute atomic-scale binding free energy.",
    icon: Cpu,
    angle: 150,
  },
  {
    id: "crispr",
    vectorId: "CRISPR",
    name: "CRISPR Delivery",
    fullDesc:
      "RNA-guided precision insertion utilizing optimized non-viral lipid nanoparticle transport systems for tissue-specific cell entry.",
    icon: Dna,
    angle: 210,
  },
];

const SEGMENT_COUNT = RESEARCH_VECTORS.length;
const AUTO_ROTATE_INTERVAL_MS = 3500;
const AUTO_ROTATE_RESUME_DELAY_MS = 5000;
const LG_BREAKPOINT = 1024;

function progressToVectorIndex(progress: number): number {
  if (progress < 0.2) return 0;
  if (progress < 0.4) return 1;
  if (progress < 0.6) return 2;
  if (progress < 0.8) return 3;
  return 4;
}

function vectorIndexToProgress(index: number): number {
  return (index + 0.5) / SEGMENT_COUNT;
}

function vectorPillClasses(isActive: boolean) {
  return cn(
    "border rounded-xl transition-all duration-300",
    isActive
      ? "border-cyan-400 bg-cyan-950/80 shadow-[0_0_20px_rgba(34,211,238,0.5)] text-cyan-400 scale-105"
      : "border-slate-800 bg-slate-900/50 text-slate-400 opacity-60 scale-100"
  );
}

// ─── Radial Diagram ──────────────────────────────────────────────────────────

function RadialDiagram({
  activeVector,
  activeIndex,
  segmentProgress,
  onSelectVector,
  compact,
}: {
  activeVector: VectorNode;
  activeIndex: number;
  segmentProgress: number;
  onSelectVector: (index: number) => void;
  compact: boolean;
}) {
  const progress = ((activeIndex + segmentProgress / 100) / SEGMENT_COUNT) * 100;

  return (
    <div className="relative h-[220px] lg:h-[300px] flex items-center justify-center shrink-0 w-full">
      {/* Central AuraCore Node with Progress Ring */}
      <div
        className={cn(
          "absolute z-20 flex flex-col items-center justify-center",
          compact ? "w-[4.5rem] h-[4.5rem]" : "w-20 h-20 lg:w-24 lg:h-24"
        )}
      >
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="rgba(148, 163, 184, 0.1)"
            strokeWidth="2"
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="#22d3ee"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 40}
            animate={{
              strokeDashoffset: 2 * Math.PI * 40 * (1 - progress / 100),
            }}
            transition={{ ease: "linear", duration: 0.03 }}
            strokeLinecap="round"
            className="drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
          />
        </svg>

        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className={cn(
            "rounded-full bg-gradient-to-tr from-teal-500 to-blue-600 dark:from-cyan-400 dark:to-teal-400 p-0.5 shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center relative z-10",
            compact ? "w-12 h-12" : "w-14 h-14 lg:w-16 lg:h-16"
          )}
        >
          <div className="w-full h-full rounded-full bg-white dark:bg-[#0A0D14] flex flex-col items-center justify-center p-1.5 text-center">
            <Layers
              className={cn(
                "text-teal-600 dark:text-cyan-400 mb-0.5",
                compact ? "w-3.5 h-3.5" : "w-4 h-4"
              )}
            />
            <span className="text-[0.55rem] lg:text-[0.6rem] font-bold font-heading text-slate-900 dark:text-white tracking-tight">
              AuraCore
            </span>
          </div>
        </motion.div>
      </div>

      {/* Radial Vectors SVG Connection Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 360"
        preserveAspectRatio="xMidYMid meet"
      >
        {RESEARCH_VECTORS.map((vector) => {
          const rad = (vector.angle * Math.PI) / 180;
          const radius = compact ? 108 : 125;
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
                stroke={
                  isActive ? "rgba(34, 211, 238, 0.25)" : "rgba(148, 163, 184, 0.15)"
                }
                strokeWidth="1"
                strokeDasharray={isActive ? "none" : "4 4"}
                className="transition-all duration-300"
              />
              {isActive && (
                <>
                  <motion.line
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    stroke="#22d3ee"
                    strokeWidth={2}
                    className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  <motion.line
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                    strokeDasharray="6, 12"
                    animate={{ strokeDashoffset: [0, -36] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="10"
                    fill="rgba(34, 211, 238, 0.15)"
                    className="animate-pulse"
                  />
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* Radial Nodes — icon-only on mobile/tablet, labels on desktop */}
      {RESEARCH_VECTORS.map((vector, index) => {
        const rad = (vector.angle * Math.PI) / 180;
        const radius = compact ? 108 : 125;
        const leftPercent = 50 + (radius / 200) * 50 * Math.cos(rad);
        const topPercent = 50 + (radius / 180) * 50 * Math.sin(rad);
        const isActive = activeVector.id === vector.id;
        const IconComponent = vector.icon;

        return (
          <button
            key={vector.id}
            type="button"
            onClick={() => onSelectVector(index)}
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              transform: "translate(-50%, -50%)",
            }}
            className={cn(
              "absolute z-30 flex items-center gap-1.5 rounded-2xl border transition-all duration-300 cursor-pointer group/node touch-manipulation",
              compact ? "p-2" : "p-2.5",
              vectorPillClasses(isActive),
              !isActive &&
                "hover:opacity-80 hover:border-slate-600 bg-white/90 dark:bg-[#111622]/90 border-slate-200 dark:border-slate-800"
            )}
          >
            <div
              className={cn(
                "rounded-xl flex items-center justify-center transition-colors",
                compact ? "w-7 h-7" : "w-8 h-8",
                isActive
                  ? "bg-cyan-400 text-slate-950"
                  : "bg-slate-100 dark:bg-white/5 group-hover/node:text-slate-900 dark:group-hover/node:text-white"
              )}
            >
              <IconComponent className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
            </div>
            <span className="text-[0.7rem] font-semibold whitespace-nowrap hidden lg:inline">
              {vector.name}
            </span>
            {isActive && (
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Mobile / Tablet Pill Bar ────────────────────────────────────────────────

function MobilePillBar({
  activeIndex,
  onSelectVector,
}: {
  activeIndex: number;
  onSelectVector: (index: number) => void;
}) {
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    pillRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex]);

  return (
    <div className="block lg:hidden shrink-0">
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 -mx-1 px-1">
        {RESEARCH_VECTORS.map((vector, index) => {
          const IconComponent = vector.icon;
          const isActive = activeIndex === index;

          return (
            <button
              key={vector.id}
              ref={(el) => {
                pillRefs.current[index] = el;
              }}
              type="button"
              onClick={() => onSelectVector(index)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 whitespace-nowrap touch-manipulation",
                vectorPillClasses(isActive)
              )}
            >
              <IconComponent className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold">{vector.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function TargetingArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastInteractionRef = useRef(Date.now());
  const isInViewRef = useRef(false);
  const isCompactRef = useRef(false);

  const [isCompact, setIsCompact] = useState(false);
  const [activeVector, setActiveVector] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const [autoRotatePaused, setAutoRotatePaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleResize = () => {
      const compact = window.innerWidth < LG_BREAKPOINT;
      isCompactRef.current = compact;
      setIsCompact(compact);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.35 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const applyScrollProgress = useCallback((progress: number) => {
    const idx = progressToVectorIndex(progress);
    setActiveVector(idx);

    const segmentSize = 1 / SEGMENT_COUNT;
    const segmentStart = idx * segmentSize;
    const localProg = ((progress - segmentStart) / segmentSize) * 100;
    setSegmentProgress(Math.min(100, Math.max(0, localProg)));
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (manualIndex !== null) return;

    lastInteractionRef.current = Date.now();
    if (isCompactRef.current) {
      setAutoRotatePaused(true);
    }

    applyScrollProgress(progress);
  });

  useEffect(() => {
    if (!isCompact) return;

    const resumeTimer = window.setInterval(() => {
      const idleMs = Date.now() - lastInteractionRef.current;
      if (idleMs >= AUTO_ROTATE_RESUME_DELAY_MS) {
        setAutoRotatePaused(false);
      }
    }, 500);

    return () => window.clearInterval(resumeTimer);
  }, [isCompact]);

  useEffect(() => {
    if (!isCompact) return;

    const rotateTimer = window.setInterval(() => {
      if (!isCompactRef.current) return;
      if (autoRotatePaused) return;
      if (!isInViewRef.current) return;
      if (manualIndex !== null) return;

      setActiveVector((prev) => (prev + 1) % SEGMENT_COUNT);
      setSegmentProgress(50);
    }, AUTO_ROTATE_INTERVAL_MS);

    return () => window.clearInterval(rotateTimer);
  }, [isCompact, autoRotatePaused, manualIndex]);

  const scrollToVector = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container || isCompactRef.current) return;

    const rect = container.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = containerHeight - viewportHeight;
    const targetProgress = vectorIndexToProgress(index);
    const targetScroll = containerTop + scrollableDistance * targetProgress;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  const pauseAutoRotate = useCallback(() => {
    lastInteractionRef.current = Date.now();
    setAutoRotatePaused(true);
  }, []);

  const handleSelectVector = useCallback(
    (index: number) => {
      pauseAutoRotate();
      setManualIndex(index);
      setActiveVector(index);
      setSegmentProgress(50);

      if (isCompactRef.current) {
        window.setTimeout(() => setManualIndex(null), 600);
        return;
      }

      scrollToVector(index);
      window.setTimeout(() => setManualIndex(null), 800);
    },
    [pauseAutoRotate, scrollToVector]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      pauseAutoRotate();
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    },
    [pauseAutoRotate]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;

      const dx = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
      const dy = Math.abs(e.touches[0].clientY - touchStartRef.current.y);

      if (dx > 8 || dy > 8) {
        pauseAutoRotate();
      }
    },
    [pauseAutoRotate]
  );

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
  }, []);

  const currentVector = RESEARCH_VECTORS[activeVector];

  const cardContent = (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "flex flex-col justify-between rounded-3xl border transition-all duration-300 relative shadow-xl w-full",
        "p-4 sm:p-6 min-h-[520px] lg:min-h-0",
        "lg:py-4 lg:px-6 lg:max-h-[calc(100vh-64px)] lg:overflow-hidden",
        "bg-white border-slate-300/80 hover:border-slate-400",
        "dark:bg-[#121826]/95 dark:border-slate-700/80 dark:hover:border-cyan-500/50 dark:shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
      )}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-2 shrink-0 z-10">
        <div className="min-w-0 pr-3">
          <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-teal-600 dark:text-cyan-400">
            Targeting Architecture
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Radial Research Network
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            {RESEARCH_VECTORS.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  activeVector === idx
                    ? "w-6 bg-cyan-400"
                    : activeVector > idx
                    ? "w-2 bg-cyan-500/40"
                    : "w-2 bg-slate-200 dark:bg-slate-800"
                )}
              />
            ))}
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 ml-1.5">
              {String(activeVector + 1).padStart(2, "0")} / 05
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-400/30 px-2.5 py-1 rounded-full">
            {String(activeVector + 1).padStart(2, "0")} / 05
          </span>
          <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 text-right max-w-[9rem] sm:max-w-none">
            {isCompact ? "Tap or scroll to inspect" : "Scroll or click to inspect"}
          </span>
        </div>
      </div>

      <MobilePillBar activeIndex={activeVector} onSelectVector={handleSelectVector} />

      <RadialDiagram
        activeVector={currentVector}
        activeIndex={activeVector}
        segmentProgress={segmentProgress}
        onSelectVector={handleSelectVector}
        compact={isCompact}
      />

      {/* Active Description Box */}
      <div className="shrink-0 mt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVector.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="p-3 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-bold text-teal-600 dark:text-cyan-400 flex items-center gap-1.5 min-w-0">
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{currentVector.name}</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 font-mono shrink-0">
                VECTOR_{String(activeVector + 1).padStart(2, "0")} // {currentVector.vectorId}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentVector.fullDesc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <div
      ref={containerRef}
      id="targeting-architecture"
      className="relative h-[280vh] lg:h-[400vh] w-full self-start"
    >
      <div className="sticky top-12 max-h-[calc(100vh-64px)] w-full flex flex-col justify-between">
        {cardContent}
      </div>
    </div>
  );
}
