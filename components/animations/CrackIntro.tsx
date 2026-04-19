'use client'
import { useState, useEffect, useRef } from 'react'

interface CrackIntroProps {
  onComplete: () => void
}

// SVG crack paths for realistic glass shattering
const CRACK_PATHS = [
  // Center burst lines
  "M 400 300 L 100 50",
  "M 400 300 L 650 80",
  "M 400 300 L 780 300",
  "M 400 300 L 700 520",
  "M 400 300 L 380 580",
  "M 400 300 L 150 500",
  "M 400 300 L 30 350",
  "M 400 300 L 80 180",
  // Secondary cracks
  "M 400 300 L 520 100",
  "M 400 300 L 250 80",
  "M 400 300 L 600 400",
  "M 400 300 L 200 350",
  // Cross cracks
  "M 100 50 L 250 80",
  "M 100 50 L 30 350",
  "M 650 80 L 520 100",
  "M 650 80 L 780 300",
  "M 780 300 L 700 520",
  "M 700 520 L 380 580",
  "M 380 580 L 150 500",
  "M 150 500 L 30 350",
  "M 250 80 L 520 100",
  "M 200 350 L 150 500",
  "M 600 400 L 700 520",
  "M 520 100 L 600 400",
]

const SHATTER_PIECES = [
  { d: "M 400 300 L 100 50 L 250 80 Z", style: { transformOrigin: '200px 100px' } },
  { d: "M 400 300 L 250 80 L 100 50 L 30 350 Z", style: { transformOrigin: '100px 200px' } },
  { d: "M 400 300 L 100 50 L 650 80 Z", style: { transformOrigin: '380px 100px' } },
  { d: "M 400 300 L 650 80 L 520 100 Z", style: { transformOrigin: '560px 160px' } },
  { d: "M 400 300 L 520 100 L 650 80 L 780 300 Z", style: { transformOrigin: '650px 200px' } },
  { d: "M 400 300 L 780 300 L 700 520 Z", style: { transformOrigin: '700px 370px' } },
  { d: "M 400 300 L 700 520 L 380 580 Z", style: { transformOrigin: '500px 500px' } },
  { d: "M 400 300 L 380 580 L 150 500 Z", style: { transformOrigin: '300px 460px' } },
  { d: "M 400 300 L 150 500 L 30 350 Z", style: { transformOrigin: '180px 380px' } },
  { d: "M 400 300 L 30 350 L 100 50 Z", style: { transformOrigin: '80px 250px' } },
  { d: "M 400 300 L 200 350 L 600 400 Z", style: { transformOrigin: '400px 350px' } },
]

export default function CrackIntro({ onComplete }: CrackIntroProps) {
  const [phase, setPhase] = useState<'idle' | 'cracked1' | 'cracked2' | 'shattering' | 'done'>('idle')
  const [clickCount, setClickCount] = useState(0)
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  const svgRef = useRef<SVGSVGElement>(null)
  const rippleId = useRef(0)

  useEffect(() => {
    // Auto-advance after 8s if user doesn't click
    const timeout = setTimeout(() => {
      if (phase !== 'shattering' && phase !== 'done') {
        triggerShatter()
      }
    }, 8000)
    return () => clearTimeout(timeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const triggerShatter = () => {
    setPhase('shattering')
    setTimeout(() => {
      setPhase('done')
      setTimeout(onComplete, 600)
    }, 1200)
  }

  const handleClick = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 800
    const y = ((e.clientY - rect.top) / rect.height) * 600

    const newRipple = { x, y, id: rippleId.current++ }
    setRipples(prev => [...prev, newRipple])
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 800)

    const newCount = clickCount + 1
    setClickCount(newCount)

    if (newCount === 1) setPhase('cracked1')
    else if (newCount === 2) setPhase('cracked2')
    else triggerShatter()
  }

  const getCrackOpacity = () => {
    if (phase === 'idle') return 0
    if (phase === 'cracked1') return 0.4
    if (phase === 'cracked2') return 0.85
    return 1
  }

  if (phase === 'done') return null

  return (
    <div
      className="crack-overlay flex items-center justify-center bg-white"
      onClick={handleClick}
    >
      {/* Background frosted texture */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, rgba(246,114,78,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(246,114,78,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Glass overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(2px)',
          transition: 'opacity 0.3s ease',
          opacity: phase === 'shattering' ? 0 : 1,
        }}
      />

      {/* SVG Crack system */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 600"
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <filter id="glass-blur">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glass sheen */}
        <rect width="800" height="600" fill="url(#glassGrad)" opacity="0.15" />
        <defs>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="50%" stopColor="rgba(246,114,78,0.1)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="crackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
            <stop offset="50%" stopColor="rgba(246,114,78,0.4)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
          </linearGradient>
        </defs>

        {/* Click ripples */}
        {ripples.map(r => (
          <g key={r.id}>
            <circle cx={r.x} cy={r.y} r="2" fill="rgba(246,114,78,0.8)">
              <animate attributeName="r" from="2" to="60" dur="0.8s" fill="freeze" />
              <animate attributeName="opacity" from="1" to="0" dur="0.8s" fill="freeze" />
            </circle>
            <circle cx={r.x} cy={r.y} r="1" fill="none" stroke="rgba(246,114,78,0.5)" strokeWidth="1">
              <animate attributeName="r" from="1" to="80" dur="0.8s" fill="freeze" />
              <animate attributeName="opacity" from="0.8" to="0" dur="0.8s" fill="freeze" />
            </circle>
          </g>
        ))}

        {/* Crack lines */}
        <g
          opacity={getCrackOpacity()}
          filter="url(#glow)"
          style={{ transition: 'opacity 0.4s ease' }}
        >
          {CRACK_PATHS.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="url(#crackGrad)"
              strokeWidth={i < 12 ? "1.5" : "0.8"}
              fill="none"
              strokeLinecap="round"
              style={{
                opacity: phase === 'cracked2' || phase === 'shattering' ? 1 : (i < 12 ? 1 : 0.3),
                transition: `opacity 0.3s ease ${i * 0.02}s`,
              }}
            />
          ))}
          {/* White highlight on cracks */}
          {CRACK_PATHS.slice(0, 12).map((d, i) => (
            <path
              key={`h-${i}`}
              d={d}
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.5"
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Shatter pieces */}
        {phase === 'shattering' && SHATTER_PIECES.map((piece, i) => {
          const tx = (Math.random() - 0.5) * 600
          const ty = (Math.random() - 0.5) * 400
          const rot = (Math.random() - 0.5) * 180
          return (
            <path
              key={`piece-${i}`}
              d={piece.d}
              fill="rgba(255,255,255,0.6)"
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="0.5"
              style={{
                ...piece.style,
                animation: `shatter 0.8s ease-out ${i * 0.05}s forwards`,
                '--tx': `${tx}px`,
                '--ty': `${ty}px`,
                '--rot': `${rot}deg`,
              } as React.CSSProperties}
            />
          )
        })}
      </svg>

      {/* Center content */}
      <div
        className="relative z-10 flex flex-col items-center gap-6 select-none"
        style={{
          opacity: phase === 'shattering' ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        {/* Logo */}
        <div className="text-6xl font-bold text-dark" style={{ fontFamily: 'Istok Web' }}>
          <span>MO</span>
          <span className="text-primary">.</span>
          <span className="text-2xl font-normal text-muted ml-1">tech</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          {phase === 'idle' && (
            <>
              <p className="text-muted text-sm tracking-widest uppercase animate-pulse">
                Click to enter
              </p>
              <div className="flex gap-1 mt-2">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                    style={{
                      animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </>
          )}
          {phase === 'cracked1' && (
            <p className="text-muted text-sm tracking-widest uppercase">
              Keep going...
            </p>
          )}
          {phase === 'cracked2' && (
            <p className="text-primary text-sm tracking-widest uppercase animate-pulse">
              One more hit!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
