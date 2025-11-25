"use client"

import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScheduleSection } from '@/components/sections/schedule'
import { PackageSelector } from '@/components/sections/package-selector'
import { Calendar, Clock, MessageCircle, CheckCircle } from 'lucide-react'
import { useLanguage, type Locale } from '@/contexts/language-context'

const bookCopy: Record<Locale, {
  header: { title: string; subtitle: string }
  intro: string[]
  cards: {
    title: string
    icon: 'calendar' | 'clock'
    description: string
    bullets: string[]
    button: { label: string; variant?: 'outline' }
  }[]
  guide: { heading: string; steps: { title: string; body: string }[] }
  contact: { prompt: string; cta: string }
}> = {
  en: {
    header: {
      title: 'Book a Lesson',
      subtitle: 'Schedule your English tutoring session',
    },
    intro: [
      'Ready to improve your English? Book your free consultation or first lesson.',
      "We'll discuss your goals and create a personalized learning plan.",
    ],
    cards: [
      {
        title: 'Free Consultation (30 minutes)',
        icon: 'calendar',
        description: "Let's discuss your English goals, current level, and how I can help you.",
        bullets: [
          'Assess your current English level',
          'Discuss your learning goals',
          'Create a personalized plan',
          'Answer your questions',
        ],
        button: { label: 'Book Free Consultation' },
      },
      {
        title: 'Regular Lessons',
        icon: 'clock',
        description: 'Book your first paid lesson or continue with regular sessions.',
        bullets: [
          '60-minute focused lessons',
          'Flexible scheduling',
          'Online via VooV or Skype',
          'Materials and homework included',
        ],
        button: { label: 'Book Regular Lesson', variant: 'outline' },
      },
    ],
    guide: {
      heading: 'How to Book Your Lesson',
      steps: [
        { title: 'Choose Your Time', body: 'Select a convenient time from available slots' },
        { title: 'Confirm Details', body: 'Provide your contact information and lesson type' },
        { title: 'Get Meeting Link', body: 'Receive confirmation and meeting link via email' },
      ],
    },
    contact: {
      prompt: 'Prefer to discuss first? Contact me directly.',
      cta: 'Contact Me',
    },
  },
  ro: {
    header: {
      title: 'Rezerva o sedinta',
      subtitle: 'Programeaza-ti lectia de engleza',
    },
    intro: [
      'Pregatit sa duci engleza la nivelul urmator? Rezerva consultatia gratuita sau prima lectie.',
      'Discutam obiectivele tale si construim un plan personalizat.',
    ],
    cards: [
      {
        title: 'Consultatie gratuita (30 min)',
        icon: 'calendar',
        description: 'Vorbim despre scopurile tale, nivelul actual si cum te pot ajuta.',
        bullets: [
          'Evaluam nivelul actual de engleza',
          'Stabilim obiective clare',
          'Conturam un plan adaptat tie',
          'Raspund la orice intrebare',
        ],
        button: { label: 'Rezerva consultatia gratuita' },
      },
      {
        title: 'Lectii regulate',
        icon: 'clock',
        description: 'Rezerva prima lectie platita sau continua sedintele curente.',
        bullets: [
          'Sesiuni concentrate de 60 de minute',
          'Program flexibil',
          'Online pe VooV sau Skype',
          'Materiale si teme incluse',
        ],
        button: { label: 'Rezerva o lectie', variant: 'outline' },
      },
    ],
    guide: {
      heading: 'Cum iti rezervi lectia',
      steps: [
        { title: 'Alege intervalul', body: 'Selecteaza un interval liber din calendar' },
        { title: 'Confirma detaliile', body: 'Completezi datele de contact si tipul lectiei' },
        { title: 'Primesti link-ul', body: 'Confirmarea si link-ul ajung pe email' },
      ],
    },
    contact: {
      prompt: 'Vrei sa povestim inainte? Scrie-mi direct.',
      cta: 'Contacteaza-ma',
    },
  },
}

interface BookPageProps {
  searchParams?: {
    package?: string
  }
}

export default function BookPage({ searchParams }: BookPageProps) {
  const { locale } = useLanguage()
  const copy = bookCopy[locale]

  return (
    <>
      <PageHeader title={copy.header.title} subtitle={copy.header.subtitle} />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              {copy.intro.map((paragraph, index) => (
                <p key={paragraph} className={`text-lg font-inter text-gray-600 ${index === 0 ? 'mb-4' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {copy.cards.map((card) => (
                <Card key={card.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      {card.icon === 'calendar' ? (
                        <Calendar className="w-6 h-6 mr-2 text-soft-blue" />
                      ) : (
                        <Clock className="w-6 h-6 mr-2 text-soft-blue" />
                      )}
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 font-inter mb-4">{card.description}</p>
                    <ul className="text-gray-600 font-inter space-y-2 mb-6">
                      {card.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      variant={card.button.variant}
                      className={`w-full ${card.button.variant ? 'border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white' : 'bg-soft-blue hover:bg-soft-blue-dark'}`}
                    >
                      <a href="/book#schedule">{card.button.label}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-soft-blue-light p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-poppins font-bold text-gray-900 mb-4 text-center">
                {copy.guide.heading}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {copy.guide.steps.map((step, index) => (
                  <div key={step.title} className="text-center">
                    <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <h4 className="font-poppins font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600 font-inter text-sm">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg font-inter text-gray-600 mb-6">{copy.contact.prompt}</p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-poppins font-medium text-base rounded-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {copy.contact.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-soft-blue-light/40">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-5xl mx-auto">
            <PackageSelector initialPackageId={searchParams?.package} />
          </div>
        </div>
      </section>

      <ScheduleSection />
    </>
  )
}