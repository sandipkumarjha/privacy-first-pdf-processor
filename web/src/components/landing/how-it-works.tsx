'use client'

import { motion } from 'framer-motion'
import { FileText, Cpu, Download } from 'lucide-react'

import { IconTile } from '@/components/ui/icon-tile'
import { DURATION, EASE_OUT, cardHover, stagger } from '@/components/ui/motion'
import { SectionIntro } from './section-intro'

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
      

      <div className="container-wrapper relative">
        <SectionIntro
          index="03"
          eyebrow="How it works"
          title="Three simple steps."
          emphasis="Zero servers."
          description="Every operation happens locally inside your browser. Your files never leave your device — not even for a second."
        />

        {/* Timeline */}
        <div className="relative mt-20">

          {/* Desktop Connection Line */}
          <div
            aria-hidden="true"
            className="absolute top-[52px] right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block"
          />

          <div className="grid gap-12 lg:grid-cols-3">

            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: DURATION.base,
                    ease: EASE_OUT,
                    delay: stagger(index, 0.1),
                  }}
                  whileHover={cardHover}
                  className="group relative"
                >
                  {/* Desktop Dot */}
                  <div
                    aria-hidden="true"
                    className="absolute top-[46px] left-1/2 hidden size-3 -translate-x-1/2 rounded-full border-2 border-background bg-accent-strong lg:block"
                  />

                  {/* Mobile Vertical Line */}
                  {index !== steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute top-24 left-7 h-16 w-px bg-border-strong lg:hidden"
                    />
                  )}

                  {/* Card */}
                  <div className="h-full rounded-2xl border border-border bg-surface/80 p-7 backdrop-blur-xl elevate-sm transition-[border-color,box-shadow] duration-200 hover:border-border-strong hover:elevate-md">
                    <IconTile icon={Icon} tone="neutral" size="lg" />

                    <div className="mt-6 flex items-center gap-3">
                      <span className="font-display text-3xl leading-none">
                        {step.number}
                      </span>

                      <div className="h-px flex-1 bg-border" />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold">
                      {step.title}
                    </h3>

                    <p className="mt-3 leading-7 text-muted">
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