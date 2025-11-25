'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Locale = 'en' | 'ro'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en'
  }
  const stored = window.localStorage.getItem('preferred-language') as Locale | null
  return stored === 'ro' ? 'ro' : 'en'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const initial = getInitialLocale()
    setLocaleState(initial)
    document.documentElement.lang = initial
  }, [])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('preferred-language', next)
    }
    document.documentElement.lang = next
  }

  const value = useMemo(() => ({ locale, setLocale }), [locale])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
