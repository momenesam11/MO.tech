'use client'
import { useState, useEffect, useRef } from 'react'
import { useI18n } from '@/lib/i18n'
import { HiHome, HiCodeBracket, HiSquare2Stack, HiUser, HiEnvelope } from 'react-icons/hi2'
import { FaWhatsapp, FaGithub, FaLinkedinIn, FaBehance } from 'react-icons/fa6'
import { FiSun, FiMoon } from 'react-icons/fi'

const NAV_ITEMS = [
  {
    key: 'nav.home', href: '#hero',
    icon: <HiHome className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
  },
  {
    key: 'nav.skills', href: '#skills',
    icon: <HiCodeBracket className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
  },
  {
    key: 'nav.projects', href: '#projects',
    icon: <HiSquare2Stack className="w-4 h-4 sm:w-[19px] sm:h-[19px]" />,
  },
  {
    key: 'nav.about', href: '#about',
    icon: <HiUser className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
  },
  {
    key: 'nav.contact', href: '#contact',
    icon: <HiEnvelope className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
  },
]

function DockDivider() {
  return <div className="w-px h-8 bg-white/15 mx-0 sm:mx-0.5 flex-shrink-0" />
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
        w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl transition-all duration-200
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
  const lastClickTime = useRef(0)

  useEffect(() => {
    const sections = ['#hero', '#skills', '#projects', '#about', '#contact']
    
    const onScroll = () => {
      // Don't update from scroll if we just clicked a link (allow smooth scroll to finish)
      if (Date.now() - lastClickTime.current < 1000) return

      // Check if at the very top
      if (window.scrollY < 50) {
        setActive('#hero')
        return
      }

      // Check if at the very bottom
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50
      if (isBottom) {
        setActive('#contact')
        return
      }

      // Find the current section
      for (const id of [...sections].reverse()) {
        const el = document.querySelector(id) as HTMLElement | null
        if (el) {
          const rect = el.getBoundingClientRect()
          // If the top of the section is near the top of the viewport
          if (rect.top <= 120) {
            setActive(id)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    lastClickTime.current = Date.now()
    setActive(href)
    const el = document.querySelector(href)
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: offset, behavior: 'smooth' })
    }
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
        {/* 1. Main Navigation Sections */}
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

        <DockDivider />

        {/* 2. Social Links */}
        <DockBtn tooltip="WhatsApp" onClick={() => window.open('https://wa.me/201021179969', '_blank')} onHover={setTooltip}>
          <FaWhatsapp className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
        </DockBtn>

        <DockBtn tooltip="GitHub" onClick={() => window.open('https://github.com/momenesam11', '_blank')} onHover={setTooltip}>
          <FaGithub className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
        </DockBtn>

        <DockBtn tooltip="LinkedIn" onClick={() => window.open('https://www.linkedin.com/in/momenesam/', '_blank')} onHover={setTooltip}>
          <FaLinkedinIn className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
        </DockBtn>

        <DockBtn tooltip="Behance" onClick={() => window.open('https://www.behance.net/momenesam', '_blank')} onHover={setTooltip}>
          <FaBehance className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
        </DockBtn>

        <DockDivider />

        {/* 3. Theme & Language Controls */}
        <DockBtn tooltip={darkMode ? 'Light Mode' : 'Dark Mode'} onClick={toggleDarkMode} onHover={setTooltip}>
          {darkMode ? <FiSun className="w-4 h-4 sm:w-[18px] sm:h-[18px]" /> : <FiMoon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
        </DockBtn>

        <DockBtn
          tooltip={lang === 'en' ? 'عربي' : 'English'}
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          onHover={setTooltip}
        >
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wide">
            {lang === 'en' ? 'AR' : 'EN'}
          </span>
        </DockBtn>
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
