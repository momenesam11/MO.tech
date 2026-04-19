'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useState } from 'react'
import { HiEnvelope, HiMapPin, HiPaperAirplane } from 'react-icons/hi2'
import { FaWhatsapp, FaGithub, FaLinkedinIn, FaBehance } from 'react-icons/fa6'

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
      icon: <FaWhatsapp className="text-xl" />,
      label: 'WhatsApp',
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
                      placeholder="moment.esam15@gmail.com"
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
                      <HiPaperAirplane className="text-lg rotate-90" />
                    </>
                  )}
                  {status === 'sending' && (
                    <>
                      Sending...
                      <span className="animate-spin text-lg">◌</span>
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
