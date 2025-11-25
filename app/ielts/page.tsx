"use client"

import { PageHeader } from '@/components/page-header'
import { useLanguage, type Locale } from '@/contexts/language-context'

const ieltsCopy: Record<Locale, {
  header: { title: string; subtitle: string }
  intro: string
  modulesHeading: string
  modules: { title: string; description: string; perfectFor: string[] }[]
  bandsHeading: string
  bands: { label: string; description: string }[]
  lessonsHeading: string
  lessons: { title: string; bullets: string[] }[]
  cta: { heading: string; body: string; primary: string; secondary: string }
}> = {
  en: {
    header: {
      title: 'IELTS Exam Preparation',
      subtitle: 'Ace your IELTS Academic or General Training exam',
    },
    intro: 'Comprehensive IELTS preparation for both Academic and General Training modules.',
    modulesHeading: 'IELTS Modules We Cover',
    modules: [
      {
        title: 'IELTS Academic',
        description:
          'Designed for students applying to universities or professional registration. We cover academic reading, writing, listening, and speaking.',
        perfectFor: ['University applications', 'Professional registration', 'Academic study abroad', 'Higher education programs'],
      },
      {
        title: 'IELTS General Training',
        description:
          'Focused on migration, work, or training programs. Lessons include everyday communication tasks and real-life scenarios.',
        perfectFor: ['Work visas', 'Immigration applications', 'Training programs', 'Secondary education'],
      },
    ],
    bandsHeading: 'Band Scores & Success',
    bands: [
      { label: 'Band 6.0', description: 'Competent user with good control of familiar topics.' },
      { label: 'Band 6.5', description: 'Good user with minor inaccuracies but effective communication.' },
      { label: 'Band 7.0', description: 'Good user using complex language with flexibility.' },
      { label: 'Band 7.5+', description: 'Very good user expressing precise meaning with few errors.' },
    ],
    lessonsHeading: "What You'll Learn in IELTS Lessons",
    lessons: [
      {
        title: 'Reading & Listening',
        bullets: [
          'Time management strategies for each section',
          'Understanding question types and techniques',
          'Building academic vocabulary',
          'Note-taking and skimming skills',
          'Practice with official IELTS materials',
        ],
      },
      {
        title: 'Writing & Speaking',
        bullets: [
          'Task 1 and Task 2 writing strategies',
          'Speaking test format and preparation',
          'Pronunciation and fluency improvement',
          'Grammar for academic writing',
          'Mock tests with detailed feedback',
        ],
      },
    ],
    cta: {
      heading: 'Ready to Achieve Your IELTS Goals?',
      body: "Book your free consultation and let's discuss your IELTS band score targets.",
      primary: 'Book Free Consultation',
      secondary: 'View IELTS Packages',
    },
  },
  ro: {
    header: {
      title: 'Pregatire pentru IELTS',
      subtitle: 'Treci cu succes IELTS Academic sau General Training',
    },
    intro: 'Program complet pentru ambele module IELTS, cu strategii clare si feedback detaliat.',
    modulesHeading: 'Modulele IELTS pe care le acoperim',
    modules: [
      {
        title: 'IELTS Academic',
        description:
          'Creat pentru admitere la facultate sau recunoastere profesionala. Lucram pe texte academice, eseuri si speaking avansat.',
        perfectFor: ['Aplicatii la universitate', 'Autorizari profesionale', 'Studii in strainatate', 'Programe de masterat'],
      },
      {
        title: 'IELTS General Training',
        description:
          'Potrivit pentru imigrare, job sau cursuri profesionale. Include situatii cotidiene si task-uri reale.',
        perfectFor: ['Vize de munca', 'Dosare de imigrare', 'Programe de training', 'Liceu sau colegiu in strainatate'],
      },
    ],
    bandsHeading: 'Benzi de scor si progres',
    bands: [
      { label: 'Band 6.0', description: 'Utilizator competent, controleaza bine structurile uzuale.' },
      { label: 'Band 6.5', description: 'Utilizator bun, cu mici inexactitati dar comunicare eficienta.' },
      { label: 'Band 7.0', description: 'Utilizator avansat, foloseste limbaj complex cu flexibilitate.' },
      { label: 'Band 7.5+', description: 'Utilizator foarte bun, exprima sens precis cu putine erori.' },
    ],
    lessonsHeading: 'Ce lucram la lectiile de IELTS',
    lessons: [
      {
        title: 'Reading & Listening',
        bullets: [
          'Strategii de timp pentru fiecare sectiune',
          'Intelegerea tipurilor de intrebari si tehnici specifice',
          'Vocabular academic esential',
          'Note-taking si skimming eficiente',
          'Antrenament cu materiale oficiale IELTS',
        ],
      },
      {
        title: 'Writing & Speaking',
        bullets: [
          'Strategii pentru Task 1 si Task 2',
          'Pregatire pentru formatul probei orale',
          'Pronuntie si fluența imbunatatite',
          'Gramatica pentru scriere academica',
          'Simulari cu feedback detaliat',
        ],
      },
    ],
    cta: {
      heading: 'Pregatit sa atingi scorul dorit la IELTS?',
      body: 'Rezerva consultatia gratuita si stabilim impreuna strategia pentru banda tinta.',
      primary: 'Rezerva consultatia',
      secondary: 'Vezi pachetele IELTS',
    },
  },
}

export default function IELTSPage() {
  const { locale } = useLanguage()
  const copy = ieltsCopy[locale]

  return (
    <>
      <PageHeader title={copy.header.title} subtitle={copy.header.subtitle} />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg font-inter text-gray-600">{copy.intro}</p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-8 text-center">{copy.modulesHeading}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {copy.modules.map((module) => (
                <div key={module.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4">{module.title}</h3>
                  <p className="text-gray-600 font-inter mb-4">{module.description}</p>
                  <h4 className="font-poppins font-medium text-gray-900 mb-2">{locale === 'ro' ? 'Potrivita pentru:' : 'Perfect for:'}</h4>
                  <ul className="text-gray-600 font-inter space-y-1">
                    {module.perfectFor.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-soft-blue-light p-8 rounded-lg mb-16">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-8 text-center">{copy.bandsHeading}</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {copy.bands.map((band) => (
                <div key={band.label} className="text-center">
                  <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-2">{band.label}</h3>
                  <p className="text-gray-600 font-inter text-sm">{band.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-8 text-center">{copy.lessonsHeading}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {copy.lessons.map((lesson) => (
                <div key={lesson.title}>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4">{lesson.title}</h3>
                  <ul className="text-gray-600 font-inter space-y-2">
                    {lesson.bullets.map((bullet) => (
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