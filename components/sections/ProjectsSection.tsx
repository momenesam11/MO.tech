'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useState } from 'react'

const PROJECTS = [
  {
    title: 'Over',
    type: 'UI/UX Design',
    description: 'Complete UI/UX redesign project with modern interface and smooth user experience',
    tags: [
      { label: 'Figma', color: '#f6724e', bg: 'rgba(246,114,78,0.1)' },
      { label: 'Responsive', color: '#b24ef6', bg: 'rgba(178,78,246,0.1)' },
      { label: 'Wireframing', color: '#4e78f6', bg: 'rgba(78,120,246,0.1)' },
    ],
    behanceUrl: 'https://www.behance.net/momenesam',
    githubUrl: null,
    image: null,
    gradient: 'from-orange-100 to-red-50',
    gradientDark: 'dark:from-orange-950/40 dark:to-red-950/30',
  },
  {
    title: 'Fokiry',
    type: 'Frontend Dev',
    description: 'Responsive web app built with HTML, CSS and JavaScript with modern design patterns',
    tags: [
      { label: 'HTML', color: '#f6724e', bg: 'rgba(246,114,78,0.1)' },
      { label: 'CSS', color: '#4e78f6', bg: 'rgba(78,120,246,0.1)' },
      { label: 'JS', color: '#f64ecc', bg: 'rgba(246,78,204,0.1)' },
      { label: 'Responsive', color: '#b24ef6', bg: 'rgba(178,78,246,0.1)' },
    ],
    behanceUrl: null,
    githubUrl: 'https://github.com/momenesam11',
    image: null,
    gradient: 'from-blue-50 to-indigo-50',
    gradientDark: 'dark:from-blue-950/40 dark:to-indigo-950/30',
  },
  {
    title: 'E-Commerce UI',
    type: 'UI/UX Design',
    description: 'Modern e-commerce interface design with product listings, cart and checkout flows',
    tags: [
      { label: 'Figma', color: '#f6724e', bg: 'rgba(246,114,78,0.1)' },
      { label: 'Prototyping', color: '#0acf83', bg: 'rgba(10,207,131,0.1)' },
    ],
    behanceUrl: 'https://www.behance.net/momenesam',
    githubUrl: null,
    image: null,
    gradient: 'from-green-50 to-teal-50',
    gradientDark: 'dark:from-green-950/40 dark:to-teal-950/30',
  },
  {
    title: 'Dashboard App',
    type: 'Frontend Dev',
    description: 'Admin dashboard built with Next.js and Tailwind CSS, featuring data visualization',
    tags: [
      { label: 'Next.js', color: '#aaa', bg: 'rgba(180,180,180,0.1)' },
      { label: 'Tailwind', color: '#38bdf8', bg: 'rgba(56,189,248,0.1)' },
      { label: 'TypeScript', color: '#3178c6', bg: 'rgba(49,120,198,0.1)' },
    ],
    behanceUrl: null,
    githubUrl: 'https://github.com/momenesam11',
    image: null,
    gradient: 'from-sky-50 to-blue-50',
    gradientDark: 'dark:from-sky-950/40 dark:to-blue-950/30',
  },
]

interface ProjectCardProps {
  project: typeof PROJECTS[0]
  delay: number
  isVisible: boolean
}

function ProjectCard({ project, delay, isVisible }: ProjectCardProps) {
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
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
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
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-normal text-primary capitalize" style={{ fontFamily: 'Istok Web' }}>
            {project.title}
          </h3>
          <span className="text-[14px] text-[#5b5959] dark:text-[#888]">{project.type}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-[#8a7d7d] dark:text-[#777] leading-relaxed">{project.description}</p>

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
              See Project
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
              See Project
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
  const [filter, setFilter] = useState<'all' | 'ui' | 'dev'>('all')

  const filtered = PROJECTS.filter(p => {
    if (filter === 'ui') return p.type.toLowerCase().includes('ui')
    if (filter === 'dev') return p.type.toLowerCase().includes('frontend')
    return true
  })

  return (
    <section id="projects" className="py-20 bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div ref={ref} className="max-w-7xl mx-auto px-10 md:px-20">

        {/* Header */}
        <div
          className={`flex flex-col items-center gap-4 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-4 w-full max-w-lg">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#6a6a6a]/30 dark:to-white/10" />
            <p className="text-[16px] text-[#6a6a6a] dark:text-[#888] whitespace-nowrap">Some of my latest work</p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#6a6a6a]/30 dark:to-white/10" />
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 bg-[#fafafa] dark:bg-[#1a1a1a] border border-[#f3eeee] dark:border-white/8 rounded-full p-1">
            {([['all', 'All'], ['ui', 'UI/UX'], ['dev', 'Frontend']] as const).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              delay={i * 120}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* View all CTA */}
        <div className={`flex justify-center mt-10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '500ms' }}>
          <a
            href="https://www.behance.net/momenesam"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-primary text-primary font-bold px-8 py-3 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2"
            data-hover="true"
          >
            View All on Behance
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
