"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
  badge?: string;
}

export function ToolCard({
  title,
  description,
  href,
  icon: Icon,
  gradient,
  badge,
}: ToolCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { duration: 0.25 },
      }}
      whileTap={{ scale: 0.98 }}
      className="group h-full"
    >
      <Link href={href}>
        <div
          className="
          relative
          h-full
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-br
          from-[#111827]
          via-[#0F172A]
          to-[#09090B]
          p-6
          transition-all
          duration-300
          hover:border-indigo-500/40
          hover:shadow-[0_0_40px_rgba(99,102,241,0.18)]
        "
        >
          {/* Glow */}
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-indigo-500/10 blur-[90px] opacity-0 transition duration-500 group-hover:opacity-100" />

          {/* Top Row */}
          <div className="relative z-10 flex items-start justify-between">
            <div
              className={`rounded-2xl bg-gradient-to-br ${gradient} p-4 shadow-lg`}
            >
              <Icon className="h-7 w-7 text-white" />
            </div>

            {badge && (
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                {badge}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="relative z-10 mt-7">
            <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-indigo-300">
              {title}
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              {description}
            </p>
          </div>

          {/* Bottom */}
          <div className="relative z-10 mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              className="p-0 text-indigo-400 hover:bg-transparent hover:text-indigo-300"
            >
              Open Tool
            </Button>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="h-5 w-5 text-slate-500 transition-colors group-hover:text-indigo-400" />
            </motion.div>
          </div>

          {/* Divider */}
          <div className="relative z-10 my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Footer */}
          <div className="relative z-10 flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>Instant Processing</span>
            </div>

            <span className="rounded-full bg-white/5 px-3 py-1 text-xs">
              Local
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}