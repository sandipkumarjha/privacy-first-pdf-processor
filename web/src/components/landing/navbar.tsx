'use client'

import * as React from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#privacy', label: 'Privacy' },
  { href: '#faq', label: 'FAQ' },
]

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="2" width="14" height="20" rx="2" stroke="hsl(var(--foreground))" strokeWidth="1.6" />
        <path d="M3 8H17" stroke="hsl(var(--foreground))" strokeWidth="1.6" />
        <path d="M21 5L13 21" stroke="hsl(var(--accent))" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="font-mono text-[15px] tracking-tight text-foreground">
        privacy<span className="text-muted">/</span>pdf
      </span>
    </Link>
  )
}

export function Navbar() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-color  hover:underline "
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button variant="default" size="sm">
            Open the app
          </Button>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden border-b border-border md:hidden"
          >
            <div className="container flex flex-col gap-1 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2.5 text-sm text-muted hover:bg-surface hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 flex items-center gap-3 px-2">
                <ThemeToggle />
                <Button variant="outline" size="sm" className="flex-1">
                  Sign in
                </Button>
                <Button variant="default" size="sm" className="flex-1">
                  Open the app
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
