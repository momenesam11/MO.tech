'use client'
import CrackIntro from '@/components/animations/CrackIntro'
import Navbar from '@/components/sections/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import NumbersSection from '@/components/sections/NumbersSection'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'
import CompaniesSection from '@/components/sections/CompaniesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import { useState } from 'react'

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <main>
      {!introComplete && (
        <CrackIntro onComplete={() => setIntroComplete(true)} />
      )}
      <div className={`transition-opacity duration-700 ${introComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Navbar />
        <HeroSection />
        <SkillsSection />
        <NumbersSection />
        <CompaniesSection />
        <ProjectsSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
