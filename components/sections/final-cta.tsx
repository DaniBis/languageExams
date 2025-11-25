"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage, type Locale } from '@/contexts/language-context'

const ctaCopy: Record<Locale, {
  eyebrow: string
  heading: string
  description: string
  primary: string
  secondary: string
}> = {
  en: {
    eyebrow: 'Next step',
    heading: 'Ready to feel confident in every part of your exam?',
    description: 'Let’s build a colorful study plan, practice with calm guidance, and celebrate your results together.',
    primary: 'Book Your Free Consultation',
    secondary: 'View Prices & Packages',
  },
  ro: {
    eyebrow: 'Pasul urmator',
    heading: 'Gata sa intri la examen cu incredere?',
    description: 'Construim un plan colorat, exersam cu calm si sarbatorim rezultatele impreuna.',
    primary: 'Programeaza consultatia gratuita',
    secondary: 'Vezi preturile si pachetele',
  },
}

export function FinalCta() {
  const { locale } = useLanguage()
  const copy = ctaCopy[locale]

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-soft-blue via-[#7ea7ff] to-[#ffb0d7]" />
      <div className="relative container max-w-6xl mx-auto px-6 md:px-20 text-center text-white">
        <div className="bg-white/10 border border-white/40 rounded-[32px] px-6 sm:px-10 py-12 shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
          <p className="uppercase tracking-[0.3em] text-sm font-semibold mb-4 text-white/80">{copy.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
            {copy.heading}
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {copy.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button className="px-8 py-3 bg-white text-soft-blue hover:bg-gray-100 font-poppins font-medium text-base rounded-xl">
                {copy.primary}
              </Button>
            </Link>
            <Link href="/prices">
              <Button variant="outline" className="px-8 py-3 border-2 border-white bg-transparent text-white hover:bg-white hover:text-soft-blue font-poppins font-medium text-base rounded-xl">
                {copy.secondary}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
