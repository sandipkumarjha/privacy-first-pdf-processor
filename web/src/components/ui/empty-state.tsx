"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-center gap-5 rounded-2xl px-6 py-14 text-center",
        className
      )}
    >
      {Icon && (
        <motion.span
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft"
        >
          <Icon className="h-10 w-10 text-foreground" aria-hidden="true" />
        </motion.span>
      )}

      <h3 className="text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h3>

      <p className="max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}

export default EmptyState;