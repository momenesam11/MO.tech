'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useState } from 'react'

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1500))
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  const CONTACT_ITEMS = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"/>
        </svg>
      ),
      label: 'WhatsApp',
      value: '+20 100 000 0000',
      href: 'https://wa.me/201000000000',
      color: '#25D366',
      bg: 'rgba(37,211,102,0.1)',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: 'Email',
      value: 'momen@email.com',
      href: 'mailto:momen@email.com',
      color: '#f6724e',
      bg: 'rgba(246,114,78,0.1)',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      label: 'Location',
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
          className={`flex flex-col items-center gap-3 mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="text-primary text-sm font-bold uppercase tracking-[0.25em] bg-primary/10 px-3 py-1.5 rounded-full">
            Get In Touch
          </span>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e1e1e] dark:text-[#f0f0f0] text-center" style={{ fontFamily: 'Istok Web' }}>
              Contact Me
            </h2>
            <div className="absolute -top-1 -right-3 w-2 h-2 rounded-full bg-primary" />
          </div>
          <p className="text-[#8a7d7d] dark:text-[#888] text-center max-w-md text-base">
            Have a project in mind? Let&apos;s talk and bring your ideas to life.
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
                className={`flex items-center gap-4 p-5 rounded-2xl border border-[#f3eeee] dark:border-white/8 hover:border-primary/30 dark:hover:border-primary/30 hover:-translate-y-1 transition-all duration-500 bg-[#fafafa] dark:bg-[#1a1a1a] group ${
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
                <div>
                  <p className="text-xs text-[#8a7d7d] dark:text-[#666] uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium text-[#2e2b2b] dark:text-[#d0d0d0]">{item.value}</p>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div
              className={`mt-2 p-5 rounded-2xl border border-[#f3eeee] dark:border-white/8 bg-[#fafafa] dark:bg-[#1a1a1a] transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              style={{ transitionDelay: '0.46s' }}
            >
              <p className="text-xs text-[#8a7d7d] dark:text-[#666] uppercase tracking-wider mb-4">Follow Me</p>
              <div className="flex gap-3">
                {[
                  { href: 'https://github.com/momenesam11', label: 'GitHub', icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21C9.5 20.77 9.5 20.14 9.5 19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6.01 9.48 6.65 8.77C6.55 8.52 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.52 17.35 8.77C17.99 9.48 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26C14.5 19.6 14.5 20.68 14.5 21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 6.48 17.52 2 12 2Z"/></svg>
                  )},
                  { href: 'https://www.behance.net/momenesam', label: 'Behance', icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.14 1.4-.426 1.96-.285.56-.67 1.02-1.16 1.38-.49.36-1.055.63-1.69.8-.635.17-1.3.254-1.99.254H0V4.502h6.938zm-.412 5.56c.585 0 1.067-.14 1.444-.42.376-.28.564-.73.564-1.35 0-.338-.06-.62-.18-.845-.12-.226-.283-.41-.49-.55-.21-.14-.45-.235-.725-.29-.275-.053-.568-.08-.88-.08H2.59v3.53h3.936zm.22 5.773c.346 0 .67-.033.97-.1.3-.066.56-.177.78-.33.22-.155.395-.364.525-.625.13-.26.195-.6.195-1.01 0-.8-.22-1.37-.667-1.71-.447-.34-1.04-.51-1.78-.51H2.59v4.28l4.156.005zM22.804 15.07c-.375.58-.88 1.04-1.503 1.37-.624.34-1.31.5-2.06.5-.77 0-1.46-.13-2.07-.4-.61-.27-1.12-.64-1.544-1.11-.42-.47-.742-1.01-.963-1.62-.22-.61-.33-1.27-.33-1.98 0-.73.11-1.4.33-2.01.22-.61.54-1.14.963-1.59.42-.45.93-.8 1.534-1.05.604-.25 1.28-.37 2.03-.37.73 0 1.38.13 1.95.4.57.27 1.05.64 1.44 1.12.39.48.68 1.04.87 1.67.19.63.27 1.3.24 2.01H17.37c.02.8.25 1.4.69 1.79.44.4 1 .6 1.7.6.47 0 .876-.11 1.21-.33.334-.22.566-.55.7-.98h2.132c-.13.72-.445 1.29-.8 1.98zM19.24 10.66c-.41 0-.76.06-1.06.18-.3.12-.55.28-.76.49-.21.2-.37.44-.49.72-.12.28-.19.58-.22.9h4.944c-.07-.75-.31-1.32-.72-1.72-.41-.4-.96-.57-1.69-.57zm-4.44-4.38h5.86v1.35h-5.86V6.28z"/></svg>
                  )},
                  { href: '#', label: 'LinkedIn', icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  )},
                ].map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl border border-[#f3eeee] dark:border-white/10 flex items-center justify-center text-[#8a7d7d] dark:text-[#666] hover:text-primary hover:border-primary/30 hover:scale-110 transition-all duration-300"
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
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-[#8a7d7d] dark:text-[#666] uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Momen Esam"
                      className="form-input bg-transparent border-0 border-b-2 border-gray-200 dark:border-white/10 focus:border-primary px-0 py-2.5 text-sm text-[#2e2b2b] dark:text-[#d0d0d0] placeholder-gray-300 dark:placeholder-[#444] outline-none w-full transition-colors duration-300"
                    />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-[#8a7d7d] dark:text-[#666] uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="momen@email.com"
                      className="form-input bg-transparent border-0 border-b-2 border-gray-200 dark:border-white/10 focus:border-primary px-0 py-2.5 text-sm text-[#2e2b2b] dark:text-[#d0d0d0] placeholder-gray-300 dark:placeholder-[#444] outline-none w-full transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-[#8a7d7d] dark:text-[#666] uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className="form-input bg-transparent border-0 border-b-2 border-gray-200 dark:border-white/10 focus:border-primary px-0 py-2.5 text-sm text-[#2e2b2b] dark:text-[#d0d0d0] placeholder-gray-300 dark:placeholder-[#444] outline-none w-full transition-colors duration-300"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-[#8a7d7d] dark:text-[#666] uppercase tracking-wider">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="form-input bg-transparent border-0 border-b-2 border-gray-200 dark:border-white/10 focus:border-primary px-0 py-2.5 text-sm text-[#2e2b2b] dark:text-[#d0d0d0] placeholder-gray-300 dark:placeholder-[#444] outline-none w-full resize-none transition-colors duration-300"
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
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                  {status === 'sending' && (
                    <>
                      Sending...
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                        <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                      </svg>
                    </>
                  )}
                  {status === 'sent' && <>Message Sent! ✓</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
