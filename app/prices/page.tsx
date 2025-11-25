"use client"

import { PageHeader } from '@/components/page-header'
import { PricingCards } from '@/components/sections/pricing-cards'
import { useLanguage, type Locale } from '@/contexts/language-context'

const pricesCopy: Record<Locale, {
  header: { title: string; subtitle: string }
  intro: string
  includedHeading: string
  included: string[][]
  footnote: string
  cta: { heading: string; body: string; primary: string; secondary: string }
}> = {
  en: {
    header: {
      title: 'Prices & Packages',
      subtitle: 'Flexible Options to Fit Your Needs and Budget',
    },
    intro: 'Choose the package that works best for you. All lessons include personalized feedback and materials.',
    includedHeading: "What's Included in All Packages",
    included: [
      [
        'Personalized lesson plans tailored to your goals',
        'All learning materials and resources',
        'Detailed feedback and corrections',
        'Homework assignments (optional)',
      ],
      [
        'Flexible scheduling to fit your life',
        'Online lessons via VooV or Skype',
        'Progress tracking',
      ],
    ],
    footnote: 'No hidden costs. Everything you need is included.',
    cta: {
      heading: 'Ready to Get Started?',
      body: 'Choose your package and start improving your English today.',
      primary: 'Book Your Package Now',
      secondary: 'Questions? Contact Me',
    },
  },
  ro: {
    header: {
      title: 'Preturi si pachete',
      subtitle: 'Optiuni flexibile care se potrivesc bugetului tau',
    },
    intro: 'Alege pachetul care ti se potriveste. Toate sedintele includ feedback personalizat si materiale.',
    includedHeading: 'Ce primesti in fiecare pachet',
    included: [
      [
        'Planuri de lectie adaptate obiectivelor tale',
        'Toate materialele si resursele necesare',
        'Feedback detaliat si corecturi',
        'Teme optionale pentru consolidare',
      ],
      [
        'Program flexibil in functie de timp',
        'Lectii online pe VooV sau Skype',
        'Monitorizare constanta a progresului',
      ],
    ],
    footnote: 'Fara costuri ascunse. Tot ce ai nevoie este inclus.',
    cta: {
      heading: 'Pregatit sa incepi?',
      body: 'Alege pachetul si porneste spre urmatorul tau nivel de engleza.',
      primary: 'Rezerva-ti pachetul acum',
      secondary: 'Ai intrebari? Scrie-mi',
    },
  },
}

export default function PricesPage() {
  const { locale } = useLanguage()
  const copy = pricesCopy[locale]

  return (
    <>
      <PageHeader title={copy.header.title} subtitle={copy.header.subtitle} />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg font-inter text-gray-600">{copy.intro}</p>
          </div>

          <PricingCards />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-6 text-center">{copy.includedHeading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {copy.included.map((column, colIndex) => (
                <ul key={colIndex} className="space-y-3">
                  {column.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-soft-blue mr-3">✓</span>
                      <span className="text-gray-600 font-inter">{item}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <p className="text-center text-gray-600 font-inter mt-8">{copy.footnote}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20 text-center">
          <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">{copy.cta.heading}</h2>
          <p className="text-lg font-inter text-gray-600 mb-8 max-w-2xl mx-auto">
            {copy.cta.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="px-8 py-3 bg-soft-blue hover:bg-soft-blue-dark text-white font-poppins font-medium text-base rounded-lg inline-block">
              {copy.cta.primary}
            </a>
            <a href="/contact" className="px-8 py-3 border-2 border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white font-poppins font-medium text-base rounded-lg inline-block">
              {copy.cta.secondary}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}