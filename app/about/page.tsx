import { PageHeader } from '@/components/page-header'

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Me"
        subtitle="Get to know your English tutor"
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg font-inter text-gray-600 leading-relaxed mb-8">
              Welcome! I'm Daniel, an experienced English tutor specializing in Cambridge and IELTS exam preparation.
            </p>
            <p className="text-lg font-inter text-gray-600 leading-relaxed">
              With years of experience teaching Romanian and Chinese students, I help you achieve your English goals with clear explanations and personalized feedback.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}