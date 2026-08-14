"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Dna, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { useScrollspy } from "@/hooks/useScrollspy";

// Map nav item names → their section element IDs.
const NAV_ITEMS = [
  { name: "About",        id: "about" },
  { name: "Technology",   id: "technology" },
  { name: "Capabilities", id: "capabilities" },
  { name: "Impact",       id: "impact" },
];

const SECTION_IDS = NAV_ITEMS.map((i) => i.id);

export function Navbar() {
  const activeSection = useScrollspy(SECTION_IDS, 80);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Close mobile menu on resize to desktop ────────────────────────
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Lock body scroll when drawer is open ─────────────────────────
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // ── Smooth-scroll helper ──────────────────────────────────────────
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      history.replaceState(null, "", `#${id}`);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn(
          // Position & shape
          "fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50",
          // Width: tighter on mobile, wider on larger screens
          "w-[94%] sm:w-[92%] max-w-6xl",
          "rounded-full border backdrop-blur-xl",
          // Tighter padding on mobile
          "px-3 sm:px-6 py-2 sm:py-3 transition-all duration-300",
          // Light mode
          "bg-white/85 border-slate-200/80 shadow-md",
          // Dark mode
          "dark:bg-[#0A0D14]/85 dark:border-white/10 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
        )}
      >
        <div className="flex items-center justify-between w-full gap-2">

          {/* ── Logo ───────────────────────────────────────── */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <div className="relative flex items-center justify-center p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
              <Dna className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 transition-transform duration-700 group-hover:rotate-180" />
              <div className="absolute inset-0 rounded-xl bg-cyan-400/10 blur-sm -z-10 animate-pulse" />
            </div>
            <span className="font-heading text-lg sm:text-xl tracking-tight select-none">
              <span className="font-bold text-slate-900 dark:text-white">Aura</span>
              <span className="font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Gen</span>
            </span>
          </a>

          {/* ── Desktop Nav Links (md+) ────────────────────── */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "relative px-3 lg:px-4 py-2 font-medium text-xs lg:text-sm transition-colors duration-200 cursor-pointer rounded-lg",
                    isActive
                      ? "text-teal-600 dark:text-cyan-400"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  )}
                >
                  {/* Hover background pill */}
                  <AnimatePresence>
                    {hoveredItem === item.id && !isActive && (
                      <motion.span
                        layoutId="navHover"
                        className="absolute inset-0 rounded-lg bg-slate-100 dark:bg-white/5 -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Active sliding underline */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className="absolute bottom-0.5 left-3 right-3 lg:left-4 lg:right-4 h-0.5 rounded-full bg-teal-600 dark:bg-cyan-400 dark:shadow-[0_0_8px_#00f2fe]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* ── Right Actions (md+) ────────────────────────── */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
            <ThemeToggle />
            <Button
              variant="primary"
              onClick={() => scrollToSection("cta")}
              icon={<ArrowRight className="w-4 h-4" />}
              className="px-3 lg:px-5 py-2 text-white font-semibold shadow-lg shadow-cyan-500/20 text-xs lg:text-sm"
            >
              <span className="hidden lg:inline">Access Portal</span>
              <span className="lg:hidden">Portal</span>
            </Button>
          </div>

          {/* ── Mobile: Theme toggle + Hamburger ──────────── */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "w-9 h-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer",
                "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200",
                "dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              )}
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </motion.header>

      {/* ── Mobile / Tablet Drawer ────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Drawer panel — slides in from the right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.38 }}
              className={cn(
                // Sizing: full-width on tiny phones, capped at 320px on tablets
                "fixed top-0 right-0 bottom-0 w-full xs:w-[320px] sm:w-[340px] z-50 md:hidden",
                "flex flex-col border-l overflow-y-auto",
                "bg-white border-slate-200",
                "dark:bg-[#0A0D14] dark:border-white/10"
              )}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 dark:border-white/5">
                <a href="#" className="flex items-center gap-2 group">
                  <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                    <Dna className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="font-heading text-lg tracking-tight select-none">
                    <span className="font-bold text-slate-900 dark:text-white">Aura</span>
                    <span className="font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Gen</span>
                  </span>
                </a>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "w-9 h-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer",
                    "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200",
                    "dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                  )}
                  aria-label="Close Menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex flex-col flex-1 px-6 py-6 gap-1">
                <p className="text-[0.65rem] font-semibold text-cyan-400 tracking-widest uppercase mb-3">
                  Navigation
                </p>
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, idx) => {
                    const isActive = activeSection === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 + 0.05 }}
                        onClick={() => {
                          scrollToSection(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={cn(
                          "flex items-center justify-between w-full text-left px-4 py-3.5 rounded-xl font-heading font-semibold text-lg transition-all duration-200 cursor-pointer",
                          isActive
                            ? "bg-teal-500/10 text-teal-600 dark:bg-cyan-400/10 dark:text-cyan-400"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                        )}
                      >
                        {item.name}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-cyan-400 shrink-0" />
                        )}
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer CTA */}
              <div className="px-6 pb-8 pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col gap-3">
                <Button
                  variant="primary"
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => {
                    scrollToSection("cta");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-white font-semibold shadow-lg shadow-cyan-500/20 justify-center"
                >
                  Access Portal
                </Button>
                <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                  © {new Date().getFullYear()} AuraGen Inc.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
