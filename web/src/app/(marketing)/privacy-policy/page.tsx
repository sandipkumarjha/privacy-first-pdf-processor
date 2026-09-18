import type { Metadata } from 'next'
import Link from 'next/link'

import { ProsePage, ProseSection } from '@/components/landing/prose-page'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What privacy/pdf does and does not do with your files and data.',
}

export default function PrivacyPolicyPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Privacy Policy"
      lead="The short version: your PDFs are processed inside your browser and are never uploaded to us or anyone else."
    >
      <ProseSection title="Your files">
        <p>
          When you open a PDF in any tool, it is read into your browser tab&rsquo;s memory. Merging,
          splitting, compressing, rotating, extracting, watermarking and OCR all run on your device.
          The file is <strong>not transmitted</strong> to our servers, and we have no ability to see,
          store or recover it. Closing the tab discards it.
        </p>
      </ProseSection>

      <ProseSection title="What is stored on your device">
        <ul>
          <li><strong>Theme preference</strong> — light or dark, kept in your browser&rsquo;s local storage.</li>
          <li><strong>Cached app files</strong> — so the tools can load quickly and work offline.</li>
          <li><strong>OCR language data</strong> — downloaded once on first use of OCR and cached by your browser.</li>
        </ul>
        <p>You can clear all of this at any time from your browser&rsquo;s site-data settings.</p>
      </ProseSection>

      <ProseSection title="Network requests">
        <p>
          Loading the site fetches the application code, fonts and — for OCR — language data. These
          requests, like any web request, reveal your IP address to the hosting provider. None of
          them contain your documents.
        </p>
      </ProseSection>

      <ProseSection title="Accounts and tracking">
        <p>
          There are no accounts, and the tools do not require you to identify yourself in any way.
        </p>
      </ProseSection>

      <ProseSection title="Verify this">
        <p>
          The steps for checking these claims yourself are in the{' '}
          <Link href="/docs">documentation</Link>.
        </p>
      </ProseSection>
    </ProsePage>
  )
}
