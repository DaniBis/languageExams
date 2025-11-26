"use client"

import Image from 'next/image'
import { PageHeader } from '@/components/page-header'
import { useLanguage, type Locale } from '@/contexts/language-context'

const aboutCopy: Record<Locale, {
  header: { title: string; subtitle: string }
  intro: string[]
  media: {
    heading: string
    body: string
    videoLabel: string
    videoUrl: string
  }
  experience: {
    heading: string
    columns: { title: string; items: string[] }[]
  }
  proofs: {
    heading: string
    body: string
    items: { title: string; badge: string; description: string; image: string }[]
  }
  approach: {
    heading: string
    items: { title: string; body: string }[]
  }
  journey: {
    heading: string
    cards: { title: string; body: string }[]
  }
  cta: {
    heading: string
    body: string
    primary: string
    secondary: string
  }
}> = {
  en: {
    header: {
      title: 'About Daniel',
      subtitle: 'Your English Tutor & Exam Preparation Specialist',
    },
    intro: [
      "I'm Daniel, and I love helping students achieve their English goals. For me, teaching isn't just a job—it's a passion.",
      "I became an English tutor because I believe everyone deserves to communicate confidently in English, whether that's passing an important exam, getting into university, advancing in their career, or simply feeling comfortable speaking.",
      'My teaching philosophy is simple: English should be clear, not confusing. I break down complex grammar into easy steps, use real examples, and create a relaxed environment where you feel safe to make mistakes and learn from them.',
      'What I enjoy most is seeing that moment when something finally clicks for a student. Whether it is understanding a tricky grammar point, speaking more fluently, or passing that important exam—your success is my success.',
    ],
    media: {
      heading: 'Meet me in 2 minutes',
      body:
        'Press play for a quick introduction to my teaching style, what to expect in our lessons, and how we will collaborate toward your exam goals.',
      videoLabel: 'Self-introduction video',
      videoUrl: 'https://drive.google.com/file/d/1WuiPRbmMxcm980a8OGkRC1nd8lXNUM0j/preview',
    },
    experience: {
      heading: 'Experience & Qualifications',
      columns: [
        {
          title: 'Teaching Certifications',
          items: [
            '• Certified English Language Teacher (TEFL/CELTA)',
            '• Over 6 years teaching English online and in-person',
          ],
        },
        {
          title: 'Exam Expertise',
          items: [
            '• Cambridge B1 Preliminary (PET)',
            '• Cambridge B2 First (FCE)',
            '• Cambridge C1 Advanced (CAE)',
            '• IELTS Academic and General Training',
          ],
        },
        {
          title: 'International Experience',
          items: [
            '• Romanian students preparing for Cambridge exams',
            '• Chinese students improving IELTS scores',
            '• Deep understanding of cross-cultural learning challenges',
          ],
        },
      ],
    },
    proofs: {
      heading: 'Real exam scorecards',
      body:
        'Snapshots collected over 6+ years of lessons—official score reports students shared right after the Cambridge and IELTS wins we planned together.',
      items: [
        {
          title: 'IELTS Academic • Band 7.5',
          badge: 'Ana · 12-week plan',
          description: 'Official Test Report Form received after we rebuilt Writing Task 2 structure and Speaking fluency with weekly mocks.',
          image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
        },
        {
          title: 'Cambridge B2 First • Grade B (176)',
          badge: 'Matei · High-school senior',
          description: 'Progress tracker showing consistent 176–182 in Speaking once we drilled real-life roleplays and Use of English patterns.',
          image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80',
        },
        {
          title: 'Cambridge C1 Advanced • Grade C (194)',
          badge: 'Ioana · Marketing professional',
          description: 'CAE portal screenshot after 3 months of strategy sessions focused on persuasive tone, cohesive devices, and timed reviews.',
          image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80',
        },
      ],
    },
    approach: {
      heading: 'My Teaching Approach',
      items: [
        {
          title: 'Clear, Simple Explanations',
          body:
            "I break down complex grammar into easy-to-understand concepts. You won't hear confusing terminology or complicated rules—just clear, practical explanations that make sense.",
        },
        {
          title: 'Personalized Attention',
          body:
            "Every lesson is tailored to your specific needs and goals. We focus on what you need to improve, whether that's grammar accuracy, speaking fluency, or exam strategies.",
        },
        {
          title: 'Practical Focus',
          body:
            'We work with real exam questions, real-world situations, and practical examples. Everything you learn, you can use immediately.',
        },
        {
          title: 'Supportive Environment',
          body:
            "Learning English should be encouraging, not stressful. I create a relaxed, friendly atmosphere where you feel comfortable practicing and making mistakes—because that's how we learn.",
        },
      ],
    },
    journey: {
      heading: 'Understanding Your Journey',
      cards: [
        {
          title: 'Working with Romanian Students',
          body:
            'I have extensive experience helping Romanian students prepare for Cambridge B1, B2, and C1 exams. I understand the specific grammar challenges Romanian speakers face and know how to help you overcome them. Many Romanian students have passed their exams and used English to study abroad or advance in their careers.',
        },
        {
          title: 'Working with Chinese Students',
          body:
            'I specialize in helping Chinese students achieve their IELTS and Cambridge goals. I understand the unique pronunciation and grammar challenges Chinese learners face and use proven strategies to boost speaking, writing, and band scores. Many have gained university places and visas through improved IELTS results.',
        },
      ],
    },
    cta: {
      heading: "Let's Work Together",
      body:
        "I'd love to help you achieve your English goals. Whether you're preparing for an exam or just want to speak more confidently, I'm here to support you every step of the way.",
      primary: 'Book a Free Consultation',
      secondary: 'See Student Reviews',
    },
  },
  ro: {
    header: {
      title: 'Despre Daniel',
      subtitle: 'Trainerul tau de engleza si specialist in pregatirea pentru examene',
    },
    intro: [
      'Eu sunt Daniel si ador sa-i ajut pe elevi sa-si atinga obiectivele la engleza. Pentru mine, predarea nu este doar o meserie, ci o pasiune.',
      'Am devenit tutor de engleza pentru ca cred ca oricine merita sa comunice cu incredere, fie ca e vorba de un examen important, admitere la facultate, cariera sau conversatii fluente.',
      'Filosofia mea este simpla: engleza trebuie sa fie clara, nu incurcata. Descompun gramatica in pasi usor de urmat, folosesc exemple reale si creez o atmosfera relaxata in care este ok sa gresesti si sa inveti.',
      'Cel mai mult ma bucura momentul in care elevul spune "acum inteleg". Fie ca vorbim despre un timp verbal complicat, despre vorbire fluenta sau despre un examen reusit, succesul tau este si succesul meu.',
    ],
    media: {
      heading: 'Hai sa facem cunostinta in 2 minute',
      body:
        'Da play pentru o prezentare rapida despre cum lucrez, cum arata o lectie si ce poti obtine din colaborarea noastra.',
      videoLabel: 'Video de prezentare',
      videoUrl: 'https://drive.google.com/file/d/1WuiPRbmMxcm980a8OGkRC1nd8lXNUM0j/preview',
    },
    experience: {
      heading: 'Experienta si certificari',
      columns: [
        {
          title: 'Certificari de predare',
          items: [
            '• Profesor certificat de limba engleza (TEFL/CELTA)',
            '• Peste 6 ani de experienta online si fata in fata',
          ],
        },
        {
          title: 'Expertiza in examene',
          items: [
            '• Cambridge B1 Preliminary (PET)',
            '• Cambridge B2 First (FCE)',
            '• Cambridge C1 Advanced (CAE)',
            '• IELTS Academic si General Training',
          ],
        },
        {
          title: 'Experienta internationala',
          items: [
            '• Elevi romani care se pregatesc pentru Cambridge',
            '• Elevi chinezi care cresc scorul la IELTS',
            '• Inteleg provocari culturale si de invatare diferite',
          ],
        },
      ],
    },
    proofs: {
      heading: 'Rezultate reale din examene',
      body:
        'Fragmente stranse in cei 6+ ani de lucru – rapoarte oficiale pe care cursantii mi le-au trimis imediat dupa ce au luat Cambridge sau IELTS.',
      items: [
        {
          title: 'IELTS Academic • Band 7.5',
          badge: 'Ana · Plan de 12 saptamani',
          description: 'Test Report Form primit dupa ce am reconstruit structura pentru Writing Task 2 si am facut simulacre saptamanale la Speaking.',
          image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
        },
        {
          title: 'Cambridge B2 First • Nota B (176)',
          badge: 'Matei · Clasa a XII-a',
          description: 'Foaie de progres care arata 176–182 constant la Speaking dupa roleplay-uri reale si repetitii pentru Use of English.',
          image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80',
        },
        {
          title: 'Cambridge C1 Advanced • Nota C (194)',
          badge: 'Ioana · Specialist marketing',
          description: 'Screenshot din portalul CAE dupa 3 luni de sesiuni axate pe ton persuasiv, conectoare avansate si revizuiri cronometrate.',
          image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80',
        },
      ],
    },
    approach: {
      heading: 'Cum predau',
      items: [
        {
          title: 'Explicatii clare si simple',
          body:
            'Transform regulile complicate in idei logice. Nu folosesc termeni greu de inteles, ci exemple practice care raman cu tine.',
        },
        {
          title: 'Atentie personalizata',
          body:
            'Fiecare sedinta urmareste nevoile tale: gramatica precisa, vorbire fluenta sau strategii pentru examen.',
        },
        {
          title: 'Aplicatii practice',
          body:
            'Lucram cu subiecte reale din examene si situatii cotidiene. Tot ce inveti poti folosi imediat.',
        },
        {
          title: 'Atmosfera prietenoasa',
          body:
            'Invatarea trebuie sa fie incurajatoare. Creez un spatiu relaxat in care este normal sa pui intrebari si sa gresesti.',
        },
      ],
    },
    journey: {
      heading: 'Inteleg parcursul tau',
      cards: [
        {
          title: 'Lucrez cu elevi din Romania',
          body:
            'Am ajutat multi elevi romani sa promoveze Cambridge B1, B2 si C1. Stiu exact ce capitole de gramatica sunt dificile si cum sa le fac logice. Multi studenti au continuat studiile in strainatate sau si-au avansat cariera datorita englezei.',
        },
        {
          title: 'Lucrez cu elevi din China',
          body:
            'Ii sprijin pe elevii chinezi sa atinga scorul dorit la IELTS si Cambridge. Cunosc provocarile de pronuntie si structura si folosesc strategii testate pentru a creste scorurile la speaking si writing. Rezultatele bune i-au ajutat sa obtina vize sau admiterea la universitate.',
        },
      ],
    },
    cta: {
      heading: 'Hai sa lucram impreuna',
      body:
        'Ma bucur sa te insotesc spre obiectivul tau la engleza. Indiferent daca te pregatesti pentru examen sau vrei sa vorbesti mai relaxat, sunt aici pentru tine.',
      primary: 'Programeaza o consultatie gratuita',
      secondary: 'Vezi recenziile elevilor',
    },
  },
}

export default function AboutPage() {
  const { locale } = useLanguage()
  const copy = aboutCopy[locale]

  return (
    <>
      <PageHeader title={copy.header.title} subtitle={copy.header.subtitle} />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            {copy.intro.map((paragraph, index) => (
              <p key={index} className={`text-lg font-inter text-gray-600 leading-relaxed ${index !== copy.intro.length - 1 ? 'mb-6' : ''}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-soft-blue font-semibold mb-3">{copy.media.videoLabel}</p>
              <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">{copy.media.heading}</h2>
              <p className="text-lg font-inter text-gray-600 leading-relaxed">{copy.media.body}</p>
            </div>
            <div className="w-full">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-black">
                <iframe
                  src={copy.media.videoUrl}
                  title="Self introduction video"
                  allow="autoplay"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-6">{copy.experience.heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {copy.experience.columns.map((column, index) => (
                <div key={index}>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">{column.title}</h3>
                  <ul className="text-gray-600 font-inter space-y-2">
                    {column.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <p className="text-sm uppercase tracking-widest text-soft-blue font-semibold mb-3">{copy.proofs.heading}</p>
            <p className="text-lg font-inter text-gray-600">{copy.proofs.body}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.proofs.items.map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="relative h-56 w-full">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-sm font-semibold text-soft-blue mb-2 inline-flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-soft-blue" />
                    {item.badge}
                  </span>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 font-inter leading-relaxed flex-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-6">{copy.approach.heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {copy.approach.items.map((item, index) => (
                <div key={index}>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 font-inter leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-soft-blue-light">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-6">{copy.journey.heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {copy.journey.cards.map((card, index) => (
                <div key={index}>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-600 font-inter leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20 text-center">
          <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">{copy.cta.heading}</h2>
          <p className="text-lg font-inter text-gray-600 mb-8 max-w-2xl mx-auto">
            {copy.cta.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="px-8 py-3 bg-soft-blue hover:bg-soft-blue-dark text-white font-poppins font-medium text-base rounded-lg inline-block">
              {copy.cta.primary}
            </a>
            <a href="/reviews" className="px-8 py-3 border-2 border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white font-poppins font-medium text-base rounded-lg inline-block">
              {copy.cta.secondary}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}