"use client";

import { motion } from "framer-motion";
import {
  Clock,
  FileText,
  Merge,
  RotateCw,
  Split,
  Zap,
} from "lucide-react";

import { IconTile } from "@/components/ui/icon-tile";
import { DURATION, EASE_OUT, stagger } from "@/components/ui/motion";

const activities = [
  {
    icon: Merge,
    action: "Merged 4 PDFs",
    file: "Project_Documentation.pdf",
    time: "2 minutes ago",
  },
  {
    icon: Zap,
    action: "Compressed PDF",
    file: "Invoice_2026.pdf",
    time: "15 minutes ago",
  },
  {
    icon: Split,
    action: "Split document",
    file: "Research_Paper.pdf",
    time: "1 hour ago",
  },
  {
    icon: RotateCw,
    action: "Rotated pages",
    file: "Presentation.pdf",
    time: "Yesterday",
  },
];

export function RecentActivity() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: DURATION.base, ease: EASE_OUT }}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface elevate-sm"
    >
      <header className="flex items-center justify-between gap-3 border-b border-border px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold">
            Recent activity
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            Your latest PDF operations
          </p>
        </div>

        <Clock className="size-4 shrink-0 text-muted-foreground" />
      </header>

      <div className="relative flex-1 px-6 py-5">
        {/* Timeline rail, aligned to the centre of the 36px icon tiles. */}
        <div
          aria-hidden="true"
          className="absolute top-8 bottom-8 left-[42px] w-px bg-border"
        />

        <ol className="space-y-3">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <motion.li
                key={activity.file}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: DURATION.base,
                  ease: EASE_OUT,
                  delay: stagger(index),
                }}
                className="flex gap-4"
              >
                <IconTile
                  icon={Icon}
                  tone="neutral"
                  size="sm"
                  className="relative z-10 bg-surface"
                />

                <div className="min-w-0 flex-1 rounded-xl border border-border bg-surface-2 p-3.5 transition-colors hover:border-border-strong">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="truncate text-sm font-medium">
                      {activity.action}
                    </h3>

                    <span className="shrink-0 text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>

                  <p className="mt-1.5 flex items-center gap-1.5 truncate text-sm text-muted">
                    <FileText className="size-3.5 shrink-0" />
                    <span className="truncate font-mono text-xs">
                      {activity.file}
                    </span>
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>

      </div>
    </motion.section>
  );
}
