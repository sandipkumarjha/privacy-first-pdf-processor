"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

/**
 * Official Next.js App Router loading UI for every route nested under
 * app/(app)/. Next.js automatically renders this as the Suspense
 * fallback the instant a navigation into this segment (or any of its
 * nested tool pages) starts, and automatically swaps it out for the
 * real page once that page has finished rendering — no client-side
 * navigation detection, providers, or listeners required.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col items-center gap-5 rounded-2xl border border-[var(--secondary)] bg-white px-10 py-8 shadow-lg"
      >
        <div className="relative flex h-16 w-16 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full bg-[var(--accent)]"
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            aria-hidden="true"
          />
          <span
            className="absolute inset-0 rounded-full bg-[var(--accent)]/40"
            aria-hidden="true"
          />

          <motion.span
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)] shadow-sm"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 1.6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <FileText
              className="h-5 w-5 text-[var(--foreground)]"
              aria-hidden="true"
            />
          </motion.span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-base font-semibold text-[var(--foreground)]">
            Loading...
          </p>
          <p className="text-sm text-[var(--muted-foreground)]">
            Preparing your workspace
          </p>
        </div>

        <div className="flex items-center gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}