import { PageHeader } from '@/components/page-header'

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Daniel"
        subtitle="Your English Tutor & Exam Preparation Specialist"
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-6">Hello! I'm Daniel</h2>
            <p className="text-lg font-inter text-gray-600 leading-relaxed mb-6">
              Hi, I'm Daniel, and I love helping students achieve their English goals. For me, teaching isn't just a job—it's a passion.
            </p>
            <p className="text-lg font-inter text-gray-600 leading-relaxed mb-6">
              I became an English tutor because I believe everyone deserves to communicate confidently in English, whether that's passing an important exam, getting into university, advancing in their career, or simply feeling comfortable speaking.
            </p>
            <p className="text-lg font-inter text-gray-600 leading-relaxed mb-6">
              My teaching philosophy is simple: English should be clear, not confusing. I break down complex grammar into easy steps, use real examples, and create a relaxed environment where you feel safe to make mistakes and learn from them.
            </p>
            <p className="text-lg font-inter text-gray-600 leading-relaxed">
              What I enjoy most is seeing that moment when something finally clicks for a student. Whether it's understanding a tricky grammar point, speaking more fluently, or passing that important exam—your success is my success.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-6">Experience & Qualifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Teaching Certifications</h3>
                <ul className="text-gray-600 font-inter space-y-2">
                  <li>• Certified English Language Teacher (TEFL/CELTA)</li>
                  <li>• Specialized training in Cambridge and IELTS exam preparation</li>
                  <li>• Over 5 years of experience teaching English online and in-person</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Exam Expertise</h3>
                <ul className="text-gray-600 font-inter space-y-2">
                  <li>• Cambridge B1 Preliminary (PET)</li>
                  <li>• Cambridge B2 First (FCE)</li>
                  <li>• Cambridge C1 Advanced (CAE)</li>
                  <li>• IELTS Academic and General Training</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">International Experience</h3>
                <ul className="text-gray-600 font-inter space-y-2">
                  <li>• Extensive experience teaching Romanian students preparing for Cambridge exams</li>
                  <li>• Proven success with Chinese students improving IELTS scores</li>
                  <li>• Understanding of specific challenges faced by students from different language backgrounds</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-6">My Teaching Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Clear, Simple Explanations</h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  I break down complex grammar into easy-to-understand concepts. You won't hear confusing terminology or complicated rules—just clear, practical explanations that make sense.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Personalized Attention</h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  Every lesson is tailored to your specific needs and goals. We focus on what you need to improve, whether that's grammar accuracy, speaking fluency, or exam strategies.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Practical Focus</h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  We work with real exam questions, real-world situations, and practical examples. Everything you learn, you can use immediately.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Supportive Environment</h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  Learning English should be encouraging, not stressful. I create a relaxed, friendly atmosphere where you feel comfortable practicing and making mistakes—because that's how we learn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-soft-blue-light">
        <div className="container max-w-7xl mx-auto px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-6">Understanding Your Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Working with Romanian Students</h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  I have extensive experience helping Romanian students prepare for Cambridge B1, B2, and C1 exams. I understand the specific grammar challenges Romanian speakers face and know exactly how to help you overcome them. Many of my Romanian students have successfully passed their exams and gone on to study abroad or advance in their careers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Working with Chinese Students</h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  I specialize in helping Chinese students achieve their IELTS and Cambridge goals. I understand the unique pronunciation and grammar challenges Chinese learners face, and I have proven strategies to help you improve your speaking, writing, and band scores. My Chinese students have successfully gained university admissions and immigration visas through improved IELTS scores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-20 text-center">
          <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">Let's Work Together</h2>
          <p className="text-lg font-inter text-gray-600 mb-8 max-w-2xl mx-auto">
            I'd love to help you achieve your English goals. Whether you're preparing for an exam or just want to speak more confidently, I'm here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="px-8 py-3 bg-soft-blue hover:bg-soft-blue-dark text-white font-poppins font-medium text-base rounded-lg inline-block">
              Book a Free Consultation
            </a>
            <a href="/reviews" className="px-8 py-3 border-2 border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white font-poppins font-medium text-base rounded-lg inline-block">
              See Student Reviews
            </a>
          </div>
        </div>
      </section>
    </>
  )
}