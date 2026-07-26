"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Archive, RotateCcw, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface CompressToolbarProps {
  isCompressing: boolean;
  disabled: boolean;
  progress?: number;
  onCompress: () => void;
  onReset: () => void;
}

export function CompressToolbar({
  isCompressing,
  disabled,
  progress = 0,
  onCompress,
  onReset,
}: CompressToolbarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Ready to Compress
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Compress your PDF locally inside your browser.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReset}
            disabled={isCompressing}
            className={cn(
              "inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors",
              "hover:bg-muted",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCompress}
            disabled={disabled || isCompressing}
            className={cn(
              "inline-flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors",
              "hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-400",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            {isCompressing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Compressing...
              </>
            ) : (
              <>
                <Archive className="h-4 w-4" />
                Compress PDF
              </>
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isCompressing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${clampedProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full rounded-full bg-orange-500 dark:bg-orange-400"
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Compressing PDF...</span>
                <span>{Math.round(clampedProgress)}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CompressToolbar;