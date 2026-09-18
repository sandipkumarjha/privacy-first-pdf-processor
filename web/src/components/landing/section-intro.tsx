'use client'

import { motion } from 'framer-motion'

import { cn } from '@/lib/cn'
import { DURATION, EASE_OUT } from '@/components/ui/motion'

interface SectionIntroProps {
  /** Two-digit index, e.g. "02". Gives the page an editorial rhythm. */
  index?: string
  eyebrow: string
  title: string
  /** The serif-italic half of the headline. */
  emphasis?: string
  description?: React.ReactNode
  align?: 'center' | 'start'
  className?: string
}

/** The one heading treatment shared by every landing section. */
export function SectionIntro({
  index,
  eyebrow,
  title,
  emphasis,
  description,
  align = 'center',
  className,
}: SectionIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: DURATION.slow, ease: EASE_OUT }}
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      <p
        className={cn(
          'inline-flex items-center gap-3 font-mono text-xs tracking-widest text-muted-foreground uppercase',
          align === 'center' && 'justify-center'
        )}
      >
        {index && (
          <>
            <span className="text-foreground">{index}</span>
            <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
          </>
        )}
        {eyebrow}
      </p>

      <h2 className="mt-5 font-display text-4xl leading-[1.06] font-normal sm:text-5xl lg:text-6xl">
        {title}
        {emphasis && (
          <>
            {' '}
            {/* inline-block: the emphasised phrase wraps as one unit */}
            <span className="inline-block text-emphasis">{emphasis}</span>
          </>
        )}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-muted">{description}</p>
      )}
    </motion.div>
  )
}
