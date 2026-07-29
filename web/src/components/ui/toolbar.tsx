"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ToolbarProps {
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

export function Toolbar({
  leftActions,
  rightActions,
  className,
  sticky = false,
}: ToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-stretch gap-3 rounded-2xl border bg-[var(--surface)] border-[var(--border)] p-4 shadow-sm",
        "sm:flex-row sm:items-center sm:justify-between",
        sticky && "sticky bottom-6 z-30",
        className
      )}
    >
      {leftActions && (
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {leftActions}
        </div>
      )}

      {rightActions && (
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {rightActions}
        </div>
      )}
    </motion.div>
  );
}

export default Toolbar;