import { PageHeader } from '@/components/page-header'

export default function PricesPage() {
  return (
    <>
      <PageHeader
        title="Prices & Packages"
        subtitle="Choose the perfect plan for your English learning goals"
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg font-inter text-gray-600 mb-8">
              Affordable pricing for Cambridge and IELTS preparation.
            </p>
            <p className="text-base font-inter text-gray-600">
              Pricing cards will be added here.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}