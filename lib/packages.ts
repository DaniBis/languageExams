export type PackageType = 'individual' | 'group'

export interface LessonPackage {
  id: string
  name: string
  lessons: number
  totalPrice: number
  type: PackageType
  bestFor: string
  features: string[]
  popular?: boolean
  translations?: {
    ro?: {
      name?: string
      bestFor?: string
      features?: string[]
    }
  }
}

export const lessonPackages: LessonPackage[] = [
  {
    id: 'trial',
    name: 'Trial Package',
    lessons: 5,
    totalPrice: 350,
    type: 'individual',
    bestFor: 'Trying out lessons or short-term goals',
    features: [
      'Personalized lesson plans',
      'All learning materials',
      'Homework and practice exercises',
      'Flexible scheduling',
    ],
    translations: {
      ro: {
        name: 'Pachet de inceput',
        bestFor: 'Pentru a testa lectiile sau pentru obiective pe termen scurt',
        features: [
          'Planuri de lectie personalizate',
          'Toate materialele incluse',
          'Teme si exercitii de practica',
          'Program flexibil',
        ],
      },
    },
  },
  {
    id: 'standard',
    name: 'Standard Package',
    lessons: 10,
    totalPrice: 700,
    type: 'individual',
    bestFor: 'Serious improvement and exam preparation',
    features: [
      'Everything in Trial Package',
      'Progress tracking and feedback',
      'Mock tests available on request',
      'Priority scheduling',
    ],
    translations: {
      ro: {
        name: 'Pachet standard',
        bestFor: 'Progres serios si pregatire pentru examene',
        features: [
          'Tot ce include pachetul de inceput',
          'Monitorizare a progresului si feedback',
          'Simulari de examen la cerere',
          'Programare prioritara',
        ],
      },
    },
    popular: true,
  },
  {
    id: 'intensive',
    name: 'Intensive Package',
    lessons: 20,
    totalPrice: 1300,
    type: 'individual',
    bestFor: 'Maximum results and complete preparation',
    features: [
      'Everything in Standard Package',
      'Comprehensive progress reports',
      'Extra practice materials',
      'Email support between lessons',
    ],
    translations: {
      ro: {
        name: 'Pachet intensiv',
        bestFor: 'Rezultate maxime si pregatire completa',
        features: [
          'Tot ce include pachetul standard',
          'Rapoarte detaliate de progres',
          'Materiale suplimentare de practica',
          'Suport pe email intre sedinte',
        ],
      },
    },
  },
  {
    id: 'group-trial',
    name: 'Group Trial Package',
    lessons: 5,
    totalPrice: 250,
    type: 'group',
    bestFor: 'Trying English lessons with friends or colleagues',
    features: [
      'Small groups of 3-4 students',
      'Shared learning materials',
      'Collaborative speaking practice',
      'Flexible scheduling',
    ],
    translations: {
      ro: {
        name: 'Pachet de grup - inceput',
        bestFor: 'Testezi lectiile impreuna cu prietenii sau colegii',
        features: [
          'Grupe restranse de 3-4 cursanti',
          'Materiale impartite intre participanti',
          'Antrenament colaborativ de speaking',
          'Program flexibil',
        ],
      },
    },
  },
  {
    id: 'group-standard',
    name: 'Group Standard Package',
    lessons: 10,
    totalPrice: 500,
    type: 'group',
    bestFor: 'Consistent group study and steady progress',
    features: [
      'Everything in Group Trial Package',
      'Group progress updates',
      'Extra speaking clinics',
      'Priority slot coordination for 3-4 students',
    ],
    translations: {
      ro: {
        name: 'Pachet de grup - standard',
        bestFor: 'Studii de grup consecvente si progres constant',
        features: [
          'Tot ce include pachetul de grup - inceput',
          'Actualizari privind progresul grupei',
          'Clinici suplimentare de speaking',
          'Coordonare prioritara pentru 3-4 cursanti',
        ],
      },
    },
    popular: true,
  },
  {
    id: 'group-intensive',
    name: 'Group Intensive Package',
    lessons: 20,
    totalPrice: 1000,
    type: 'group',
    bestFor: 'Fast results for motivated groups',
    features: [
      'Everything in Group Standard Package',
      'Two weekly progress check-ins',
      'Extended homework feedback',
      'Private Q&A thread for the whole class',
    ],
    translations: {
      ro: {
        name: 'Pachet de grup - intensiv',
        bestFor: 'Rezultate rapide pentru grupe motivate',
        features: [
          'Tot ce include pachetul de grup - standard',
          'Doua verificari ale progresului pe saptamana',
          'Feedback extins pentru teme',
          'Thread privat de Q&A pentru intreaga grupa',
        ],
      },
    },
  },
]

// Static conversion rate so English locale can show indicative EUR pricing; adjust when pricing changes.
const RON_PER_EUR = 5

const enFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

const roFormatter = new Intl.NumberFormat('ro-RO', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

type CurrencyConfig = {
  convert: (amountRon: number) => number
  format: (value: number) => string
}

const currencyConfig: Record<'en' | 'ro', CurrencyConfig> = {
  en: {
    convert: (amountRon) => amountRon / RON_PER_EUR,
    format: (value) => enFormatter.format(value),
  },
  ro: {
    convert: (amountRon) => amountRon,
    format: (value) => `${roFormatter.format(value)} lei`,
  },
}

export type SupportedLocale = keyof typeof currencyConfig

export function formatPrice(amountRon: number, locale: SupportedLocale) {
  const config = currencyConfig[locale] ?? currencyConfig.en
  return config.format(config.convert(amountRon))
}

export function getPackageById(id?: string) {
  if (!id) return undefined
  return lessonPackages.find((pkg) => pkg.id === id)
}
