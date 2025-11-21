import { Card } from '@/components/ui/card'

export function Services() {
  const services = [
    {
      title: 'Cambridge B1/B2/C1 Preparation',
      description: 'Pass your Cambridge B1 Preliminary, B2 First, or C1 Advanced exam with confidence. I\'ll guide you through every part of the test with clear strategies, practice materials, and personalized feedback on your progress.',
    },
    {
      title: 'IELTS Preparation',
      description: 'Achieve your target IELTS band score for university, immigration, or career opportunities. We\'ll focus on exam strategies, improve your writing and speaking, and practice with real IELTS test formats.',
    },
    {
      title: 'General English',
      description: 'Improve your everyday English for work, travel, or personal growth. We\'ll focus on the skills you need: clear grammar explanations, confident speaking, and practical vocabulary you can use right away.',
    },
    {
      title: 'Pronunciation Training',
      description: 'Speak English clearly and confidently with focused pronunciation practice. We\'ll work on difficult sounds, natural intonation, and fluent speech patterns. Available with all courses.',
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            English Lessons Tailored to Your Goals
          </h2>
          <p className="text-lg font-inter text-gray-600 max-w-3xl mx-auto">
            Whether you're preparing for Cambridge exams, aiming for your target IELTS score, or improving your everyday English, I'm here to help you succeed with clear explanations and personalized support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 font-inter leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}