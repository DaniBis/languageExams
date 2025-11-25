"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Quote } from 'lucide-react'
import { useLanguage, type Locale } from '@/contexts/language-context'

const testimonialCopy: Record<Locale, {
  heading: string
  description: string
  cta: string
  testimonials: { quote: string; author: string; exam: string }[]
}> = {
  en: {
    heading: 'Students Feel Supported',
    description: 'Colorful lesson boards, visual planners, and calm guidance help students stay motivated and confident.',
    cta: 'Read More Reviews',
    testimonials: [
      {
        quote:
          '"Daniel helped me pass my Cambridge B2 exam with a great score. His explanations are so clear and he\'s always patient and encouraging!"',
        author: 'Ana, Romania',
        exam: 'Cambridge B2 First',
      },
      {
        quote:
          '"I improved my IELTS speaking from 5.5 to 7.0 in just three months. Daniel understood exactly what I needed to work on."',
        author: 'Wei, China',
        exam: 'IELTS Academic',
      },
      {
        quote:
          '"Finally, grammar makes sense! Daniel explains everything in a simple way and I feel confident speaking English now."',
        author: 'Maria, Romania',
        exam: 'General English',
      },
    ],
  },
  ro: {
    heading: 'Studentii se simt sustinuti',
    description:
      'Boardurile colorate, planurile vizuale si ghidarea calma ii ajuta pe elevi sa ramana motivati si increzatori.',
    cta: 'Citeste mai multe recenzii',
    testimonials: [
      {
        quote:
          '"Daniel m-a ajutat sa iau Cambridge B2 cu un scor foarte bun. Explicatiile sunt clare si are multa rabdare!"',
        author: 'Ana, Romania',
        exam: 'Cambridge B2 First',
      },
      {
        quote:
          '"Mi-am imbunatatit speaking-ul la IELTS de la 5.5 la 7.0 in doar trei luni. Daniel a stiut exact ce trebuie sa lucrez."',
        author: 'Wei, China',
        exam: 'IELTS Academic',
      },
      {
        quote:
          '"In sfarsit, gramatica are sens! Daniel explica simplu si acum vorbesc engleza cu mai multa incredere."',
        author: 'Maria, Romania',
        exam: 'General English',
      },
    ],
  },
}

export function Testimonials() {
  const { locale } = useLanguage()
  const copy = testimonialCopy[locale]

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-soft-blue-light via-white to-pastel-yellow-light" />
      <div className="relative container max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            {copy.heading}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            {copy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {copy.testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-3xl bg-white/90 border border-white/60 p-6 shadow-[0_20px_50px_rgba(92,121,255,0.15)]">
              <Quote className="w-8 h-8 text-soft-blue mb-4" />
              <blockquote className="text-gray-700 font-inter italic mb-4">
                {testimonial.quote}
              </blockquote>
              <cite className="text-gray-900 font-poppins font-semibold">
                {testimonial.author}
              </cite>
              <p className="text-sm text-gray-500">{testimonial.exam}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/reviews">
            <Button className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 rounded-xl">
              {copy.cta}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}