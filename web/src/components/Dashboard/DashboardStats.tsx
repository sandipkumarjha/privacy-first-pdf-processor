"use client";

import { motion } from "framer-motion";
import {
  Files,
  Clock3,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Files Processed",
    value: "1,247",
    change: "+18%",
    subtitle: "Compared to last month",
    icon: Files,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Average Speed",
    value: "0.8s",
    change: "Fast",
    subtitle: "Per PDF operation",
    icon: Clock3,
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    title: "Privacy Score",
    value: "100%",
    change: "Secure",
    subtitle: "Local Processing",
    icon: ShieldCheck,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Performance",
    value: "99.8%",
    change: "+4%",
    subtitle: "Engine Efficiency",
    icon: TrendingUp,
    gradient: "from-orange-500 to-pink-500",
  },
];

export function DashboardStats() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.12,
            }}
            whileHover={{
              y: -8,
            }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0F172A] p-6 transition-all duration-300 hover:border-indigo-500/40"
          >
            {/* Glow */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10">
              {/* Icon */}

              <div
                className={`inline-flex rounded-2xl bg-gradient-to-br ${stat.gradient} p-3 shadow-lg`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>

              {/* Title */}

              <p className="mt-5 text-sm text-slate-400">
                {stat.title}
              </p>

              {/* Value */}

              <div className="mt-2 flex items-end gap-3">
                <h2 className="text-4xl font-bold text-white">
                  {stat.value}
                </h2>

                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
                  {stat.change}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-500">
                {stat.subtitle}
              </p>

              {/* Progress */}

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "85%" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.2,
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${stat.gradient}`}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}