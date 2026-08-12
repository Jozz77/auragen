"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a size-matched placeholder to avoid layout shift during hydration
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/10 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={[
        // Base
        "relative flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-200 cursor-pointer select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 overflow-hidden",
        // Light mode
        "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200",
        // Dark mode
        "dark:bg-white/10 dark:hover:bg-white/20 dark:text-cyan-400 dark:border-white/10",
      ].join(" ")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "sun" : "moon"}
          initial={{ y: 14, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="w-[18px] h-[18px] text-cyan-400" />
          ) : (
            <Moon className="w-[18px] h-[18px] text-slate-700" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
