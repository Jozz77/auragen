import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "muted";
  pulse?: boolean;
}

export function Badge({
  children,
  variant = "default",
  pulse = true,
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "border-accent-primary/30 bg-accent-primary/10 text-accent-primary dark:border-accent-primary/20 dark:bg-accent-primary/5",
    success:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:border-emerald-500/20 dark:bg-emerald-500/5",
    muted:
      "border-glass bg-card/50 text-muted",
  };

  const dotStyles = {
    default: "bg-accent-primary",
    success: "bg-emerald-500",
    muted: "bg-muted-foreground/60",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold tracking-wide backdrop-blur-sm transition-colors duration-300",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              dotStyles[variant]
            )}
          />
          <span
            className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              dotStyles[variant]
            )}
          />
        </span>
      )}
      {children}
    </div>
  );
}
