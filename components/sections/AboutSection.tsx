'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useI18n } from '@/lib/i18n'

export default function AboutSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const { t, lang } = useI18n()

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
                  src="/avatar2.png"
                  alt="About Momen Esam"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Experience badge */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg dark:shadow-black/50 p-4 border border-[#f3eeee] dark:border-white/10 text-center">
                <p className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cairo' }}>5+</p>
                <p className="text-sm text-[#202020] dark:text-[#666] leading-tight mt-0.5">Years<br/>Experience</p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="flex-1 flex flex-col gap-6">
            <div
              className={`flex flex-col items-start gap-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="inline-block text-primary text-sm font-bold uppercase tracking-[0.2em] bg-primary/10 px-3 py-1.5 rounded-full mb-1">
                {t('about.badge')}
              </div>
              <div className="flex items-baseline gap-1.5">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e1e1e] dark:text-[#f0f0f0]" style={{ fontFamily: 'Cairo' }}>
                  {lang === 'ar' ? 'مؤمن عصام' : 'Momen Esam'}
                </h2>
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              </div>
              <p className="text-primary text-base">{t('about.role')}</p>
            </div>

            <div
              className={`flex flex-col gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.15s' }}
            >
              <p className="text-[#626262] dark:text-[#a0a0a0] text-base leading-relaxed">
                {t('about.p1')}
              </p>
              <p className="text-[#626262] dark:text-[#a0a0a0] text-base leading-relaxed">
                {t('about.p2')}
              </p>
            </div>

            {/* Info grid */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.3s' }}
            >
              {[
                { label: t('about.loc.label'), value: t('about.location') },
                { label: t('about.em.label'), value: t('about.email') },
                { label: t('about.fr.label'), value: t('about.freelance') },
                { label: t('about.lg.label'), value: t('about.languages') },
              ].map(item => (
                <div key={item.label} className="bg-white dark:bg-[#1a1a1a] rounded-xl p-4 border border-[#f3eeee] dark:border-white/8 hover:border-primary/30 transition-colors">
                  <p className="text-sm text-[#f6724e] dark:text-[#666] uppercase tracking-wider mb-1">{item.label}</p>
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
                {t('about.cta')}
              </a>
              <a
                href="/Momen_Esam_CV.pdf"
                download="Momen_Esam_CV.pdf"
                className="border-2 border-[#1e1e1e] dark:border-white/30 text-[#1e1e1e] dark:text-[#d0d0d0] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#1e1e1e] dark:hover:bg-white/10 hover:text-white transition-all duration-300"
                data-hover="true"
              >
                {t('about.cv')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
