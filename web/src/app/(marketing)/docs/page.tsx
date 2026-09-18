import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { ProsePage, ProseSection } from '@/components/landing/prose-page'
import { navigationItems } from '@/components/layout/nav-items'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'How each privacy/pdf tool works, and how to verify that nothing is uploaded.',
}

const guides: Record<string, string> = {
  '/merge': 'Add two or more PDFs, reorder them with the arrows, then merge. Page order follows the list from top to bottom.',
  '/split': 'Load one PDF and pick pages by clicking thumbnails or typing a range such as 1-3, 7. The selection is saved as a new document.',
  '/compress': 'Choose a compression level. Higher levels re-encode images more aggressively; text stays sharp at every level.',
  '/rotate': 'Rotate individual pages or the whole document in 90° steps. The rotation is written into the file, not just the preview.',
  '/extract': 'Select the pages you want to keep. Everything else is left out of the exported PDF.',
  '/watermark': 'Set the text, size, opacity, angle and colour, then apply it to the selected pages.',
  '/ocr': 'Recognise text in scanned pages. The language model downloads once, then runs on your device. Export as text or a searchable PDF.',
}

export default function DocsPage() {
  const tools = navigationItems.filter((item) => item.href !== '/dashboard')

  return (
    <ProsePage
      eyebrow="Documentation"
      title="How it works"
      lead="Seven tools, one rule: your file is read into this browser tab's memory, processed there, and handed back as a download. It is never sent anywhere."
    >
      <ProseSection title="The tools">
        <ul className="!list-none !space-y-0 divide-y divide-border rounded-2xl border border-border bg-surface !pl-0 elevate-sm">
          {tools.map((tool) => (
            <li key={tool.href} className="!pl-0">
              <Link
                href={tool.href}
                className="group flex items-start gap-4 p-5 !no-underline transition-colors hover:bg-surface-2"
              >
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2">
                  <tool.icon className="size-[18px] text-foreground" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 font-semibold text-foreground">
                    {tool.title}
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-muted">
                    {guides[tool.href]}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </ProseSection>

      <ProseSection title="Verify it yourself">
        <p>You don&rsquo;t have to take the privacy claim on trust:</p>
        <ul>
          <li>Open your browser&rsquo;s developer tools and switch to the <strong>Network</strong> tab.</li>
          <li>Process any PDF. You will see no request carrying your file.</li>
          <li>Or load the app once, disconnect from the internet, and keep working.</li>
        </ul>
      </ProseSection>

      <ProseSection title="Limits">
        <p>
          There is no file-size cap, but everything happens in your device&rsquo;s memory. Very large
          or image-heavy PDFs can be slow on older phones and laptops. OCR downloads a language
          model on first use, which needs a connection once.
        </p>
      </ProseSection>

      <ProseSection title="More">
        <p>
          Read the <Link href="/privacy-policy">privacy policy</Link> or the{' '}
          <Link href="/terms">terms of service</Link>, or jump straight to the{' '}
          <Link href="/dashboard">dashboard</Link>.
        </p>
      </ProseSection>
    </ProsePage>
  )
}
