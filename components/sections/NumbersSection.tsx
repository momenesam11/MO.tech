'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useEffect, useState, useRef } from 'react'
import { HiOutlineCheckBadge, HiOutlineBriefcase, HiOutlineFaceSmile, HiOutlineHeart } from 'react-icons/hi2'
import { SiUpwork } from 'react-icons/si'
import { useI18n } from '@/lib/i18n'

function AnimatedCounter({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!isVisible || started.current) return
    started.current = true

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [isVisible, value])

  return (
    <span className="text-2xl md:text-4xl font-black text-primary tabular-nums tracking-tight" style={{ fontFamily: 'Cairo' }}>
      {suffix}{count}
    </span>
  )
}

export default function NumbersSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 })
  const { t, lang } = useI18n()

  const STATS = [
    { value: 32, key: 'numbers.projects', suffix: '+', icon: <HiOutlineCheckBadge /> },
    { value: 5, key: 'numbers.years', suffix: '+', icon: <HiOutlineBriefcase /> },
    { value: 60, key: 'numbers.clients', suffix: '+', icon: <HiOutlineFaceSmile /> },
    { value: 100, key: 'numbers.rate', suffix: '%', icon: <HiOutlineHeart /> },
  ]

  return (
    <section className="py-20 bg-[#fafafa] dark:bg-[#0a0a0a] border-y border-[#f3eeee] dark:border-white/5 transition-colors duration-300 relative overflow-hidden">
      {/* Background glowing blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Main Stats */}
          {STATS.map((stat, i) => (
            <div
              key={stat.key}
              className={`group relative bg-white dark:bg-[#121212] rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 flex flex-col items-center justify-center text-center shadow-sm dark:shadow-[0_4px_40px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-white/[0.04] overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-2xl md:text-3xl text-primary mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500">
                {stat.icon}
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-lg mt-2 md:mt-3">{t(stat.key)}</p>
            </div>
          ))}

          {/* Freelance Platforms Card */}
          <div
            className={`col-span-2 lg:col-span-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-[#161616] dark:to-[#0f0f0f] rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-gray-800 dark:border-white/[0.04] overflow-hidden transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '450ms' }}
          >
            <div className="flex flex-col gap-3 text-center md:text-start z-10">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {t('numbers.freelance')}
              </h3>
              <p className="text-gray-400 text-sm md:text-base font-medium">
                {t('numbers.platforms')}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 z-10">
              {/* Khamsat */}
              <a
                href="https://khamsat.com/user/momenesam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-[#fbab17] text-white border border-white/10 hover:border-[#fbab17] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(251,171,23,0.4)]"
              >
                <div className="w-6 h-6 rounded flex items-center justify-center overflow-hidden">
                  <img src="/khamsat.png" alt="Khamsat" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-sm" style={{ fontFamily: 'Cairo' }}>خمسات</span>
              </a>

              {/* Mostaql */}
              <a
                href="https://mostaql.com/u/momenesam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-[#2386c8] text-white border border-white/10 hover:border-[#2386c8] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(35,134,200,0.4)]"
              >
                <div className="w-6 h-6 rounded flex items-center justify-center overflow-hidden">
                  <img src="/mostaql.png" alt="Mostaql" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-sm" style={{ fontFamily: 'Cairo' }}>مستقل</span>
              </a>

              {/* Upwork */}
              <a
                href="https://www.upwork.com/freelancers/~momenesam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-[#14a800] text-white border border-white/10 hover:border-[#14a800] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(20,168,0,0.4)]"
              >
                <SiUpwork className="text-xl" />
                <span className="font-bold text-sm">Upwork</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
