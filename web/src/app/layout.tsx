import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { themeInitScript } from '@/lib/theme-script'
import './globals.css'

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '700'],
  display: 'swap',
})

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'privacy/pdf — Your PDFs never leave your device',
  description:
    'Merge, split, compress, and edit PDFs entirely inside your browser. No upload, no cloud processing, nothing to breach.',
  metadataBase: new URL('https://privacy-pdf.app'),
  openGraph: {
    title: 'privacy/pdf — Your PDFs never leave your device',
    description:
      'A PDF processor that runs entirely on your machine. Nothing is ever uploaded.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
