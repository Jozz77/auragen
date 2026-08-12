"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Dna, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Technology", href: "#technology" },
  { name: "Capabilities", href: "#capabilities" },
  { name: "Impact", href: "#impact" },
];

export function Navbar() {
  const [activeItem, setActiveItem] = useState("About");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn(
          // Position & shape
          "fixed top-4 left-1/2 -translate-x-1/2 w-[92%]  z-50",
          "rounded-full border backdrop-blur-xl",
          "px-6 py-3 transition-all duration-300",
          // Light mode
          "bg-white/80 border-slate-200/80 shadow-md",
          // Dark mode — explicit hex so Tailwind always generates the class
          "dark:bg-[#0A0D14]/80 dark:border-white/10 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
        )}
      >
        <div className="flex items-center justify-between w-full">
          {/* ── Logo ─────────────────────────────────────────── */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
              <Dna className="w-5 h-5 text-cyan-400 transition-transform duration-700 group-hover:rotate-180" />
              <div className="absolute inset-0 rounded-xl bg-cyan-400/10 blur-sm -z-10 animate-pulse" />
            </div>
            <span className="font-heading text-xl tracking-tight select-none">
              <span className="font-bold text-slate-900 dark:text-white">Aura</span>
              <span className="font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Gen</span>
            </span>
          </a>

          {/* ── Desktop Nav Links ─────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveItem(item.name)}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "relative px-4 py-2 font-medium text-sm transition-colors duration-200 cursor-pointer rounded-lg",
                    isActive
                      ? "text-teal-600 dark:text-cyan-400"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  )}
                >
                  {/* Hover background pill */}
                  <AnimatePresence>
                    {hoveredItem === item.name && !isActive && (
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
                      layoutId="navActive"
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-teal-600 dark:bg-cyan-400 dark:shadow-[0_0_8px_#00f2fe]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}

                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* ── Right Actions ─────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <Button
              variant="primary"
              icon={<ArrowRight className="w-4 h-4" />}
              className="px-5 py-2 text-white font-semibold shadow-lg shadow-cyan-500/20"
            >
              Access Portal
            </Button>
          </div>

          {/* ── Mobile Hamburger ──────────────────────────────── */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "w-10 h-10 rounded-xl border flex items-center justify-center transition-colors cursor-pointer",
                "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200",
                "dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              )}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ───────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className={cn(
                "fixed top-0 right-0 bottom-0 w-80 max-w-full p-8 pt-28 z-40 md:hidden",
                "flex flex-col justify-between border-l",
                // Light
                "bg-white border-slate-200",
                // Dark
                "dark:bg-[#0A0D14] dark:border-white/10"
              )}
            >
              <div className="flex flex-col gap-6">
                <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                  Navigation
                </div>
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, idx) => (
                    <motion.a
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setActiveItem(item.name);
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "text-2xl font-heading font-semibold transition-colors py-3 block border-b",
                        "border-slate-100 dark:border-white/5",
                        activeItem === item.name
                          ? "text-teal-600 dark:text-cyan-400"
                          : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                      )}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  variant="primary"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full text-white font-semibold shadow-lg shadow-cyan-500/20"
                >
                  Access Portal
                </Button>
                <div className="text-center text-xs text-slate-400 dark:text-slate-500 mt-2">
                  © {new Date().getFullYear()} AuraGen Inc.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
