'use client'
import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useI18n } from '@/lib/i18n'
import { FaHtml5, FaJs, FaBootstrap } from "react-icons/fa";
import { FaCss, FaFigma, FaGitAlt, FaGithub } from "react-icons/fa6";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { BsFiletypeSass, BsTypescript } from "react-icons/bs";
import { IoLogoReact } from 'react-icons/io5';
import { TbApi, TbBrandAdobeIllustrator, TbBrandAdobePhotoshop, TbBrandAdobeXd, TbFrame } from 'react-icons/tb';
import { PiFlowArrowBold } from 'react-icons/pi';
import { RiDashboardHorizontalLine } from 'react-icons/ri';
import { IconType } from 'react-icons/lib';

const FRONTEND_SKILLS = [
  { name: 'HTML', brandColor: '#e34c26', icon: FaHtml5 },
  { name: 'CSS', brandColor: '#264de4', icon: FaCss },
  { name: 'JavaScript', brandColor: '#f7df1e', icon: FaJs },
  { name: 'Bootstrap', brandColor: '#7952b3', icon: FaBootstrap },
  { name: 'Tailwind', brandColor: '#06b6d4', icon: SiTailwindcss },
  { name: 'SASS', brandColor: '#cc6699', icon: BsFiletypeSass },
  { name: 'TypeScript', brandColor: '#3178c6', icon: BsTypescript },
  { name: 'Git', brandColor: '#f05032', icon: FaGitAlt },
  { name: 'GitHub', brandColor: '#f05032', icon: FaGithub },
  { name: 'Next.js', brandColor: '#000000', icon: SiNextdotjs },
  { name: 'API Integration', brandColor: '#a14c4c', icon: TbApi },
  { name: 'React', brandColor: '#61dafb', icon: IoLogoReact },
]

const UIUX_SKILLS = [
  { name: 'Figma', brandColor: '#f24e1e', icon: FaFigma },
  { name: 'Adobe XD', brandColor: '#ff61f6', icon: TbBrandAdobeXd },
  { name: 'Illustrator', brandColor: '#ff9a00', icon: TbBrandAdobeIllustrator },
  { name: 'Photoshop', brandColor: '#31a8ff', icon: TbBrandAdobePhotoshop },
  { name: 'Wireframing', brandColor: '#6366f1', icon: TbFrame },
  { name: 'Prototyping', brandColor: '#0acf83', icon: PiFlowArrowBold },
  { name: 'Dashboarding', brandColor: '#079c63', icon: RiDashboardHorizontalLine },
]

interface SkillCardProps {
  name: string
  brandColor: string
  icon: IconType
  delay: number
  isVisible: boolean
}

function SkillCard({ name, brandColor, icon: Icon, delay, isVisible }: SkillCardProps) {
  const [hovered, setHovered] = useState(false)
  const { darkMode } = useI18n()

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover="true"
      className={`
        relative flex flex-col items-center justify-center gap-1.5
        py-3.5 px-3 w-[86px] rounded-[8px] border
        transition-all duration-400 cursor-default
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${hovered
          ? 'border-gray-200 dark:border-white/20 bg-white dark:bg-[#222] shadow-md dark:shadow-black/40 scale-110'
          : 'border-[#f0ecec] dark:border-white/8 bg-[#fafafa] dark:bg-[#1a1a1a] scale-100'
        }
      `}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        transitionProperty: 'opacity, transform, box-shadow, border-color, background',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        transitionDuration: hovered ? '200ms' : '700ms',
      }}
    >
      {/* Icon */}
      <div
        className="w-8 h-8 flex items-center justify-center transition-all duration-200"
        style={{
          color: hovered ? brandColor : '#757070',
          fontSize: hovered ? '26px' : '22px',
        }}
      >
        <Icon />
      </div>

      {/* Label */}
      <p
        className="text-[12px] text-center leading-tight font-medium transition-colors duration-200"
        style={{ 
          color: hovered 
            ? (darkMode ? '#f0f0f0' : '#1e1e1e') 
            : (darkMode ? '#d0d0d0' : '#1e1e1e') 
        }}
      >
        {name}
      </p>

      {/* Color dot indicator on hover */}
      {hovered && (
        <span
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
          style={{ background: brandColor }}
        />
      )}
    </div>
  )
}

export default function SkillsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })
  const { t, lang } = useI18n()

  return (
    <section id="skills" className="py-24 bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div ref={ref} className="max-w-7xl mx-auto px-10 md:px-20">
        <div className="flex flex-col lg:flex-row gap-14 md:gap-[20rem]">

          {/* Left: Title */}
          <div
            className={`lg:w-[280px] flex-shrink-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="relative inline-block">
              <h2 className="text-[38px] font-bold text-[#1e1e1e] dark:text-[#f0f0f0]" style={{ fontFamily: 'Cairo' }}>
                {t('skills.title')}
              </h2>
              <div className={`absolute top-[1.875rem] w-2 h-2 rounded-full bg-primary ${lang === 'ar' ? 'left-[-14px]' : 'right-[-14px]'}`} />
            </div>
            <p className="mt-4 text-[#626262] dark:text-[#a0a0a0] text-base leading-relaxed">
              {t('skills.desc')}
            </p>
            <div className="mt-8 w-12 h-[3px] rounded-full bg-gradient-to-r from-primary to-transparent" />
          </div>

          {/* Right: Skill groups */}
          <div className="flex-1 flex flex-col gap-10">

            {/* Frontend */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-primary" />
                <span className="text-primary text-base italic" style={{ fontFamily: 'Cairo' }}>
                  {t('skills.frontend')}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
              </div>
              <div className="flex flex-wrap gap-2.5">
                {FRONTEND_SKILLS.map((skill, i) => (
                  <SkillCard
                    key={skill.name}
                    {...skill}
                    delay={80 + i * 50}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </div>

            {/* UI/UX */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-primary" />
                <span className="text-primary text-base italic" style={{ fontFamily: 'Cairo' }}>
                  {t('skills.uiux')}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
              </div>
              <div className="flex flex-wrap gap-2.5">
                {UIUX_SKILLS.map((skill, i) => (
                  <SkillCard
                    key={skill.name}
                    {...skill}
                    delay={80 + i * 50}
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
