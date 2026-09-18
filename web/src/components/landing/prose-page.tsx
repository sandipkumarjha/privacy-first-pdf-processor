import { cn } from '@/lib/cn'

interface ProsePageProps {
  eyebrow: string
  title: string
  lead: string
  /** e.g. "Last updated 19 September 2026" */
  meta?: string
  children: React.ReactNode
}

/** Layout for long-form public pages (docs, privacy policy, terms). */
export function ProsePage({ eyebrow, title, lead, meta, children }: ProsePageProps) {
  return (
    <article className="border-b border-border">
      <header className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_90%_at_50%_0%,black,transparent)]"
        />
        <div className="container-wrapper relative py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {eyebrow}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.04] sm:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">{lead}</p>
            {meta && (
              <p className="mt-6 font-mono text-xs text-muted-foreground">{meta}</p>
            )}
          </div>
        </div>
      </header>

      <div className="container-wrapper py-16 lg:py-20">
        <div className="max-w-3xl space-y-12">{children}</div>
      </div>
    </article>
  )
}

export function ProseSection({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn('scroll-mt-24', className)}>
      <h2 className="font-display text-3xl font-normal">{title}</h2>
      <div className="mt-4 space-y-4 leading-7 text-muted [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border-strong [&_a]:underline-offset-4 hover:[&_a]:decoration-foreground [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  )
}
