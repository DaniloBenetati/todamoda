import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs",
    secondary: "border border-zinc-200 dark:border-zinc-700/80 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200",
    destructive: "border border-red-200 dark:border-red-900/60 bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
    outline: "text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700",
    success: "border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
    warning: "border border-amber-200 dark:border-amber-900/60 bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
