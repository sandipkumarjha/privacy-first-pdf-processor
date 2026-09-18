'use client'

import { motion } from 'framer-motion'
import { Cpu, ShieldOff, Gauge, WifiOff, KeyRound, ScanEye } from 'lucide-react'
import { IconTile } from '@/components/ui/icon-tile'
import { DURATION, EASE_OUT, stagger } from '@/components/ui/motion'
import { SectionIntro } from './section-intro'

const features = [
  {
    icon: Cpu,
    title: 'Local engine',
    description:
      'PDF parsing and rendering run in an engine loaded once into your browser, then operate fully offline.',
  },
  {
    icon: ShieldOff,
    title: 'Zero upload',
    description:
      'Files are read straight from disk into memory. They are never attached to a network request.',
  },
  {
    icon: Gauge,
    title: 'Instant',
    description:
      'No round trip to a server means most operations finish in milliseconds, not minutes.',
  },
  {
    icon: WifiOff,
    title: 'Works offline',
    description:
      'Load the page once. After that, process PDFs on a plane, in a vault, anywhere.',
  },
  {
    icon: KeyRound,
    title: 'No account needed',
    description:
      'Every tool works without signing up. There is nothing to register for and no profile to build.',
  },
  {
    icon: ScanEye,
    title: 'Auditable',
    description:
      'The processing engine is open source — open dev tools and watch that nothing leaves the tab.',
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-b border-border py-24 lg:py-32"
    >
      <div className="container-wrapper">
        <SectionIntro
          index="02"
          eyebrow="Why it's different"
          title="Everything happens"
          emphasis="on your device."
          description="Privacy isn't a feature — it's the foundation. Every PDF operation runs locally inside your browser."
        />

        {/* One bordered sheet divided by hairlines, rather than six
            floating cards: calmer, and it reads as a spec sheet. */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border elevate-sm sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: DURATION.slow,
                ease: EASE_OUT,
                delay: stagger(i),
              }}
              className="group bg-surface p-8 transition-colors duration-200 hover:bg-surface-2"
            >
              <div className="flex items-center justify-between">
                <IconTile icon={f.icon} tone="neutral" />
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-semibold">{f.title}</h3>

              <p className="mt-2.5 leading-7 text-muted">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
