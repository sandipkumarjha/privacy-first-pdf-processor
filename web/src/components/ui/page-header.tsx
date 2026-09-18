"use client";

import { motion } from "framer-motion";
import { ShieldCheck, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";
import { riseIn } from "./motion";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  /** Short mono label above the title. Defaults to "Runs locally". */
  badge?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * The header for every tool page: mono eyebrow, serif title, one line of
 * description. Left-aligned so it shares an edge with the content below.
 */
export function PageHeader({
  title,
  description,
  icon: Icon,
  badge = "Runs locally",
  className,
  children,
}: PageHeaderProps) {
  return (
    <motion.header
      {...riseIn}
      className={cn(
        "flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <span className="mt-1 hidden size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface elevate-sm sm:flex">
            <Icon className="size-5 text-foreground" strokeWidth={1.75} aria-hidden="true" />
          </span>
        )}

        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-widest text-muted-foreground uppercase">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            {badge}
          </p>

          <h1 className="mt-2 font-display text-4xl leading-[1.05] sm:text-5xl">
            {title}
          </h1>

          <p className="mt-3 text-base leading-7 text-muted">{description}</p>
        </div>
      </div>

      {children && <div className="shrink-0">{children}</div>}
    </motion.header>
  );
}

export default PageHeader;
