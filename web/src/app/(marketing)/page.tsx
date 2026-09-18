import { Hero } from '@/components/landing/hero'
import { Tools } from '@/components/landing/tools'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Privacy } from '@/components/landing/privacy'
import { FAQ } from '@/components/landing/faq'
import { CTA } from '@/components/landing/cta'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Tools />
      <Features />
      <HowItWorks />
      <Privacy />
      <FAQ />
      <CTA />
    </>
  )
}
