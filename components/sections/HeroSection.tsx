'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useI18n } from '@/lib/i18n'
import { FaWhatsapp, FaGithub, FaLinkedinIn, FaBehance } from 'react-icons/fa6'

const NAME = 'Momen Esam'

/** Per-character interactive watermark */
function WatermarkName() {
  const [litChars, setLitChars] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = containerRef.current
    if (!container) return
    const spans = container.querySelectorAll<HTMLSpanElement>('[data-char]')
    const newLit = new Set<number>()
    spans.forEach((span, i) => {
      const rect = span.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
      if (dist < 70) newLit.add(i)
    })
    setLitChars(newLit)
  }, [])

  const handleMouseLeave = useCallback(() => setLitChars(new Set()), [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <div
      ref={containerRef}
      className="absolute top-6 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex" style={{ fontFamily: 'Cairo' }}>
        {NAME.split('').map((char, i) => (
          <span
            key={i}
            data-char={i}
            className="font-bold transition-all duration-200"
            style={{
              fontSize: 'clamp(56px, 11vw, 128px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: litChars.has(i)
                ? 'rgba(246,114,78,0.75)'
                : char === ' '
                ? 'transparent'
                : 'rgba(180,180,180,0.13)',
              textShadow: litChars.has(i)
                ? '0 0 40px rgba(246,114,78,0.3)'
                : 'none',
              transform: litChars.has(i) ? 'scale(1.06)' : 'scale(1)',
              display: 'inline-block',
              whiteSpace: 'pre',
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function HeroSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })
  const { t } = useI18n()
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (!rect) return
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-[#0f0f0f] pb-24 transition-colors duration-300"
      style={{ paddingTop: '80px' }}
    >
      {/* Soft radial gradient chasing mouse */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 50% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(246,114,78,0.06) 0%, transparent 70%)`,
          transition: 'background 0.4s ease',
        }}
      />

      {/* Per-character interactive watermark */}
      <WatermarkName />

      {/* ── Main content ── */}
      <div
        ref={ref}
        className="relative z-10 w-full max-w-7xl mx-auto px-10 md:px-20"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-14 md:gap-24 pt-24 pb-16">

          {/* ── Avatar ── */}
          <div
            className={`flex-shrink-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="relative w-[270px] h-[270px] md:w-[330px] md:h-[330px]">
              {/* Dashed spinning ring */}
              <div
                className="absolute inset-[-18px] rounded-full border-2 border-dashed border-primary/25 spin-ring"
                style={{ animationDuration: '18s' }}
              />
              {/* Soft glow */}
              <div className="absolute inset-[-6px] rounded-full bg-gradient-to-br from-primary/15 to-transparent" />

              <div className="w-full h-full rounded-full overflow-hidden relative z-10 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 animate-float">
                <img
                  src="/avatar.png"
                  alt="Momen Esam"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Available badge */}
              <div className="absolute -bottom-4 -right-4 z-20 glass px-4 py-2 rounded-full shadow-lg border border-primary/20">
                <span className="text-xs font-bold text-primary">{t('hero.available')}</span>
              </div>
            </div>
          </div>

          {/* ── Text content ── */}
          <div className="flex flex-col gap-5 text-center md:text-left max-w-lg">

            <div
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '0.22s' }}
            >
              <span className="inline-block text-xs font-bold text-primary uppercase tracking-[0.22em] mb-4 bg-primary/10 px-3 py-1.5 rounded-full">
                {t('hero.badge')}
              </span>
              <h1
                className="text-4xl md:text-[3.2rem] font-bold text-primary leading-tight"
                style={{ fontFamily: 'Cairo' }}
              >
                Momen Esam
              </h1>
            </div>

            <p
              className={`text-[#626262] dark:text-[#a0a0a0] text-base leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '0.38s' }}
            >
              {t('hero.desc')}
            </p>

            {/* CTA buttons */}
            <div
              className={`flex flex-wrap gap-3 justify-center md:justify-start transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '0.52s' }}
            >
              <a
                href="https://wa.me/201021179969"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-pulse bg-primary text-white font-bold px-7 py-3.5 rounded-full flex items-center gap-2 text-sm"
                data-hover="true"
              >
                <FaWhatsapp className="text-lg" />
                {t('hero.contact')}
              </a>
              <a
                href="https://www.behance.net/momenesam"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary text-primary font-bold px-7 py-3.5 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2"
                data-hover="true"
              >
                <FaBehance className="text-lg" />
                {t('hero.portfolio')}
              </a>
            </div>

            {/* Social row */}
            <div
              className={`flex gap-3 justify-center md:justify-start mt-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '0.66s' }}
            >
              {[
                { href: 'https://github.com/momenesam11', label: 'GitHub', icon: <FaGithub /> },
                { href: 'https://www.behance.net/momenesam', label: 'Behance', icon: <FaBehance /> },
                { href: 'https://www.linkedin.com/in/momenesam/', label: 'LinkedIn', icon: <FaLinkedinIn /> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-[#8a7d7d] dark:text-[#666] hover:border-primary hover:text-primary hover:scale-110 transition-all duration-300 text-lg"
                  data-hover="true"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-[#8a7d7d] dark:text-[#555] uppercase tracking-[0.3em] animate-pulse">
          {t('hero.scroll')}
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent animate-bounce" />
      </div>
    </section>
  )
}
