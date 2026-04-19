'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useI18n } from '@/lib/i18n'

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
      <div className="flex" style={{ fontFamily: 'Istok Web' }}>
        {NAME.split('').map((char, i) => (
          <span
            key={i}
            data-char={i}
            className="font-bold transition-all duration-200"
            style={{
              fontSize: 'clamp(56px, 11vw, 128px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              /* Default: very faint gray */
              color: litChars.has(i)
                ? 'rgba(246,114,78,0.75)'   /* lit: primary orange */
                : char === ' '
                ? 'transparent'
                : 'rgba(180,180,180,0.13)', /* dim: almost invisible */
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
      className="relative min-h-screen flex items-center overflow-hidden bg-white pb-24"
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

      {/* ── Main content — wider max-width, more horizontal padding ── */}
      <div
        ref={ref}
        className="relative z-10 w-full max-w-7xl mx-auto px-10 md:px-20"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-14 md:gap-24 pt-24">

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

              <div className="w-full h-full rounded-full overflow-hidden relative z-10 bg-gradient-to-b from-gray-100 to-gray-200 animate-float">
                <img
                  src="https://www.figma.com/api/mcp/asset/0c1fb48f-dbc5-4b54-8b04-ef296cf530c5"
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

          {/* ── Text content — wider ── */}
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
                style={{ fontFamily: 'Istok Web' }}
              >
                Momen Esam
              </h1>
            </div>

            <p
              className={`text-muted text-base leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
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
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-pulse bg-primary text-white font-bold px-7 py-3.5 rounded-full flex items-center gap-2 text-sm"
                data-hover="true"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"/>
                </svg>
                {t('hero.contact')}
              </a>
              <a
                href="https://www.behance.net/momenesam"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary text-primary font-bold px-7 py-3.5 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-300"
                data-hover="true"
              >
                {t('hero.portfolio')}
              </a>
            </div>

            {/* Social row */}
            <div
              className={`flex gap-3 justify-center md:justify-start mt-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '0.66s' }}
            >
              {[
                { href: 'https://github.com/momenesam11', label: 'GitHub', d: 'M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z' },
                { href: 'https://www.behance.net/momenesam', label: 'Behance', d: 'M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.14 1.4-.426 1.96-.285.56-.67 1.02-1.16 1.38-.49.36-1.055.63-1.69.8-.635.17-1.3.254-1.99.254H0V4.502h6.938zm-.412 5.56c.585 0 1.067-.14 1.444-.42.376-.28.564-.73.564-1.35 0-.338-.06-.62-.18-.845-.12-.226-.283-.41-.49-.55-.21-.14-.45-.235-.725-.29-.275-.053-.568-.08-.88-.08H2.59v3.53h3.936zm.22 5.773c.346 0 .67-.033.97-.1.3-.066.56-.177.78-.33.22-.155.395-.364.525-.625.13-.26.195-.6.195-1.01 0-.8-.22-1.37-.667-1.71-.447-.34-1.04-.51-1.78-.51H2.59v4.28l4.156.005zM22.804 15.07c-.375.58-.88 1.04-1.503 1.37-.624.34-1.31.5-2.06.5-.77 0-1.46-.13-2.07-.4-.61-.27-1.12-.64-1.544-1.11-.42-.47-.742-1.01-.963-1.62-.22-.61-.33-1.27-.33-1.98 0-.73.11-1.4.33-2.01.22-.61.54-1.14.963-1.59.42-.45.93-.8 1.534-1.05.604-.25 1.28-.37 2.03-.37.73 0 1.38.13 1.95.4.57.27 1.05.64 1.44 1.12.39.48.68 1.04.87 1.67.19.63.27 1.3.24 2.01H17.37c.02.8.25 1.4.69 1.79.44.4 1 .6 1.7.6.47 0 .876-.11 1.21-.33.334-.22.566-.55.7-.98h2.132c-.13.72-.445 1.29-.8 1.98zM19.24 10.66c-.41 0-.76.06-1.06.18-.3.12-.55.28-.76.49-.21.2-.37.44-.49.72-.12.28-.19.58-.22.9h4.944c-.07-.75-.31-1.32-.72-1.72-.41-.4-.96-.57-1.69-.57zm-4.44-4.38h5.86v1.35h-5.86V6.28z' },
                { href: '#', label: 'LinkedIn', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              ].map(({ href, label, d }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-muted hover:border-primary hover:text-primary hover:scale-110 transition-all duration-300"
                  data-hover="true"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-muted uppercase tracking-[0.3em] animate-pulse">
          {t('hero.scroll')}
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent animate-bounce" />
      </div>
    </section>
  )
}
