'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLanguage, type Locale } from '@/contexts/language-context'
import { LanguageSwitcher } from '@/components/language-switcher'

interface NavItem {
  name: string
  href: string
  submenu?: { name: string; href: string; description?: string }[]
}
const navItemsByLocale: Record<Locale, NavItem[]> = {
  en: [
    { name: 'Home', href: '/' },
    { name: 'About Me', href: '/about' },
    {
      name: 'Services',
      href: '#',
      submenu: [
        { name: 'Cambridge Preparation', href: '/cambridge', description: 'Speaking drills & mock exams' },
        { name: 'IELTS Preparation', href: '/ielts', description: 'Band-focused strategies' },
        { name: 'General English', href: '/general-english', description: 'Confidence for everyday speaking' },
      ],
    },
    { name: 'Prices', href: '/prices' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ],
  ro: [
    { name: 'Acasă', href: '/' },
    { name: 'Despre mine', href: '/about' },
    {
      name: 'Servicii',
      href: '#',
      submenu: [
        { name: 'Pregătire Cambridge', href: '/cambridge', description: 'Exerciții de vorbire și simulări' },
        { name: 'Pregătire IELTS', href: '/ielts', description: 'Strategii pentru scorul țintă' },
        { name: 'Engleză generală', href: '/general-english', description: 'Încredere pentru conversații zilnice' },
      ],
    },
    { name: 'Tarife', href: '/prices' },
    { name: 'Recenzii', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ],
}

const bookCtaCopy: Record<Locale, string> = {
  en: 'Book a Lesson',
  ro: 'Programează o lecție',
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null)
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null)
  const desktopMenuCloseTimer = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const { locale } = useLanguage()

  const navItems = useMemo(() => navItemsByLocale[locale], [locale])

  useEffect(() => {
    return () => {
      if (desktopMenuCloseTimer.current) {
        clearTimeout(desktopMenuCloseTimer.current)
      }
    }
  }, [])

  const closeMobileMenu = () => setIsMenuOpen(false)

  const handleDesktopMenuEnter = (menuName: string) => {
    if (desktopMenuCloseTimer.current) {
      clearTimeout(desktopMenuCloseTimer.current)
      desktopMenuCloseTimer.current = null
    }
    setOpenDesktopMenu(menuName)
  }

  const handleDesktopMenuLeave = (menuName: string) => {
    desktopMenuCloseTimer.current = setTimeout(() => {
      setOpenDesktopMenu((current) => (current === menuName ? null : current))
    }, 200)
  }

  const activeChecker = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href)
  }

  return (
    <nav className="sticky top-4 z-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative flex items-center justify-between gap-4 rounded-3xl border border-white/70 bg-white/80 px-4 py-3 shadow-2xl shadow-soft-blue/10 backdrop-blur-xl lg:px-8">
          <Link href="/" className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-400">English tutor</span>
            <span className="text-2xl font-poppins font-bold text-gray-900">English with Daniel</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeChecker(item.href)

              if (!item.submenu) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'relative text-sm font-semibold font-poppins px-2 py-1 transition-all',
                      isActive ? 'text-soft-blue' : 'text-gray-600 hover:text-gray-900'
                    )}
                  >
                    {item.name}
                    <span
                      className={cn(
                        'absolute left-1/2 -bottom-1 h-1.5 w-1.5 rounded-full bg-soft-blue transition-opacity duration-200',
                        isActive ? 'opacity-100 -translate-x-1/2' : 'opacity-0'
                      )}
                    />
                  </Link>
                )
              }

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleDesktopMenuEnter(item.name)}
                  onMouseLeave={() => handleDesktopMenuLeave(item.name)}
                >
                  <button
                    className="flex items-center gap-1 text-sm font-semibold font-poppins text-gray-700 hover:text-soft-blue transition-colors"
                    aria-haspopup="menu"
                    aria-expanded={openDesktopMenu === item.name}
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div
                    className={cn(
                      'absolute left-1/2 top-full z-40 mt-4 w-72 -translate-x-1/2 rounded-2xl border border-gray-100 bg-white/95 shadow-xl backdrop-blur-md transition-all',
                      openDesktopMenu === item.name ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
                    )}
                  >
                    <div className="p-3 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block rounded-xl px-4 py-3 hover:bg-soft-blue-light/50"
                        >
                          <p className="text-sm font-semibold text-gray-800">{subitem.name}</p>
                          {subitem.description && <p className="text-xs text-gray-500">{subitem.description}</p>}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/book">
              <Button className="rounded-full bg-soft-blue px-6 py-2 text-white shadow-lg shadow-soft-blue/40 hover:bg-soft-blue-dark">
                {bookCtaCopy[locale]}
              </Button>
            </Link>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-full border border-gray-200 p-2 text-gray-700 lg:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-3 rounded-3xl border border-gray-100 bg-white/95 px-4 py-6 shadow-2xl shadow-soft-blue/10 backdrop-blur-xl lg:hidden">
            <div className="flex justify-end mb-4">
              <LanguageSwitcher />
            </div>
            <div className="space-y-4">
              {navItems.map((item) => {
                if (!item.submenu) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        'block rounded-2xl px-4 py-3 text-base font-poppins font-semibold',
                        activeChecker(item.href) ? 'bg-soft-blue-light/60 text-soft-blue' : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                }

                const isOpen = openMobileSection === item.name
                return (
                  <div key={item.name} className="rounded-2xl border border-gray-100 bg-white/90">
                    <button
                      className="flex w-full items-center justify-between px-4 py-3 text-base font-poppins font-semibold text-gray-800"
                      onClick={() => setOpenMobileSection((prev) => (prev === item.name ? null : item.name))}
                    >
                      {item.name}
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {isOpen && (
                      <div className="space-y-2 border-t border-gray-100 px-4 py-3">
                        {item.submenu?.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            onClick={() => {
                              setOpenMobileSection(null)
                              closeMobileMenu()
                            }}
                            className="block rounded-xl px-3 py-2 text-sm text-gray-600 hover:bg-soft-blue-light/60 hover:text-soft-blue"
                          >
                            <p className="font-semibold">{subitem.name}</p>
                            {subitem.description && <p className="text-xs text-gray-500">{subitem.description}</p>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-6 space-y-3">
              <Link href="/book" onClick={closeMobileMenu}>
                <Button className="w-full rounded-2xl bg-soft-blue py-3 text-white">
                  {bookCtaCopy[locale]}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}