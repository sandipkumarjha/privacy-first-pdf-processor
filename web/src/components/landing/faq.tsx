'use client'

import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { Accordion } from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Is this actually private, or just marketed that way?',
    answer:
      'Open your browser DevTools, switch to the Network tab, and process any PDF. You will not see a single upload request containing your file. Every operation runs locally inside your browser.',
  },
  {
    question: 'Do I need an internet connection?',
    answer:
      'Only the first time to load the application. Once cached, you can continue processing PDFs completely offline—even on a plane or without Wi-Fi.',
  },
  {
    question: 'Whats the maximum file size?',
    answer:
      'There are no artificial limits. Processing depends on your devices available memory rather than our servers.',
  },
  {
    question: 'Is the processing engine open source?',
    answer:
      'Yes. We believe privacy should be verifiable, not just promised. The core processing engine is open source so anyone can inspect how it works.',
  },
  {
    question: 'Will you ever add cloud processing?',
    answer:
      'If collaboration features are introduced in the future, cloud processing will always be optional and clearly separated from the local tools.',
  },
]

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden border-b border-border py-24 lg:py-32"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />
      </div>

      <div className="container-wrapper relative">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <ShieldCheck className="h-4 w-4" />
            Frequently Asked Questions
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Questions?
            <span className="gradient-text"> We've answered them.</span>
          </h2>

          <p className="mt-6 text-lg text-muted">
            Everything you need to know about privacy,
            offline processing, and how the application works.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mx-auto mt-20 max-w-4xl rounded-3xl border border-border bg-surface/70 p-3 backdrop-blur-xl"
        >
          <Accordion items={faqs} />
        </motion.div>

      </div>
    </section>
  )
}