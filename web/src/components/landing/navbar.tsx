'use client'

import * as React from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'

import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

// Absolute hash links so they also work from /docs, /terms, etc.
const links = [
  { href: '/#tools', label: 'Tools' },
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#privacy', label: 'Privacy' },
  { href: '/docs', label: 'Docs' },
]

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex shrink-0 items-center gap-2.5 text-foreground', className)}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M4 9H18" stroke="currentColor" strokeWidth="2" />
          <path d="M22 5L14 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-mono text-[15px] tracking-tight">
        privacy<span className="text-muted-foreground">/</span>pdf
      </span>
    </Link>
  )
}

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200',
        scrolled || open
          ? 'border-border bg-background/80 shadow-[var(--shadow-xs)] backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      )}
    >
      <div className="container-wrapper flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button size="sm" asChild>
            <Link href="/dashboard" className="group">
              Open the app
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <button
          className="flex size-10 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-colors hover:bg-surface-2 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden border-t border-border md:hidden"
            aria-label="Mobile"
          >
            <div className="container-wrapper flex flex-col gap-1 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm text-muted hover:bg-surface-2 hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center gap-3">
                <ThemeToggle />
                <Button className="flex-1" asChild>
                  <Link href="/dashboard">Open the app</Link>
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
