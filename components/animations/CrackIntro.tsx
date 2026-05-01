'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CrackIntroProps {
  onComplete: () => void
}

const STAGES = [
  { blur: 40, opacity: 0.95, text: 'Scanning Identity...', scale: 1 },
  { blur: 20, opacity: 0.7, text: 'Structural Weakness...', scale: 1.05 },
  { blur: 8, opacity: 0.4, text: 'Critical Fail...', scale: 1.1 },
  { blur: 0, opacity: 0, text: '', scale: 1.2 }
]

export default function CrackIntro({ onComplete }: CrackIntroProps) {
  const [stage, setStage] = useState(0)
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  const [isShattering, setIsShattering] = useState(false)
  const rippleId = useRef(0)

  // Auto-Sequence logic: 1.2s -> 2.5s -> 3.8s
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    
    // Stage 1
    timers.push(setTimeout(() => setStage(1), 1200))
    
    // Stage 2
    timers.push(setTimeout(() => setStage(2), 2500))
    
    // Stage 3 (Final Shatter)
    timers.push(setTimeout(() => {
      setIsShattering(true)
      setStage(3)
      setTimeout(onComplete, 1200)
    }, 3800))

    return () => timers.forEach(t => clearTimeout(t))
  }, [onComplete])

  const handleClick = (e: React.MouseEvent) => {
    // Allows user to bypass or add more impact
    const x = e.clientX, y = e.clientY
    const id = rippleId.current++
    setRipples(prev => [...prev, { x, y, id }])
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 1000)
    
    // If user clicks, they advance faster
    if (stage < 2) setStage(prev => prev + 1)
  }

  return (
    <motion.div 
      className="fixed inset-0 z-[10000] overflow-hidden cursor-pointer flex items-center justify-center bg-black/5"
      onClick={handleClick}
      animate={isShattering ? {
        x: [0, -4, 4, -4, 4, 0],
        y: [0, 4, -4, 4, -4, 0],
      } : {}}
      transition={{ duration: 0.4 }}
    >
      {/* 1. Glass Layer */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backdropFilter: `blur(${STAGES[stage].blur}px)`,
          backgroundColor: `rgba(255, 255, 255, ${STAGES[stage].opacity})`,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* 2. Premium Shimmer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        animate={{ 
          background: [
            'linear-gradient(135deg, transparent 0%, #fff 0%, transparent 20%)',
            'linear-gradient(135deg, transparent 80%, #fff 100%, transparent 100%)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* 3. Ripples */}
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute w-24 h-24 border-2 border-primary/40 rounded-full pointer-events-none"
            style={{ left: r.x - 48, top: r.y - 48 }}
          />
        ))}
      </AnimatePresence>

      {/* 4. Progressive Blur reduction (Lines removed as requested) */}
      
      {/* 5. Center Logo */}
      <motion.div
        animate={{
          scale: STAGES[stage].scale,
          opacity: isShattering ? 0 : 1,
          filter: `blur(${isShattering ? 20 : 0}px)`
        }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-8 text-center"
      >
        <div className="flex flex-col items-center">
          <motion.div 
            className="text-8xl font-bold text-[#111] dark:text-white" 
            style={{ fontFamily: 'Cairo' }}
            animate={stage > 0 ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.2 }}
          >
            <span>MO</span>
            <span className="text-primary">.</span>
            <span className="text-3xl font-normal text-muted ml-2">tech</span>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="mt-3 text-gray-500 font-bold tracking-[0.3em] text-xs"
          >
            CREATIVE DESIGN STUDIO
          </motion.p>
        </div>

        <div className="h-12 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.p 
              key={STAGES[stage].text}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]"
            >
              {STAGES[stage].text}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 6. Shatter Shards */}
      <AnimatePresence>
        {isShattering && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: "50%", y: "50%", scale: 1, opacity: 1 }}
                animate={{ 
                  x: `${(Math.random() - 0.5) * 400}vw`, 
                  y: `${(Math.random() - 0.5) * 400}vh`, 
                  scale: 0, 
                  opacity: 0,
                  rotate: Math.random() * 1000 - 500
                }}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                className="absolute w-40 h-40 bg-white/20 backdrop-blur-xl border border-white/40"
                style={{ 
                  clipPath: `polygon(${Math.random()*100}% 0%, 100% ${Math.random()*100}%, 0% 100%)`
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
