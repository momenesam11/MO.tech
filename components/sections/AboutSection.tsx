'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useI18n } from '@/lib/i18n'
import { HiAcademicCap, HiTrophy, HiBriefcase, HiDocumentCheck, HiCommandLine } from 'react-icons/hi2'

export default function AboutSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const { t, lang } = useI18n()

  const STEPS = [
    { icon: <HiAcademicCap />, titleKey: 'about.step1.title', descKey: 'about.step1.desc', detailKey: 'about.step1.detail' },
    { icon: <HiCommandLine />, titleKey: 'about.step2.title', descKey: 'about.step2.desc', detailKey: 'about.step2.detail' },
    { icon: <HiTrophy />, titleKey: 'about.step3.title', descKey: 'about.step3.desc', detailKey: 'about.step3.detail' },
    { icon: <HiBriefcase />, titleKey: 'about.step4.title', descKey: 'about.step4.desc', detailKey: 'about.step4.detail' },
    { icon: <HiDocumentCheck />, titleKey: 'about.step5.title', descKey: 'about.step5.desc', detailKey: 'about.step5.detail' },
  ]

  return (
    <section id="about" className="py-20 bg-[#fafafa] dark:bg-[#161616] transition-colors duration-300">
      <div ref={ref} className="max-w-7xl mx-auto px-10 md:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Image side */}
          <div
            className={`flex-shrink-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <div className="relative w-[280px] h-[280px]" style={{ transform: 'rotate(0deg)' }}>
              {/* Decorative squares */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-primary/20 rounded-lg" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/10 rounded-lg" />

              <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative z-10">
                <img
                  src="/avatar2.png"
                  alt="About Momen Esam"
                  className="w-full h-full object-cover"
                  style={{ transform: 'rotate(0deg)' }}
                />
              </div>

              {/* Experience badge - translated */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg dark:shadow-black/50 p-4 border border-[#f3eeee] dark:border-white/10 text-center">
                <p className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cairo' }}>5+</p>
                <p className="text-sm text-[#202020] dark:text-[#666] leading-tight mt-0.5">
                  {t('about.exp.years')}<br />{t('about.exp.experience')}
                </p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="flex-1 flex flex-col gap-6">
            <div
              className={`flex flex-col items-start gap-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="relative inline-block">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e1e1e] dark:text-[#f0f0f0]" style={{ fontFamily: 'Cairo' }}>
                  {lang === 'ar' ? 'مؤمن عصام' : 'Momen Esam'}
                </h2>
                <div className={`absolute bottom-2 w-2.5 h-2.5 rounded-full bg-primary ${lang === 'ar' ? 'left-[-14px]' : 'right-[-14px]'}`} />
              </div>
              <p className="text-primary text-base">{t('about.role')}</p>
            </div>

            {/* Stepper Timeline */}
            <div
              className={`relative flex flex-col gap-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.15s' }}
            >
              {/* Vertical line */}
              <div
                className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent ${lang === 'ar' ? 'right-[19px]' : 'left-[19px]'}`}
              />

              {STEPS.map((step, i) => (
                <div
                  key={step.titleKey}
                  className={`relative flex items-start gap-4 pb-6 last:pb-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
                >
                  {/* Circle marker */}
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary text-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white dark:bg-[#1a1a1a] rounded-xl p-4 border border-[#f3eeee] dark:border-white/8 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <h4 className="text-base font-bold text-[#1e1e1e] dark:text-[#f0f0f0] mb-1" style={{ fontFamily: 'Cairo' }}>
                      {t(step.titleKey)}
                    </h4>
                    <p className="text-sm text-[#626262] dark:text-[#a0a0a0] leading-relaxed">
                      {t(step.descKey)}
                    </p>
                    <p className="text-xs text-primary/70 mt-1 font-medium">
                      {t(step.detailKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div
              className={`flex gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.7s' }}
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
