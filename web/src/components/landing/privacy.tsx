'use client'

import { motion } from 'framer-motion'
import {Check,X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { SectionIntro } from './section-intro'
import { cardHover } from '@/components/ui/motion'

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
      whileHover={cardHover}
      className={cn(
        'relative rounded-2xl border p-8 backdrop-blur-xl',
        'transition-[border-color,box-shadow] duration-200 hover:elevate-md',
        accent
          ? 'border-foreground bg-foreground text-background elevate-lg'
          : 'border-border bg-surface/60 elevate-sm hover:border-border-strong'
      )}
    >
      <div
        className={cn(
          'mb-8 inline-flex rounded-full border px-3.5 py-1.5 font-mono text-xs tracking-widest uppercase',
          accent
            ? 'border-background/25 bg-background/10 text-background'
            : 'border-[color-mix(in_oklch,var(--danger),transparent_78%)] bg-danger-soft text-danger'
        )}
      >
        {heading}
      </div>

      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-4">
            <div
              className={cn(
                'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full',
                accent ? 'bg-background/15' : 'bg-danger-soft'
              )}
            >
              {accent ? (
                <Check className="size-3.5 text-background" />
              ) : (
                <X className="size-3.5 text-danger" />
              )}
            </div>

            <span
              className={cn(
                'leading-7',
                accent ? 'text-background' : 'text-muted'
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
    
      

      <div className="container-wrapper relative">
        <SectionIntro
          index="04"
          eyebrow="Privacy by design"
          title="Not a privacy policy."
          emphasis="A technical guarantee."
          description="Traditional PDF tools ask you to trust them. We simply ensure your files never leave your device."
        />

        {/* Comparison */}
        <div className="relative mt-16 grid gap-6 lg:grid-cols-2">
          {/* VS Badge */}
          <div className="absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
            <div className="flex size-12 items-center justify-center rounded-full border border-border bg-background font-display text-lg italic elevate-md">
              vs
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