'use client'

import { motion } from 'framer-motion'

import { Accordion } from '@/components/ui/accordion'
import { DURATION, EASE_OUT } from '@/components/ui/motion'
import { SectionIntro } from './section-intro'

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
    question: "What's the maximum file size?",
    answer:
      "There are no artificial limits. Processing depends on your device's available memory rather than our servers.",
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
    
      

      <div className="container-wrapper relative">

        <SectionIntro
          index="05"
          eyebrow="Questions"
          title="Questions?"
          emphasis="We've answered them."
          description="Everything you need to know about privacy, offline processing, and how the application works."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: DURATION.slow, ease: EASE_OUT }}
          className="mx-auto mt-14 max-w-3xl"
        >
          <Accordion items={faqs} />
        </motion.div>

      </div>
    </section>
  )
}