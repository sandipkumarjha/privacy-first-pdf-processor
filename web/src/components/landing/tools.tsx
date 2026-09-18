'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { navigationItems } from '@/components/layout/nav-items'
import { DURATION, EASE_OUT, stagger } from '@/components/ui/motion'
import { SectionIntro } from './section-intro'

const blurbs: Record<string, string> = {
  '/merge': 'Combine several PDFs into one, in any order.',
  '/split': 'Save just the pages you need as a new file.',
  '/compress': 'Shrink file size without wrecking quality.',
  '/rotate': 'Fix sideways pages, one at a time or all at once.',
  '/extract': 'Pull selected pages out into their own PDF.',
  '/watermark': 'Stamp text across pages before you share.',
  '/ocr': 'Turn scans into searchable, copyable text.',
}

/** Landing index of the tools — each row links straight into the app. */
export function Tools() {
  const tools = navigationItems.filter((item) => item.href !== '/dashboard')

  return (
    <section id="tools" className="border-b border-border py-24 lg:py-32">
      <div className="container-wrapper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionIntro
            index="01"
            eyebrow="The toolkit"
            title="Seven tools."
            emphasis="One tab."
            description="Everything you reach for when a PDF needs fixing — and none of it needs a server."
            align="start"
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <ul className="border-t border-border">
            {tools.map((tool, i) => (
              <motion.li
                key={tool.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: DURATION.base,
                  ease: EASE_OUT,
                  delay: stagger(i, 0.04),
                }}
                className="border-b border-border"
              >
                <Link
                  href={tool.href}
                  className="group flex items-center gap-5 py-6 transition-[padding] duration-300 ease-out hover:pl-3 focus-visible:pl-3"
                >
                  <span className="w-7 shrink-0 font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-3xl leading-tight sm:text-4xl">
                      {tool.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {blurbs[tool.href]}
                    </span>
                  </span>

                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border-strong text-foreground transition-colors duration-200 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:rotate-45" />
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
