import { PageHeader } from '@/components/page-header'

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Me"
        subtitle="Get in touch for your English learning journey"
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg font-inter text-gray-600 mb-8">
              Ready to start your English learning journey? Contact me today!
            </p>
            <p className="text-base font-inter text-gray-600">
              Email: daniel@englishwithdaniel.com
            </p>
          </div>
        </div>
      </section>
    </>
  )
}