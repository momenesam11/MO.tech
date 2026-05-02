'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useI18n } from '@/lib/i18n'
import { motion } from 'framer-motion'

const COMPANIES = [
  { src: '/companies/1.png', hasBg: false },
  { src: '/companies/2.png', hasBg: true },
  { src: '/companies/3.png', hasBg: true },
  { src: '/companies/4.png', hasBg: false },
  { src: '/companies/5.png', hasBg: false },
  { src: '/companies/6.png', hasBg: false },
  { src: '/companies/7.png', hasBg: true },
]

export default function CompaniesSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const { lang } = useI18n()

  const duplicatedCompanies = [...COMPANIES, ...COMPANIES]

  return (
    <section className="py-16 bg-[#fafafa] dark:bg-[#161616] border-y border-[#f3eeee] dark:border-white/5 overflow-hidden">
      <div ref={ref} className={`max-w-7xl mx-auto px-10 md:px-20 mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="text-center text-[14px] font-bold text-[#8a7d7d] dark:text-[#666] uppercase tracking-wider">
          {lang === 'ar' ? 'شركات عملت معها' : 'Companies I worked with'}
        </p>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fafafa] dark:from-[#161616] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fafafa] dark:from-[#161616] to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap items-center w-max"
          animate={{ x: lang === 'ar' ? ['0%', '50%'] : ['0%', '-50%'] }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
        >
          {duplicatedCompanies.map((company, idx) => (
            <div 
              key={idx} 
              className={`flex-shrink-0 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 flex items-center justify-center ${
                company.hasBg 
                  ? 'w-36 h-16 mx-4 sm:mx-6 bg-gray-800 dark:bg-white/5 rounded-2xl p-3 border border-gray-700 dark:border-white/10 shadow-sm' 
                  : 'w-32 h-14 mx-8 sm:mx-12'
              }`}
            >
              <img src={company.src} alt={`Company ${idx + 1}`} className="w-full h-full object-contain drop-shadow-sm" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
