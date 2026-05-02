'use client'
import { useEffect, useRef } from 'react'
import { useI18n } from '@/lib/i18n'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const { darkMode } = useI18n()

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let x = -100, y = -100

    const move = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      // Dot follows instantly (precise aim)
      dot.style.left = `${x}px`
      dot.style.top = `${y}px`
      // Outer cursor also instant for gaming feel
      cursor.style.left = `${x}px`
      cursor.style.top = `${y}px`
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const el = target.closest('a, button, [data-hover]')
      const footer = target.closest('footer')
      
      if (footer) {
        cursor.classList.add('cursor--white')
        dot.classList.add('dot--white')
      } else {
        cursor.classList.remove('cursor--white')
        dot.classList.remove('dot--white')
      }

      if (el) {
        cursor.classList.add('cursor--hover')
        dot.classList.add('dot--hover')
      } else {
        cursor.classList.remove('cursor--hover')
        dot.classList.remove('dot--hover')
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <>
      {/* Outer ring — sharp, gaming style */}
      <div
        ref={cursorRef}
        id="game-cursor"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 999999,
          left: '-100px',
          top: '-100px',
          width: '32px',
          height: '32px',
          transform: 'translate(-50%, -50%)',
          border: darkMode ? '2px solid #fff' : '2px solid #000',
          borderRadius: '2px',          // sharp corners = gaming crosshair feel
          transition: 'width 0.15s ease, height 0.15s ease, border-color 0.15s ease, border-radius 0.15s ease',
          mixBlendMode: darkMode ? 'screen' : 'multiply',
        }}
      />
      {/* Center dot — 1px sharp */}
      <div
        ref={dotRef}
        id="game-dot"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 999999,
          left: '-100px',
          top: '-100px',
          width: '4px',
          height: '4px',
          background: darkMode ? '#fff' : '#000',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'background 0.15s ease, transform 0.1s ease',
        }}
      />
      <style>{`
        #game-cursor, #game-dot {
          display: none;
        }
        @media (min-width: 1024px) and (pointer: fine) {
          #game-cursor, #game-dot {
            display: block;
          }
        }
        #game-cursor.cursor--white {
          border-color: #fff !important;
          mix-blend-mode: screen !important;
        }
        #game-dot.dot--white {
          background: #fff !important;
        }
        #game-cursor.cursor--hover {
          width: 44px !important;
          height: 44px !important;
          border-color: #f6724e !important;
          border-radius: 50% !important;
          background: rgba(246,114,78,0.06);
        }
        #game-dot.dot--hover {
          background: #f6724e !important;
          transform: translate(-50%, -50%) scale(1.8) !important;
        }
      `}</style>
    </>
  )
}
