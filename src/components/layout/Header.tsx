'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Why Korea', href: '/why-korea' },
  { label: 'Packages', href: '/packages' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'For Schools', href: '/for-schools' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-md'
          : 'shadow-sm'
      }`}
      aria-label="Site header"
    >
      {/* Top contact bar — desktop only */}
      <div className="bg-primary text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center gap-4">
            <span>📞 +82-2-xxx-xxxx</span>
            <span>📧 info@discoverkorea.edu</span>
          </span>
          <span className="text-white/70 text-xs">
            Trusted by 50+ schools &amp; 1000+ students since 2020
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`border-b border-gray-100 transition-colors duration-300 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-md'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
        aria-label="Primary navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="font-poppins font-bold text-xl text-primary tracking-tight shrink-0"
              aria-label="Discover Korea — home"
            >
              Discover Korea
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-1" role="list">
              {navLinks.map(({ label, href }) => {
                const isActive =
                  href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(href)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? 'text-primary bg-primary/10 font-semibold'
                          : 'text-text-secondary hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Right side: WhatsApp CTA + Language toggle */}
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-xs font-medium text-text-secondary border border-gray-200 rounded px-2 py-1 cursor-pointer hover:border-primary hover:text-primary transition-colors">
                EN
              </span>
              <a
                href="https://wa.me/82xxxxxxxxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20b958] text-white text-sm font-medium px-3 py-1.5 rounded-full transition-colors duration-150"
                aria-label="Chat on WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.552 4.107 1.519 5.836L0 24l6.335-1.54A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.37l-.36-.214-3.724.905.945-3.64-.235-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded-md text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu — animate-slide-down on open */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-gray-100 bg-white animate-slide-down"
            aria-label="Mobile navigation"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map(({ label, href }) => {
                const isActive =
                  href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-primary bg-primary/10 font-semibold'
                        : 'text-text-secondary hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}

              {/* Mobile contact bar */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <p className="text-xs text-text-secondary px-3">
                  📞 +82-2-xxx-xxxx &nbsp;|&nbsp; 📧 info@discoverkorea.edu
                </p>
                <div className="flex items-center gap-2 px-3">
                  <a
                    href="https://wa.me/82xxxxxxxxxx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20b958] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
                    aria-label="Chat on WhatsApp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.552 4.107 1.519 5.836L0 24l6.335-1.54A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.37l-.36-.214-3.724.905.945-3.64-.235-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                  <span className="text-xs font-medium text-text-secondary border border-gray-200 rounded px-2 py-1.5 cursor-pointer">
                    EN
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
