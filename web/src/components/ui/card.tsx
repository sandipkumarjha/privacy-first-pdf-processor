"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type AppCardPadding = "default" | "compact" | "none";

interface AppCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: AppCardPadding;
}

const PADDING_CLASSES: Record<AppCardPadding, string> = {
  default: "p-6",
  compact: "p-4",
  none: "p-0",
};

export function AppCard({
  children,
  className,
  hover = true,
  padding = "default",
}: AppCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { scale: 1.01 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "rounded-3xl border bg-[var(--surface)] border-[var(--border)] shadow-sm transition-all",
        PADDING_CLASSES[padding],
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export default AppCard;