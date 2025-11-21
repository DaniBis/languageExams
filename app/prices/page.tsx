import { PageHeader } from '@/components/page-header'
import { PricingCards } from '@/components/sections/pricing-cards'

export default function PricesPage() {
  return (
    <>
      <PageHeader
        title="Prices & Packages"
        subtitle="Flexible Options to Fit Your Needs and Budget"
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg font-inter text-gray-600">
              Choose the package that works best for you. All lessons include personalized feedback and materials.
            </p>
          </div>

          <PricingCards />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-6 text-center">What's Included in All Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-soft-blue mr-3">✓</span>
                  <span className="text-gray-600 font-inter">Personalized lesson plans tailored to your goals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-soft-blue mr-3">✓</span>
                  <span className="text-gray-600 font-inter">All learning materials and resources</span>
                </li>
                <li className="flex items-start">
                  <span className="text-soft-blue mr-3">✓</span>
                  <span className="text-gray-600 font-inter">Detailed feedback and corrections</span>
                </li>
                <li className="flex items-start">
                  <span className="text-soft-blue mr-3">✓</span>
                  <span className="text-gray-600 font-inter">Homework assignments (optional)</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-soft-blue mr-3">✓</span>
                  <span className="text-gray-600 font-inter">Flexible scheduling to fit your life</span>
                </li>
                <li className="flex items-start">
                  <span className="text-soft-blue mr-3">✓</span>
                  <span className="text-gray-600 font-inter">Online lessons via Zoom/Skype</span>
                </li>
                <li className="flex items-start">
                  <span className="text-soft-blue mr-3">✓</span>
                  <span className="text-gray-600 font-inter">Progress tracking</span>
                </li>
              </ul>
            </div>
            <p className="text-center text-gray-600 font-inter mt-8">
              No hidden costs. Everything you need is included.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20 text-center">
          <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg font-inter text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose your package and start improving your English today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="px-8 py-3 bg-soft-blue hover:bg-soft-blue-dark text-white font-poppins font-medium text-base rounded-lg inline-block">
              Book Your Package Now
            </a>
            <a href="/contact" className="px-8 py-3 border-2 border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white font-poppins font-medium text-base rounded-lg inline-block">
              Questions? Contact Me
            </a>
          </div>
        </div>
      </section>
    </>
  )
}