'use client'

import { useLanguage, type Locale } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

const languages: { value: Locale; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'ro', label: 'RO' },
]

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="inline-flex rounded-full border border-gray-200 bg-white/70 p-1 text-xs font-semibold text-gray-600">
      {languages.map((language) => (
        <button
          key={language.value}
          type="button"
          className={cn(
            'px-2.5 py-1 rounded-full transition text-[0.7rem]',
            locale === language.value ? 'bg-soft-blue text-white shadow' : 'hover:text-gray-900'
          )}
          onClick={() => setLocale(language.value)}
          aria-pressed={locale === language.value}
        >
          {language.label}
        </button>
      ))}
    </div>
  )
}
