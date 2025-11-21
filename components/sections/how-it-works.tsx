export function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Book a Free Consultation',
      description: 'Schedule a free 15-minute chat to discuss your goals. We\'ll talk about what you want to achieve and how I can help.',
    },
    {
      step: '2',
      title: 'Choose Your Package',
      description: 'Select the lesson package that fits your needs and budget. Flexible options from 5 to 20 lessons.',
    },
    {
      step: '3',
      title: 'Start Learning',
      description: 'Begin your personalized lessons and track your progress. Every lesson brings you closer to your goals.',
    },
    {
      step: '4',
      title: 'Achieve Your Goals',
      description: 'Pass your exam or reach your English goals with confidence. Join the students who have already succeeded.',
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-poppins font-bold text-xl">{step.step}</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 font-inter leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}