import { PageHeader } from '@/components/page-header'

export default function BookPage() {
  return (
    <>
      <PageHeader
        title="Book a Lesson"
        subtitle="Schedule your English tutoring session"
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg font-inter text-gray-600 mb-8">
              Book your free consultation or lesson with me.
            </p>
            <p className="text-base font-inter text-gray-600">
              Calendly integration will be added here.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}