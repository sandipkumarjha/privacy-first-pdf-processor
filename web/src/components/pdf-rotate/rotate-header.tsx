"use client";

import { motion } from "framer-motion";
import { RotateCcw, RotateCw, Lock } from "lucide-react";

const FEATURE_PILLS = [
  { icon: RotateCcw, label: "Rotate Left" },
  { icon: RotateCw, label: "Rotate Right" },
  { icon: Lock, label: "Local Processing" },
];

export function RotateHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center"
    >
      <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
        Rotate PDF
      </h1>

      <p className="max-w-[560px] text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
        Rotate one or multiple PDF pages locally. Nothing is uploaded.
        Everything happens securely inside your browser.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {FEATURE_PILLS.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--info)] px-3 py-1 text-xs font-medium text-[var(--info-foreground)]"
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default RotateHeader;