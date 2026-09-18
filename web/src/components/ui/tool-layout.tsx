"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { DURATION, EASE_OUT, stagger } from "./motion";

interface ToolLayoutProps {
  header?: React.ReactNode;
  upload?: React.ReactNode;
  options?: React.ReactNode;
  stats?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  result?: React.ReactNode;
  footer?: React.ReactNode;
  /** `narrow` for list-style tools, `default` for page grids. */
  width?: "narrow" | "default";
  className?: string;
}

const ORDER = [
  "header",
  "upload",
  "options",
  "stats",
  "content",
  "actions",
  "result",
  "footer",
] as const;

export function ToolLayout({
  width = "default",
  className,
  ...slots
}: ToolLayoutProps) {
  return (
    <div
      className={cn(
        // No px/py here: (app)/layout.tsx already supplies the page
        // gutter. Adding one here is what caused the triple inset.
        "mx-auto flex w-full flex-col gap-8",
        width === "narrow" ? "max-w-3xl" : "max-w-5xl",
        className
      )}
    >
      {ORDER.map((key, index) => {
        const node = slots[key];
        if (!node) return null;

        return (
          <motion.section
            key={key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.base,
              ease: EASE_OUT,
              delay: stagger(index),
            }}
          >
            {node}
          </motion.section>
        );
      })}
    </div>
  );
}

export default ToolLayout;
