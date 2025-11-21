import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'English with Daniel | Cambridge & IELTS Exam Preparation',
  description: 'Professional English tutoring for Cambridge B1/B2/C1 and IELTS exam preparation. Clear explanations, personalized feedback, and proven success with Romanian and Chinese students.',
  keywords: 'English tutor, Cambridge exam, IELTS preparation, B1 B2 C1, English lessons, Romanian students, Chinese students',
  authors: [{ name: 'Daniel' }],
  openGraph: {
    title: 'English with Daniel - Clear English. Confident You.',
    description: 'Cambridge & IELTS Exam Preparation with an Experienced International Tutor',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}