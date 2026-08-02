"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileText } from "lucide-react";

interface PageLoaderProps {
  isVisible: boolean;
}

/**
 * Presentational full-screen overlay shown during route transitions.
 * Pure UI — visibility is controlled entirely by the `isVisible` prop.
 */
export function PageLoader({ isVisible }: PageLoaderProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="page-loader-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          aria-label="Loading page"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col items-center gap-5 rounded-3xl border border-[var(--secondary)] bg-white px-10 py-8 shadow-lg"
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
              <span className="absolute inset-0 rounded-full bg-[var(--accent)]/40" aria-hidden="true" />

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
                    duration: 1.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageLoader;