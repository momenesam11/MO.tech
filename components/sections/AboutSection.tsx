'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function AboutSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <section id="about" className="py-20 bg-[#fafafa] dark:bg-[#161616] transition-colors duration-300">
      <div ref={ref} className="max-w-7xl mx-auto px-10 md:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Image side */}
          <div
            className={`flex-shrink-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <div className="relative w-[280px] h-[280px]">
              {/* Decorative squares */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-primary/20 rounded-lg" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/10 rounded-lg" />

              <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative z-10">
                <img
                  src="https://www.figma.com/api/mcp/asset/0c1fb48f-dbc5-4b54-8b04-ef296cf530c5"
                  alt="About Momen Esam"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Experience badge */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg dark:shadow-black/50 p-4 border border-[#f3eeee] dark:border-white/10 text-center">
                <p className="text-3xl font-bold text-primary" style={{ fontFamily: 'Istok Web' }}>3+</p>
                <p className="text-xs text-[#8a7d7d] dark:text-[#666] leading-tight mt-0.5">Years<br/>Experience</p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="flex-1 flex flex-col gap-6">
            <div
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-full">
                About Me
              </span>
              <div className="relative inline-block mt-4">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e1e1e] dark:text-[#f0f0f0]" style={{ fontFamily: 'Istok Web' }}>
                  Momen Esam
                </h2>
                <div className="absolute -top-1 -right-3 w-2 h-2 rounded-full bg-primary" />
              </div>
              <p className="text-primary text-base mt-1">UI/UX Designer &amp; Frontend Developer</p>
            </div>

            <div
              className={`flex flex-col gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.15s' }}
            >
              <p className="text-[#626262] dark:text-[#a0a0a0] text-base leading-relaxed">
                I&apos;m a passionate UI/UX Designer and Frontend Developer based in Cairo, Egypt. I specialize in creating digital experiences that are not only visually compelling but also highly functional and user-centered.
              </p>
              <p className="text-[#626262] dark:text-[#a0a0a0] text-base leading-relaxed">
                With expertise spanning from wireframing and prototyping in Figma to building production-ready interfaces with Next.js and Tailwind CSS, I bridge the gap between design and development seamlessly.
              </p>
            </div>

            {/* Info grid */}
            <div
              className={`grid grid-cols-2 gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.3s' }}
            >
              {[
                { label: 'Location', value: 'Cairo, Egypt 🇪🇬' },
                { label: 'Email', value: 'momen@email.com' },
                { label: 'Freelance', value: 'Available ✅' },
                { label: 'Languages', value: 'Arabic, English' },
              ].map(item => (
                <div key={item.label} className="bg-white dark:bg-[#1a1a1a] rounded-xl p-4 border border-[#f3eeee] dark:border-white/8 hover:border-primary/30 transition-colors">
                  <p className="text-xs text-[#8a7d7d] dark:text-[#666] uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-[#2e2b2b] dark:text-[#d0d0d0]">{item.value}</p>
                </div>
              ))}
            </div>

            <div
              className={`flex gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.45s' }}
            >
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-primary bg-primary text-white font-bold px-6 py-3 rounded-full text-sm"
                data-hover="true"
              >
                Get In Touch
              </a>
              <a
                href="/cv.pdf"
                download
                className="border-2 border-[#1e1e1e] dark:border-white/30 text-[#1e1e1e] dark:text-[#d0d0d0] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#1e1e1e] dark:hover:bg-white/10 hover:text-white transition-all duration-300"
                data-hover="true"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
