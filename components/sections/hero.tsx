"use client"

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, ShieldCheck, Globe, Star } from 'lucide-react'
import { useLanguage, type Locale } from '@/contexts/language-context'

interface UpcomingLesson {
  start: string
  end: string
  bookingType?: string | null
  studentName?: string | null
}

const DISPLAY_TIMEZONE = 'Europe/Bucharest'

const heroCopy: Record<Locale, {
  badge: string
  heading: { line1: string; highlight: string }
  paragraph: string
  primaryCta: string
  secondaryCta: string
  lessonsStat: string
  lessonsLabel: string
  experienceStat: string
  experienceLabel: string
  nextLesson: string
  lessonTitle: string
  lessonSubtitle: string
  lessonLoading: string
  lessonNoneTitle: string
  lessonNoneSubtitle: string
  lessonWithPrefix: string
  cardDescription: string
  globeText: string
  successStat: string
  successLabel: string
}> = {
  en: {
    badge: 'Trusted by Cambridge & IELTS students worldwide',
    heading: { line1: 'Clear English.', highlight: 'Confident Communication.' },
    paragraph:
      'Friendly online lessons with modern resources, colorful visuals, and structured feedback that make Cambridge & IELTS preparation feel motivating.',
    primaryCta: 'Book Your Free Consultation',
    secondaryCta: 'View Packages',
    lessonsStat: '700+',
    lessonsLabel: 'Lessons delivered in the past year',
    experienceStat: '10+',
    experienceLabel: 'Years of teaching experience',
    nextLesson: 'Next Lesson',
    lessonTitle: 'Cambridge Speaking Mock • 18:30',
    lessonSubtitle: 'IELTS Writing focus',
    lessonLoading: 'Checking the calendar…',
    lessonNoneTitle: 'No lessons scheduled',
    lessonNoneSubtitle: 'New bookings will appear here automatically.',
    lessonWithPrefix: 'with',
    cardDescription:
      'Feedback snapshots, vocabulary banks, and smart homework reminders help you progress with color-coded clarity.',
    globeText: 'Students from China, Taiwan, Romania, Thailand & Vietnam',
    successStat: '98%',
    successLabel: 'Exam success rate',
  },
  ro: {
    badge: 'De incredere pentru elevii Cambridge si IELTS din toata lumea',
    heading: { line1: 'Engleza clara.', highlight: 'Comunicare cu incredere.' },
    paragraph:
      'Lectii online prietenoase, cu resurse moderne, vizualuri colorate si feedback structurat, pentru ca pregatirea Cambridge si IELTS sa fie motivanta.',
    primaryCta: 'Programeaza o consultatie gratuita',
    secondaryCta: 'Vezi pachetele',
    lessonsStat: '700+',
    lessonsLabel: 'Lectii predate in ultimul an',
    experienceStat: '10+',
    experienceLabel: 'Ani de experienta la catedra',
    nextLesson: 'Urmatoarea lectie',
    lessonTitle: 'Simulare Cambridge Speaking • 18:30',
    lessonSubtitle: 'Sesiune IELTS Writing',
    lessonLoading: 'Verific calendarul…',
    lessonNoneTitle: 'Nicio lectie programata',
    lessonNoneSubtitle: 'Rezervarile noi vor aparea automat aici.',
    lessonWithPrefix: 'cu',
    cardDescription:
      'Jurnale de feedback, banci de vocabular si teme inteligente te ajuta sa progresezi cu claritate colorata.',
    globeText: 'Studenti din China, Taiwan, Romania, Thailanda si Vietnam',
    successStat: '98%',
    successLabel: 'Rata de succes la examene',
  },
}

export function Hero() {
  const { locale } = useLanguage()
  const copy = heroCopy[locale]
  const [lessonState, setLessonState] = useState<{ data: UpcomingLesson | null; loaded: boolean }>({
    data: null,
    loaded: false,
  })

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    fetch('/api/next-lesson', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((payload: { nextLesson: UpcomingLesson | null }) => {
        if (!active) return
        setLessonState({ data: payload.nextLesson, loaded: true })
      })
      .catch((error: unknown) => {
        if (!active || (error as { name?: string })?.name === 'AbortError') return
        setLessonState((prev) => ({ ...prev, loaded: true }))
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [])

  const localeTag = locale === 'ro' ? 'ro-RO' : 'en-GB'

  const lessonTitle = useMemo(() => {
    if (lessonState.data) {
      const start = new Date(lessonState.data.start)
      const end = new Date(lessonState.data.end)
      const dateFormatter = new Intl.DateTimeFormat(localeTag, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: DISPLAY_TIMEZONE,
      })
      const timeFormatter = new Intl.DateTimeFormat(localeTag, {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: DISPLAY_TIMEZONE,
      })
      return `${dateFormatter.format(start)} • ${timeFormatter.format(start)} - ${timeFormatter.format(end)}`
    }

    if (lessonState.loaded) {
      return copy.lessonNoneTitle
    }

    return copy.lessonTitle
  }, [copy.lessonNoneTitle, copy.lessonTitle, lessonState.data, lessonState.loaded, localeTag])

  const lessonSubtitle = useMemo(() => {
    if (lessonState.data) {
      const parts: string[] = []
      if (lessonState.data.bookingType) {
        parts.push(lessonState.data.bookingType)
      }
      if (lessonState.data.studentName) {
        parts.push(`${copy.lessonWithPrefix} ${lessonState.data.studentName}`)
      }
      return parts.length ? parts.join(' • ') : copy.lessonSubtitle
    }

    if (lessonState.loaded) {
      return copy.lessonNoneSubtitle
    }

    return copy.lessonLoading
  }, [copy.lessonLoading, copy.lessonNoneSubtitle, copy.lessonSubtitle, copy.lessonWithPrefix, lessonState.data, lessonState.loaded])
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -right-32 w-[420px] h-[420px] bg-soft-blue/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-16 -left-10 w-[360px] h-[360px] bg-pastel-yellow/60 blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-pastel-yellow-light/60 to-soft-blue-light/60" />
      </div>

      <div className="relative container max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-white/70 rounded-full px-4 py-2 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-soft-blue" />
              <span className="text-sm font-medium text-gray-700">{copy.badge}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.6rem] leading-tight font-poppins font-bold text-gray-900 mb-5">
              {copy.heading.line1}
              <span className="text-soft-blue"> {copy.heading.highlight}</span>
            </h1>
            <p className="text-lg md:text-xl font-inter text-gray-700 leading-relaxed mb-8">
              {copy.paragraph}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/book">
                <Button className="px-8 py-3 bg-gradient-to-r from-soft-blue to-[#7d8dff] hover:opacity-90 text-white font-poppins font-medium text-base rounded-xl shadow-lg shadow-soft-blue/30">
                  {copy.primaryCta}
                </Button>
              </Link>
              <Link href="/prices">
                <Button variant="outline" className="px-8 py-3 border-2 border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white font-poppins font-medium text-base rounded-xl">
                  {copy.secondaryCta}
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="bg-white/85 border border-white/70 rounded-2xl p-4 shadow-sm">
                  <p className="text-3xl font-poppins font-semibold text-gray-900">{copy.lessonsStat}</p>
                  <p className="text-sm font-inter text-gray-500">{copy.lessonsLabel}</p>
              </div>
              <div className="bg-white/85 border border-white/70 rounded-2xl p-4 shadow-sm">
                  <p className="text-3xl font-poppins font-semibold text-gray-900">{copy.experienceStat}</p>
                  <p className="text-sm font-inter text-gray-500">{copy.experienceLabel}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-white/90 border border-white/70 rounded-[32px] p-6 shadow-2xl">
              <div className="space-y-6">
                <div className="bg-soft-blue-light/60 rounded-2xl p-4 flex items-center gap-4">
                  <ShieldCheck className="w-10 h-10 text-soft-blue" />
                  <div>
                    <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold">{copy.nextLesson}</p>
                    <p className="text-lg font-poppins text-gray-900">{lessonTitle}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{lessonSubtitle}</p>
                      <p className="text-xl font-poppins text-gray-900">Band 7.0 Plan</p>
                    </div>
                    <Star className="w-6 h-6 text-pastel-yellow-dark" />
                  </div>
                  <p className="text-gray-600 text-sm">
                    {copy.cardDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-gradient-to-br from-soft-blue to-[#5a7fff] text-white p-4">
                    <p className="text-3xl font-poppins font-semibold">{copy.successStat}</p>
                    <p className="text-sm opacity-90">{copy.successLabel}</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-pastel-yellow to-[#ffcdd7] p-4 text-gray-900">
                    <Globe className="w-6 h-6 mb-2 text-gray-700" />
                    <p className="text-sm font-medium">{copy.globeText}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block absolute -bottom-10 -left-10 w-32 h-32 rounded-3xl bg-white/60 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}