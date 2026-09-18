'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DURATION, EASE_OUT } from '@/components/ui/motion'

const trustPoints = ['No sign up', 'No upload', 'Works offline', 'Open source']

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-wrapper relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: DURATION.slow, ease: EASE_OUT }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-foreground p-10 text-center text-background elevate-xl md:p-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,var(--background)_1px,transparent_1px),linear-gradient(to_bottom,var(--background)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,black,transparent)]"
          />

          <div className="relative">
<p className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-background/60 uppercase">
              <ShieldCheck className="size-4" />
              100% local processing
            </p>

            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-normal sm:text-5xl md:text-6xl">
              Process your first PDF{' '}
              <span className="text-emphasis">
                in under 10 seconds.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-background/70">
              Merge, split, compress, rotate, watermark and edit PDFs directly
              inside your browser. No uploads. No accounts. No waiting.
            </p>

            <div className="mt-10 flex justify-center">
              <Button
                size="lg"
                asChild
                className="bg-background text-foreground shadow-none hover:bg-background/90 hover:shadow-none"
              >
                <Link href="/dashboard" className="group">
                  Start processing
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-background/60">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="text-background">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
