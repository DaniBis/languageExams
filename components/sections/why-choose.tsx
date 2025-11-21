export function WhyChoose() {
  const reasons = [
    {
      title: 'Easy Explanations',
      description: 'Complex grammar made simple with clear, step-by-step explanations you\'ll actually understand. No confusing rules or difficult terminology.',
    },
    {
      title: 'Personalized Feedback',
      description: 'Individual attention focused on your specific goals, mistakes, and learning style. Every lesson is designed just for you.',
    },
    {
      title: 'International Experience',
      description: 'Proven success teaching Romanian and Chinese students, understanding your unique challenges. I know what works for learners from different backgrounds.',
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            Why Students Choose English with Daniel
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600 font-inter leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}