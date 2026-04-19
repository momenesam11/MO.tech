'use client'
import { FaGithub, FaLinkedinIn, FaBehance, FaWhatsapp } from 'react-icons/fa6'
import { HiEnvelope, HiMapPin } from 'react-icons/hi2'

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#111] dark:bg-[#0a0a0a] text-white transition-colors duration-300">
      {/* Top glow line */}
      <div className="footer-glow w-full" />

      <div className="max-w-7xl mx-auto px-10 md:px-20 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold flex items-baseline gap-1" style={{ fontFamily: 'Istok Web' }}>
              <span>MO</span>
              <span className="text-primary">.</span>
              <span className="text-sm font-normal text-gray-400 ml-1">tech</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              UI/UX Designer &amp; Frontend Developer crafting beautiful digital experiences from Cairo, Egypt.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-1">
              {[
                { href: 'https://github.com/momenesam11', label: 'GitHub', icon: <FaGithub /> },
                { href: 'https://www.behance.net/momenesam', label: 'Behance', icon: <FaBehance /> },
                { href: 'https://www.linkedin.com/in/momenesam/', label: 'LinkedIn', icon: <FaLinkedinIn /> },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/40 transition-all duration-300 text-lg"
                  data-hover="true"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                ['Home', '#hero'],
                ['Skills', '#skills'],
                ['Projects', '#projects'],
                ['About', '#about'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-gray-400 text-sm hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    data-hover="true"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:moment.esam15@gmail.com" className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-2" data-hover="true">
                <HiEnvelope className="text-primary text-base" />
                moment.esam15@gmail.com
              </a>
              <a href="https://wa.me/201021179969" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-2" data-hover="true">
                <FaWhatsapp className="text-primary text-base" />
                +201021179969
              </a>
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <HiMapPin className="text-primary text-base" />
                Cairo, Egypt
              </span>
            </div>

            {/* Availability badge */}
            <div className="mt-2 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs px-4 py-2 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for new projects
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {year} <span className="text-primary font-medium">Momen Esam</span>. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Designed in Figma · Built with Next.js &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
