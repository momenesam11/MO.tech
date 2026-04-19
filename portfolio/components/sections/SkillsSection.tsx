'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const FRONTEND_SKILLS = [
  { name: 'HTML', icon: '🌐', color: '#e34c26' },
  { name: 'CSS', icon: '🎨', color: '#264de4' },
  { name: 'JavaScript', icon: '⚡', color: '#f7df1e' },
  { name: 'Bootstrap', icon: '🅱', color: '#7952b3' },
  { name: 'Tailwind', icon: '🌊', color: '#38bdf8' },
  { name: 'SASS', icon: '💅', color: '#cc6699' },
  { name: 'TypeScript', icon: '🔷', color: '#3178c6' },
  { name: 'Git & GitHub', icon: '🐙', color: '#333' },
  { name: 'Next.js', icon: '▲', color: '#000' },
  { name: 'React', icon: '⚛️', color: '#61dafb' },
]

const UIUX_SKILLS = [
  { name: 'Figma', icon: '🎭', color: '#f24e1e' },
  { name: 'Adobe XD', icon: '✦', color: '#ff26be' },
  { name: 'Illustrator', icon: '🖌', color: '#ff9a00' },
  { name: 'Photoshop', icon: '🖼', color: '#31a8ff' },
  { name: 'Wireframing', icon: '📐', color: '#666' },
  { name: 'Prototyping', icon: '🔗', color: '#0acf83' },
]

interface SkillCardProps {
  name: string
  icon: string
  color: string
  delay: number
  isVisible: boolean
}

function SkillCard({ name, icon, color, delay, isVisible }: SkillCardProps) {
  return (
    <div
      className={`skill-card bg-[#fafafa] border border-[#f3eeee] rounded-[8px] flex flex-col items-center justify-center gap-1 py-3 px-4 w-[83px] flex-shrink-0 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      data-hover="true"
    >
      <span className="text-2xl" role="img" aria-label={name}>{icon}</span>
      <p className="text-[11px] text-center text-[#2e2b2b] font-['Istok_Web'] leading-tight">{name}</p>
    </div>
  )
}

export default function SkillsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <section id="skills" className="py-20 bg-white">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left: Title */}
          <div
            className={`lg:w-[280px] flex-shrink-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="relative inline-block">
              <h2
                className="text-[38px] font-bold text-[#1e1e1e]"
                style={{ fontFamily: 'Istok Web' }}
              >
                Skills
              </h2>
              <div className="absolute -top-0.5 right-[-14px] w-2 h-2 rounded-full bg-primary" />
            </div>
            <p className="mt-4 text-[#626262] text-base leading-relaxed">
              I build modern, responsive, and intuitive web experiences that combine strong frontend development with thoughtful UI/UX design.
            </p>

            {/* Decorative element */}
            <div className="mt-8 w-12 h-1 rounded-full bg-gradient-to-r from-primary to-transparent" />
          </div>

          {/* Right: Skills grid */}
          <div className="flex-1 flex flex-col gap-8">

            {/* Frontend Developer */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-primary" />
                <span className="text-primary text-base italic font-['Istok_Web']">Frontend Developer</span>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
              </div>
              <div className="flex flex-wrap gap-2">
                {FRONTEND_SKILLS.map((skill, i) => (
                  <SkillCard
                    key={skill.name}
                    {...skill}
                    delay={100 + i * 60}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </div>

            {/* UI/UX */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-primary" />
                <span className="text-primary text-base italic font-['Istok_Web']">UI/UX</span>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
              </div>
              <div className="flex flex-wrap gap-2">
                {UIUX_SKILLS.map((skill, i) => (
                  <SkillCard
                    key={skill.name}
                    {...skill}
                    delay={100 + i * 60}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
