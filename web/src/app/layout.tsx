import type { Metadata } from 'next'
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'
import { themeInitScript } from '@/lib/theme-script'
import './globals.css'
import { PageLoaderProvider } from "@/components/providers/page-loader-provider";

const display = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-display-var',
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
})

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans-var',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-var',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'privacy/pdf — Your PDFs never leave your device',
    template: '%s · privacy/pdf',
  },
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
      <body>
        <PageLoaderProvider>{children}</PageLoaderProvider>
      </body>
    </html>
  )
}
