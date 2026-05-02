'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useState } from 'react'
import { useI18n } from '@/lib/i18n'

const PROJECTS = [
  {
    titleKey: 'proj.eatic.title',
    descKey: 'proj.eatic.desc',
    typeKey: 'projects.dev',
    filterType: 'dev',
    tags: [
      { label: 'Web Design', color: '#b24ef6', bg: 'rgba(178,78,246,0.1)' },
      { label: 'Frontend', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    ],
    behanceUrl: null,
    githubUrl: 'https://momenesam11.github.io/eaticWeb/',
    image: '/projects/eatic.png',
    gradient: 'from-red-50 to-orange-50',
    gradientDark: 'dark:from-red-950/40 dark:to-orange-950/30',
  },
  {
    titleKey: 'proj.bakery.title',
    descKey: 'proj.bakery.desc',
    typeKey: 'projects.dev',
    filterType: 'dev',
    tags: [
      { label: 'HTML', color: '#f6724e', bg: 'rgba(246,114,78,0.1)' },
      { label: 'CSS', color: '#4e78f6', bg: 'rgba(78,120,246,0.1)' },
    ],
    behanceUrl: null,
    githubUrl: 'https://momenesam11.github.io/Bakery-route/',
    image: '/projects/bakery.png',
    gradient: 'from-orange-50 to-amber-50',
    gradientDark: 'dark:from-orange-950/40 dark:to-amber-950/30',
  },
  {
    titleKey: 'proj.weather.title',
    descKey: 'proj.weather.desc',
    typeKey: 'projects.dev',
    filterType: 'dev',
    tags: [
      { label: 'JavaScript', color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
      { label: 'API', color: '#4e78f6', bg: 'rgba(78,120,246,0.1)' },
    ],
    behanceUrl: null,
    githubUrl: 'https://momenesam11.github.io/weather/',
    image: '/projects/weather.png',
    gradient: 'from-sky-50 to-blue-50',
    gradientDark: 'dark:from-sky-950/40 dark:to-blue-950/30',
  },
  {
    titleKey: 'proj.over.title',
    descKey: 'proj.over.desc',
    typeKey: 'projects.ui',
    filterType: 'ui',
    tags: [
      { label: 'Figma', color: '#f6724e', bg: 'rgba(246,114,78,0.1)' },
      { label: 'Prototyping', color: '#0acf83', bg: 'rgba(10,207,131,0.1)' },
      { label: 'Case Study', color: '#b24ef6', bg: 'rgba(178,78,246,0.1)' },
    ],
    behanceUrl: 'https://www.behance.net/gallery/247358157/Over-UIUX-Case-Study-Presentation',
    githubUrl: null,
    image: '/projects/over.png',
    gradient: 'from-orange-100 to-red-50',
    gradientDark: 'dark:from-orange-950/40 dark:to-red-950/30',
  },
  {
    titleKey: 'proj.nesbah.title',
    descKey: 'proj.nesbah.desc',
    typeKey: 'projects.ui',
    filterType: 'ui',
    tags: [
      { label: 'Figma', color: '#f6724e', bg: 'rgba(246,114,78,0.1)' },
      { label: 'Mobile App', color: '#4e78f6', bg: 'rgba(78,120,246,0.1)' },
      { label: 'Web App', color: '#0acf83', bg: 'rgba(10,207,131,0.1)' },
    ],
    behanceUrl: 'https://www.behance.net/gallery/220469451/Nesbah-UIUX-(mobile-web)',
    githubUrl: null,
    image: '/projects/nesbah.png',
    gradient: 'from-blue-50 to-indigo-50',
    gradientDark: 'dark:from-blue-950/40 dark:to-indigo-950/30',
  },
  {
    titleKey: 'proj.fokiry.title',
    descKey: 'proj.fokiry.desc',
    typeKey: 'projects.dev',
    filterType: 'dev',
    tags: [
      { label: 'HTML', color: '#f6724e', bg: 'rgba(246,114,78,0.1)' },
      { label: 'CSS', color: '#4e78f6', bg: 'rgba(78,120,246,0.1)' },
      { label: 'JS', color: '#f64ecc', bg: 'rgba(246,78,204,0.1)' },
    ],
    behanceUrl: null,
    githubUrl: 'https://momenesam11.github.io/fokir-route/',
    image: '/projects/fokiry.png',
    gradient: 'from-purple-50 to-fuchsia-50',
    gradientDark: 'dark:from-purple-950/40 dark:to-fuchsia-950/30',
  },
  {
    titleKey: 'proj.accessories.title',
    descKey: 'proj.accessories.desc',
    typeKey: 'projects.ui',
    filterType: 'ui',
    tags: [
      { label: 'Figma', color: '#f6724e', bg: 'rgba(246,114,78,0.1)' },
      { label: 'E-commerce', color: '#b24ef6', bg: 'rgba(178,78,246,0.1)' },
    ],
    behanceUrl: 'https://www.behance.net/gallery/217257817/_',
    githubUrl: null,
    image: '/projects/accessories.png',
    gradient: 'from-pink-50 to-rose-50',
    gradientDark: 'dark:from-pink-950/40 dark:to-rose-950/30',
  },
  {
    titleKey: 'proj.daniels.title',
    descKey: 'proj.daniels.desc',
    typeKey: 'projects.dev',
    filterType: 'dev',
    tags: [
      { label: 'Bootstrap', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
      { label: 'Responsive', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    ],
    behanceUrl: null,
    githubUrl: 'https://momenesam11.github.io/Daniels/',
    image: '/projects/daniels.png',
    gradient: 'from-zinc-50 to-gray-50',
    gradientDark: 'dark:from-zinc-950/40 dark:to-gray-950/30',
  },
  {
    titleKey: 'proj.omah.title',
    descKey: 'proj.omah.desc',
    typeKey: 'projects.ui',
    filterType: 'ui',
    tags: [
      { label: 'Figma', color: '#f6724e', bg: 'rgba(246,114,78,0.1)' },
      { label: 'Prototyping', color: '#0acf83', bg: 'rgba(10,207,131,0.1)' },
      { label: 'Arabic', color: '#4e78f6', bg: 'rgba(78,120,246,0.1)' },
    ],
    behanceUrl: 'https://www.behance.net/gallery/214435537/-Omah-App-(Arabic-Prototyping-)',
    githubUrl: null,
    image: '/projects/omah.png',
    gradient: 'from-emerald-50 to-teal-50',
    gradientDark: 'dark:from-emerald-950/40 dark:to-teal-950/30',
  },
  {
    titleKey: 'proj.react.title',
    descKey: 'proj.react.desc',
    typeKey: 'projects.dev',
    filterType: 'dev',
    tags: [
      { label: 'React', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
      { label: 'JavaScript', color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
    ],
    behanceUrl: null,
    githubUrl: 'https://first-react-project-eight-phi.vercel.app/',
    image: '/projects/react.png',
    gradient: 'from-cyan-50 to-blue-50',
    gradientDark: 'dark:from-cyan-950/40 dark:to-blue-950/30',
  },
  {
    titleKey: 'proj.taxi.title',
    descKey: 'proj.taxi.desc',
    typeKey: 'projects.ui',
    filterType: 'ui',
    tags: [
      { label: 'Wireframing', color: '#4e78f6', bg: 'rgba(78,120,246,0.1)' },
      { label: 'Prototyping', color: '#0acf83', bg: 'rgba(10,207,131,0.1)' },
    ],
    behanceUrl: 'https://www.behance.net/gallery/214027801/Taxi-Mobile-App-(prototyping-Wireframe)-Arabic',
    githubUrl: null,
    image: '/projects/taxi.png',
    gradient: 'from-yellow-50 to-amber-50',
    gradientDark: 'dark:from-yellow-950/40 dark:to-amber-950/30',
  },
  {
    titleKey: 'proj.reef.title',
    descKey: 'proj.reef.desc',
    typeKey: 'projects.ui',
    filterType: 'ui',
    tags: [
      { label: 'Figma', color: '#f6724e', bg: 'rgba(246,114,78,0.1)' },
      { label: 'Charity', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    ],
    behanceUrl: 'https://www.behance.net/gallery/213954909/uiux-design-for-Reef-Charity-(Arabic)',
    githubUrl: null,
    image: '/projects/reef.png',
    gradient: 'from-green-50 to-emerald-50',
    gradientDark: 'dark:from-green-950/40 dark:to-emerald-950/30',
  },
]

interface ProjectCardProps {
  project: typeof PROJECTS[0]
  delay: number
  isVisible: boolean
  t: (key: string) => string
}

function ProjectCard({ project, delay, isVisible, t }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`project-card bg-white dark:bg-[#1a1a1a] rounded-[12px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] dark:shadow-[0px_0px_4px_0px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden border border-transparent dark:border-white/5 hover:border-primary/10 dark:hover:border-primary/20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover="true"
    >
      {/* Image / Preview */}
      <div
        className={`h-[142px] bg-gradient-to-br ${project.gradient} ${project.gradientDark} relative overflow-hidden flex items-center justify-center`}
      >
        {project.image ? (
          <img src={project.image} alt={t(project.titleKey)} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-30">
            <div className="w-8 h-8 rounded-lg bg-primary/40" />
            <div className="w-20 h-1.5 rounded-full bg-primary/30" />
            <div className="w-14 h-1.5 rounded-full bg-primary/20" />
          </div>
        )}
        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-primary/10 flex items-center justify-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="bg-white/90 dark:bg-black/70 rounded-full px-4 py-1.5 text-sm font-bold text-primary">Preview</div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Title row */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-[20px] font-bold text-primary capitalize leading-tight" style={{ fontFamily: 'Cairo' }}>
            {t(project.titleKey)}
          </h3>
          <span className="px-2.5 py-1 rounded-md bg-[#f5f5f5] dark:bg-white/5 text-[11px] font-bold text-primary/60 dark:text-white/60 tracking-wider uppercase">
            {t(project.typeKey)}
          </span>
        </div>

        {/* Description */}
        <p className="text-[14px] text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{t(project.descKey)}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span
              key={tag.label}
              className="tag px-3 py-0.5 rounded-full text-[12px] capitalize"
              style={{ color: tag.color, background: tag.bg }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex gap-2 mt-auto pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-primary text-white text-[13px] font-bold px-5 py-2 rounded-full flex items-center gap-2 w-fit"
              data-hover="true"
            >
              {t('projects.see')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
          {project.behanceUrl && (
            <a
              href={project.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-primary text-white text-[13px] font-bold px-5 py-2 rounded-full flex items-center gap-2 w-fit"
              data-hover="true"
            >
              {t('projects.see')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })
  const { t } = useI18n()
  const [filter, setFilter] = useState<'all' | 'ui' | 'dev'>('all')
  const [visibleCount, setVisibleCount] = useState(3) // Ensure 3 items show originally

  const filtered = PROJECTS.filter(p => {
    if (filter === 'all') return true
    return p.filterType === filter
  })

  const visibleProjects = filtered.slice(0, visibleCount)

  const handleFilterChange = (value: 'all' | 'ui' | 'dev') => {
    setFilter(value)
    setVisibleCount(3)
  }

  return (
    <section id="projects" className="py-20 bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div ref={ref} className="max-w-7xl mx-auto px-10 md:px-20">

        {/* Header */}
        <div
          className={`flex flex-col items-center gap-4 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-4 w-full max-w-lg">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#6a6a6a]/30 dark:to-white/10" />
            <p className="text-[16px] text-[#6a6a6a] dark:text-[#888] whitespace-nowrap">{t('projects.subtitle')}</p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#6a6a6a]/30 dark:to-white/10" />
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 bg-[#fafafa] dark:bg-[#1a1a1a] border border-[#f3eeee] dark:border-white/8 rounded-full p-1">
            {([['all', t('projects.all')], ['ui', t('projects.ui')], ['dev', t('projects.dev')]] as const).map(([value, label]) => (
              <button
                key={value}
                onClick={() => handleFilterChange(value as any)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === value
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-[#8a7d7d] dark:text-[#777] hover:text-primary'
                }`}
                data-hover="true"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, i) => (
            <ProjectCard
              key={project.titleKey}
              project={project}
              delay={i * 120}
              isVisible={isVisible}
              t={t}
            />
          ))}
        </div>

        {/* View all CTA / See More */}
        <div className={`flex justify-center mt-10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '500ms' }}>
          {visibleCount < filtered.length ? (
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="border-2 border-primary text-primary font-bold px-8 py-3 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2"
              data-hover="true"
            >
              See More
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          ) : (
            <a
              href="https://www.behance.net/momenesam"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary text-primary font-bold px-8 py-3 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2"
              data-hover="true"
            >
              {t('projects.viewAll')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

