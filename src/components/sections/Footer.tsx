"use client";

import React from "react";
import { Dna } from "lucide-react";
import { cn } from "@/lib/utils";

const FOOTER_NAV = {
  platform: [
    { name: "Genomic Decoder", href: "#technology" },
    { name: "Molecular Folding", href: "#technology" },
    { name: "CRISPR Precision", href: "#technology" },
    { name: "LNP Vectoring", href: "#technology" },
    { name: "Bioinformatics", href: "#capabilities" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Scientific Publications", href: "#" },
    { name: "Clinical Trials", href: "#impact" },
    { name: "Careers", href: "#" },
    { name: "Press Kit", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Security Audit", href: "#" },
    { name: "Compliance", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer
      className={cn(
        "w-full transition-colors duration-300 border-t relative",
        "dark:bg-[#020408] dark:border-slate-800/80",
        "bg-[#E2E8F0] border-slate-300/80"
      )}
    >
      {/* Luminous Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 dark:via-cyan-400/20 to-transparent absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Column 1 (Branding & Live Status - spans 2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-2.5 group w-fit">
                <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                  <Dna className="w-5 h-5 text-cyan-400 transition-transform duration-700 group-hover:rotate-180" />
                  <div className="absolute inset-0 rounded-xl bg-cyan-400/10 blur-sm -z-10 animate-pulse" />
                </div>
                <span className="font-heading text-xl tracking-tight select-none">
                  <span className="font-bold text-slate-900 dark:text-white">Aura</span>
                  <span className="font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Gen</span>
                </span>
              </a>

              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
                Precision multi-omic platform engineering combining generative AI with high-throughput bio-foundry synthesis.
              </p>
            </div>

            {/* Live System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>SYSTEM STATUS: ALL PIPELINES OPERATIONAL</span>
            </div>
          </div>

          {/* Column 2 (Platform) */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Platform
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 dark:text-slate-400">
              {FOOTER_NAV.platform.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 (Company & Research) */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 dark:text-slate-400">
              {FOOTER_NAV.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (Legal & Security) */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal &amp; Security
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 dark:text-slate-400">
              {FOOTER_NAV.legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-12 border-t dark:border-white/5 border-slate-300/60 mt-12 text-sm text-slate-500 dark:text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} AuraGen Therapeutics, Inc. All rights reserved.
          </div>

          {/* Social Links with inline SVGs */}
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-xl bg-slate-200/60 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-xl bg-slate-200/60 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="p-2 rounded-xl bg-slate-200/60 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Discord */}
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className="p-2 rounded-xl bg-slate-200/60 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
