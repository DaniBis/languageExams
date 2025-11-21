interface PageHeaderProps {
  title: string
  subtitle?: string
  gradient?: boolean
}

export function PageHeader({ title, subtitle, gradient = false }: PageHeaderProps) {
  if (gradient) {
    return (
      <section className="bg-gradient-to-r from-soft-blue-light to-soft-blue py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20 text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl font-inter text-white opacity-90 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white border-b border-gray-200 py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-6 md:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl font-inter text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}