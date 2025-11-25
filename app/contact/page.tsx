"use client"

import { PageHeader } from '@/components/page-header'
import { ContactForm } from '@/components/sections/contact-form'
import { useLanguage, type Locale } from '@/contexts/language-context'

const contactCopy: Record<Locale, {
  header: { title: string; subtitle: string }
  heading: string
  intro: string
  email: string
  whatsapp: string
}> = {
  en: {
    header: {
      title: 'Contact Me',
      subtitle: 'Get in touch for your English learning journey',
    },
    heading: "Let's Connect",
    intro: "Ready to start your English learning journey? I'm here to help you achieve your goals.",
    email: 'Email',
    whatsapp: 'WhatsApp',
  },
  ro: {
    header: {
      title: 'Contacteaza-ma',
      subtitle: 'Scrie-mi pentru orice intrebare despre sedinte',
    },
    heading: 'Hai sa vorbim',
    intro: 'Vrei sa incepi lectiile de engleza? Sunt aici sa te ghidez catre obiectivul tau.',
    email: 'Email',
    whatsapp: 'WhatsApp',
  },
}

export default function ContactPage() {
  const { locale } = useLanguage()
  const copy = contactCopy[locale]

  return (
    <>
      <PageHeader title={copy.header.title} subtitle={copy.header.subtitle} />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6">{copy.heading}</h2>
              <p className="text-lg font-inter text-gray-600 mb-6">{copy.intro}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-poppins font-semibold text-gray-900 mb-2">{copy.email}</h3>
                  <p className="text-gray-600">bisceanudaniel@gmail.com</p>
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-gray-900 mb-2">{copy.whatsapp}</h3>
                  <p className="text-gray-600">+66 828 612 701</p>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}