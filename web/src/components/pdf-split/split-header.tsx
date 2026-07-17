"use client";

import { motion } from "framer-motion";
import { Scissors, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    title: "Select Pages",
    description: "Choose individual pages or custom page ranges.",
  },
  {
    title: "Live Preview",
    description: "Instant thumbnails generated directly in your browser.",
  },
  {
    title: "Fast Download",
    description: "Create and download the new PDF within seconds.",
  },
];

export function SplitHeader() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F172A]/60 backdrop-blur-xl"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
    </div>

      <div className="relative z-10 p-8 lg:p-10">
        <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="max-w-3xl">
            {/* Badge */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />

              <span className="text-sm font-medium text-emerald-300">
                100% Local Processing
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-blue-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
            >
              Split Your PDF
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-5 max-w-2xl text-lg leading-8 text-slate-400"
            >
              Choose exactly the pages you need and create a brand new PDF —
              completely inside your browser with zero uploads, zero tracking,
              and maximum privacy.
            </motion.p>
          </div>

          {/* Right Icon */}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              rotate: 3,
            }}
            transition={{ duration: 0.4 }}
            className="group mx-auto lg:mx-0"
          >
            <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 shadow-2xl shadow-indigo-500/20">
              <motion.div
                animate={{
                  rotate: [0, -6, 6, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              >
                <Scissors className="h-12 w-12 text-white" />
              </motion.div>

              <Sparkles className="absolute right-3 top-3 h-4 w-4 text-white/70" />

              <div className="absolute inset-0 rounded-3xl border border-white/10" />
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5 + index * 0.1,
              }}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-indigo-500/30"
            >
              <h3 className="font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Divider */}

        <div className="mt-10 border-t border-white/10 pt-2" />
      </div>
    </motion.section>
  );
}