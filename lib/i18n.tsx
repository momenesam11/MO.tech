'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Lang = 'en' | 'ar'

interface I18nContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
  dir: 'ltr' | 'rtl'
  darkMode: boolean
  toggleDarkMode: () => void
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  'nav.home':     { en: 'Home',     ar: 'الرئيسية' },
  'nav.skills':   { en: 'Skills',   ar: 'المهارات' },
  'nav.projects': { en: 'Projects', ar: 'المشاريع' },
  'nav.about':    { en: 'About',    ar: 'عني' },
  'nav.contact':  { en: 'Contact',  ar: 'تواصل' },
  'nav.hire':     { en: 'Hire Me',  ar: 'وظّفني' },

  // Hero
  'hero.badge':   { en: 'UI/UX Designer & Frontend Developer', ar: 'مصمم واجهات وتجربة مستخدم و مطور واجهات أمامية' },
  'hero.desc':    { en: 'I create intuitive interfaces and transform ideas into responsive digital experiences. Crafting the bridge between beautiful design and clean code.', ar: 'أصمّم واجهات سهلة الاستخدام وأحوّل الأفكار إلى تجارب رقمية متجاوبة، أجمع بين الجمال البصري ونظافة الكود.' },
  'hero.contact': { en: 'Contact Me', ar: 'تواصل معي' },
  'hero.portfolio':{ en: 'My Portfolio', ar: 'أعمالي' },
  'hero.available':{ en: 'Available for work ✦', ar: 'متاح للعمل ✦' },
  'hero.scroll':  { en: 'Scroll', ar: 'انزل' },

  // Skills
  'skills.title': { en: 'Skills', ar: 'المهارات' },
  'skills.desc':  { en: 'I build modern, responsive, and intuitive web experiences that combine strong frontend development with thoughtful UI/UX design.', ar: 'أبني تجارب ويب حديثة ومتجاوبة بجمع بين تطوير الواجهات القوي وتصميم UI/UX المدروس.' },
  'skills.frontend': { en: 'Frontend Developer', ar: 'مطور واجهات أمامية' },
  'skills.uiux':  { en: 'UI/UX', ar: 'تصميم UI/UX' },

  // Numbers
  'numbers.projects': { en: 'Successful Projects', ar: 'مشروع ناجح' },
  'numbers.years':    { en: 'Years Experience',   ar: 'سنوات خبرة' },
  'numbers.clients':  { en: 'Happy Clients',      ar: 'عميل' },
  'numbers.rate':     { en: 'Satisfaction Rate',  ar: 'معدل الرضا' },
  'numbers.freelance':{ en: 'Top Rated Freelancer', ar: 'أعلى رتبة بائعي العمل الحر' },
  'numbers.platforms':{ en: 'On Khamsat, Mostaql & Upwork', ar: 'على منصات خمسات، مستقل، وأب ورك' },

  // Projects
  'projects.subtitle': { en: 'Some of my latest work', ar: 'بعض أحدث أعمالي' },
  'projects.all':      { en: 'All',      ar: 'الكل' },
  'projects.ui':       { en: 'UI/UX',   ar: 'تصميم' },
  'projects.dev':      { en: 'Frontend', ar: 'برمجة' },
  'projects.see':      { en: 'See Project', ar: 'عرض المشروع' },
  'projects.viewAll':  { en: 'View All on Behance', ar: 'كل الأعمال على Behance' },

  // Project names/descriptions
  'proj.over.desc':   { en: 'Complete UI/UX redesign project with modern interface and smooth user experience.', ar: 'إعادة تصميم UI/UX كاملة بواجهة حديثة وتجربة مستخدم سلسة.' },
  'proj.nesbah.desc': { en: 'Mobile and web UI/UX design focusing on seamless digital experiences.', ar: 'تصميم واجهة وتجربة مستخدم لتطبيق ويب وموبايل يركز على تجربة رقمية سلسة.' },
  'proj.accessories.desc': { en: 'E-commerce UI/UX design for an accessories store with smooth shopping flows.', ar: 'تصميم واجهة وتجربة مستخدم لمتجر إلكتروني لبيع الإكسسوارات مع تدفق شراء سلس.' },
  'proj.omah.desc': { en: 'UI/UX design and prototyping for Omah App in Arabic.', ar: 'تصميم واجهة وتجربة المستخدم وعمل نماذج أولية (Prototyping) لتطبيق أُمة باللغة العربية.' },
  'proj.taxi.desc': { en: 'Wireframing and prototyping for a modern Taxi booking mobile application.', ar: 'عمل التخطيط الهيكلي (Wireframe) والنماذج الأولية لتطبيق حجز سيارات أجرة.' },
  'proj.reef.desc': { en: 'UI/UX design for Reef Charity with a focus on donation flows and user trust.', ar: 'تصميم واجهة وتجربة مستخدم لجمعية الريف الخيرية مع التركيز على تسهيل التبرعات وبناء الثقة.' },
  
  'proj.weather.desc': { en: 'Dynamic weather application fetching real-time API data to display forecasts.', ar: 'تطبيق طقس ديناميكي يجلب بيانات حية من واجهة برمجة التطبيقات (API) لعرض التوقعات.' },
  'proj.fokiry.desc': { en: 'Responsive portfolio website built with HTML, CSS, and JavaScript.', ar: 'موقع ويب تعريفي متجاوب مبني باستخدام HTML و CSS و JavaScript.' },
  'proj.daniels.desc': { en: 'Modern responsive frontend website template with clean code architecture.', ar: 'قالب موقع ويب أمامي متجاوب وحديث مع بنية كود نظيفة.' },
  'proj.react.desc': { en: 'My initial exploration into building interactive web applications using React.', ar: 'أولى مشاريعي في بناء تطبيقات ويب تفاعلية باستخدام مكتبة React.' },
  'proj.bakery.desc': { en: 'Delicious bakery landing page highlighting products with a responsive layout.', ar: 'صفحة هبوط لمخبز تعرض المنتجات بتصميم جذاب ومتجاوب.' },
  'proj.eatic.desc': { en: 'Frontend implementation for a food delivery or restaurant service.', ar: 'تطوير واجهة أمامية لخدمة توصيل طعام أو مطعم.' },

  'proj.over.title': { en: 'Over', ar: 'أوفر' },
  'proj.nesbah.title': { en: 'Nesbah', ar: 'نسبة' },
  'proj.accessories.title': { en: 'Accessories', ar: 'متجر إكسسوارات' },
  'proj.omah.title': { en: 'Omah App', ar: 'تطبيق أُمة' },
  'proj.taxi.title': { en: 'Taxi App', ar: 'تطبيق تاكسي' },
  'proj.reef.title': { en: 'Reef Charity', ar: 'جمعية الريف' },
  'proj.weather.title': { en: 'Weather App', ar: 'تطبيق الطقس' },
  'proj.fokiry.title': { en: 'Fokiry', ar: 'فوكيري' },
  'proj.daniels.title': { en: 'Daniels', ar: 'دانيلز' },
  'proj.react.title': { en: 'React App', ar: 'تطبيق React' },
  'proj.bakery.title': { en: 'Bakery', ar: 'المخبز' },
  'proj.eatic.title': { en: 'Eatic', ar: 'إيتيك' },

  // About
  'about.badge':   { en: 'About Me',  ar: 'عني' },
  'about.role':    { en: 'UI/UX Designer & Frontend Developer', ar: 'مصمم UI/UX ومطور واجهات' },
  'about.p1':      { en: "I'm a passionate UI/UX Designer and Frontend Developer based in Cairo, Egypt. I specialize in creating digital experiences that are not only visually compelling but also highly functional and user-centered.", ar: 'أنا مصمم UI/UX ومطور واجهات أمامية شغوف مقيم في القاهرة، مصر. أتخصص في إنشاء تجارب رقمية جذابة بصريًا وعملية ومتمحورة حول المستخدم.' },
  'about.p2':      { en: 'With expertise spanning from wireframing and prototyping in Figma to building production-ready interfaces with Next.js and Tailwind CSS, I bridge the gap between design and development.', ar: 'بخبرتي من الـ wireframing والـ prototyping في Figma إلى بناء واجهات جاهزة للإنتاج بـ Next.js وTailwind، أجسّد الفجوة بين التصميم والتطوير.' },
  'about.location':  { en: 'Cairo, Egypt 🇪🇬', ar: 'القاهرة، مصر 🇪🇬' },
  'about.email':     { en: 'moment.esam15@gmail.com', ar: 'moment.esam15@gmail.com' },
  'about.freelance': { en: 'Available ✅', ar: 'متاح ✅' },
  'about.languages': { en: 'Arabic, English', ar: 'العربية، الإنجليزية' },
  'about.loc.label': { en: 'Location',   ar: 'الموقع' },
  'about.em.label':  { en: 'Email',      ar: 'البريد' },
  'about.fr.label':  { en: 'Freelance',  ar: 'فريلانس' },
  'about.lg.label':  { en: 'Languages',  ar: 'اللغات' },
  'about.cta':       { en: 'Get In Touch',  ar: 'تواصل معي' },
  'about.cv':        { en: 'Download CV',   ar: 'تحميل السيرة الذاتية' },

  // Contact
  'contact.badge':    { en: 'Get In Touch',      ar: 'تواصل معي' },
  'contact.title':    { en: 'Contact Me',         ar: 'راسلني' },
  'contact.subtitle': { en: "Have a project in mind? Let's talk and bring your ideas to life.", ar: 'لديك مشروع في ذهنك؟ لنتحدث ونحوّل أفكارك إلى واقع.' },
  'contact.name':     { en: 'Your Name',          ar: 'اسمك' },
  'contact.email':    { en: 'Email Address',       ar: 'البريد الإلكتروني' },
  'contact.subject':  { en: 'Subject',             ar: 'الموضوع' },
  'contact.message':  { en: 'Message',             ar: 'الرسالة' },
  'contact.ph.name':  { en: 'Momen Esam',         ar: 'محمد أحمد' },
  'contact.ph.email': { en: 'moment.esam15@gmail.com',    ar: 'moment.esam15@gmail.com' },
  'contact.ph.sub':   { en: 'Project Inquiry',    ar: 'استفسار عن مشروع' },
  'contact.ph.msg':   { en: 'Tell me about your project...', ar: 'أخبرني عن مشروعك...' },
  'contact.send':     { en: 'Send Message',        ar: 'إرسال الرسالة' },
  'contact.sending':  { en: 'Sending...',          ar: 'جاري الإرسال...' },
  'contact.sent':     { en: 'Message Sent! ✓',    ar: 'تم الإرسال! ✓' },
  'contact.follow':   { en: 'Follow Me',           ar: 'تابعني' },
  'contact.whatsapp': { en: 'WhatsApp',            ar: 'واتساب' },
  'contact.loc':      { en: 'Location',            ar: 'الموقع' },

  // Footer
  'footer.desc':  { en: 'UI/UX Designer & Frontend Developer crafting beautiful digital experiences from Cairo, Egypt.', ar: 'مصمم UI/UX ومطور واجهات يصنع تجارب رقمية جميلة من القاهرة، مصر.' },
  'footer.links': { en: 'Quick Links', ar: 'روابط سريعة' },
  'footer.avail': { en: 'Available for new projects', ar: 'متاح لمشاريع جديدة' },
  'footer.copy':  { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
  'footer.built': { en: 'Designed in Figma · Built with Next.js & Tailwind', ar: 'مصمم في Figma · مبني بـ Next.js & Tailwind' },
}

const I18nContext = createContext<I18nContextType>({
  lang: 'ar',
  setLang: () => {},
  t: (k) => k,
  dir: 'rtl',
  darkMode: false,
  toggleDarkMode: () => {},
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar')
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedDark = localStorage.getItem('darkMode')
    if (savedDark === 'true') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
    
    const savedLang = localStorage.getItem('lang') as Lang
    if (savedLang) {
      setLang(savedLang)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    localStorage.setItem('lang', lang)
  }, [lang, mounted])

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('darkMode', 'true')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('darkMode', 'false')
      }
      return next
    })
  }

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key
  }

  // To prevent hydration mismatch, we don't render anything that depends on client-only state 
  // during the first render. However, since lang defaults to 'en' (same as server), 
  // it's generally safe. The main issue is often attributes or complex nesting.
  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir: lang === 'ar' ? 'rtl' : 'ltr', darkMode, toggleDarkMode }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
