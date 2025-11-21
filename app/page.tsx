import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
import { WhyChoose } from '@/components/sections/why-choose'
import { Testimonials } from '@/components/sections/testimonials'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChoose />
      <Testimonials />
      <HowItWorks />

      {/* Final CTA */}
      <section className="bg-soft-blue py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">
            Ready to Improve Your English?
          </h2>
          <p className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join students from Romania, China, and around the world who have achieved their English goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button className="px-8 py-3 bg-white text-soft-blue hover:bg-gray-100 font-poppins font-medium text-base rounded-lg">
                Book Your Free Consultation
              </Button>
            </Link>
            <Link href="/prices">
              <Button variant="outline" className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-soft-blue font-poppins font-medium text-base rounded-lg">
                View Prices & Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}