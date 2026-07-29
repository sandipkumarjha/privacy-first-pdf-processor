"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";

type ProgressCardStatus = "idle" | "loading" | "success" | "error";

interface ProgressCardProps {
  title: string;
  description?: string;
  progress?: number;
  indeterminate?: boolean;
  status?: ProgressCardStatus;
  className?: string;
}

export function ProgressCard({
  title,
  description,
  progress = 0,
  indeterminate = false,
  status = "idle",
  className,
}: ProgressCardProps) {
  const displayProgress = status === "success" ? 100 : Math.min(Math.max(progress, 0), 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border bg-[var(--surface)] border-[var(--border)] p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--foreground)]">
          {status === "success" && (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
          )}
          {status === "error" && (
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
          )}
          {title}
        </h3>
      </div>

      {description && (
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          {description}
        </p>
      )}

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminate ? undefined : displayProgress}
        className={cn(
          "relative mt-4 h-[10px] w-full overflow-hidden rounded-full bg-[var(--surface-2)]",
          status === "loading" && "animate-pulse"
        )}
      >
        {indeterminate ? (
          <motion.div
            className="absolute inset-y-0 w-1/3 rounded-full bg-[var(--accent)]"
            animate={{ x: ["-100%", "300%"] }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        ) : (
          <motion.div
            className="h-full rounded-full bg-[var(--accent)]"
            animate={{ width: `${displayProgress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </div>

      {!indeterminate && (
        <div className="mt-2 text-right text-sm font-semibold text-[var(--foreground)]">
          {displayProgress}%
        </div>
      )}
    </motion.div>
  );
}

export default ProgressCard;