'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CTA() {
  return (
    <section className="relative overflow-hidden border-b border-border py-24 lg:py-32">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[150px]" />
      </div>

      <div className="container-wrapper relative">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mx-auto max-w-4xl rounded-[32px] border border-border bg-surface/60 p-12 text-center backdrop-blur-xl md:p-16"
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <ShieldCheck className="h-4 w-4" />
            100% Local Processing
          </div>

          {/* Heading */}

          <h2 className="mt-8 text-4xl font-semibold tracking-tight md:text-6xl">
            Process your first PDF
            <span className="gradient-text"> in under 10 seconds.</span>
          </h2>

          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
            Merge, split, compress, rotate, watermark and edit PDFs directly
            inside your browser.
            <br />
            No uploads. No accounts. No waiting.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link href ="/dashboard">
            <Button
              size="lg"
              className="group h-12 rounded-xl bg-indigo-600 px-8 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-500 hover:shadow-[0_15px_50px_rgba(99,102,241,.35)]"
            >
              Start Processing

              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />

            </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-xl"
            >
              View Demo
            </Button>

          </div>

          {/* Bottom Trust Text */}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted">

            <span>✓ No Sign Up</span>

            <span>✓ No Upload</span>

            <span>✓ Works Offline</span>

            <span>✓ Open Source</span>

          </div>

        </motion.div>

      </div>
    </section>
  )
}