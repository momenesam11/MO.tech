'use client'
import { FaGithub, FaLinkedinIn, FaBehance, FaWhatsapp } from 'react-icons/fa6'
import { HiEnvelope, HiMapPin } from 'react-icons/hi2'
import { useI18n } from '@/lib/i18n'

export default function Footer() {
  const { lang, t } = useI18n()
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
            <div className="h-10 mb-1 flex justify-start">
              <img src="/logo-light.png" alt="MO.tech" className="h-full w-auto object-contain hidden dark:block" />
              <img src="/logo-dark.png" alt="MO.tech" className="h-full w-auto object-contain block dark:hidden" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {lang === 'ar' ? 'مصمم ومطور واجهات من القاهرة، بحوّل أي فكرة لتجربة رقمية تفرح صاحبها.' : 'UI/UX Designer & Frontend Developer crafting beautiful digital experiences from Cairo, Egypt.'}
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
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-all duration-300 text-lg"
                  data-hover="true"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300">{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                [lang === 'ar' ? 'الرئيسية' : 'Home', '#hero'],
                [lang === 'ar' ? 'مهاراتي' : 'Skills', '#skills'],
                [lang === 'ar' ? 'أعمالي' : 'Projects', '#projects'],
                [lang === 'ar' ? 'عني' : 'About', '#about'],
                [lang === 'ar' ? 'تواصل معي' : 'Contact', '#contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-300 flex items-center gap-2 group w-fit"
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
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300">{lang === 'ar' ? 'تواصل' : 'Contact'}</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:moment.esam15@gmail.com" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2 w-fit" data-hover="true">
                <HiEnvelope className="text-primary text-base" />
                moment.esam15@gmail.com
              </a>
              <a href="https://wa.me/201021179969" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2 w-fit" data-hover="true">
                <FaWhatsapp className="text-primary text-base" />
                +201021179969
              </a>
              <span className="text-gray-400 text-sm flex items-center gap-2 w-fit">
                <HiMapPin className="text-primary text-base" />
                {lang === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {year} <span className="text-white font-medium">{lang === 'ar' ? 'مؤمن عصام' : 'Momen Esam'}</span>. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <p className="text-gray-600 text-xs">
            {lang === 'ar' ? 'صُمم بواسطة Figma · طُور باستخدام Next.js & Tailwind' : 'Designed in Figma · Built with Next.js & Tailwind'}
          </p>
        </div>
      </div>
    </footer>
  )
}
