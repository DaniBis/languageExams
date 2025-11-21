import { PageHeader } from '@/components/page-header'

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        title="Student Reviews"
        subtitle="See what my students say about their English learning experience"
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg font-inter text-gray-600 mb-8">
              Read testimonials from Romanian and Chinese students.
            </p>
            <p className="text-base font-inter text-gray-600">
              Reviews will be added here.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}