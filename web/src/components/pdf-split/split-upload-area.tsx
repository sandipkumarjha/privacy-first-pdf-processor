"use client";

import { motion } from "framer-motion";
import {
  UploadCloud,
  ShieldCheck,
  FileText,
  Sparkles,
} from "lucide-react";

import { UploadButton } from "@/components/upload/upload-button";

interface SplitUploadAreaProps {
  onFileSelect?: (file: File) => void;
  isLoading?: boolean;
}

export function SplitUploadArea({
  onFileSelect,
  isLoading = false,
}: SplitUploadAreaProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F172A]/70 backdrop-blur-xl"
    >
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Upload PDF to Split
            </h2>

            <p className="mt-2 text-slate-400">
              Select a PDF and choose exactly which pages you want to keep.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />

            <span className="text-sm font-medium text-emerald-300">
              Files Never Leave Your Device
            </span>
          </div>
        </div>

        {/* Upload Container */}

        <motion.div
          whileHover={{
            scale: 1.01,
          }}
          transition={{
            duration: 0.25,
          }}
          className="rounded-3xl border-2 border-dashed border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-all hover:border-indigo-500/60"
        >
          <div className="mb-8 flex flex-col items-center text-center">
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
              }}
              className="mb-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 p-5 shadow-lg shadow-indigo-500/30"
            >
              <UploadCloud className="h-10 w-10 text-white" />
            </motion.div>

            <h3 className="text-2xl font-semibold text-white">
              Drag & Drop your PDF
            </h3>

            <p className="mt-3 max-w-xl text-slate-400">
              Drop your PDF anywhere inside this area or browse from your
              computer.
            </p>
          </div>

          {/* Existing Upload Component */}

          <div className="mx-auto max-w-2xl">
            <UploadButton
              onFileSelect={onFileSelect}
              disabled={isLoading}
            />
          </div>

          {isLoading && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />

                <span className="text-sm text-indigo-300">
                  Preparing PDF...
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Bottom Info Cards */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <motion.div
            whileHover={{
              y: -5,
            }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <FileText className="mb-4 h-8 w-8 text-indigo-400" />

            <h4 className="font-semibold text-white">
              All PDF Sizes
            </h4>

            <p className="mt-2 text-sm text-slate-400">
              Supports large multi-page PDF documents directly in your browser.
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <ShieldCheck className="mb-4 h-8 w-8 text-emerald-400" />

            <h4 className="font-semibold text-white">
              Privacy First
            </h4>

            <p className="mt-2 text-sm text-slate-400">
              Your PDF never reaches our servers. Everything happens locally.
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <Sparkles className="mb-4 h-8 w-8 text-cyan-400" />

            <h4 className="font-semibold text-white">
              Instant Preview
            </h4>

            <p className="mt-2 text-sm text-slate-400">
              Automatically generate page previews after selecting your file.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}