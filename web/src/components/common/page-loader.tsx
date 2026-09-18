"use client";

import { AnimatePresence, motion } from "framer-motion";

interface PageLoaderProps {
  isVisible: boolean;
}

/**
 * Route-transition indicator: a 2px ink bar across the top of the
 * viewport. Deliberately non-blocking — the previous full-screen modal
 * covered the page on every click, which made fast navigations feel
 * slower than they were.
 */
export function PageLoader({ isVisible }: PageLoaderProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="page-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading page"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.1 } }}
          className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-0.5"
        >
          <motion.div
            className="h-full origin-left bg-foreground"
            initial={{ scaleX: 0 }}
            // Ease toward 90% and wait there; unmounting completes it.
            animate={{ scaleX: 0.9 }}
            exit={{ scaleX: 1, transition: { duration: 0.15 } }}
            transition={{ duration: 2.4, ease: [0.1, 0.7, 0.2, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageLoader;
