import Link from 'next/link'
import { Facebook, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container max-w-7xl mx-auto px-6 md:px-20 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Quick Links */}
          <div>
            <h5 className="font-poppins font-semibold text-lg text-gray-800 mb-4">Quick Links</h5>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-600 hover:text-soft-blue transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-soft-blue transition-colors">About Me</Link></li>
              <li><Link href="/prices" className="text-gray-600 hover:text-soft-blue transition-colors">Prices & Packages</Link></li>
              <li><Link href="/reviews" className="text-gray-600 hover:text-soft-blue transition-colors">Student Reviews</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-soft-blue transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <h5 className="font-poppins font-semibold text-lg text-gray-800 mb-4">Services</h5>
            <ul className="space-y-3">
              <li><Link href="/cambridge" className="text-gray-600 hover:text-soft-blue transition-colors">Cambridge Preparation</Link></li>
              <li><Link href="/ielts" className="text-gray-600 hover:text-soft-blue transition-colors">IELTS Preparation</Link></li>
              <li><Link href="/general-english" className="text-gray-600 hover:text-soft-blue transition-colors">General English</Link></li>
              <li><Link href="/book" className="text-gray-600 hover:text-soft-blue transition-colors">Book a Lesson</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h5 className="font-poppins font-semibold text-lg text-gray-800 mb-4">Contact</h5>
            <ul className="space-y-3">
              <li className="text-gray-600">Email: daniel@englishwithdaniel.com</li>
              <li className="text-gray-600">WhatsApp: +XX XXX XXX XXXX</li>
              <li className="text-gray-600">Location: [City, Country]</li>
              <li className="text-gray-600">Time Zone: CET</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-soft-blue transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-soft-blue transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-soft-blue transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h5 className="font-poppins font-semibold text-lg text-gray-800 mb-4">Resources</h5>
            <ul className="space-y-3">
              <li><Link href="/pay-revolut" className="text-gray-600 hover:text-soft-blue transition-colors">Pay via Revolut</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-soft-blue transition-colors">FAQ</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-soft-blue transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-soft-blue transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-600">© 2025 English with Daniel. All rights reserved.</p>
          <p className="text-base text-soft-blue mt-2 font-poppins">Clear English. Confident You.</p>
        </div>
      </div>
    </footer>
  )
}