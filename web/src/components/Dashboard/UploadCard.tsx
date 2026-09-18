"use client";

import { motion } from "framer-motion";
import { FileText, Gauge, ShieldCheck } from "lucide-react";

import { PdfUpload } from "@/components/upload/pdf-upload";
import { StatusBadge } from "@/components/ui/badge";
import { IconTile } from "@/components/ui/icon-tile";
import { DURATION, EASE_OUT, cardHover, stagger } from "@/components/ui/motion";

const notes = [
  {
    icon: FileText,
    title: "Supported formats",
    description:
      "PDF documents of any size your browser can comfortably process.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy guaranteed",
    description:
      "Your files never leave your device. Everything happens in this tab.",
  },
  {
    icon: Gauge,
    title: "Lightning fast",
    description:
      "Powered by WebAssembly and Web Workers for instant processing.",
  },
];

export function UploadCard() {
  return (
    <motion.section
      id="upload-zone"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.base, ease: EASE_OUT }}
      className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6 elevate-sm sm:p-8"
    >
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Upload your PDF
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Files stay on your device. Nothing is uploaded.
          </p>
        </div>

        <StatusBadge tone="success">100% local processing</StatusBadge>
      </div>

      <PdfUpload />

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {notes.map((note, index) => (
          <motion.div
            key={note.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: DURATION.base,
              ease: EASE_OUT,
              delay: stagger(index),
            }}
            whileHover={cardHover}
            className="rounded-xl border border-border bg-surface-2 p-5 transition-colors hover:border-border-strong"
          >
            <IconTile icon={note.icon} tone="neutral" size="sm" />

            <h3 className="mt-4 text-sm font-semibold">
              {note.title}
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-muted">
              {note.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
