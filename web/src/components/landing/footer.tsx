import Link from 'next/link'
import { FaGithub } from 'react-icons/fa6'
import { ShieldCheck, WifiOff, Lock } from 'lucide-react'

import { navigationItems } from '@/components/layout/nav-items'
import { Logo } from './navbar'

const REPO_URL = 'https://github.com/sandipkumarjha/privacy-first-pdf-processor'

// Every href here resolves to a real route or section.
const columns = [
  {
    heading: 'Tools',
    links: navigationItems
      .filter((item) => item.href !== '/dashboard')
      .map((item) => ({ label: item.title, href: item.href })),
  },
  {
    heading: 'Product',
    links: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Features', href: '/#features' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
]

const promises = [
  { icon: ShieldCheck, label: '100% local processing' },
  { icon: WifiOff, label: 'Works offline' },
  { icon: Lock, label: 'Privacy by design' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-surface-2/60">
      <div className="container-wrapper relative py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo />

            <p className="mt-5 max-w-xs text-sm leading-6 text-muted">
              A privacy-first PDF toolkit that processes documents entirely
              inside your browser. No uploads, no accounts, no compromises.
            </p>

            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              <FaGithub size={16} />
              View source
            </a>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
                {column.heading}
              </h3>

              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} privacy/pdf. All rights reserved.</p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {promises.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-1.5">
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Oversized wordmark — pure decoration */}
        <p
          aria-hidden="true"
          className="pointer-events-none mt-12 -mb-8 text-center font-display text-[clamp(4rem,17vw,15rem)] leading-none whitespace-nowrap text-foreground/[0.06] select-none lg:-mb-14"
        >
          privacy/pdf
        </p>
      </div>
    </footer>
  )
}
