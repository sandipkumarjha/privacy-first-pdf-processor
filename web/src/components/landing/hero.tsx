'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/badge'
import { DURATION, EASE_OUT } from '@/components/ui/motion'
import { AirGapDiagram } from './air-gap-diagram'

const trustLine =
  'Built for contracts, medical records, and anything you would not paste into a web form.'

const stats = [
  { label: 'Files uploaded', value: '0' },
  { label: 'Tools', value: '7' },
  { label: 'Runs locally', value: '100%' },
]

export function Hero() {
  return (
    <section className="relative -mt-16 overflow-hidden border-b border-border pt-16">
      {/* Background art. These utilities are defined in globals.css —
          without them this section renders flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-fade opacity-60"
      />

      <div className="container-wrapper relative">
        <div className="grid min-h-[calc(100dvh-64px)] items-center gap-14 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, ease: EASE_OUT }}
            className="max-w-2xl"
          >
            <StatusBadge tone="success" className="font-mono">
              0 uploads · 0 servers · 100% local
            </StatusBadge>

            <h1 className="mt-6 font-display text-5xl leading-[1.02] font-normal text-balance sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              Your PDFs never
              <br />
              <span className="text-emphasis">leave your device.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Merge, split, compress, and edit PDFs entirely inside your browser.
              No upload, no cloud processing, and no third party ever sees your
              files because everything happens locally.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/dashboard" className="group">
                  Start processing PDFs
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-border border-y border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-1.5 px-4 py-5 first:pl-0">
                  <dt className="font-mono text-[0.6875rem] tracking-widest text-muted-foreground uppercase">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-3xl leading-none sm:text-4xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 max-w-xl text-sm text-muted-foreground">
              {trustLine}
            </p>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            className="mx-auto w-full max-w-xl"
          >
            <div className="rounded-2xl border border-border bg-surface/80 p-5 backdrop-blur-xl elevate-xl">
              <AirGapDiagram />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
