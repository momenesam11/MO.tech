'use client'
import { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n'

const NAV_ITEMS = [
  
  {
    key: 'nav.about', href: '#about',
    icon: (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    key: 'nav.projects', href: '#projects',
    icon: (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    key: 'nav.skills', href: '#skills',
    icon: (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    key: 'nav.contact', href: '#contact',
    icon: (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    key: 'nav.home', href: '#hero',
    icon: (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
]

function DockDivider() {
  return <div className="w-px h-6 bg-white/15 mx-0.5 flex-shrink-0" />
}

interface DockBtnProps {
  children: React.ReactNode
  tooltip: string
  onClick: () => void
  active?: boolean
  onHover: (t: string | null) => void
}

function DockBtn({ children, tooltip, onClick, active = false, onHover }: DockBtnProps) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover(tooltip)}
      onMouseLeave={() => onHover(null)}
      data-hover="true"
      title={tooltip}
      className={`
        relative flex items-center justify-center
        w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl transition-all duration-200
        ${active
          ? 'bg-primary text-white shadow-[0_0_14px_rgba(246,114,78,0.45)]'
          : 'text-white/55 hover:text-white hover:bg-white/10 active:scale-95'
        }
      `}
    >
      {children}
      {active && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
      )}
    </button>
  )
}

export default function Navbar() {
  const { lang, setLang, t, darkMode, toggleDarkMode } = useI18n()
  const [active, setActive] = useState('#hero')
  const [tooltip, setTooltip] = useState<string | null>(null)

  useEffect(() => {
    const sections = ['#hero', '#about', '#projects', '#skills', '#contact']
    const onScroll = () => {
      for (const id of [...sections].reverse()) {
        const el = document.querySelector(id) as HTMLElement | null
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setActive(href)
  }

  return (
    <nav className="fixed bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 z-50 w-max max-w-[98vw]">
      <div
        className="flex items-center gap-0 sm:gap-0.5 px-1 sm:px-2.5 py-1 sm:py-2 rounded-xl sm:rounded-2xl"
        style={{
          background: 'rgba(18,18,18,0.90)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        {/* Theme toggle */}
        <DockBtn tooltip={darkMode ? 'Light Mode' : 'Dark Mode'} onClick={toggleDarkMode} onHover={setTooltip}>
          {darkMode ? (
            /* Sun icon */
            <svg className="w-4 h-4 sm:w-[16px] sm:h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            /* Moon icon */
            <svg className="w-4 h-4 sm:w-[16px] sm:h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </DockBtn>

        {/* Language */}
        <DockBtn
          tooltip={lang === 'en' ? 'عربي' : 'English'}
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          onHover={setTooltip}
        >
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wide">
            {lang === 'en' ? 'EN' : 'AR'}
          </span>
        </DockBtn>

        <div className="hidden sm:flex items-center gap-0.5">
          <DockDivider />

          {/* LinkedIn */}
          <DockBtn tooltip="LinkedIn" onClick={() => window.open('#', '_blank')} onHover={setTooltip}>
            <svg className="w-3.5 h-3.5 sm:w-[17px] sm:h-[17px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </DockBtn>

          {/* GitHub */}
          <DockBtn tooltip="GitHub" onClick={() => window.open('https://github.com/momenesam11', '_blank')} onHover={setTooltip}>
            <svg className="w-3.5 h-3.5 sm:w-[17px] sm:h-[17px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
          </DockBtn>

          {/* Behance */}
          <DockBtn tooltip="Behance" onClick={() => window.open('https://www.behance.net/momenesam', '_blank')} onHover={setTooltip}>
            <svg className="w-3.5 h-3.5 sm:w-[17px] sm:h-[17px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.14 1.4-.426 1.96-.285.56-.67 1.02-1.16 1.38-.49.36-1.055.63-1.69.8-.635.17-1.3.254-1.99.254H0V4.502h6.938zm-.412 5.56c.585 0 1.067-.14 1.444-.42.376-.28.564-.73.564-1.35 0-.338-.06-.62-.18-.845-.12-.226-.283-.41-.49-.55-.21-.14-.45-.235-.725-.29-.275-.053-.568-.08-.88-.08H2.59v3.53h3.936zm.22 5.773c.346 0 .67-.033.97-.1.3-.066.56-.177.78-.33.22-.155.395-.364.525-.625.13-.26.195-.6.195-1.01 0-.8-.22-1.37-.667-1.71-.447-.34-1.04-.51-1.78-.51H2.59v4.28l4.156.005zM22.804 15.07c-.375.58-.88 1.04-1.503 1.37-.624.34-1.31.5-2.06.5-.77 0-1.46-.13-2.07-.4-.61-.27-1.12-.64-1.544-1.11-.42-.47-.742-1.01-.963-1.62-.22-.61-.33-1.27-.33-1.98 0-.73.11-1.4.33-2.01.22-.61.54-1.14.963-1.59.42-.45.93-.8 1.534-1.05.604-.25 1.28-.37 2.03-.37.73 0 1.38.13 1.95.4.57.27 1.05.64 1.44 1.12.39.48.68 1.04.87 1.67.19.63.27 1.3.24 2.01H17.37c.02.8.25 1.4.69 1.79.44.4 1 .6 1.7.6.47 0 .876-.11 1.21-.33.334-.22.566-.55.7-.98h2.132c-.13.72-.445 1.29-.8 1.98zM19.24 10.66c-.41 0-.76.06-1.06.18-.3.12-.55.28-.76.49-.21.2-.37.44-.49.72-.12.28-.19.58-.22.9h4.944c-.07-.75-.31-1.32-.72-1.72-.41-.4-.96-.57-1.69-.57zm-4.44-4.38h5.86v1.35h-5.86V6.28z"/>
            </svg>
          </DockBtn>
        </div>

        <DockDivider />

        {/* Section nav */}
        {NAV_ITEMS.map(item => (
          <DockBtn
            key={item.href}
            tooltip={t(item.key)}
            onClick={() => scrollTo(item.href)}
            active={active === item.href}
            onHover={setTooltip}
          >
            {item.icon}
          </DockBtn>
        ))}
      </div>

      {/* Tooltip bubble */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-150"
        style={{ opacity: tooltip ? 1 : 0, transform: tooltip ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(4px)' }}
      >
        <div
          className="bg-[#111] text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap"
          style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.4)' }}
        >
          {tooltip}
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#111]" />
      </div>
    </nav>
  )
}
