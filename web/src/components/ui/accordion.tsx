'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-b border-border/60 last:border-none">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between rounded-2xl px-5 py-6 text-left transition-all duration-300 hover:bg-accent/5"
      >
        <span className="pr-6 text-base font-medium leading-7 transition-colors duration-300 group-hover:text-accent">
          {question}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{
            duration: 0.25,
            ease: 'easeInOut',
          }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent/10"
        >
          <ChevronDown
            strokeWidth={2.4}
            className={cn(
              'h-5 w-5 transition-colors duration-300',
              isOpen ? 'text-accent' : 'text-muted'
            )}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-6 pr-16 text-[15px] leading-7 text-muted">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface AccordionProps {
  items: {
    question: string
    answer: string
  }[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <div className="rounded-3xl border border-border/60 bg-surface/40 backdrop-blur-xl">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        />
      ))}
    </div>
  )
}