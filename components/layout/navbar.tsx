'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Me', href: '/about' },
    {
      name: 'Services',
      href: '#',
      submenu: [
        { name: 'Cambridge Preparation', href: '/cambridge' },
        { name: 'IELTS Preparation', href: '/ielts' },
        { name: 'General English', href: '/general-english' },
      ]
    },
    { name: 'Prices', href: '/prices' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-6 md:px-20">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="font-poppins font-bold text-2xl text-soft-blue">
            English with Daniel
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.submenu ? (
                <div key={item.name} className="relative group">
                  <button className="font-poppins font-medium text-base text-gray-800 hover:text-soft-blue transition-colors">
                    {item.name} ▼
                  </button>
                  <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-soft-blue transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-poppins font-medium text-base text-gray-800 hover:text-soft-blue transition-colors"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          <div className="hidden md:block">
            <Link href="/book">
              <Button className="px-6 py-2 bg-soft-blue hover:bg-soft-blue-dark text-white">
                Book a Lesson
              </Button>
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            {navItems.map((item) => (
              item.submenu ? (
                <div key={item.name} className="space-y-2">
                  <div className="font-poppins font-semibold text-gray-800 px-4">{item.name}</div>
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.name}
                      href={subitem.href}
                      className="block px-8 py-2 text-gray-600 hover:text-soft-blue transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subitem.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 font-poppins text-gray-800 hover:text-soft-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            <div className="px-4 pt-4">
              <Link href="/book">
                <Button className="w-full bg-soft-blue hover:bg-soft-blue-dark text-white">
                  Book a Lesson
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}