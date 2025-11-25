'use client'

import { cn } from '@/lib/utils'
import { useLanguage, type Locale } from '@/contexts/language-context'

const bannerCopy: Record<Locale, {
  badge: string
  title: string
  priceLabel: string
  price: string
  description: string
  note: string
}> = {
  en: {
    badge: 'Transparent Pricing',
    title: '1:1 lessons tailored to your goals',
    priceLabel: 'Each 60-minute class',
    price: '€14',
    description: '',
    note: 'Every package is calculated using the same €14 rate per 60-minute 1:1 class.',
  },
  ro: {
    badge: 'Pret clar',
    title: 'Lectii 1:1 adaptate obiectivelor tale',
    priceLabel: 'Fiecare sedinta de 60 de minute',
    price: '70 RON',
    description: '',
    note: 'Toate pachetele sunt calculate la 70 RON pentru fiecare sedinta 1:1 de 60 de minute.',
  },
}

interface OnlineOnlyBannerProps {
  className?: string
}

export function OnlineOnlyBanner({ className }: OnlineOnlyBannerProps) {
  const { locale } = useLanguage()
  const copy = bannerCopy[locale]

  return (
    <div className={cn('rounded-3xl border-2 border-soft-blue bg-white p-8 md:p-10 shadow-xl flex flex-col gap-4 text-center', className)}>
      <span className="text-xs uppercase tracking-[0.4em] text-soft-blue">{copy.badge}</span>
      <h3 className="text-3xl md:text-4xl font-poppins font-bold leading-tight text-gray-900">{copy.title}</h3>
      <p className="text-lg md:text-xl font-inter text-gray-700">
        {copy.priceLabel}:{' '}
        <span className="text-4xl md:text-5xl font-poppins font-semibold text-soft-blue">{copy.price}</span>
      </p>
      {copy.description && (
        <p className="text-base md:text-lg font-inter text-gray-600">{copy.description}</p>
      )}
      <p className="text-sm md:text-base font-inter text-gray-500">{copy.note}</p>
    </div>
  )
}
