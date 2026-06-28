'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

/**
 * The page's signature visual: a file moves from "your device" through a
 * local processing node and back out — entirely inside a dashed boundary.
 * A separate, dimmed connection to a server is severed with a no-entry
 * badge. This single diagram is the page's thesis, reused at two sizes.
 */
export function AirGapDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 620 260"
      className={cn('w-full', className)}
      role="img"
      aria-label="Diagram showing a PDF file processed locally on your device, with no connection ever made to a server"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--muted))" />
        </marker>
      </defs>

      {/* Device boundary */}
      <rect
        x="24" y="30" width="400" height="200" rx="18"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="1.5"
        strokeDasharray="5 6"
      />
      <text x="44" y="58" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.08em" fill="hsl(var(--muted))">
        YOUR DEVICE
      </text>

      {/* Connector: file -> engine */}
      <path d="M144,150 H188" stroke="hsl(var(--muted))" strokeWidth="1.5" markerEnd="url(#arrow)" opacity="0.6" />
      {/* Connector: engine -> result */}
      <path d="M258,150 H302" stroke="hsl(var(--muted))" strokeWidth="1.5" markerEnd="url(#arrow)" opacity="0.6" />

      {/* Node 1 — source file */}
      <g transform="translate(110,150)">
        <circle r="34" fill="hsl(var(--surface))" stroke="hsl(var(--border))" />
        <g stroke="hsl(var(--foreground))" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <rect x="-7" y="-10" width="14" height="18" rx="2" />
          <path d="M-4,-3 H4 M-4,1 H4 M-4,5 H1.5" />
        </g>
        <text x="0" y="54" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="hsl(var(--muted))">file.pdf</text>
      </g>

      {/* Node 2 — local engine (pulsing) */}
      <g transform="translate(224,150)">
        <circle r="34" fill="hsl(var(--accent-soft))" stroke="hsl(var(--accent))" className="animate-pulse-soft" />
        <g stroke="hsl(var(--accent))" strokeWidth="1.5" fill="none" strokeLinecap="round">
          <rect x="-8" y="-8" width="16" height="16" rx="3" />
          <path d="M-3,-12 V-8 M3,-12 V-8 M-3,12 V8 M3,12 V8 M-12,-3 H-8 M-12,3 H-8 M12,-3 H8 M12,3 H8" />
        </g>
        <text x="0" y="54" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="hsl(var(--muted))">local engine</text>
      </g>

      {/* Node 3 — processed result */}
      <g transform="translate(338,150)">
        <circle r="34" fill="hsl(var(--surface))" stroke="hsl(var(--border))" />
        <g stroke="hsl(var(--foreground))" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <rect x="-7" y="-10" width="14" height="18" rx="2" />
          <path d="M-4,-3 H4 M-4,1 H4" />
        </g>
        <circle cx="7" cy="9" r="7" fill="hsl(var(--success))" />
        <path d="M4,9 l2,2.4 l4,-5" stroke="hsl(var(--background))" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="0" y="54" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="hsl(var(--muted))">result</text>
      </g>

      {/* Animated dot tracing the local-only path, looping */}
      <motion.circle
        r="4"
        fill="hsl(var(--accent))"
        cy={150}
        animate={{ cx: [110, 224, 338, 224, 110] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.3, 0.5, 0.7, 1] }}
      />

      {/* Severed connection to a server — outside the boundary, dimmed */}
      <path
        d="M424,150 H486"
        stroke="hsl(var(--muted))"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        opacity="0.4"
      />
      <g transform="translate(459,150)" opacity="0.7">
        <circle r="11" fill="hsl(var(--background))" stroke="hsl(var(--danger))" strokeWidth="1.5" />
        <path d="M-6,-6 L6,6" stroke="hsl(var(--danger))" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <text x="459" y="178" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="hsl(var(--muted))" opacity="0.8">
        never sent
      </text>

      {/* Server, dimmed/disabled */}
      <g transform="translate(548,150)" opacity="0.35">
        <circle r="9" cx="-9" cy="-3" fill="hsl(var(--muted))" />
        <circle r="11" cx="6" cy="-7" fill="hsl(var(--muted))" />
        <circle r="8" cx="18" cy="-2" fill="hsl(var(--muted))" />
        <rect x="-15" y="-3" width="42" height="13" rx="6.5" fill="hsl(var(--muted))" />
      </g>
      <text x="548" y="212" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="hsl(var(--muted))" opacity="0.6">
        server
      </text>
    </svg>
  )
}
