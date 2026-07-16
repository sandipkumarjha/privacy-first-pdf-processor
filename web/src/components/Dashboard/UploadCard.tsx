"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { PdfUpload } from "@/components/upload/pdf-upload";

export function UploadCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F172A]/70 backdrop-blur-xl"
    >
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Upload your PDF
            </h2>

            <p className="mt-2 text-slate-400">
              Files stay on your device. Nothing is uploaded.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />

            <span className="text-sm font-medium text-emerald-300">
              100% Local Processing
            </span>
          </div>
        </div>

        {/* Upload Component */}
        <PdfUpload />

        {/* Bottom Info Cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10">
              <svg
                className="h-6 w-6 text-indigo-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M7 2h8l5 5v15H7z" />
              </svg>
            </div>

            <h4 className="font-semibold text-white">
              Supported Formats
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              PDF documents of any size your browser can comfortably
              process.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>

            <h4 className="font-semibold text-white">
              Privacy Guaranteed
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Your files never leave your device. Everything happens
              completely inside your browser.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
              <svg
                className="h-6 w-6 text-cyan-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v18M3 12h18" />
              </svg>
            </div>

            <h4 className="font-semibold text-white">
              Lightning Fast
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Powered by WebAssembly and Web Workers for instant PDF
              processing.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}