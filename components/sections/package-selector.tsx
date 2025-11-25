"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { lessonPackages, type LessonPackage, type PackageType, formatLei } from '@/lib/packages'
import { Button } from '@/components/ui/button'
import { useLanguage, type Locale } from '@/contexts/language-context'

const categoryLabels: Record<Locale, Record<PackageType, string>> = {
  en: {
    individual: 'Individual Packages',
    group: 'Group Packages (3-4 students)',
  },
  ro: {
    individual: 'Pachete individuale',
    group: 'Pachete de grup (3-4 cursanti)',
  },
}

const packageCopy: Record<Locale, {
  heading: string
  description: (lessons: number) => string
  blockDescription: (lessons: number, price: string) => string
  followUp: string
  groupLabel: string
  individualLabel: string
  cta: (lessons: number) => string
}> = {
  en: {
    heading: 'Choose your package',
    description: (lessons) => `Select the bundle that fits your goals, then scroll down to pick ${lessons} slots in the live calendar so I can lock them in for you.`,
    blockDescription: (lessons, price) => `Includes ${lessons} lessons (${price} per lesson). Book the same number of 30-minute slots in the calendar below so I can lock them for you.`,
    followUp: 'After booking your slots I\'ll follow up with payment instructions for the amount above.',
    groupLabel: 'Group class (3-4 students)',
    individualLabel: '1:1 lessons',
    cta: (lessons) => `Choose slots (${lessons})`,
  },
  ro: {
    heading: 'Alege pachetul potrivit',
    description: (lessons) => `Alege pachetul potrivit obiectivelor tale, apoi rezervi ${lessons} intervale in calendarul live pentru a le bloca.`,
    blockDescription: (lessons, price) => `Include ${lessons} sedinte (${price} pe sedinta). Rezerva acelasi numar de intervale de 30 de minute in calendarul de mai jos ca sa le pot bloca.`,
    followUp: 'Dupa rezervare revin prin email cu detaliile de plata pentru suma afisata.',
    groupLabel: 'Curs de grup (3-4 cursanti)',
    individualLabel: 'Sedinte 1:1',
    cta: (lessons) => `Alege intervalele (${lessons})`,
  },
}

const categoryOrder: PackageType[] = ['individual', 'group']

interface PackageSelectorProps {
  initialPackageId?: string
}

export function PackageSelector({ initialPackageId }: PackageSelectorProps) {
  const { locale } = useLanguage()
  const copy = packageCopy[locale]
  const getPackageName = useCallback((pkg: LessonPackage) => (locale === 'ro' ? pkg.translations?.ro?.name ?? pkg.name : pkg.name), [locale])

  const defaultPackageId = useMemo(() => {
    return lessonPackages.find((pkg: LessonPackage) => pkg.id === initialPackageId)?.id ?? lessonPackages[0].id
  }, [initialPackageId])

  const [selectedId, setSelectedId] = useState(defaultPackageId)
  useEffect(() => {
    setSelectedId(defaultPackageId)
  }, [defaultPackageId])
  const selectedPackage = lessonPackages.find((pkg: LessonPackage) => pkg.id === selectedId) ?? lessonPackages[0]
  const perLesson = selectedPackage.totalPrice / selectedPackage.lessons

  const byCategory = useMemo(() => {
    return lessonPackages.reduce<Record<PackageType, LessonPackage[]>>((acc: Record<PackageType, LessonPackage[]>, pkg: LessonPackage) => {
      acc[pkg.type] = acc[pkg.type] ? [...acc[pkg.type], pkg] : [pkg]
      return acc
    }, { individual: [], group: [] } as Record<PackageType, LessonPackage[]>)
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-poppins font-bold text-gray-900 mb-2">{copy.heading}</h3>
        <p className="text-lg font-inter text-gray-600">
          {copy.description(selectedPackage.lessons)}
        </p>
      </div>

      <div className="space-y-6">
        {categoryOrder.map((category) => (
          <div key={category} className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">{categoryLabels[locale][category]}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {byCategory[category].map((pkg: LessonPackage) => {
                const isActive = pkg.id === selectedId
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedId(pkg.id)}
                    className={cn(
                      'w-full text-left border rounded-2xl p-4 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      isActive ? 'border-soft-blue bg-white shadow-md ring-soft-blue/60' : 'border-gray-200 bg-white/80'
                    )}
                  >
                    <p className="text-sm font-semibold text-soft-blue mb-1">
                      {pkg.type === 'group' ? copy.groupLabel : copy.individualLabel}
                    </p>
                    <h4 className="text-xl font-poppins font-bold text-gray-900">{getPackageName(pkg)}</h4>
                    <p className="text-sm text-gray-600">{pkg.lessons} lessons</p>
                    <p className="text-lg font-poppins font-semibold text-gray-900 mt-2">{formatLei(pkg.totalPrice)}</p>
                    <p className="text-xs text-gray-500">≈ {formatLei(pkg.totalPrice / pkg.lessons)} per lesson</p>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/90 border border-gray-100 rounded-3xl p-6 shadow-sm">
        <h4 className="text-2xl font-poppins font-bold text-gray-900 mb-2">{getPackageName(selectedPackage)}</h4>
        <p className="text-gray-600 font-inter mb-2">
          {copy.blockDescription(selectedPackage.lessons, formatLei(perLesson))}
        </p>
        <p className="text-sm text-gray-500 font-inter">
          {copy.followUp}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button asChild className="flex-1 rounded-2xl bg-soft-blue text-white">
            <a href="#schedule">{copy.cta(selectedPackage.lessons)}</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
