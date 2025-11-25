"use client"

import { Card } from '@/components/ui/card'
import { GraduationCap, Target, MessageCircle, Megaphone } from 'lucide-react'
import { useLanguage, type Locale } from '@/contexts/language-context'

const servicesCopy: Record<Locale, {
  heading: string
  description: string
  items: { title: string; description: string; icon: typeof GraduationCap; accent: string }[]
}> = {
  en: {
    heading: 'English Lessons Tailored to Your Goals',
    description:
      "Whether you're preparing for Cambridge exams, aiming for your target IELTS score, or improving your everyday English, I'm here to help you succeed with clear explanations and personalized support.",
    items: [
      {
        title: 'Cambridge B1/B2/C1 Preparation',
        description:
          "Pass your Cambridge B1 Preliminary, B2 First, or C1 Advanced exam with confidence. I'll guide you through every part of the test with clear strategies, practice materials, and personalized feedback on your progress.",
        icon: GraduationCap,
        accent: 'from-[#b6d6ff] to-soft-blue',
      },
      {
        title: 'IELTS Preparation',
        description:
          "Achieve your target IELTS band score for university, immigration, or career opportunities. We'll focus on exam strategies, improve your writing and speaking, and practice with real IELTS test formats.",
        icon: Target,
        accent: 'from-[#ffd6a5] to-[#f8a4d8]',
      },
      {
        title: 'General English',
        description:
          "Improve your everyday English for work, travel, or personal growth. We'll focus on the skills you need: clear grammar explanations, confident speaking, and practical vocabulary you can use right away.",
        icon: MessageCircle,
        accent: 'from-[#c5f1c5] to-[#7dd3fc]',
      },
      {
        title: 'Pronunciation Training',
        description:
          "Speak English clearly and confidently with focused pronunciation practice. We'll work on difficult sounds, natural intonation, and fluent speech patterns. Available with all courses.",
        icon: Megaphone,
        accent: 'from-[#ffe1f0] to-[#c4b5fd]',
      },
    ],
  },
  ro: {
    heading: 'Lectii de engleza adaptate obiectivelor tale',
    description:
      'Indiferent daca te pregatesti pentru examenele Cambridge, tintesti un scor IELTS sau vrei sa vorbesti mai sigur in viata de zi cu zi, sunt aici sa te ajut cu explicatii clare si sprijin personalizat.',
    items: [
      {
        title: 'Pregatire Cambridge B1/B2/C1',
        description:
          'Promoveaza examenele Cambridge cu incredere. Parcurgem fiecare proba cu strategii clare, materiale de exercitiu si feedback personalizat pe parcurs.',
        icon: GraduationCap,
        accent: 'from-[#b6d6ff] to-soft-blue',
      },
      {
        title: 'Pregatire IELTS',
        description:
          'Obtine scorul IELTS necesar pentru facultate, cariera sau emigrare. Lucram la strategii, scriere, vorbire si simulari pe formatul real al testului.',
        icon: Target,
        accent: 'from-[#ffd6a5] to-[#f8a4d8]',
      },
      {
        title: 'Engleza generala',
        description:
          'Imbunatateste-ti engleza pentru job, calatorii sau dezvoltare personala. Explic gramaticile pe scurt, exersam vorbirea si vocabularul aplicat imediat.',
        icon: MessageCircle,
        accent: 'from-[#c5f1c5] to-[#7dd3fc]',
      },
      {
        title: 'Pronuntie si fluenta',
        description:
          'Vorbeste clar si natural cu sesiuni dedicate de pronuntie. Corectam sunetele dificile, intonatia si ritmul vorbirii. Inclus in toate cursurile.',
        icon: Megaphone,
        accent: 'from-[#ffe1f0] to-[#c4b5fd]',
      },
    ],
  },
}

export function Services() {
  const { locale } = useLanguage()
  const copy = servicesCopy[locale]

  return (
    <section className="py-16 md:py-20">
      <div className="container max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            {copy.heading}
          </h2>
          <p className="text-lg font-inter text-gray-600 max-w-3xl mx-auto">
            {copy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {copy.items.map((service, index) => (
            <Card key={index} className="group relative overflow-hidden p-6 rounded-3xl border border-white/70 bg-white/85 shadow-[0_20px_60px_rgba(89,129,255,0.08)]">
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${service.accent}`} />
              <div className="relative flex flex-col gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-gray-100 flex items-center justify-center shadow-inner">
                  <service.icon className="w-7 h-7 text-soft-blue" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900">
                {service.title}
              </h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}