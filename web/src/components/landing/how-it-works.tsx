'use client'

import { motion } from 'framer-motion'
import { FileText, Cpu, Download } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Drop your PDF',
    description:
      'Simply drag and drop your PDF into the browser. Your file is loaded directly into memory and never uploaded anywhere.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Process Locally',
    description:
      'Choose Merge, Split, Compress, Rotate, Watermark or OCR. Everything runs inside a secure Web Worker.',
  },
  {
    number: '03',
    icon: Download,
    title: 'Download Instantly',
    description:
      'Your processed PDF is ready immediately. No waiting, no queues, and absolutely no servers involved.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-b border-border py-24 lg:py-32"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />
      </div>

      <div className="container-wrapper relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            HOW IT WORKS
          </span>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Three simple steps.
            <span className="gradient-text"> Zero servers.</span>
          </h2>

          <p className="mt-6 text-lg text-muted">
            Every operation happens locally inside your browser. Your files never
            leave your device—not even for a second.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-24">

          {/* Desktop Connection Line */}
          <div className="absolute left-[16%] right-[16%] top-12 hidden h-0.5 bg-linear-to-r from-indigo-500/40 via-cyan-400/70 to-indigo-500/40 lg:block" />

          <div className="grid gap-12 lg:grid-cols-3">

            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: .5,
                    delay: index * .15,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.04,
                  }}
                  className="group relative"
                >
                  {/* Desktop Dot */}
                  <div className="absolute left-1/2 top-10 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_20px_rgba(99,102,241,.8)] lg:block" />

                  {/* Mobile Vertical Line */}
                  {index !== steps.length - 1 && (
                    <div className="absolute left-6 top-24 h-24 w-[2px] bg-gradient-to-b from-indigo-500/50 to-cyan-400/50 lg:hidden" />
                  )}

                  {/* Card */}
                  <div className="rounded-3xl border border-border bg-surface/70 p-8 backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:shadow-[0_25px_80px_rgba(99,102,241,.18)]">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 transition-all duration-300 group-hover:bg-accent">

                      <Icon
                        className="h-7 w-7 text-accent group-hover:text-white"
                        strokeWidth={1.8}
                      />
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <span className="font-mono text-sm text-accent">
                        {step.number}
                      </span>

                      <div className="h-px flex-1 bg-border" />
                    </div>

                    <h3 className="mt-5 text-2xl font-semibold">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-7 text-muted">
                      {step.description}
                    </p>

                  </div>
                </motion.div>
              )
            })}

          </div>
        </div>
      </div>
    </section>
  )
}