"use client";

import { motion } from "framer-motion";
import { Clock3, Files, ShieldCheck, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { IconTile } from "@/components/ui/icon-tile";
import { AppCard } from "@/components/ui/card";
import { DURATION, EASE_OUT, stagger } from "@/components/ui/motion";

const stats = [
  {
    title: "Files processed",
    value: "1,247",
    change: "+18%",
    changeTone: "success" as const,
    subtitle: "Compared to last month",
    icon: Files,
    progress: 0.82,
  },
  {
    title: "Average speed",
    value: "0.8s",
    change: "Fast",
    changeTone: "accent" as const,
    subtitle: "Per PDF operation",
    icon: Clock3,
    progress: 0.9,
  },
  {
    title: "Privacy score",
    value: "100%",
    change: "Secure",
    changeTone: "success" as const,
    subtitle: "Local processing",
    icon: ShieldCheck,
    progress: 1,
  },
  {
    title: "Performance",
    value: "99.8%",
    change: "+4%",
    changeTone: "success" as const,
    subtitle: "Engine efficiency",
    icon: TrendingUp,
    progress: 0.96,
  },
];

export function DashboardStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <AppCard
          key={stat.title}
          animate={false}
          hover
          padding="compact"
          className="p-5"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: DURATION.base,
              ease: EASE_OUT,
              delay: stagger(index),
            }}
          >
            <div className="flex items-start justify-between">
              <IconTile icon={stat.icon} tone="neutral" size="sm" />

              <Badge tone={stat.changeTone} size="sm">
                {stat.change}
              </Badge>
            </div>

            <p className="mt-4 text-sm text-muted">{stat.title}</p>

            <p className="mt-1 font-display text-4xl font-normal tracking-tight tabular-nums">
              {stat.value}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {stat.subtitle}
            </p>

            <div className="mt-4 h-1 overflow-hidden rounded-full bg-surface-3">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${stat.progress * 100}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  ease: EASE_OUT,
                  delay: 0.15 + stagger(index),
                }}
                className="h-full rounded-full bg-foreground"
              />
            </div>
          </motion.div>
        </AppCard>
      ))}
    </section>
  );
}
