import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { navigationItems } from '@/components/layout/nav-items'

export default function NotFound() {
  const tools = navigationItems.filter((item) => item.href !== '/dashboard')

  return (
    <main className="relative flex min-h-dvh items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
      />

      <div className="container-wrapper relative py-20 text-center">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Error 404
        </p>

        <h1 className="mt-5 font-display text-6xl leading-none sm:text-8xl">
          Page not <span className="text-emphasis">found.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-muted">
          That address doesn&rsquo;t lead anywhere. Your files are fine — they never left your
          device in the first place.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/dashboard">Open the dashboard</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/">
              <ArrowLeft />
              Back to home
            </Link>
          </Button>
        </div>

        <nav aria-label="Tools" className="mx-auto mt-14 flex max-w-2xl flex-wrap justify-center gap-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              <tool.icon className="size-4" />
              {tool.title}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  )
}
