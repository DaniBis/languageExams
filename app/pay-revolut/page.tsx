import { PageHeader } from '@/components/page-header'

export default function PayRevolutPage() {
  return (
    <>
      <PageHeader
        title="Pay via Revolut"
        subtitle="Easy and secure payment for your lessons"
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg font-inter text-gray-600 leading-relaxed mb-8">
              Pay for your English lessons securely using Revolut.
            </p>
            <p className="text-base font-inter text-gray-600">
              Payment instructions will be added here.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}