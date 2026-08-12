"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl border border-glass bg-card animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center w-10 h-10 rounded-xl border border-glass bg-card text-foreground hover:text-accent-primary hover:border-accent-primary/30 transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-accent-primary transition-transform duration-500 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-accent-primary transition-transform duration-500 hover:-rotate-12" />
      )}
    </button>
  );
}
