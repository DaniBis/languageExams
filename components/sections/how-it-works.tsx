"use client"

import { CalendarDays, NotepadText, MonitorCheck, Rocket } from 'lucide-react'
import { useLanguage, type Locale } from '@/contexts/language-context'

const howCopy: Record<Locale, {
  heading: string
  description: string
  steps: { step: string; title: string; description: string; icon: typeof CalendarDays; accent: string }[]
}> = {
  en: {
    heading: 'How Lessons Feel',
    description: 'A simple, cozy path from your first hello to confident exam success.',
    steps: [
      {
        step: '1',
        title: 'Book a Free Consultation',
        description: 'Schedule a relaxed 15-minute chat to explore your goals and English level.',
        icon: CalendarDays,
        accent: 'from-[#ffe9d2] to-[#ffd3f1]',
      },
      {
        step: '2',
        title: 'Choose Your Package',
        description: 'Pick a colorful, structured lesson plan that fits your timeline and budget.',
        icon: NotepadText,
        accent: 'from-[#e1f4ff] to-[#dcd4ff]',
      },
      {
        step: '3',
        title: 'Start Learning',
        description: 'Get lesson boards, pronunciation tracks, and guided practice with live feedback.',
        icon: MonitorCheck,
        accent: 'from-[#dfffe4] to-[#ffefcf]',
      },
      {
        step: '4',
        title: 'Achieve Your Goals',
        description: 'Walk into your exam confident, organised, and supported every step of the way.',
        icon: Rocket,
        accent: 'from-[#ffe0e0] to-[#dff2ff]',
      },
    ],
  },
  ro: {
    heading: 'Cum decurge o sedinta',
    description: 'Un traseu simplu si cald de la primul salut pana la examenul sustinut cu incredere.',
    steps: [
      {
        step: '1',
        title: 'Programeaza consultatia gratuita',
        description: 'Stabileste o discutie relaxata de 15 minute ca sa-ti aflam obiectivele si nivelul.',
        icon: CalendarDays,
        accent: 'from-[#ffe9d2] to-[#ffd3f1]',
      },
      {
        step: '2',
        title: 'Alege pachetul potrivit',
        description: 'Selecteaza un plan colorat si structurat care se potriveste cu bugetul si ritmul tau.',
        icon: NotepadText,
        accent: 'from-[#e1f4ff] to-[#dcd4ff]',
      },
      {
        step: '3',
        title: 'Incepi lectiile',
        description: 'Primesti boarduri interactive, inregistrari de pronuntie si practica ghidata cu feedback live.',
        icon: MonitorCheck,
        accent: 'from-[#dfffe4] to-[#ffefcf]',
      },
      {
        step: '4',
        title: 'Atinci obiectivele',
        description: 'Intri la examen organizat, calm si sustinut la fiecare pas.',
        icon: Rocket,
        accent: 'from-[#ffe0e0] to-[#dff2ff]',
      },
    ],
  },
}

export function HowItWorks() {
  const { locale } = useLanguage()
  const copy = howCopy[locale]

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            {copy.heading}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {copy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {copy.steps.map((step, index) => (
            <div key={index} className="relative rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_20px_50px_rgba(66,90,139,0.1)]">
              <div className={`absolute inset-0 rounded-3xl opacity-80 bg-gradient-to-br ${step.accent}`} />
              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-3 bg-white/70 rounded-full px-4 py-2 text-sm font-semibold text-gray-600">
                  <span className="text-soft-blue">Step {step.step}</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center shadow-inner">
                  <step.icon className="w-6 h-6 text-soft-blue" />
                </div>
                <h3 className="text-lg font-poppins font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}