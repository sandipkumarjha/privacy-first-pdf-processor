"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  HardDrive,
  Lock,
  WifiOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { IconTile } from "@/components/ui/icon-tile";
import { DURATION, EASE_OUT, stagger } from "@/components/ui/motion";

const features = [
  {
    icon: WifiOff,
    title: "Zero uploads",
    description: "Files never leave your browser.",
  },
  {
    icon: Lock,
    title: "In-memory only",
    description: "Processed inside your device, then discarded.",
  },
  {
    icon: HardDrive,
    title: "Offline ready",
    description: "Works without an internet connection.",
  },
];

export function PrivacyBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: DURATION.base, ease: EASE_OUT }}
      className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 elevate-sm sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-radial-fade opacity-50"
      />

      <div className="relative">
        <StatusBadge tone="success">Privacy first</StatusBadge>

        <h2 className="mt-5 font-display text-3xl leading-tight font-normal tracking-tight">
          Your PDFs stay on{" "}
          <span className="text-emphasis">your device.</span>
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted">
          Every PDF operation happens locally using WebAssembly and Web Workers.
          We never upload, store, or analyze your files.
        </p>

        <div className="mt-6 space-y-2.5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: DURATION.base,
                ease: EASE_OUT,
                delay: stagger(index),
              }}
              className="flex items-start gap-3.5 rounded-xl border border-border bg-surface-2 p-3.5 transition-colors hover:border-border-strong"
            >
              <IconTile icon={feature.icon} tone="neutral" size="sm" />

              <div className="min-w-0">
                <h3 className="text-sm font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-0.5 text-sm text-muted">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex gap-3 rounded-xl border border-[color-mix(in_oklch,var(--success),transparent_78%)] bg-success-soft p-4">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />

          <div>
            <h3 className="text-sm font-semibold">
              Verifiable privacy
            </h3>
            <p className="mt-1 text-sm leading-6 text-muted">
              Open your browser&rsquo;s developer tools and watch the Network
              tab. You&rsquo;ll never see your PDF leave the page.
            </p>
          </div>
        </div>

        <Button className="mt-6 w-full" asChild>
          <Link href="/docs">
            How this works
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </motion.section>
  );
}
