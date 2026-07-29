"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  badge?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  badge,
  className,
  children,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "mx-auto flex max-w-2xl flex-col items-center gap-3 text-center",
        className
      )}
    >
      {badge && (
        <span className="inline-flex items-center rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--accent-foreground)]">
          {badge}
        </span>
      )}

      {Icon && (
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-soft)]">
          <Icon className="h-7 w-7 text-[var(--accent)]" aria-hidden="true" />
        </span>
      )}

      <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
        {title}
      </h1>

      <p className="max-w-xl text-base text-[var(--muted-foreground)]">
        {description}
      </p>

      {children}
    </motion.div>
  );
}

export default PageHeader;