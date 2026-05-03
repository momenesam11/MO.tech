'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useI18n } from '@/lib/i18n'

import { useRef } from 'react'
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi2'
import { SiUpwork } from 'react-icons/si'

const REVIEWS = [
  {
    name: "علاء ح.",
    platform: "Khamsat",
    platformIcon: <img src="/khamsat.png" alt="Khamsat" className="w-full h-full object-contain" />,
    textAr: "الأستاذ مؤمن سريع جداً في عمله ماشاء الله عليه، طلبت 10 واجهات فقط فنفذ لي 13 عشان يطلع الشكل مناسب والتجربة سهلة وسلسة، فنان جداً في عمله وبمجرد أن يفهم الفكرة بشكل كامل يصبح التنفيذ سريع جداً. تجربة تعاد مرة أخرى وبقوة.",
    textEn: "Mr. Momen is very fast in his work. I requested 10 interfaces, but he delivered 13 to ensure the design and user experience were perfect. Very artistic and highly recommended. Would definitely hire again.",
    rating: 5,
  },
  {
    name: "سعد م.",
    platform: "Mostaql",
    platformIcon: <img src="/mostaql.png" alt="Mostaql" className="w-full h-full object-contain" />,
    textAr: "تعاملت مع العديد من المصممين، ولكن مؤمن كان الأفضل بلا منازع. فهم متطلبات التطبيق المعقدة وحولها إلى واجهات مستخدم نظيفة وحديثة جداً، كما التزم بوقت التسليم بدقة. بالتأكيد سيكون بيننا أعمال قادمة.",
    textEn: "I've dealt with many designers, but Momen was by far the best. He understood the complex app requirements and turned them into clean, modern UI. Strictly adhered to the deadline. Definitely working together again.",
    rating: 5,
  },
  {
    name: "خالد أ.",
    platform: "Khamsat",
    platformIcon: <img src="/khamsat.png" alt="Khamsat" className="w-full h-full object-contain" />,
    textAr: "العمل مع مؤمن كان احترافي جداً، كانت أفضل خدمة اطلبها بالموقع حتى الآن، جودة واحترافية عالية جداً بالتصميم والمتابعة والالتزام بالوقت المحدد، أنصح بالتعامل معه، سأعيد الخدمة معه بشكل دائم بما يتعلق بالتصميم.",
    textEn: "Working with Momen was very professional. It was the best service I've requested on the site so far. High quality, professionalism, and strict adherence to the deadline. I highly recommend him.",
    rating: 5,
  },
  {
    name: "Jessica W.",
    platform: "Upwork",
    platformIcon: <SiUpwork className="text-[#14a800] text-xl" />,
    textAr: "مؤمن مصمم واجهات استثنائي ومطور واجهة أمامية محترف. قدم تصميم الموقع بلمسة إبداعية رائعة وكتب كود نظيف ومتجاوب بالكامل. من السهل جداً التواصل معه وفهم رؤيتنا للمشروع بدقة.",
    textEn: "Momen is an exceptional UI/UX designer and frontend developer. He gave the website design a wonderful creative touch and wrote clean, fully responsive code. Great communication and accurately understood our vision.",
    rating: 5,
  },
  {
    name: "راجح ر.",
    platform: "Khamsat",
    platformIcon: <img src="/khamsat.png" alt="Khamsat" className="w-full h-full object-contain" />,
    textAr: "احترافي شغله ويفيدك باقتراحات ممكن تجهلها والتسليم سريع تصميم العمل عصري ويضيف فيه أيقونات وصور مشبعة بصرياً أشكرك على الخدمة الرائعة والأعمال الجاية أكثر بإذن الله.",
    textEn: "Professional work and provides suggestions you might be unaware of. Fast delivery, modern design with visually appealing icons and images. Thank you for the wonderful service.",
    rating: 5,
  },
  {
    name: "أحمد ت.",
    platform: "Mostaql",
    platformIcon: <img src="/mostaql.png" alt="Mostaql" className="w-full h-full object-contain" />,
    textAr: "شخص مبدع ومتقن لعمله، تواصله ممتاز ويتقبل التعديلات بصدر رحب. قام بتصميم لوحة تحكم كاملة للمشروع وكانت النتيجة مبهرة وأفضل مما توقعنا. شكراً لك يا مؤمن.",
    textEn: "Creative and masterful in his work. Excellent communication and accepts modifications with an open mind. He designed a complete dashboard for the project and the result was impressive, better than expected.",
    rating: 5,
  }
]

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 })
  const { lang, t } = useI18n()
  const scrollContainer = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'prev' | 'next') => {
    if (scrollContainer.current) {
      const container = scrollContainer.current
      const cardWidth = container.querySelector('div[data-card]')?.clientWidth || 380
      const gap = 24 // gap-6 = 24px
      const scrollAmount = cardWidth + gap

      container.scrollBy({
        left: direction === 'prev' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-[#0f0f0f] transition-colors duration-300 border-t border-[#f3eeee] dark:border-white/5">
      <div ref={ref} className="max-w-7xl mx-auto px-10 md:px-20">

        {/* Header */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-6 mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.25em] bg-primary/10 px-3 py-1.5 rounded-full">
              {lang === 'ar' ? 'آراء العملاء' : 'Testimonials'}
            </span>
            <div className="relative inline-block mt-2">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e1e1e] dark:text-[#f0f0f0] text-center md:text-start" style={{ fontFamily: 'Cairo' }}>
                {lang === 'ar' ? 'ماذا يقولون عني؟' : 'What clients say?'}
              </h2>
              <div className={`absolute bottom-1 w-2.5 h-2.5 rounded-full bg-primary ${lang === 'ar' ? 'left-[-14px]' : 'right-[-14px]'}`} />
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll(lang === 'ar' ? 'next' : 'prev')}
              aria-label={lang === 'ar' ? 'التالي' : 'Previous'}
              className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
            >
              {lang === 'ar' ? <HiChevronRight className="text-2xl" /> : <HiChevronLeft className="text-2xl" />}
            </button>
            <button
              onClick={() => scroll(lang === 'ar' ? 'prev' : 'next')}
              aria-label={lang === 'ar' ? 'السابق' : 'Next'}
              className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
            >
              {lang === 'ar' ? <HiChevronLeft className="text-2xl" /> : <HiChevronRight className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollContainer}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-10 px-10 md:mx-0 md:px-0 hide-scrollbar"
        >
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              data-card
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              className={`w-[calc(100vw-80px)] sm:w-[380px] md:min-w-[400px] md:w-auto md:max-w-[420px] snap-center bg-[#fafafa] dark:bg-[#1a1a1a] rounded-3xl p-6 sm:p-8 border border-[#f3eeee] dark:border-white/8 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-500 flex-shrink-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: `${i * 150}ms` }}
              data-hover="true"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1 text-[#fbab17]">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <div className="w-9 h-9 rounded-full overflow-hidden bg-white dark:bg-white/10 flex items-center justify-center p-1.5 shadow-sm">
                  {review.platformIcon}
                </div>
              </div>

              <p className="text-[#6a6a6a] dark:text-[#a0a0a0] text-[15px] font-medium leading-relaxed mb-8 min-h-[120px]">
                "{lang === 'ar' ? review.textAr : review.textEn}"
              </p>

              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#1e1e1e] dark:text-[#f0f0f0] text-[15px]">{review.name}</p>
                  <p className="text-xs font-bold text-[#888]">{lang === 'ar' ? `عميل ${review.platform}` : `${review.platform} Client`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
