"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Merge,
  Split,
  Zap,
  RotateCw,
  Clock,
  ArrowRight,
} from "lucide-react";

const activities = [
  {
    icon: Merge,
    action: "Merged 4 PDFs",
    file: "Project_Documentation.pdf",
    time: "2 minutes ago",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    action: "Compressed PDF",
    file: "Invoice_2026.pdf",
    time: "15 minutes ago",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Split,
    action: "Split Document",
    file: "Research_Paper.pdf",
    time: "1 hour ago",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: RotateCw,
    action: "Rotated Pages",
    file: "Presentation.pdf",
    time: "Yesterday",
    color: "from-emerald-500 to-green-500",
  },
];

export function RecentActivity() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border-4 border-[#3874FF] bg-gradient-to-br from-[#1591DC] via-[#99C2FF] to-[#1591DC] p-8 lg:p-12"
      
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
        <div>
          <h2 className="text-xl font-semibold text-black">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-zinc-800">
            Your latest PDF operations
          </p>
        </div>

        <Clock className="h-5 w-5 text-zinc-800" />
      </div>

      {/* Timeline */}

      <div className="relative px-6 py-4">

        {/* Vertical Line */}

        <div className="absolute left-[42px] top-6 bottom-6 w-px bg-zinc-700" />

        <div className="space-y-5">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <motion.div
                key={activity.file}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                }}
                className="group relative flex gap-4"
              >
                {/* Icon */}

                <div
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${activity.color}`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>

                {/* Content */}

                <div className="flex-1 rounded-2xl border-2 border-blue-600 bg-white/[0.03] p-4 transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/[0.05]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-black">
                      {activity.action}
                    </h3>

                    <span className="text-xs text-zinc-800">
                      {activity.time}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-zinc-800">
                    <FileText className="h-4 w-4" />
                    {activity.file}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}

        <motion.button
          whileHover={{ x: 4 }}
          className="mt-8 flex items-center gap-2 text-sm font-medium text-zinc-800 transition-colors hover:text-indigo-300"
        >
          View Full History

          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.section>
  );
}