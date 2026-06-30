"use client";

import { motion } from "framer-motion";
import {
  UploadCloud,
  ShieldCheck,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function UploadCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F172A]/70 backdrop-blur-xl"
    >
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-[120px]" />
    </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Upload your PDF
            </h2>

            <p className="mt-2 text-slate-400">
              Files stay on your device. Nothing is uploaded.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />

            <span className="text-sm text-emerald-300">
              100% Local Processing
            </span>
          </div>
        </div>

        {/* Upload Area */}
        <motion.div
          whileHover={{
            scale: 1.01,
          }}
          transition={{
            duration: 0.25,
          }}
          className="group cursor-pointer rounded-3xl border-2 border-dashed border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-12 transition-all duration-300 hover:border-indigo-500/60 hover:bg-slate-900"
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="mb-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 p-6 shadow-lg shadow-indigo-500/20"
            >
              <UploadCloud className="h-10 w-10 text-white" />
            </motion.div>

            <h3 className="text-2xl font-semibold text-white">
              Drag & Drop PDF
            </h3>

            <p className="mt-3 max-w-lg text-slate-400">
              Drop your PDF anywhere inside this area or browse from
              your computer.
            </p>

            <Button
              size="lg"
              className="mt-8 rounded-xl bg-indigo-600 px-6 hover:bg-indigo-500"
            >
              Choose PDF
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="mt-4 text-sm text-slate-500">
              Maximum file size depends on your device memory.
            </p>
          </div>
        </motion.div>

        {/* Bottom Cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <FileText className="mb-4 h-8 w-8 text-indigo-400" />

            <h4 className="font-semibold text-white">
              Supported Formats
            </h4>

            <p className="mt-2 text-sm text-slate-400">
              PDF documents of any size your browser can handle.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <ShieldCheck className="mb-4 h-8 w-8 text-emerald-400" />

            <h4 className="font-semibold text-white">
              Privacy Guaranteed
            </h4>

            <p className="mt-2 text-sm text-slate-400">
              Your document never leaves your browser.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <UploadCloud className="mb-4 h-8 w-8 text-cyan-400" />

            <h4 className="font-semibold text-white">
              Fast Processing
            </h4>

            <p className="mt-2 text-sm text-slate-400">
              WebAssembly powered PDF engine for instant operations.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}