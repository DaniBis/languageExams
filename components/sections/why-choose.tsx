"use client"

import { Lightbulb, PenTool, Globe2 } from 'lucide-react'
import { useLanguage, type Locale } from '@/contexts/language-context'

const whyCopy: Record<Locale, {
  heading: string
  reasons: { title: string; description: string; icon: typeof Lightbulb; accent: string }[]
}> = {
  en: {
    heading: 'Why Students Choose English with Daniel',
    reasons: [
      {
        title: 'Easy Explanations',
        description:
          'Complex grammar made simple with step-by-step visuals and color-coded notes. No confusing rules or difficult terminology.',
        icon: Lightbulb,
        accent: 'from-[#fff0d3] to-[#ffd5e8]',
      },
      {
        title: 'Personalized Feedback',
        description:
          'Individual attention on your specific goals, mistakes, and learning style. Every lesson is designed just for you.',
        icon: PenTool,
        accent: 'from-[#d9f2ff] to-[#d7d1ff]',
      },
      {
        title: 'International Experience',
        description:
          'Success teaching Romanian and Chinese students, understanding cultural learning styles and exam expectations.',
        icon: Globe2,
        accent: 'from-[#dfffe7] to-[#fff4d0]',
      },
    ],
  },
  ro: {
    heading: 'De ce aleg studentii English with Daniel',
    reasons: [
      {
        title: 'Explicatii lejere',
        description:
          'Gramatica dificila devine simpla cu vizualuri pas cu pas si notite colorate. Fara termeni complicati sau reguli incalcite.',
        icon: Lightbulb,
        accent: 'from-[#fff0d3] to-[#ffd5e8]',
      },
      {
        title: 'Feedback personalizat',
        description:
          'Atentie individuala pentru obiectivele si greselile tale. Fiecare lectie este gandita exact pentru ritmul tau.',
        icon: PenTool,
        accent: 'from-[#d9f2ff] to-[#d7d1ff]',
      },
      {
        title: 'Experienta internationala',
        description:
          'Rezultate reale cu elevi din Romania si China, cu intelegerea stilurilor culturale de invatare si a cerintelor de examen.',
        icon: Globe2,
        accent: 'from-[#dfffe7] to-[#fff4d0]',
      },
    ],
  },
}

export function WhyChoose() {
  const { locale } = useLanguage()
  const copy = whyCopy[locale]

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            {copy.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {copy.reasons.map((reason, index) => (
            <div key={index} className="relative overflow-hidden rounded-3xl bg-white/90 border border-white/70 shadow-[0_25px_70px_rgba(68,95,166,0.08)] p-6 text-left">
              <div className={`absolute inset-0 opacity-70 bg-gradient-to-br ${reason.accent}`} />
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/70 flex items-center justify-center shadow-inner">
                  <reason.icon className="w-6 h-6 text-soft-blue" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900">
                  {reason.title}
                </h3>
                <p className="text-gray-700 font-inter leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}