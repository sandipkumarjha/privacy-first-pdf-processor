/**
 * One motion vocabulary for the whole app.
 *
 * Previously each component invented its own numbers (y:-8 here,
 * scale:1.01 there, 0.9 exit somewhere else) which is a large part of
 * why the UI felt unsettled. Import from here instead.
 *
 * Global `prefers-reduced-motion` is handled in globals.css, which
 * collapses every transition/animation duration to ~0.
 */

/** Apple-ish decelerate. Use for anything entering the viewport. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const

/** Shorter, for hovers and state flips. */
export const EASE_SOFT = [0.4, 0, 0.2, 1] as const

export const DURATION = {
  fast: 0.18,
  base: 0.32,
  slow: 0.5,
} as const

/** Standard "rise into place" entrance. */
export const riseIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.base, ease: EASE_OUT },
}

/** Same, but triggered on scroll and only once. */
export const riseInView = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: DURATION.base, ease: EASE_OUT },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DURATION.base, ease: EASE_OUT },
}

/**
 * Stagger children by index. Kept small — 60ms reads as "considered",
 * 120ms+ reads as "slow website".
 */
export const stagger = (index: number, step = 0.06) => index * step

/** The single card hover. 2px, not 8px: restraint is the premium cue. */
export const cardHover = {
  y: -2,
  transition: { duration: DURATION.fast, ease: EASE_SOFT },
}

export const cardTap = {
  scale: 0.995,
}
