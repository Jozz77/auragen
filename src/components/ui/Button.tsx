"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      icon,
      iconPosition = "right",
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-wide cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary select-none overflow-hidden transition-all duration-300";

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-teal-600 to-blue-600 dark:from-cyan-500 dark:to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/20 border border-transparent",
      secondary:
        "border border-glass bg-card/60 backdrop-blur-md text-foreground hover:bg-card/85 hover:border-accent-primary/40 shadow-sm",
      ghost:
        "text-foreground hover:bg-card/40 hover:text-accent-primary border border-transparent",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 450, damping: 14 }}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {/* Hover overlay sheen for primary */}
        {variant === "primary" && (
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}

        {icon && iconPosition === "left" && (
          <span className="inline-flex shrink-0 transition-transform duration-300 group-hover:-translate-x-1">
            {icon}
          </span>
        )}

        <span>{children}</span>

        {icon && iconPosition === "right" && (
          <span className="inline-flex shrink-0 transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
