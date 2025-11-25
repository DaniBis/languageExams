"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { lessonPackages, type LessonPackage, type PackageType, formatPrice } from '@/lib/packages'
import { useLanguage, type Locale } from '@/contexts/language-context'

const pricingCopy: Record<Locale, {
  badge: string
  lessons: (count: number) => string
  total: (price: string) => string
  perLesson: (price: string) => string
  bestFor: string
  button: string
  categories: Record<PackageType, { title: string; blurb: string }>
}> = {
  en: {
    badge: 'Most Popular',
    lessons: (count) => `${count} Lessons`,
    total: (price) => `${price} total`,
    perLesson: (price) => `≈ ${price} / lesson`,
    bestFor: 'Best for:',
    button: 'Book & pick slots',
    categories: {
      individual: {
        title: 'Individual Packages',
        blurb: '1:1 lessons tailored to your goals. Pick the bundle that fits your timeline and budget.',
      },
      group: {
        title: 'Group Packages (3-4 students)',
        blurb: 'Small groups of 3-4 learners per class so you can split the cost while keeping an intimate, interactive vibe.',
      },
    },
  },
  ro: {
    badge: 'Cel mai popular',
    lessons: (count) => `${count} sedinte`,
    total: (price) => `${price} total`,
    perLesson: (price) => `≈ ${price} / sedinta`,
    bestFor: 'Potrivit pentru:',
    button: 'Rezerva si alege intervale',
    categories: {
      individual: {
        title: 'Pachete individuale',
        blurb: 'Sedinte 1:1 adaptate obiectivelor tale. Alege pachetul care se potriveste bugetului si ritmului tau.',
      },
      group: {
        title: 'Pachete de grup (3-4 cursanti)',
        blurb: 'Grupe mici de 3-4 elevi ca sa impartiti costurile, pastrand atmosfera interactiva.',
      },
    },
  },
}

const categoryOrder: PackageType[] = ['individual', 'group']

export function PricingCards() {
  const { locale } = useLanguage()
  const copy = pricingCopy[locale]

  return (
    <div className="space-y-12">
      {categoryOrder.map((category) => {
        const items = lessonPackages.filter((pkg: LessonPackage) => pkg.type === category)
        const sectionCopy = copy.categories[category]

        return (
          <div key={category}>
            <div className="mb-6 text-center md:text-left">
              <h3 className="text-2xl font-poppins font-bold text-gray-900">{sectionCopy.title}</h3>
              <p className="text-gray-600 font-inter">{sectionCopy.blurb}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {items.map((pkg: LessonPackage) => {
                const perLesson = pkg.totalPrice / pkg.lessons
                const localizedName = locale === 'ro' ? pkg.translations?.ro?.name ?? pkg.name : pkg.name
                const localizedFeatures = locale === 'ro' ? pkg.translations?.ro?.features ?? pkg.features : pkg.features
                const localizedBestFor = locale === 'ro' ? pkg.translations?.ro?.bestFor ?? pkg.bestFor : pkg.bestFor

                return (
                  <Card
                    key={pkg.id}
                    className={`p-6 h-full flex flex-col ${pkg.popular ? 'border-soft-blue border-2' : 'border-gray-200'}`}
                  >
                    {pkg.popular && (
                      <div className="bg-soft-blue text-white text-center py-1 px-3 rounded-full text-sm font-medium mb-4">
                        {copy.badge}
                      </div>
                    )}
                    <h4 className="text-2xl font-poppins font-bold text-gray-900 mb-2">{localizedName}</h4>
                    <div className="text-lg font-inter text-gray-600 mb-1">{copy.lessons(pkg.lessons)}</div>
                    <div className="text-xl font-poppins font-semibold text-soft-blue mb-1">{copy.total(formatPrice(pkg.totalPrice, locale))}</div>
                    <div className="text-sm font-inter text-gray-500 mb-4">{copy.perLesson(formatPrice(perLesson, locale))}</div>
                    <ul className="space-y-2 mb-6">
                      {localizedFeatures.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-soft-blue mr-2">✓</span>
                          <span className="text-gray-600 font-inter text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-sm font-inter text-gray-500 mb-6">
                      <strong>{copy.bestFor}</strong> {localizedBestFor}
                    </div>
                    <div className="mt-auto">
                      <Link href={`/book?package=${pkg.id}#schedule`}>
                        <Button className={`w-full ${pkg.popular ? 'bg-soft-blue hover:bg-soft-blue-dark' : 'bg-gray-800 hover:bg-gray-700'} text-white`}>
                          {copy.button}
                        </Button>
                      </Link>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}