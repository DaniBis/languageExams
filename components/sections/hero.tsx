import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="bg-white py-16 md:py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-gray-900 leading-tight mb-6">
              Clear English. Confident You.
            </h1>
            <p className="text-lg md:text-xl font-inter text-gray-600 leading-relaxed mb-8">
              Cambridge & IELTS Exam Preparation with an Experienced International Tutor
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/book">
                <Button className="px-8 py-3 bg-soft-blue hover:bg-soft-blue-dark text-white font-poppins font-medium text-base rounded-lg">
                  Book Your Free Consultation
                </Button>
              </Link>
              <Link href="/prices">
                <Button variant="outline" className="px-8 py-3 border-2 border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white font-poppins font-medium text-base rounded-lg">
                  View Prices
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-soft-blue-light to-soft-blue rounded-2xl aspect-square flex items-center justify-center">
              <span className="text-white text-6xl">👨‍🏫</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}