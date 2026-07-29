"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Archive,
  HardDriveDownload,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface CompressionStatsProps {
  originalSize: number ;
  compressedSize?: number | null;
  savedBytes?: number | null;
  compressionRatio?: number | null;
  isCompressed: boolean;
}

interface StatCard {
  label: string;
  value: string;
  icon: LucideIcon;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const value = bytes / Math.pow(1024, exponent);

  return `${exponent === 0 ? value : value.toFixed(1)} ${units[exponent]}`;
}

function formatReduction(compressionRatio: number): string {
  const reduction = Math.max(1 - compressionRatio, 0) * 100;
  return `${Math.round(reduction)}%`;
}

export function CompressionStats({
  originalSize,
  compressedSize,
  savedBytes,
  compressionRatio,
  isCompressed,
}: CompressionStatsProps) {
  const stats: StatCard[] = [
    {
      label: "Original Size",
      value: formatBytes(originalSize),
      icon: FileText,
    },
    {
      label: "Compressed Size",
      value:
        isCompressed && typeof compressedSize === "number"
          ? formatBytes(compressedSize)
          : "--",
      icon: Archive,
    },
    {
      label: "Saved",
      value:
        isCompressed && typeof savedBytes === "number"
          ? formatBytes(savedBytes)
          : "--",
      icon: HardDriveDownload,
    },
    {
      label: "Reduction",
      value:
        isCompressed && typeof compressionRatio === "number"
          ? formatReduction(compressionRatio)
          : "--",
      icon: TrendingDown,
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-base font-semibold text-foreground">
        Compression Statistics
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        See how much storage has been saved.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: index * 0.05,
              }}
              className={cn(
                "flex flex-col gap-2 rounded-lg border border-border bg-background p-4"
              )}
            >
              <Icon className="h-5 w-5 text-muted-foreground" />
              <p className="text-lg font-semibold text-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default CompressionStats;