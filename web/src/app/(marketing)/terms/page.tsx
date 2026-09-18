import type { Metadata } from 'next'
import Link from 'next/link'

import { ProsePage, ProseSection } from '@/components/landing/prose-page'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that apply when you use privacy/pdf.',
}

export default function TermsPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Terms of Service"
      lead="Plain terms for a tool that runs on your own device."
    >
      <ProseSection title="Using the tools">
        <p>
          You may use privacy/pdf to process documents you have the right to process. Because all
          work happens in your browser, you are responsible for the files you open and the results
          you save.
        </p>
      </ProseSection>

      <ProseSection title="Your content">
        <p>
          Your documents stay yours. We never receive them, so we claim no rights over them and
          cannot access, restore or share them. See the{' '}
          <Link href="/privacy-policy">privacy policy</Link> for detail.
        </p>
      </ProseSection>

      <ProseSection title="No warranty">
        <p>
          The tools are provided as they are. PDF is a complicated format and unusual files may not
          process correctly — <strong>keep a copy of your original</strong> before overwriting
          anything important.
        </p>
      </ProseSection>

      <ProseSection title="Changes">
        <p>
          These terms may be updated as the product changes. Continued use after an update means
          you accept the revised terms.
        </p>
      </ProseSection>
    </ProsePage>
  )
}
