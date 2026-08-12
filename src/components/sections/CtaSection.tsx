"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, Lock, Shield, Zap } from "lucide-react";

export function CtaSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className={cn(
        "relative w-full py-28 transition-colors duration-300 overflow-hidden",
        "dark:bg-[#020408] bg-[#E2E8F0]"
      )}
    >
      {/* Luminous Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 dark:via-cyan-400/20 to-transparent absolute top-0 left-0 right-0" />
      {/* Central ambient radial glow — dual violet + cyan */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle at 40% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 55%), radial-gradient(circle at 60% 50%, rgba(0, 242, 254, 0.13) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={cn(
            "rounded-3xl p-10 sm:p-14 md:p-16 relative shadow-2xl text-center max-w-4xl mx-auto backdrop-blur-xl border",
            "bg-white border-slate-300/80 shadow-xl",
            "dark:bg-[#121826]/95 dark:border-slate-700/80 dark:shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          )}
        >
          {/* Decorative ambient top highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

          {/* Badge */}
          <div className="mb-6 flex justify-center">
            <Badge variant="default">START YOUR PIPELINE</Badge>
          </div>

          {/* Headline */}
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6">
            Accelerate your drug discovery{" "}
            <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-cyan-500 dark:from-cyan-400 dark:via-teal-300 dark:to-blue-400 bg-clip-text text-transparent">
              timeline today.
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Partner with AuraGen to deploy proprietary multi-omic AI models and targeted vectoring to your therapeutic pipeline.
          </p>

          {/* Interactive Quick-Contact Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-3 text-sm font-semibold"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Access Request Submitted. A bio-engineer will contact your team within 2 hours.</span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className={cn(
                    "flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl border transition-all shadow-md",
                    "bg-slate-50 border-slate-300 focus-within:border-teal-500",
                    "dark:bg-black/50 dark:border-white/10 dark:focus-within:border-cyan-400/60"
                  )}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your institutional email..."
                    required
                    className="w-full px-4 py-3 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="w-full sm:w-auto shrink-0 px-6 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20"
                  >
                    Request Access
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Micro Trust Markers */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-white/5 font-medium">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
              <span>SOC2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
              <span>FDA Compliant Data Vaults</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
              <span>Instant API Access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
