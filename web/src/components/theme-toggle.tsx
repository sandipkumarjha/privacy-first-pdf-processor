'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [isLight, setIsLight] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    setIsLight(document.documentElement.classList.contains('light'))
  }, [])

  function toggle() {
    const next = !isLight
    setIsLight(next)
    document.documentElement.classList.toggle('light', next)
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark')
    } catch {
      // localStorage unavailable — theme just won't persist
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={mounted && isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface"
    >
      {mounted && isLight ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  )
}
