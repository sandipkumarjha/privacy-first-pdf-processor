"use client";

import { motion } from "framer-motion";
import { Scissors, ShieldCheck } from "lucide-react";

import { SplitHeader } from "@/components/pdf-split/split-header";
import { SplitUploadArea } from "@/components/pdf-split/split-upload-area";
import { SplitPageSelector } from "@/components/pdf-split/split-page-selector";
import { SplitPageGrid } from "@/components/pdf-split/split-page-grid";
import { SplitDownloadSection } from "@/components/pdf-split/split-download-section";

export default function SplitPage() {
  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        {/* Header */}
        <SplitHeader />

        {/* Upload Area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <SplitUploadArea />
        </motion.div>

        {/* Page Selection */}
        <motion.div
          className="rounded-2xl border border-border bg-card p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <SplitPageSelector />
        </motion.div>

        {/* Pages */}
        <motion.div
          className="rounded-2xl border border-border bg-card p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <SplitPageGrid />
        </motion.div>

        {/* Download */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <SplitDownloadSection />
        </motion.div>

        {/* Privacy Notice */}
        <motion.div
          className="flex items-start gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className="rounded-xl bg-emerald-500/10 p-3">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              Privacy First
            </h3>

            <p className="mt-2 text-sm text-muted-foreground leading-6">
              Your PDF never leaves your device. Every page selection and split
              operation will be performed locally inside your browser.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}