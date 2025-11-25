import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
import { WhyChoose } from '@/components/sections/why-choose'
import { ScheduleSection } from '@/components/sections/schedule'
import { Testimonials } from '@/components/sections/testimonials'
import { HowItWorks } from '@/components/sections/how-it-works'
import { FinalCta } from '@/components/sections/final-cta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChoose />
      <ScheduleSection />
      <Testimonials />
      <HowItWorks />
      <FinalCta />
    </>
  )
}