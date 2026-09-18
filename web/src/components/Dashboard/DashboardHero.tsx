"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { IconTile } from "@/components/ui/icon-tile";
import { DURATION, EASE_OUT, stagger } from "@/components/ui/motion";

const guarantees = [
  "No uploads to any server",
  "Works completely offline",
  "End-to-end local processing",
  "No account required",
];

export function DashboardHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.slow, ease: EASE_OUT }}
      className="relative overflow-hidden rounded-2xl border border-border bg-surface elevate-md"
    >
      {/* A single warm wash from the top edge instead of a full
          saturated gradient fill. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-radial-fade opacity-70"
      />

      <div className="relative flex flex-col gap-10 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
        <div className="max-w-xl">
          <StatusBadge tone="success">100% privacy first</StatusBadge>

          <h1 className="mt-5 font-display text-4xl font-normal tracking-tight sm:text-5xl">
            Your private <span className="text-emphasis">PDF workspace.</span>
          </h1>

          <p className="mt-4 text-base leading-7 text-muted">
            Merge, split, compress, rotate and edit PDFs directly inside your
            browser.{" "}
            <span className="font-medium text-foreground">
              Your files never leave your device.
            </span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="#upload-zone">
                Upload a PDF
                <ArrowRight />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">Read the docs</Link>
            </Button>
          </div>
        </div>

        {/* Guarantee panel */}
        <div className="w-full max-w-sm shrink-0 rounded-xl border border-border bg-surface-2 p-5 elevate-sm">
          <div className="flex items-center gap-3">
            <IconTile icon={Sparkles} tone="accent" />

            <div>
              <h2 className="text-sm font-semibold">
                Local processing
              </h2>
              <p className="text-xs text-muted-foreground">Browser powered</p>
            </div>
          </div>

          <ul className="mt-5 space-y-2.5">
            {guarantees.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: DURATION.base,
                  ease: EASE_OUT,
                  delay: 0.2 + stagger(index),
                }}
                className="flex items-center gap-2.5 text-sm text-muted"
              >
                <Check className="size-4 shrink-0 text-success" />
                {item}
              </motion.li>
            ))}
          </ul>

          <p className="mt-5 flex gap-2.5 rounded-lg border border-border bg-surface p-3 text-xs leading-5 text-muted-foreground">
            <ShieldCheck className="size-4 shrink-0 text-foreground" />
            Every PDF operation happens locally in your browser using
            WebAssembly.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
