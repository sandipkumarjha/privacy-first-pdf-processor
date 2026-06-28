'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How it Works', href: '#how-it-works' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 bottom-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="container-wrapper relative py-20">

        <div className="grid gap-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Brand */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .5 }}
          >
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-bold tracking-tight">
                privacy
                <span className="text-indigo-500">.</span>
                pdf
              </h3>
            </Link>

            <p className="mt-5 max-w-sm leading-7 text-muted">
              A privacy-first PDF toolkit that processes documents entirely
              inside your browser. No uploads, no accounts, no compromises.
            </p>

            <div className="mt-8 flex gap-4">

              <a
                href="#"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-400"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                aria-label="X"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-400"
              >
                <FaXTwitter size={18} />
              </a>

            </div>
          </motion.div>

          {/* Navigation */}

          {columns.map((column, index) => (
            <motion.div
              key={column.heading}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .5,
                delay: index * .08,
              }}
            >
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-foreground">
                {column.heading}
              </h4>

              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted transition-all duration-300 hover:translate-x-1 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 text-sm text-muted md:flex-row">

          <div>
            © {new Date().getFullYear()} Privacy PDF. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">

            <span>🔒 100% Local Processing</span>

            <span>⚡ Works Offline</span>

            <span>🛡️ Privacy by Design</span>

          </div>

        </div>

      </div>

    </footer>
  )
}