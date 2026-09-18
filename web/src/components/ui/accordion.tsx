'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
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
    <div className="border-b border-border last:border-none">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-surface-2"
      >
        <span className="pr-6 text-base leading-7 font-semibold">
          {question}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{
            duration: 0.25,
            ease: 'easeInOut',
          }}
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200',
            isOpen
              ? 'border-foreground bg-foreground text-background'
              : 'border-border-strong text-foreground group-hover:border-foreground'
          )}
        >
          <Plus strokeWidth={2} className="size-4" />
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
            <p className="px-6 pr-16 pb-6 text-[15px] leading-7 text-muted">
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
    <div className="overflow-hidden rounded-2xl border border-border bg-surface elevate-sm">
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