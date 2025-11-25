"use client"

import Image from 'next/image'
import { useLanguage, type Locale } from '@/contexts/language-context'

const visualCopy: Record<Locale, {
  heading: string
  description: string
  tiles: { title: string; body: string; image: string }[]
}> = {
  en: {
    heading: 'See the learning experience',
    description: 'Authentic snapshots from online lessons, study boards, and happy exam-day messages so you know exactly what to expect.',
    tiles: [
      {
        title: 'Remote lessons, real connection',
        body: 'Live calls with shared boards, pronunciation clips, and calm coaching wherever you are in the world.',
        image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Color-coded notes & feedback',
        body: 'Each session ends with annotated slides, action items, and vocabulary banks you can revisit anytime.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Official results & celebrations',
        body: 'Students often send photos of IELTS band reports and Cambridge certificates when the big news arrives!',
        image: 'https://images.unsplash.com/photo-1484981138541-3d074aa97716?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
  ro: {
    heading: 'Vezi cum arata lectiile',
    description: 'Momente reale din sedintele online, boardurile de lucru si mesajele de dupa examen ca sa stii la ce sa te astepti.',
    tiles: [
      {
        title: 'Lectii la distanta, conexiune reala',
        body: 'Intalniri live cu boarduri partajate, inregistrari de pronuntie si coaching calm oriunde te afli.',
        image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Notite si feedback colorate',
        body: 'Fiecare sesiune se incheie cu slide-uri adnotate, pasi concreti si banci de vocabular la care revii oricand.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Rezultate oficiale si bucurie',
        body: 'Cursantii imi trimit poze cu rapoarte IELTS si certificate Cambridge cand primesc vestea cea mare!',
        image: 'https://images.unsplash.com/photo-1484981138541-3d074aa97716?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
}

export function VisualGallery() {
  const { locale } = useLanguage()
  const copy = visualCopy[locale]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            {copy.heading}
          </h2>
          <p className="text-lg font-inter text-gray-600 max-w-3xl mx-auto">
            {copy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {copy.tiles.map((tile) => (
            <div key={tile.title} className="rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.12)] border border-white/70">
              <div className="relative h-72">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-poppins font-semibold mb-2">{tile.title}</h3>
                  <p className="text-sm font-inter leading-relaxed">{tile.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
