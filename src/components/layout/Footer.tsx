"use client"

import Link from 'next/link'

const quickLinks = [
  { label: 'Why Korea', href: '/why-korea' },
  { label: 'Packages', href: '/packages' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'For Schools', href: '/for-schools' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

const tourPackages = [
  { label: '5N6D Seoul & Busan', href: '/packages/5n6d-seoul-busan' },
  { label: '8D7N STEM & Industry', href: '/packages/8d7n-stem-industry' },
  { label: '9D8N Comprehensive Korea', href: '/packages/9d8n-comprehensive' },
  { label: '10D9N Korea & Jeju', href: '/packages/10d9n-korea-jeju' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/discoverkorea', icon: 'IG' },
  { label: 'YouTube', href: 'https://youtube.com/@discoverkorea', icon: 'YT' },
  { label: 'Facebook', href: 'https://facebook.com/discoverkorea', icon: 'FB' },
]

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Newsletter row */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-poppins font-semibold text-lg">Stay updated on Korea travel</p>
              <p className="text-white/70 text-sm mt-0.5">Get exclusive offers, itinerary ideas & scholarship news.</p>
            </div>
            <form
              className="flex w-full sm:w-auto gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address for newsletter"
                required
                className="flex-1 sm:w-64 px-4 py-2.5 rounded-lg text-text-primary text-sm placeholder-text-secondary bg-white focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors duration-150 shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main 4-column grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <p className="font-poppins font-bold text-2xl text-white mb-1">Discover Korea</p>
            <p className="text-secondary font-medium text-sm mb-3">Educational Travel for Indian Students</p>
            <p className="text-white/65 text-sm leading-relaxed">
              We craft immersive, safe, and educational journeys to South Korea — connecting Indian students with Korean culture, technology, and history since 2020.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://instagram.com/discoverkorea"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/60 hover:text-white transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://youtube.com/@discoverkorea"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white/60 hover:text-white transition-colors"
              >
                <YouTubeIcon />
              </a>
              <a
                href="https://facebook.com/discoverkorea"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-white text-base mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/65 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Tour Packages */}
          <div>
            <h3 className="font-poppins font-semibold text-white text-base mb-4">Tour Packages</h3>
            <ul className="space-y-2.5">
              {tourPackages.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/65 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="font-poppins font-semibold text-white text-base mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5 shrink-0" aria-hidden="true">✉</span>
                <a
                  href="mailto:info@discoverkorea.edu"
                  className="text-white/65 hover:text-white text-sm transition-colors"
                >
                  info@discoverkorea.edu
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5 shrink-0" aria-hidden="true">📞</span>
                <a
                  href="tel:+8220000000"
                  className="text-white/65 hover:text-white text-sm transition-colors"
                >
                  +82-2-xxx-xxxx (Korea)
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5 shrink-0" aria-hidden="true">📞</span>
                <a
                  href="tel:+910000000000"
                  className="text-white/65 hover:text-white text-sm transition-colors"
                >
                  +91-xx-xxxx-xxxx (India)
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#25D366] mt-0.5 shrink-0" aria-hidden="true">💬</span>
                <a
                  href="https://wa.me/82xxxxxxxxxx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/65 hover:text-white text-sm transition-colors"
                >
                  WhatsApp: +82-xx-xxxx-xxxx
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/50">
            <p>&copy; 2026 Discover Korea. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span aria-hidden="true">|</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
