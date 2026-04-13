'use client'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={e => { e.preventDefault(); scrollTo('#hero') }}
          className="text-2xl font-bold text-dark flex items-baseline gap-1"
          data-hover="true"
        >
          <span style={{ fontFamily: 'Istok Web' }}>MO</span>
          <span className="text-primary">.</span>
          <span className="text-sm font-normal text-muted">tech</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="nav-link text-sm font-medium text-[#2e2b2b] hover:text-primary transition-colors pb-1"
                data-hover="true"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="https://wa.me/201000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex btn-primary bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-full items-center gap-2"
          data-hover="true"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"/>
          </svg>
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          data-hover="true"
        >
          <span className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left text-sm font-medium text-[#2e2b2b] hover:text-primary transition-colors"
              data-hover="true"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
