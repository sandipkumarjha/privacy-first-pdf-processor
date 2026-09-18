import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'

/** Shell for every public page: landing, docs and the legal pages. */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
