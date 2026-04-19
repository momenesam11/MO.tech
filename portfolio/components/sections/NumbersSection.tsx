'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useEffect, useState, useRef } from 'react'

const STATS = [
  { value: 15, label: 'Projects Completed', suffix: '+', icon: '🚀' },
  { value: 3, label: 'Years Experience', suffix: '+', icon: '⚡' },
  { value: 10, label: 'Happy Clients', suffix: '+', icon: '💼' },
  { value: 100, label: 'Satisfaction Rate', suffix: '%', icon: '✦' },
]

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
    <span className="text-4xl md:text-5xl font-bold text-primary tabular-nums" style={{ fontFamily: 'Istok Web' }}>
      {count}{suffix}
    </span>
  )
}

export default function NumbersSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 })

  return (
    <section className="py-16 bg-[#fafafa] border-y border-[#f3eeee]">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`number-card bg-white rounded-2xl p-6 flex flex-col items-center gap-2 text-center shadow-sm border border-[#f3eeee] hover:border-primary/30 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
              data-hover="true"
            >
              <span className="text-2xl mb-1">{stat.icon}</span>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              <p className="text-[#626262] text-sm leading-tight mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
