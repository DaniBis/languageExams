import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Testimonials() {
  const testimonials = [
    {
      quote: '"Daniel helped me pass my Cambridge B2 exam with a great score. His explanations are so clear and he\'s always patient and encouraging!"',
      author: 'Ana, Romania',
      exam: 'Cambridge B2 First',
    },
    {
      quote: '"I improved my IELTS speaking from 5.5 to 7.0 in just three months. Daniel understood exactly what I needed to work on."',
      author: 'Wei, China',
      exam: 'IELTS Academic',
    },
    {
      quote: '"Finally, grammar makes sense! Daniel explains everything in a simple way and I feel confident speaking English now."',
      author: 'Maria, Romania',
      exam: 'General English',
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-soft-blue-light">
      <div className="container max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            What Students Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <blockquote className="text-gray-700 font-inter italic mb-4">
                {testimonial.quote}
              </blockquote>
              <cite className="text-gray-900 font-poppins font-medium">
                — {testimonial.author} • {testimonial.exam}
              </cite>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/reviews">
            <Button variant="outline" className="px-6 py-2 border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white">
              Read More Reviews
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}