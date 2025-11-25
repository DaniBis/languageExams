"use client"

import { PageHeader } from '@/components/page-header'
import { useLanguage, type Locale } from '@/contexts/language-context'

const cambridgeCopy: Record<Locale, {
  header: { title: string; subtitle: string }
  intro: string
  examsHeading: string
  exams: { title: string; description: string; bullets: string[] }[]
  skillsHeading: string
  skills: { title: string; description: string }[]
  cta: { heading: string; body: string; primary: string; secondary: string }
}> = {
  en: {
    header: {
      title: 'Cambridge Exam Preparation',
      subtitle: 'B1 Preliminary | B2 First | C1 Advanced',
    },
    intro: 'Achieve your Cambridge certification with structured, exam-focused lessons designed for success.',
    examsHeading: 'Which Cambridge Exam Are You Preparing For?',
    exams: [
      {
        title: 'B1 Preliminary (PET)',
        description:
          'Perfect if you have basic English skills and want to prove you can use English in everyday situations for school, work, or travel.',
        bullets: [
          'Understanding everyday English in reading and listening',
          'Writing simple messages and short stories',
          'Speaking confidently about familiar topics',
          'Exam strategies for every question type',
          'Practice tests and timing techniques',
        ],
      },
      {
        title: 'B2 First (FCE)',
        description:
          'The most popular Cambridge exam, recognized by universities and employers. Demonstrates strong everyday written and spoken English.',
        bullets: [
          'Advanced reading strategies and vocabulary',
          'Clear, well-structured writing (essays, articles, letters)',
          'Complex grammar explained simply',
          'Fluent speaking with natural expressions',
          'Full exam preparation and mock tests',
        ],
      },
      {
        title: 'C1 Advanced (CAE)',
        description:
          'Shows you can communicate effectively at a professional level. Accepted by thousands of universities and employers worldwide.',
        bullets: [
          'Academic and professional English skills',
          'Sophisticated vocabulary and expressions',
          'Complex grammar for high scores',
          'Confident, natural speaking',
          'Advanced exam techniques and strategies',
        ],
      },
    ],
    skillsHeading: "What You'll Learn in Cambridge Lessons",
    skills: [
      {
        title: 'Reading',
        description:
          'Learn strategies for every question type, manage your time effectively, and build vocabulary with authentic materials.',
      },
      {
        title: 'Writing',
        description:
          'Master essay and article structure, practice formal and informal styles, and improve grammar accuracy.',
      },
      {
        title: 'Listening',
        description:
          'Develop note-taking strategies, understand different accents, and practice with real exam recordings.',
      },
      {
        title: 'Speaking',
        description:
          'Build confidence for each speaking task, from describing photos to discussing complex topics at length.',
      },
    ],
    cta: {
      heading: 'Ready to Start Your Cambridge Journey?',
      body: "Book your free consultation and let's discuss your Cambridge exam goals.",
      primary: 'Book Free Consultation',
      secondary: 'View Cambridge Packages',
    },
  },
  ro: {
    header: {
      title: 'Pregatire pentru examene Cambridge',
      subtitle: 'B1 Preliminary | B2 First | C1 Advanced',
    },
    intro: 'Obtii certificarea Cambridge cu lectii structurate si orientate pe examen.',
    examsHeading: 'Pentru ce examen te pregatesti?',
    exams: [
      {
        title: 'B1 Preliminary (PET)',
        description:
          'Ideal daca ai cunostinte de baza si vrei sa demonstrezi ca poti folosi engleza in situatii zilnice la scoala, munca sau calatorii.',
        bullets: [
          'Intelegere a textelor si dialogurilor de zi cu zi',
          'Scriere de mesaje si povestiri scurte',
          'Speaking despre subiecte familiare cu incredere',
          'Strategii pentru fiecare tip de exercitiu',
          'Simulari de examen si management al timpului',
        ],
      },
      {
        title: 'B2 First (FCE)',
        description:
          'Cel mai popular examen Cambridge, recunoscut de universitati si angajatori. Arata ca folosesti engleza fluent in scris si vorbit.',
        bullets: [
          'Strategii avansate de reading si vocabular',
          'Eseuri, articole si scrisori bine structurate',
          'Gramatica complexa explicata simplu',
          'Speaking natural cu expresii autentice',
          'Pregatire completa si teste simulate',
        ],
      },
      {
        title: 'C1 Advanced (CAE)',
        description:
          'Demonstreaza ca poti comunica la nivel profesional. Acceptat de mii de universitati si companii.',
        bullets: [
          'Engleza academica si profesionala',
          'Vocabular bogat si expresii naturale',
          'Gramatica avansata pentru scoruri mari',
          'Speaking sigur si coerent',
          'Tehnici avansate si strategii de examen',
        ],
      },
    ],
    skillsHeading: 'Ce lucram la lectiile Cambridge',
    skills: [
      {
        title: 'Reading',
        description:
          'Inveti metode pentru fiecare tip de exercitiu si iti gestionezi timpul cu texte autentice.',
      },
      {
        title: 'Writing',
        description:
          'Structuram eseuri si articole, exersam ton formal si informal si corectam gramatica.',
      },
      {
        title: 'Listening',
        description:
          'Dezvoltam abilitati de notite, intelegerea accentelor si lucram pe inregistrari oficiale.',
      },
      {
        title: 'Speaking',
        description:
          'Capeti incredere in toate probele orale, de la descrierea imaginilor la discutii complexe.',
      },
    ],
    cta: {
      heading: 'Pregatit sa incepi pregatirea Cambridge?',
      body: 'Rezerva consultatia gratuita si stabilim impreuna strategia pentru examen.',
      primary: 'Rezerva consultatia',
      secondary: 'Vezi pachetele Cambridge',
    },
  },
}

export default function CambridgePage() {
  const { locale } = useLanguage()
  const copy = cambridgeCopy[locale]

  return (
    <>
      <PageHeader title={copy.header.title} subtitle={copy.header.subtitle} />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg font-inter text-gray-600">{copy.intro}</p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-8 text-center">{copy.examsHeading}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {copy.exams.map((exam) => (
                <div key={exam.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4">{exam.title}</h3>
                  <p className="text-gray-600 font-inter mb-4">{exam.description}</p>
                  <h4 className="font-poppins font-medium text-gray-900 mb-2">{locale === 'ro' ? 'Ce lucram:' : "What we'll cover:"}</h4>
                  <ul className="text-gray-600 font-inter space-y-1">
                    {exam.bullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-soft-blue-light p-8 rounded-lg">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-8 text-center">{copy.skillsHeading}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {copy.skills.map((skill) => (
                <div key={skill.title} className="text-center">
                  <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-2">{skill.title}</h3>
                  <p className="text-gray-600 font-inter text-sm">{skill.description}</p>
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