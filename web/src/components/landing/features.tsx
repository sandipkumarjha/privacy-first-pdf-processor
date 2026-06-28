'use client'

import { motion } from 'framer-motion'
import { Cpu, ShieldOff, Gauge, WifiOff, KeyRound, ScanEye } from 'lucide-react'

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
      'Every tool works without signing up. Accounts only exist to save your preferences.',
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
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
  <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
</div>
      <div className="container-wrapper">
  <div className="max-w-3xl text-center mx-auto">
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
      WHY IT'S DIFFERENT
    </p>

    <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
      Everything happens
      <span className="gradient-text"> on your device</span>
    </h2>

    <p className="mt-6 text-lg text-muted">
      Privacy isn't a feature—it's the foundation. Every PDF operation runs
      locally inside your browser.
    </p>
  </div>

  

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
            }}
            whileHover={{
              y: -8,
              scale: 1.04,
            }}
            className="group rounded-3xl border border-border bg-surface/70 p-8 backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:shadow-[0_30px_80px_rgba(99,102,241,0.18)]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20 transition-colors group-hover:bg-accent group-hover:text-white">
              <f.icon className="h-7 w-7 text-accent group-hover:text-white" />
            </div>
          
            <h3 className="mt-6 text-xl font-semibold">
              {f.title}
            </h3>
          
            <p className="mt-3 leading-7 text-muted">
              {f.description}
            </p>
          </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
