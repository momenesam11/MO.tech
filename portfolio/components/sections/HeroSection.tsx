'use client'
import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

// Spotlight colors from Figma
const SPOTLIGHT_COLORS = [
  '#f4a8a8', '#f4a8a8', '#f4a8a8',
  '#f6b87a', '#f6b87a', '#f6b87a',
  '#f6d47a', '#f6d47a', '#f6d47a',
  '#b8f67a', '#b8f67a',
  '#7af6d4', '#7af6d4',
  '#7ab8f6', '#7ab8f6',
  '#c47af6', '#c47af6',
]

export default function HeroSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
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
      className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 40% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(246,114,78,0.07) 0%, transparent 70%)`,
          transition: 'background 0.3s ease',
        }}
      />

      {/* Big watermark text */}
      <div
        className="absolute top-8 left-0 right-0 text-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-spotlight font-bold"
          style={{
            fontSize: 'clamp(60px, 12vw, 130px)',
            fontFamily: 'Istok Web',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Momen Esam
        </span>
      </div>

      {/* Spotlight color dots (from Figma design) */}
      <div className="absolute top-10 left-0 right-0 flex justify-center pointer-events-none" aria-hidden="true">
        <div className="relative w-full max-w-3xl h-24 overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 40%, black 60%, transparent)' }}>
          {[0, 1, 2].map(row => (
            <div
              key={row}
              className="absolute flex gap-5"
              style={{ top: `${row * 30}px`, left: '-20px' }}
            >
              {SPOTLIGHT_COLORS.map((color, i) => (
                <div
                  key={i}
                  className="rounded-full flex-shrink-0"
                  style={{
                    width: '42px',
                    height: '42px',
                    background: `radial-gradient(circle, ${color} 0%, ${color}44 60%, transparent 100%)`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto px-6 w-full"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 pt-16">

          {/* Avatar */}
          <div
            className={`flex-shrink-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="relative w-[260px] h-[260px] md:w-[316px] md:h-[316px]">
              {/* Rotating ring */}
              <div
                className="absolute inset-[-16px] rounded-full border-2 border-dashed border-primary/30 spin-ring"
                style={{ animationDuration: '15s' }}
              />
              {/* Glow ring */}
              <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-primary/20 to-transparent" />

              <div className="w-full h-full rounded-full overflow-hidden relative z-10 bg-gradient-to-b from-gray-100 to-gray-200 animate-float">
                {/* Photo placeholder — replace src with actual photo */}
                <img
                  src="https://www.figma.com/api/mcp/asset/0c1fb48f-dbc5-4b54-8b04-ef296cf530c5"
                  alt="Momen Esam"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badge */}
              <div className="absolute -bottom-3 -right-3 z-20 glass px-4 py-2 rounded-full shadow-lg border border-primary/20">
                <span className="text-xs font-bold text-primary">Available for work ✦</span>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-4 text-center md:text-left max-w-md">
            <div
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '0.25s' }}
            >
              <span className="inline-block text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3 bg-primary/10 px-3 py-1.5 rounded-full">
                UI/UX Designer & Frontend Developer
              </span>
              <h1
                className="text-4xl md:text-5xl font-bold text-primary leading-tight"
                style={{ fontFamily: 'Istok Web' }}
              >
                Momen Esam
              </h1>
            </div>

            <p
              className={`text-muted text-base leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '0.4s' }}
            >
              I create intuitive interfaces and transform ideas into responsive digital experiences. Crafting the bridge between beautiful design and clean code.
            </p>

            <div
              className={`flex flex-wrap gap-3 justify-center md:justify-start transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '0.55s' }}
            >
              <a
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-pulse bg-primary text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 text-sm"
                data-hover="true"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"/>
                </svg>
                Contact Me
              </a>
              <a
                href="https://www.behance.net/momenesam"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary text-primary font-bold px-6 py-3 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-300"
                data-hover="true"
              >
                My Portfolio
              </a>
            </div>

            {/* Social icons */}
            <div
              className={`flex gap-4 justify-center md:justify-start mt-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '0.7s' }}
            >
              {[
                { icon: 'github', href: 'https://github.com/momenesam11', label: 'GitHub' },
                { icon: 'behance', href: 'https://www.behance.net/momenesam', label: 'Behance' },
                { icon: 'linkedin', href: '#', label: 'LinkedIn' },
              ].map(({ icon, href, label }) => (
                <a
                  key={icon}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-muted hover:border-primary hover:text-primary hover:scale-110 transition-all duration-300"
                  aria-label={label}
                  data-hover="true"
                >
                  {icon === 'github' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21C9.5 20.77 9.5 20.14 9.5 19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6.01 9.48 6.65 8.77C6.55 8.52 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.52 17.35 8.77C17.99 9.48 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26C14.5 19.6 14.5 20.68 14.5 21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 6.48 17.52 2 12 2Z"/>
                    </svg>
                  )}
                  {icon === 'behance' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.14 1.4-.426 1.96-.285.56-.67 1.02-1.16 1.38-.49.36-1.055.63-1.69.8-.635.17-1.3.254-1.99.254H0V4.502h6.938zm-.412 5.56c.585 0 1.067-.14 1.444-.42.376-.28.564-.73.564-1.35 0-.338-.06-.62-.18-.845-.12-.226-.283-.41-.49-.55-.21-.14-.45-.235-.725-.29-.275-.053-.568-.08-.88-.08H2.59v3.53h3.936zm.22 5.773c.346 0 .67-.033.97-.1.3-.066.56-.177.78-.33.22-.155.395-.364.525-.625.13-.26.195-.6.195-1.01 0-.8-.22-1.37-.667-1.71-.447-.34-1.04-.51-1.78-.51H2.59v4.28l4.156.005zM22.804 15.07c-.375.58-.88 1.04-1.503 1.37-.624.34-1.31.5-2.06.5-.77 0-1.46-.13-2.07-.4-.61-.27-1.12-.64-1.544-1.11-.42-.47-.742-1.01-.963-1.62-.22-.61-.33-1.27-.33-1.98 0-.73.11-1.4.33-2.01.22-.61.54-1.14.963-1.59.42-.45.93-.8 1.534-1.05.604-.25 1.28-.37 2.03-.37.73 0 1.38.13 1.95.4.57.27 1.05.64 1.44 1.12.39.48.68 1.04.87 1.67.19.63.27 1.3.24 2.01H17.37c.02.8.25 1.4.69 1.79.44.4 1 .6 1.7.6.47 0 .876-.11 1.21-.33.334-.22.566-.55.7-.98h2.132c-.13.72-.445 1.29-.8 1.98zM19.24 10.66c-.41 0-.76.06-1.06.18-.3.12-.55.28-.76.49-.21.2-.37.44-.49.72-.12.28-.19.58-.22.9h4.944c-.07-.75-.31-1.32-.72-1.72-.41-.4-.96-.57-1.69-.57zm-4.44-4.38h5.86v1.35h-5.86V6.28z"/>
                    </svg>
                  )}
                  {icon === 'linkedin' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  )
}
