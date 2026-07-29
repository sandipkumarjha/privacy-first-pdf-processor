"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ToolLayoutProps {
  header?: React.ReactNode;
  upload?: React.ReactNode;
  options?: React.ReactNode;
  stats?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  result?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

interface ToolLayoutSection {
  key: string;
  node: React.ReactNode;
  delay: number;
}

export function ToolLayout({
  header,
  upload,
  options,
  stats,
  content,
  actions,
  result,
  footer,
  className,
}: ToolLayoutProps) {
  const sections: ToolLayoutSection[] = [
    { key: "header", node: header, delay: 0 },
    { key: "upload", node: upload, delay: 0.1 },
    { key: "options", node: options, delay: 0.15 },
    { key: "stats", node: stats, delay: 0.2 },
    { key: "content", node: content, delay: 0.25 },
    { key: "actions", node: actions, delay: 0.3 },
    { key: "result", node: result, delay: 0.35 },
    { key: "footer", node: footer, delay: 0.4 },
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10",
        className
      )}
    >
      {sections.map(
        ({ key, node, delay }) =>
          node && (
            <motion.section
              key={key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay }}
            >
              {node}
            </motion.section>
          )
      )}
    </div>
  );
}

export default ToolLayout;