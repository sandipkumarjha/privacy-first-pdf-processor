"use client";

import { motion } from "framer-motion";
import { Scissors, Shield, MousePointerClick, Eye, Download } from "lucide-react";

const FEATURE_CARDS = [
  {
    icon: MousePointerClick,
    title: "Select Pages",
    description: "Choose individual pages or ranges",
  },
  {
    icon: Eye,
    title: "Preview Pages",
    description: "Live thumbnails before exporting",
  },
  {
    icon: Download,
    title: "Download Instantly",
    description: "Generate new PDF in seconds",
  },
] as const;

export default function SplitHeader() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        {/* Left: title, subtitle, badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
            className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
          >
            <Shield className="h-3.5 w-3.5" aria-hidden="true" />
            100% Local Processing
          </motion.span>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Split PDF
            </h1>
            <p className="max-w-xl text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
              Extract specific pages into a new PDF completely inside your browser.
            </p>
          </div>
        </motion.div>

        {/* Right: gradient icon card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/20 sm:h-28 sm:w-28"
          aria-hidden="true"
        >
          <Scissors className="h-11 w-11 text-white sm:h-12 sm:w-12" strokeWidth={1.75} />
        </motion.div>
      </div>

      {/* Feature cards */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {FEATURE_CARDS.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.15 + index * 0.08,
                ease: "easeOut",
              }}
              className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-500/10">
                <Icon className="h-4.5 w-4.5 text-orange-600 dark:text-orange-400" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {feature.title}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}