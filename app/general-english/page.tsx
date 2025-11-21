import { PageHeader } from '@/components/page-header'

export default function GeneralEnglishPage() {
  return (
    <>
      <PageHeader
        title="General English"
        subtitle="Improve your speaking, grammar, and pronunciation skills"
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg font-inter text-gray-600 leading-relaxed mb-8">
              General English lessons focusing on conversation, grammar, vocabulary, and pronunciation.
            </p>
            <p className="text-lg font-inter text-gray-600 leading-relaxed">
              Suitable for all levels and ages, from teens to adults.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}