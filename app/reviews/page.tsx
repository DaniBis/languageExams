'use client'

import { PageHeader } from '@/components/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage, type Locale } from '@/contexts/language-context'
import { Star } from 'lucide-react'

const reviewsCopy: Record<Locale, {
  header: { title: string; subtitle: string }
  intro: { lead: string; sub: string }
  cta: { question: string; primary: string; secondary: string }
  testimonials: { name: string; location: string; rating: number; text: string; course: string }[]
}> = {
  en: {
    header: {
      title: 'Student Reviews',
      subtitle: 'See what my students say about their English learning experience',
    },
    intro: {
      lead: 'Read testimonials from students in Romania, China, Thailand, and Vietnam who improved their English with me.',
      sub: 'Each story comes from a real learner with different goals, accents, and timelines.',
    },
    cta: {
      question: 'Ready to join these successful students?',
      primary: 'Book Your Free Consultation',
      secondary: 'Contact Me',
    },
    testimonials: [
      {
        name: 'Iulia Costache',
        location: 'Bucharest, Romania',
        rating: 5,
        text: "Cambridge B2 writing felt like a wall. Daniel made me rewrite every intro, swap lazy verbs, and read my drafts aloud. Eight weeks later my mock jumped from 168 to 182 and I finally submitted the uni application I'd postponed for a year.",
        course: 'Cambridge B2 First',
      },
      {
        name: 'Tudor Marinescu',
        location: 'Cluj-Napoca, Romania',
        rating: 4,
        text: 'Still not a fan of homework, but Daniel drilled the Cambridge C1 use-of-English papers until my mistakes stopped repeating. After six lessons my score moved from 177 to 187 and I only docked one star because he keeps giving extra phrasal verbs.',
        course: 'Cambridge C1 Advanced',
      },
      {
        name: 'Mara Stanescu',
        location: 'Timisoara, Romania',
        rating: 5,
        text: 'I just needed help with the Cambridge B2 speaking part. Two sessions of improv questions later I stopped translating in my head and actually joked with the examiner.',
        course: 'Cambridge B2 Speaking',
      },
      {
        name: 'Vlad Ionescu',
        location: 'Brasov, Romania',
        rating: 5,
        text: 'Daniel noticed every stressed syllable I swallowed. We recorded each C1 mock interview, he highlighted the sloppy sounds, and after a month my pronunciation report finally said “consistent control.”',
        course: 'Cambridge C1 Advanced',
      },
      {
        name: 'Chen Yuhan',
        location: 'Shanghai, China',
        rating: 5,
        text: 'The Cambridge C1 reading paper used to leave me dizzy. Daniel broke the passages into “heartbeat chunks” and timed me daily. After four weeks I scored 196 in the real exam and surprised even my teacher at school.',
        course: 'Cambridge C1 Advanced',
      },
      {
        name: 'Gao Mingrui',
        location: 'Beijing, China',
        rating: 5,
        text: 'I focused on the C2 listening because universities kept asking for it. Daniel sent custom audio diaries, we debated them, and my score went from borderline to 205. I did not expect to enjoy homework on night buses.',
        course: 'Cambridge C2 Proficiency',
      },
      {
        name: 'Mei-Ling Zhou',
        location: 'Shenzhen, China',
        rating: 5,
        text: 'Short review: Cambridge B2 use-of-English no longer scares me. Longer review: Daniel showed me how to build collocation lists from my K-drama subtitles, so now I finish Part 3 with spare minutes.',
        course: 'Cambridge B2 First',
      },
      {
        name: 'Ruihan Zhao',
        location: 'Chengdu, China',
        rating: 5,
        text: 'Needed higher writing marks for Cambridge C1. Daniel printed my essays, drew arrows everywhere, and forced me to justify each connector. After three weeks my teacher said, “Who polished your style?”',
        course: 'Cambridge C1 Advanced',
      },
      {
        name: 'Ngoc-Ha Le',
        location: 'Ho Chi Minh City, Vietnam',
        rating: 5,
        text: 'I was juggling IELTS and Cambridge B2 but the B2 listening lagged behind. Daniel set up morning micro-lessons, and by week five I could predict the tricky distractors. Scored 180 and finally relaxed.',
        course: 'Cambridge B2 First',
      },
      {
        name: 'Bao Minh Tran',
        location: 'Da Nang, Vietnam',
        rating: 5,
        text: 'Cambridge B1 reading used to eat my time. Turning each text into a “treasure map” game shaved six minutes off the clock and I landed 162 overall.',
        course: 'Cambridge B1 Preliminary',
      },
      {
        name: 'Phuong Anh Vu',
        location: 'Hanoi, Vietnam',
        rating: 4,
        text: 'Speaking Part 2 for Cambridge B2 was the loudest nightmare. Daniel made me keep a voice diary and review it, which felt awkward but worked. Gave four stars only because he still sends surprise follow-up questions at 9 PM.',
        course: 'Cambridge B2 Speaking',
      },
      {
        name: 'Chanon Phichitkul',
        location: 'Bangkok, Thailand',
        rating: 5,
        text: 'I aimed for Cambridge C1 to qualify for an exchange semester. Daniel ran full mock days—reading, writing, then speaking—so I learned to manage energy. Passed with 191 and slept for twelve hours straight after.',
        course: 'Cambridge C1 Advanced',
      },
      {
        name: 'Sirinapa Boonsri',
        location: 'Chiang Mai, Thailand',
        rating: 5,
        text: 'I wanted a simple pass for Cambridge B2. Daniel’s improv prompts felt silly but they stopped me freezing, and the examiner even laughed at my story about the lost scooter.',
        course: 'Cambridge B2 First',
      },
      {
        name: 'Kittima Sorapong',
        location: 'Phuket, Thailand',
        rating: 5,
        text: 'My daughter Pai prepared for Cambridge Young Learners. Daniel built pirate maps for every phonics sound, and after a month she read the entire test aloud without grabbing my arm.',
        course: 'Cambridge Young Learners',
      },
    ],
  },
  ro: {
    header: {
      title: 'Recenzii ale cursantilor',
      subtitle: 'Afla ce spun cursantii mei despre experienta lor de invatare',
    },
    intro: {
      lead: 'Citeste marturii de la cursanti din Romania, China, Thailanda si Vietnam care si-au imbunatatit engleza cu mine.',
      sub: 'Fiecare poveste este reala si vine cu obiective, accente si termene diferite.',
    },
    cta: {
      question: 'Vrei sa te alaturi acestor cursanti?',
      primary: 'Rezerva consultatia gratuita',
      secondary: 'Scrie-mi un mesaj',
    },
    testimonials: [
      {
        name: 'Iulia Costache',
        location: 'Bucuresti, Romania',
        rating: 5,
        text: 'Scrierea pentru Cambridge B2 era un zid. Daniel m-a pus sa rescriu fiecare introducere, sa schimb verbele lene si sa citesc cu voce tare. In opt saptamani am sarit de la 168 la 182 si am trimis in sfarsit dosarul pentru admitere.',
        course: 'Cambridge B2 First',
      },
      {
        name: 'Tudor Marinescu',
        location: 'Cluj-Napoca, Romania',
        rating: 4,
        text: 'Nu iubesc temele, dar Daniel a repetat cu mine fiecare exercitiu de Cambridge C1 pana nu am mai gresit. Dupa sase lectii am urcat la 187. Dau patru stele doar fiindca mereu apare cu noi phrasal verbs.',
        course: 'Cambridge C1 Advanced',
      },
      {
        name: 'Mara Stanescu',
        location: 'Timisoara, Romania',
        rating: 5,
        text: 'Aveam emotii doar la speaking. Doua sesiuni cu intrebari improvizate si nu mai traduc in cap; chiar am glumit cu examinatorul la Cambridge B2.',
        course: 'Cambridge B2 Speaking',
      },
      {
        name: 'Vlad Ionescu',
        location: 'Brasov, Romania',
        rating: 5,
        text: 'Daniel a ascultat fiecare mock C1 si a subliniat silabele ratate. O luna mai tarziu raportul de pronuntie a spus „control constant”.',
        course: 'Cambridge C1 Advanced',
      },
      {
        name: 'Chen Yuhan',
        location: 'Shanghai, China',
        rating: 5,
        text: 'Lectura la Cambridge C1 ma ametise. Am impartit textele in „batai de inima” si le-am cronometrat zilnic. Am luat 196 si profesorul de la scoala a ramas uimit.',
        course: 'Cambridge C1 Advanced',
      },
      {
        name: 'Gao Mingrui',
        location: 'Beijing, China',
        rating: 5,
        text: 'M-am concentrat pe ascultarea de C2 pentru ca asa cereau universitatile. Daniel mi-a trimis jurnale audio si le-am discutat pe trenuri de noapte. Scorul a urcat la 205.',
        course: 'Cambridge C2 Proficiency',
      },
      {
        name: 'Mei-Ling Zhou',
        location: 'Shenzhen, China',
        rating: 5,
        text: 'Pe scurt: nu mai intru in panica la use-of-English. Pe lung: Daniel m-a invatat sa fac liste de colocatii din serialele mele si acum termin partea a treia cu timp liber.',
        course: 'Cambridge B2 First',
      },
      {
        name: 'Ruihan Zhao',
        location: 'Chengdu, China',
        rating: 5,
        text: 'Aveam nevoie de scriere mai buna pentru Cambridge C1. Daniel a printat eseurile, a desenat sageti peste tot si m-a pus sa argumentez fiecare conector. Profesorul de la liceu a intrebat cine mi-a „lustruit” stilul.',
        course: 'Cambridge C1 Advanced',
      },
      {
        name: 'Ngoc-Ha Le',
        location: 'Ho Chi Minh City, Vietnam',
        rating: 5,
        text: 'Pregateam IELTS si Cambridge, dar listening-ul de B2 ramanea jos. Lectiile scurte de dimineata m-au invatat sa anticipez distractorii si am luat 180.',
        course: 'Cambridge B2 First',
      },
      {
        name: 'Bao Minh Tran',
        location: 'Da Nang, Vietnam',
        rating: 5,
        text: 'Daniel a transformat lectura de B1 in joc de „harta comorii”. In mai putin de o luna am economisit sase minute pe test si am scos 162.',
        course: 'Cambridge B1 Preliminary',
      },
      {
        name: 'Phuong Anh Vu',
        location: 'Hanoi, Vietnam',
        rating: 4,
        text: 'Monologul din Cambridge B2 ma bloca. Jurnalul vocal si intrebarile surpriza au functionat, dar ii dau patru stele fiindca inca imi trimite provocari la 21:00.',
        course: 'Cambridge B2 Speaking',
      },
      {
        name: 'Chanon Phichitkul',
        location: 'Bangkok, Thailanda',
        rating: 5,
        text: 'Aveam nevoie de Cambridge C1 pentru schimb de experienta. Am facut zile complete de simulare si am invatat sa-mi dozez energia. Am luat 191 si am dormit 12 ore dupa examen.',
        course: 'Cambridge C1 Advanced',
      },
      {
        name: 'Sirinapa Boonsri',
        location: 'Chiang Mai, Thailanda',
        rating: 5,
        text: 'Voiam doar sa trec la Cambridge B2. Improvizatiile lui Daniel m-au relaxat si examinatorul a ras la povestea cu scuterul pierdut.',
        course: 'Cambridge B2 First',
      },
      {
        name: 'Kittima Sorapong',
        location: 'Phuket, Thailanda',
        rating: 5,
        text: 'Fiica mea Pai a facut Cambridge Young Learners. Daniel a creat harti cu pirati pentru fiecare sunet si dupa patru saptamani a citit testul fara sa-mi stranga mana.',
        course: 'Cambridge Young Learners',
      },
    ],
  },
}

export default function ReviewsPage() {
  const { locale } = useLanguage()
  const copy = reviewsCopy[locale]

  return (
    <>
      <PageHeader title={copy.header.title} subtitle={copy.header.subtitle} />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg font-inter text-gray-600 mb-4">{copy.intro.lead}</p>
            <p className="text-base font-inter text-gray-600">{copy.intro.sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {copy.testimonials.map((testimonial, index) => (
              <Card key={`${testimonial.name}-${index}`} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 font-inter mb-4 leading-relaxed">"{testimonial.text}"</p>

                  <div className="border-t pt-4">
                    <p className="font-poppins font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 font-inter">{testimonial.location}</p>
                    <p className="text-sm text-soft-blue font-inter font-medium">{testimonial.course}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-lg font-inter text-gray-600 mb-6">{copy.cta.question}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book"
                className="px-8 py-3 bg-soft-blue hover:bg-soft-blue-dark text-white font-poppins font-medium text-base rounded-lg inline-block"
              >
                {copy.cta.primary}
              </a>
              <a
                href="/contact"
                className="px-8 py-3 border-2 border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white font-poppins font-medium text-base rounded-lg inline-block"
              >
                {copy.cta.secondary}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}