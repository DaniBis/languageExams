import { PageHeader } from '@/components/page-header'

export default function CambridgePage() {
  return (
    <>
      <PageHeader
        title="Cambridge Exam Preparation"
        subtitle="Prepare for B1, B2, and C1 Cambridge exams"
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg font-inter text-gray-600 leading-relaxed mb-8">
              Specialized preparation for Cambridge English exams including B1 Preliminary, B2 First, and C1 Advanced.
            </p>
            <p className="text-lg font-inter text-gray-600 leading-relaxed">
              Perfect for Romanian students aiming for university admission or professional certification.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}