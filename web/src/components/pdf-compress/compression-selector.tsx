"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Gauge, Zap, Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type CompressionLevel = "low" | "medium" | "high";

interface CompressionSelectorProps {
  value: CompressionLevel;
  onChange: (level: CompressionLevel) => void;
}

interface CompressionOption {
  level: CompressionLevel;
  label: string;
  description: string;
  reduction: string;
  icon: LucideIcon;
}

const COMPRESSION_OPTIONS: CompressionOption[] = [
  {
    level: "low",
    label: "Low",
    description: "Highest Quality",
    reduction: "10–20%",
    icon: ShieldCheck,
  },
  {
    level: "medium",
    label: "Medium",
    description: "Balanced Quality",
    reduction: "30–50%",
    icon: Gauge,
  },
  {
    level: "high",
    label: "High",
    description: "Maximum Compression",
    reduction: "50–70%",
    icon: Zap,
  },
];

export function CompressionSelector({
  value,
  onChange,
}: CompressionSelectorProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-base font-semibold text-foreground">
        Compression Level
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose the balance between quality and file size.
      </p>

      <div
        role="radiogroup"
        aria-label="Compression Level"
        className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        {COMPRESSION_OPTIONS.map((option) => {
          const isSelected = value === option.level;
          const Icon = option.icon;

          return (
            <motion.button
              key={option.level}
              type="button"
              role="radio"
              aria-selected={isSelected}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{ scale: isSelected ? 1.02 : 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => onChange(option.level)}
              className={cn(
                "relative flex flex-col items-start gap-2 rounded-lg border-2 bg-background p-4 text-left transition-colors",
                isSelected
                  ? "border-orange-500 bg-orange-500/10 dark:border-orange-400 dark:bg-orange-400/10"
                  : "border-border hover:border-orange-500/40 hover:bg-muted/40"
              )}
            >
              {isSelected && (
                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white dark:bg-orange-400">
                  <Check className="h-3.5 w-3.5" />
                </span>
              )}

              <Icon
                className={cn(
                  "h-6 w-6",
                  isSelected
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-muted-foreground"
                )}
              />

              <div>
                <p className="text-sm font-semibold text-foreground">
                  {option.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {option.description}
                </p>
              </div>

              <p
                className={cn(
                  "text-xs font-medium",
                  isSelected
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-muted-foreground"
                )}
              >
                Reduces size by {option.reduction}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default CompressionSelector;