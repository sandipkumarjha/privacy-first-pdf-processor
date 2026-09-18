'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

/**
 * The page's signature visual: a file moves from "your device" through a
 * local processing node and back out — entirely inside a dashed boundary.
 * A separate, dimmed connection to a server is severed with a no-entry
 * badge. This single diagram is the page's thesis, reused at two sizes.
 *
 * All colours come from CSS custom properties so the diagram tracks the
 * theme. SVG presentation attributes accept var() directly; they do NOT
 * accept `hsl(var(--token))` when the token is a full colour value.
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
        <marker
          id="airgap-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="var(--border-strong)" />
        </marker>
      </defs>

      {/* Device boundary */}
      <rect
        x="24"
        y="30"
        width="400"
        height="200"
        rx="18"
        fill="var(--accent-soft)"
        fillOpacity="0.28"
        stroke="var(--accent-strong)"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeDasharray="5 6"
      />
      <text
        x="44"
        y="58"
        fontFamily="var(--font-mono-var)"
        fontSize="11"
        letterSpacing="0.08em"
        fontWeight={600}
        fill="var(--accent-strong)"
      >
        YOUR DEVICE
      </text>

      {/* Connectors */}
      <path
        d="M144,150 H188"
        stroke="var(--border-strong)"
        strokeWidth="2"
        markerEnd="url(#airgap-arrow)"
      />
      <path
        d="M258,150 H302"
        stroke="var(--border-strong)"
        strokeWidth="2"
        markerEnd="url(#airgap-arrow)"
      />

      {/* Node 1 — source file */}
      <g transform="translate(110,150)">
        <circle
          r="34"
          fill="var(--surface)"
          stroke="var(--border-strong)"
          strokeWidth={2}
        />
        <g
          stroke="var(--accent-strong)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        >
          <rect x="-7" y="-10" width="14" height="18" rx="2" />
          <path d="M-4,-3 H4 M-4,1 H4 M-4,5 H1.5" />
        </g>
        <text
          x="0"
          y="54"
          textAnchor="middle"
          fontFamily="var(--font-mono-var)"
          fontSize="10"
          fill="var(--muted)"
        >
          file.pdf
        </text>
      </g>

      {/* Node 2 — local engine */}
      <g transform="translate(224,150)">
        <circle
          r="34"
          fill="var(--accent-soft)"
          stroke="var(--accent-strong)"
          strokeOpacity="0.5"
          strokeWidth={2}
          className="animate-pulse-soft"
        />
        <g
          stroke="var(--accent-strong)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        >
          <rect x="-8" y="-8" width="16" height="16" rx="3" />
          <path d="M-3,-12 V-8 M3,-12 V-8 M-3,12 V8 M3,12 V8 M-12,-3 H-8 M-12,3 H-8 M12,-3 H8 M12,3 H8" />
        </g>
        <text
          x="0"
          y="54"
          textAnchor="middle"
          fontFamily="var(--font-mono-var)"
          fontSize="10"
          fill="var(--muted)"
        >
          local engine
        </text>
      </g>

      {/* Node 3 — processed result */}
      <g transform="translate(338,150)">
        <circle
          r="34"
          fill="var(--surface)"
          stroke="var(--border-strong)"
          strokeWidth={2}
        />
        <g
          stroke="var(--accent-strong)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        >
          <rect x="-7" y="-10" width="14" height="18" rx="2" />
          <path d="M-4,-3 H4 M-4,1 H4" />
        </g>
        <circle cx="9" cy="10" r="7.5" fill="var(--success)" />
        <path
          d="M6,10 l2,2.4 l4,-5"
          stroke="var(--success-foreground)"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="0"
          y="54"
          textAnchor="middle"
          fontFamily="var(--font-mono-var)"
          fontSize="10"
          fill="var(--muted)"
        >
          result
        </text>
      </g>

      {/* Dot tracing the local-only path, looping */}
      <motion.circle
        r="4"
        fill="var(--accent-strong)"
        cy={150}
        animate={{ cx: [110, 224, 338, 224, 110] }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.3, 0.5, 0.7, 1],
        }}
      />

      {/* Severed connection to a server — outside the boundary, dimmed */}
      <path
        d="M424,150 H486"
        stroke="var(--muted)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        opacity="0.4"
      />
      <g transform="translate(459,150)">
        <circle
          r="11"
          fill="var(--danger-soft)"
          stroke="var(--danger)"
          strokeWidth="1.5"
        />
        <path
          d="M-5,-5 L5,5"
          stroke="var(--danger)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
      <text
        x="459"
        y="180"
        textAnchor="middle"
        fontFamily="var(--font-mono-var)"
        fontSize="10"
        fill="var(--danger)"
      >
        never sent
      </text>

      {/* Server, dimmed/disabled */}
      <g transform="translate(548,150)" opacity="0.35">
        <circle r="9" cx="-9" cy="-3" fill="var(--muted)" />
        <circle r="11" cx="6" cy="-7" fill="var(--muted)" />
        <circle r="8" cx="18" cy="-2" fill="var(--muted)" />
      </g>
      <text
        x="553"
        y="186"
        textAnchor="middle"
        fontWeight={600}
        fontFamily="var(--font-mono-var)"
        fontSize="11"
        fill="var(--muted)"
        opacity="0.7"
      >
        server
      </text>
    </svg>
  )
}
