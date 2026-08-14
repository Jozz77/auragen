"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Apply staggerChildren to this wrapper so direct motion.* children stagger */
  staggerChildren?: number;
  /** Extra duration override (default 0.75s) */
  duration?: number;
  /** Margin before the animation fires — negative values delay until further in view */
  margin?: string;
  className?: string;
}

// Biotech-grade cubic-bezier: fast acceleration, ultra-smooth deceleration
const BIOTECH_EASE = [0.16, 1, 0.3, 1] as const;

// ─── Component ───────────────────────────────────────────────────────────────

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  staggerChildren = 0,
  duration = 0.75,
  margin = "-80px",
  className = "",
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const offsets: Record<ScrollRevealProps["direction"] & string, { x: number; y: number }> = {
    up:    { y: 40, x: 0 },
    down:  { y: -40, x: 0 },
    left:  { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none:  { x: 0, y: 0 },
  };

  const { x, y } = offsets[direction];

  // When the user prefers reduced motion, skip translate entirely — only fade in
  const hiddenState = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, x, y };

  const visibleState = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0 };

  const transitionProps = shouldReduceMotion
    ? { duration: 0.2, delay }
    : {
        duration,
        delay,
        ease: BIOTECH_EASE,
        ...(staggerChildren > 0 ? { staggerChildren } : {}),
      };

  return (
    <motion.div
      initial={hiddenState}
      whileInView={visibleState}
      viewport={{ once: true, margin }}
      transition={transitionProps}
      className={className}
    >
      {children}
    </motion.div>
  );
}
