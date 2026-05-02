'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useState } from 'react'
import { HiEnvelope, HiMapPin, HiPaperAirplane } from 'react-icons/hi2'
import { FaWhatsapp, FaGithub, FaLinkedinIn, FaBehance } from 'react-icons/fa6'
import { SiUpwork } from 'react-icons/si'
import { useI18n } from '@/lib/i18n'
import emailjs from '@emailjs/browser'

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 })
  const { t, lang } = useI18n()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    
    setStatus('sending')
    
    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject || 'New Contact Message',
      message: form.message,
      to_name: 'Momen Esam',
    }

    try {
      await emailjs.send(
        'service_oj13jpj',
        'template_ts7obps',
        templateParams,
        'CrfsSyIHlOfjUd9_b'
      )
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const CONTACT_ITEMS = [
    {
      icon: <FaWhatsapp className="text-xl" />,
      label: t('contact.whatsapp'),
      value: '+201021179969',
      href: 'https://wa.me/201021179969',
      color: '#25D366',
      bg: 'rgba(37,211,102,0.1)',
    },
    {
      icon: <HiEnvelope className="text-xl" />,
      label: 'Email',
      value: 'moment.esam15@gmail.com',
      href: 'mailto:moment.esam15@gmail.com',
      color: '#f6724e',
      bg: 'rgba(246,114,78,0.1)',
    },
    {
      icon: <HiMapPin className="text-xl" />,
      label: t('contact.loc'),
      value: 'Cairo, Egypt',
      href: 'https://maps.google.com/?q=Cairo,Egypt',
      color: '#4e78f6',
      bg: 'rgba(78,120,246,0.1)',
    },
  ]

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div ref={ref} className="max-w-7xl mx-auto px-10 md:px-20">

        {/* Header */}
        <div
          className={`flex flex-col items-center mb-16 mt-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="text-primary text-sm font-bold uppercase tracking-[0.25em] bg-primary/10 px-3 py-1.5 rounded-full mb-4">
            {t('contact.badge')}
          </span>
          <div className="flex items-baseline gap-1.5 mb-3">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e1e1e] dark:text-[#f0f0f0] text-center" style={{ fontFamily: 'Cairo' }}>
              {t('contact.title')}
            </h2>
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          </div>
          <p className="text-[#6a6a6a] dark:text-[#a0a0a0] text-center max-w-md text-base font-medium">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {CONTACT_ITEMS.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border border-[#f3eeee] dark:border-white/8 hover:border-primary/30 dark:hover:border-primary/30 hover:-translate-y-1 transition-all duration-500 bg-[#fafafa] dark:bg-[#1a1a1a] group ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
                data-hover="true"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: item.color, background: item.bg }}
                >
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] md:text-[13px] font-medium text-[#777] dark:text-[#999] mb-0.5 md:mb-1">{item.label}</p>
                  <p className="text-[14px] md:text-[15px] font-semibold text-[#2e2b2b] dark:text-[#d0d0d0] break-all sm:break-normal line-clamp-1 hover:line-clamp-none">{item.value}</p>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div
              className={`mt-2 p-5 rounded-2xl border border-[#f3eeee] dark:border-white/8 bg-[#fafafa] dark:bg-[#1a1a1a] transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              style={{ transitionDelay: '0.46s' }}
            >
              <p className="text-[14px] font-medium text-[#777] dark:text-[#999] mb-4">{t('contact.follow')}</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: 'https://khamsat.com/user/momenesam11', label: 'Khamsat', icon: <img src="/khamsat.png" alt="Khamsat" className="w-5 h-5 object-contain" /> },
                  { href: 'https://mostaql.com/u/momenesam11', label: 'Mostaql', icon: <img src="/mostaql.png" alt="Mostaql" className="w-5 h-5 object-contain" /> },
                  { href: 'https://www.upwork.com/freelancers/~014da48df25e4e117b', label: 'Upwork', icon: <SiUpwork className="text-[22px] text-[#14a800]" /> },
                ].map(freelance => (
                  <a
                    key={freelance.label}
                    href={freelance.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-[#f3eeee] dark:border-white/10 flex items-center justify-center bg-white dark:bg-[#1a1a1a] hover:border-primary/30 hover:scale-110 transition-all duration-300 overflow-hidden"
                    data-hover="true"
                  >
                    {freelance.icon}
                  </a>
                ))}
                <div className="w-px h-10 bg-gray-200 dark:bg-white/10 mx-1" />
                {[
                  { href: 'https://github.com/momenesam11', label: 'GitHub', icon: <FaGithub size={20} /> },
                  { href: 'https://www.behance.net/momenesam', label: 'Behance', icon: <FaBehance size={20} /> },
                  { href: 'https://www.linkedin.com/in/momenesam/', label: 'LinkedIn', icon: <FaLinkedinIn size={20} /> },
                ].map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl border border-[#f3eeee] dark:border-white/10 flex items-center justify-center text-[#555] dark:text-[#aaa] bg-white dark:bg-[#1a1a1a] hover:text-primary hover:border-primary/30 hover:scale-110 transition-all duration-300"
                    data-hover="true"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="bg-[#fafafa] dark:bg-[#1a1a1a] rounded-2xl border border-[#f3eeee] dark:border-white/8 p-8">
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-[#777] dark:text-[#999]">{t('contact.name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t('contact.ph.name')}
                      className="form-input bg-transparent border-0 border-b-2 border-gray-200 dark:border-white/10 focus:border-primary px-0 py-2.5 text-[15px] font-medium text-[#1e1e1e] dark:text-[#e0e0e0] placeholder-gray-400 dark:placeholder-[#666] outline-none w-full transition-colors duration-300"
                    />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-[#777] dark:text-[#999]">{t('contact.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('contact.ph.email')}
                      className="form-input bg-transparent border-0 border-b-2 border-gray-200 dark:border-white/10 focus:border-primary px-0 py-2.5 text-[15px] font-medium text-[#1e1e1e] dark:text-[#e0e0e0] placeholder-gray-400 dark:placeholder-[#666] outline-none w-full transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#777] dark:text-[#999]">{t('contact.subject')}</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder={t('contact.ph.sub')}
                    className="form-input bg-transparent border-0 border-b-2 border-gray-200 dark:border-white/10 focus:border-primary px-0 py-2.5 text-[15px] font-medium text-[#1e1e1e] dark:text-[#e0e0e0] placeholder-gray-400 dark:placeholder-[#666] outline-none w-full transition-colors duration-300"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#777] dark:text-[#999]">{t('contact.message')}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('contact.ph.msg')}
                    rows={5}
                    className="form-input bg-transparent border-0 border-b-2 border-gray-200 dark:border-white/10 focus:border-primary px-0 py-2.5 text-[15px] font-medium text-[#1e1e1e] dark:text-[#e0e0e0] placeholder-gray-400 dark:placeholder-[#666] outline-none w-full resize-none transition-colors duration-300"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={status === 'sending' || status === 'sent'}
                  className={`btn-primary self-start flex items-center gap-3 font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-300 ${
                    status === 'sent'
                      ? 'bg-green-500 text-white'
                      : status === 'sending'
                      ? 'bg-primary/70 text-white cursor-wait'
                      : 'bg-primary text-white'
                  }`}
                  data-hover="true"
                >
                  {status === 'idle' && (
                    <>
                      {t('contact.send')}
                      <HiPaperAirplane className={`text-lg ${lang === 'ar' ? '-scale-x-100' : ''}`} />
                    </>
                  )}
                  {status === 'sending' && (
                    <>
                      {t('contact.sending')}
                      <span className="animate-spin text-lg">◌</span>
                    </>
                  )}
                  {status === 'sent' && <>{t('contact.sent')}</>}
                  {status === 'error' && <>{lang === 'ar' ? 'فشل الإرسال' : 'Error Sending'}</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
