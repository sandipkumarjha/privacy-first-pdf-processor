"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { IconTile } from "@/components/ui/icon-tile";
import { cardHover } from "@/components/ui/motion";

export interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  className?: string;
}

export function ToolCard({
  title,
  description,
  href,
  icon,
  badge,
  className,
}: ToolCardProps) {
  return (
    <motion.div whileHover={cardHover} className={cn("h-full", className)}>
      <Link
        href={href}
        className={cn(
          "group flex h-full flex-col rounded-2xl border border-border bg-surface p-6",
          "elevate-sm transition-[border-color,box-shadow] duration-200",
          "hover:border-border-strong hover:elevate-md",
          "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <IconTile
            icon={icon}
            tone="neutral"
            className="transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background"
          />

          {badge && (
            <Badge tone="neutral" size="sm">
              {badge}
            </Badge>
          )}
        </div>

        <h3 className="mt-5 text-lg font-semibold">
          {title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-6 text-muted">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Zap className="size-3.5" />
            Runs locally
          </span>

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
            Open
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
