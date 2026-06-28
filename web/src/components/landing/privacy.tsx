'use client'

import { motion } from 'framer-motion'
import {Check,X } from 'lucide-react'
import { cn } from '@/lib/cn'

const typical = [
  'Uploads your file to a server before it can do anything',
  'Keeps a temporary — or not-so-temporary — copy on disk',
  'Passes the request through analytics and CDN providers',
  'Asks you to trust a privacy policy you cannot verify',
]

const local = [
  'Reads the file with your browser\u2019s local file APIs',
  'Never issues a network request containing file contents',
  'Has nothing stored on a server, so there is nothing to breach',
  'Can be verified — open dev tools and check the Network tab yourself',
]

function ComparisonColumn({
  heading,
  items,
  tone,
}: {
  heading: string
  items: string[]
  tone: 'muted' | 'accent'
}) {
  const accent = tone === 'accent'

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className={cn(
        'relative rounded-3xl border p-8 backdrop-blur-xl transition-all duration-300',
        accent
          ? 'border-indigo-500/30 bg-indigo-500/5 hover:shadow-[0_25px_80px_rgba(99,102,241,.18)]'
          : 'border-border bg-surface/70 hover:border-red-500/20'
      )}
    >
      <div
        className={cn(
          'mb-8 inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]',
          accent
            ? 'bg-indigo-500/10 text-indigo-400'
            : 'bg-red-500/10 text-red-400'
        )}
      >
        {heading}
      </div>

      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-4">
            <div
              className={cn(
                'mt-1 flex h-8 w-8 items-center justify-center rounded-full',
                accent
                  ? 'bg-green-500/10'
                  : 'bg-red-500/10'
              )}
            >
              {accent ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <X className="h-4 w-4 text-red-400" />
              )}
            </div>

            <span
              className={cn(
                'leading-7',
                accent ? 'text-foreground' : 'text-muted'
              )}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export function Privacy() {
  return (
    <section
      id="privacy"
      className="relative overflow-hidden border-b border-border py-24 lg:py-32"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />
      </div>

      <div className="container-wrapper relative">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            PRIVACY BY DESIGN
          </span>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Not a Privacy Policy.
            <span className="gradient-text"> A Technical Guarantee.</span>
          </h2>

          <p className="mt-6 text-lg text-muted">
            Traditional PDF tools ask you to trust them.
            <br />
            We simply ensure your files never leave your device.
          </p>
        </div>

        {/* Comparison */}
        <div className="relative mt-20 grid gap-8 lg:grid-cols-2">
          {/* VS Badge */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
            <div className="rounded-full border border-border bg-background px-5 py-3 font-semibold shadow-xl">
              VS
            </div>
          </div>

          <ComparisonColumn
            heading="Typical Online PDF Tool"
            items={typical}
            tone="muted"
          />

          <ComparisonColumn
            heading="Privacy First PDF"
            items={local}
            tone="accent"
          />
        </div>
      </div>
    </section>
  )
}