'use client'

import { motion } from 'framer-motion'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import { AirGapDiagram } from './air-gap-diagram'

const trustLine =
  'Built for contracts, medical records, and anything you would not paste into a web form.'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-radial-fade opacity-60" />

      <div className="container-wrapper relative">
        <div className="grid min-h-[calc(100vh-80px)] items-center gap-16 py-20 lg:grid-cols-2 lg:py-28">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-2xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              0 uploads · 0 servers · 100% local
            </div>

            <h1 className="text-balance font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Your PDFs never
              <br />
              leave your device.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Merge, split, compress, and edit PDFs entirely inside your browser.
              No upload, no cloud processing, and no third party ever sees your
              files because everything happens locally.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg">
                Start Processing PDFs
              </Button>

              <a
                href="#how-it-works"
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              >
                See how it works
              </a>
            </div>

            <p className="mt-8 max-w-xl text-sm text-muted">
              {trustLine}
            </p>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto w-full max-w-xl"
          >
            <div className="rounded-2xl border border-border bg-surface/70 p-5 shadow-2xl backdrop-blur-xl">
              <AirGapDiagram />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}