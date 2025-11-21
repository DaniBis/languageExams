import { PageHeader } from '@/components/page-header'

export default function IELTSPage() {
  return (
    <>
      <PageHeader
        title="IELTS Exam Preparation"
        subtitle="Ace your IELTS Academic or General Training exam"
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg font-inter text-gray-600 leading-relaxed mb-8">
              Comprehensive IELTS preparation for both Academic and General Training modules.
            </p>
            <p className="text-lg font-inter text-gray-600 leading-relaxed">
              Ideal for Chinese students seeking higher education or immigration opportunities.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}