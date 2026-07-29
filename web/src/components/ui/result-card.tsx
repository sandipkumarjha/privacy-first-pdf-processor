"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/cn";

interface ResultCardProps {
  title: string;
  description?: string;
  success?: boolean;
  stats?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function ResultCard({
  title,
  description,
  success = true,
  stats,
  actions,
  className,
}: ResultCardProps) {
  const ResultIcon = success ? CheckCircle2 : XCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      role="status"
      className={cn(
        "flex flex-col items-center gap-4 rounded-3xl border bg-[var(--surface)] border-[var(--border)] p-8 text-center shadow-sm sm:p-10",
        className
      )}
    >
      <motion.span
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className={cn(
          "flex h-20 w-20 items-center justify-center rounded-full",
          success
            ? "bg-green-100 dark:bg-green-900/20"
            : "bg-red-100 dark:bg-red-900/20"
        )}
      >
        <ResultIcon
          className={cn(
            "h-12 w-12",
            success ? "text-green-600" : "text-red-600"
          )}
          aria-hidden="true"
        />
      </motion.span>

      <h2 className="text-2xl font-bold text-[var(--foreground)]">
        {title}
      </h2>

      {description && (
        <p className="max-w-lg text-sm text-[var(--muted-foreground)]">
          {description}
        </p>
      )}

      {stats && <div className="w-full">{stats}</div>}

      {actions && (
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          {actions}
        </div>
      )}
    </motion.div>
  );
}

export default ResultCard;