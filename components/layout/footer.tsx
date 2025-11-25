'use client'

import Link from 'next/link'
import { useLanguage, type Locale } from '@/contexts/language-context'

interface ColumnLink {
  label: string
  href: string
}

interface FooterContent {
  quickLinks: ColumnLink[]
  services: ColumnLink[]
  headings: {
    quick: string
    services: string
    contact: string
  }
  contactInfo: { label: string; value: string }[]
  copyright: string
  tagline: string
}

const footerCopy: Record<Locale, FooterContent> = {
  en: {
    quickLinks: [
      { label: 'Home', href: '/' },
      { label: 'About Me', href: '/about' },
      { label: 'Prices & Packages', href: '/prices' },
      { label: 'Student Reviews', href: '/reviews' },
      { label: 'Contact', href: '/contact' },
    ],
    services: [
      { label: 'Cambridge Preparation', href: '/cambridge' },
      { label: 'IELTS Preparation', href: '/ielts' },
      { label: 'General English', href: '/general-english' },
      { label: 'Book a Lesson', href: '/book' },
    ],
    headings: {
      quick: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
    },
    contactInfo: [
      { label: 'Email', value: 'bisceanudaniel@gmail.com' },
      { label: 'WhatsApp', value: '+66 828 612 701' },
    ],
    copyright: '© 2025 English with Daniel. All rights reserved.',
    tagline: 'Clear English. Confident Communication.',
  },
  ro: {
    quickLinks: [
      { label: 'Acasa', href: '/' },
      { label: 'Despre mine', href: '/about' },
      { label: 'Tarife si pachete', href: '/prices' },
      { label: 'Recenzii', href: '/reviews' },
      { label: 'Contact', href: '/contact' },
    ],
    services: [
      { label: 'Pregatire Cambridge', href: '/cambridge' },
      { label: 'Pregatire IELTS', href: '/ielts' },
      { label: 'Engleza generala', href: '/general-english' },
      { label: 'Programeaza o lectie', href: '/book' },
    ],
    headings: {
      quick: 'Linkuri rapide',
      services: 'Servicii',
      contact: 'Contact',
    },
    contactInfo: [
      { label: 'Email', value: 'bisceanudaniel@gmail.com' },
      { label: 'WhatsApp', value: '+66 828 612 701' },
    ],
    copyright: '© 2025 English with Daniel. Toate drepturile rezervate.',
    tagline: 'Engleza clara. Comunicare cu incredere.',
  },
}

export function Footer() {
  const { locale } = useLanguage()
  const content = footerCopy[locale]

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container max-w-7xl mx-auto px-6 md:px-20 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h5 className="font-poppins font-semibold text-lg text-gray-800 mb-4">{content.headings.quick}</h5>
            <ul className="space-y-3">
              {content.quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-600 hover:text-soft-blue transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-poppins font-semibold text-lg text-gray-800 mb-4">{content.headings.services}</h5>
            <ul className="space-y-3">
              {content.services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-600 hover:text-soft-blue transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-poppins font-semibold text-lg text-gray-800 mb-4">{content.headings.contact}</h5>
            <ul className="space-y-3">
              {content.contactInfo.map((item) => (
                <li key={item.label} className="text-gray-600">
                  {item.label}: {item.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-600">{content.copyright}</p>
          <p className="text-base text-soft-blue mt-2 font-poppins">{content.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
