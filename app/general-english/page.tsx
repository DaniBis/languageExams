"use client"

import { PageHeader } from '@/components/page-header'
import { useLanguage, type Locale } from '@/contexts/language-context'

const generalCopy: Record<Locale, {
  header: { title: string; subtitle: string }
  intro: string
  suitabilityHeading: string
  suitability: string[][]
  lessonsHeading: string
  lessons: { title: string; description: string; bullets: string[] }[]
  flexibleHeading: string
  flexible: { title: string; bullets: string[] }[]
  cta: { heading: string; body: string; primary: string; secondary: string }
}> = {
  en: {
    header: {
      title: 'General English',
      subtitle: 'Build Confidence in Everyday English Communication',
    },
    intro:
      'Improve your English for work, travel, or personal growth with lessons focused on clear communication and practical grammar.',
    suitabilityHeading: 'Is General English Right for You?',
    suitability: [
      [
        'You want to speak English more confidently',
        'You need English for work or business',
        "You're planning to travel or study abroad",
      ],
      [
        'You want to fix grammar mistakes',
        'You want to understand English better',
        "You're not preparing for a specific exam right now",
      ],
    ],
    lessonsHeading: "What You'll Learn in General English Lessons",
    lessons: [
      {
        title: 'Grammar Focus',
        description: 'Learn grammar that actually makes sense with practical explanations and real examples.',
        bullets: [
          'Tenses (present, past, future) explained simply',
          'Sentence structure without confusing rules',
          'Common mistakes and how to fix them',
          'Practical grammar for real communication',
          'No confusing terminology—just clear explanations',
        ],
      },
      {
        title: 'Speaking Focus',
        description: 'Build confidence in conversation with natural, practical speaking practice.',
        bullets: [
          'Real conversation practice on topics you care about',
          'Fluency development through natural speaking',
          'Pronunciation improvement for clarity',
          'Vocabulary expansion for everyday situations',
          'Real-world scenarios: work, travel, daily life',
        ],
      },
    ],
    flexibleHeading: 'Flexible Lessons Tailored to You',
    flexible: [
      {
        title: 'Your Lessons, Your Choice',
        bullets: [
          'Choose your focus: grammar, speaking, or both',
          'Set your own goals based on your needs',
          'Learn at your own pace—no pressure',
          'Topics based on your interests and real-life needs',
        ],
      },
      {
        title: 'Common Topics We Cover',
        bullets: [
          'Business English for meetings and emails',
          'Travel English for confident trips abroad',
          'Daily conversation for natural interactions',
          'Email and message writing',
          'Phone calls and professional communication',
          'Job interview preparation',
        ],
      },
    ],
    cta: {
      heading: 'Ready to Improve Your English?',
      body: 'Start speaking confidently and using grammar correctly with personalized, relaxed lessons.',
      primary: 'Book Your Free Consultation',
      secondary: 'View General English Packages',
    },
  },
  ro: {
    header: {
      title: 'Engleza generala',
      subtitle: 'Construieste incredere in conversatii de zi cu zi',
    },
    intro:
      'Dezvolta-ti engleza pentru job, calatorii sau planuri personale prin lectii axate pe comunicare clara si gramatica practica.',
    suitabilityHeading: 'Este acest curs potrivit pentru tine?',
    suitability: [
      [
        'Vrei sa vorbesti mai sigur in engleza',
        'Ai nevoie de engleza la job sau in afaceri',
        'Te pregatesti pentru calatorii sau studii in strainatate',
      ],
      [
        'Vrei sa corectezi greselile de gramatica',
        'Vrei sa intelegi mai usor ce auzi sau citesti',
        'Nu urmezi acum o pregatire pentru un examen anume',
      ],
    ],
    lessonsHeading: 'Ce inveti la lectiile de engleza generala',
    lessons: [
      {
        title: 'Focus pe gramatica',
        description: 'Explic gramatica logic, cu exemple reale si aplicate.',
        bullets: [
          'Timpuri verbale explicate simplu',
          'Structura frazei fara reguli incurcate',
          'Greseli frecvente si cum le corectam',
          'Gramatica utila in conversatii reale',
          'Fara termeni complicati, doar explicatii clare',
        ],
      },
      {
        title: 'Focus pe speaking',
        description: 'Capeti incredere in discutii prin exercitii naturale si relaxate.',
        bullets: [
          'Conversatii reale pe subiectele care te intereseaza',
          'Antrenament pentru fluența vorbirii',
          'Pronuntie mai clara si mai naturala',
          'Vocabular util pentru fiecare zi',
          'Scenarii reale: job, calatorii, viata de zi cu zi',
        ],
      },
    ],
    flexibleHeading: 'Lectii flexibile, adaptate tie',
    flexible: [
      {
        title: 'Tu alegi directia',
        bullets: [
          'Alegi accentul: gramatica, vorbire sau ambele',
          'Stabilim obiectivele dupa nevoile tale',
          'Inveti in ritmul tau, fara presiune',
          'Lucram pe subiecte reale din viata ta',
        ],
      },
      {
        title: 'Subiecte frecvente',
        bullets: [
          'Engleza pentru sedinte si emailuri',
          'Engleza pentru calatorii sigure',
          'Conversatii zilnice naturale',
          'Scriere de emailuri si mesaje',
          'Apeluri telefonice si comunicare profesionala',
          'Pregatire pentru interviuri',
        ],
      },
    ],
    cta: {
      heading: 'Gata sa-ti imbunatatesti engleza?',
      body: 'Vorbesti mai relaxat si folosesti corect gramatica prin lectii personalizate.',
      primary: 'Programeaza consultatia gratuita',
      secondary: 'Vezi pachetele de engleza generala',
    },
  },
}

export default function GeneralEnglishPage() {
  const { locale } = useLanguage()
  const copy = generalCopy[locale]

  return (
    <>
      <PageHeader title={copy.header.title} subtitle={copy.header.subtitle} />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg font-inter text-gray-600">{copy.intro}</p>
          </div>

          <div className="bg-soft-blue-light p-8 rounded-lg mb-16">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-8 text-center">{copy.suitabilityHeading}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {copy.suitability.map((column, index) => (
                <div key={index} className="space-y-3">
                  {column.map((item) => (
                    <div key={item} className="flex items-center">
                      <span className="text-soft-blue text-xl mr-3">✓</span>
                      <span className="text-gray-700 font-inter">{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-8 text-center">{copy.lessonsHeading}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {copy.lessons.map((lesson) => (
                <div key={lesson.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4">{lesson.title}</h3>
                  <p className="text-gray-600 font-inter mb-4">{lesson.description}</p>
                  <ul className="text-gray-600 font-inter space-y-2">
                    {lesson.bullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-8 text-center">{copy.flexibleHeading}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {copy.flexible.map((column) => (
                <div key={column.title}>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4">{column.title}</h3>
                  <ul className="text-gray-600 font-inter space-y-2">
                    {column.bullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-6 md:px-20 text-center">
          <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">{copy.cta.heading}</h2>
          <p className="text-lg font-inter text-gray-600 mb-8 max-w-2xl mx-auto">{copy.cta.body}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="px-8 py-3 bg-soft-blue hover:bg-soft-blue-dark text-white font-poppins font-medium text-base rounded-lg inline-block">
              {copy.cta.primary}
            </a>
            <a href="/prices" className="px-8 py-3 border-2 border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white font-poppins font-medium text-base rounded-lg inline-block">
              {copy.cta.secondary}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}