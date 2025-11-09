// app/page.tsx
"use client"

import { GlassmorphismNav } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProblemSolutionSection } from "@/components/problem-solution-section"
import Aurora from "@/components/Aurora"
import { FeaturesSection } from "@/components/features-section"
import { AITeamSection } from "@/components/ai-team-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ROICalculatorSection } from "@/components/roi-calculator-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { useEffect, useState, useCallback } from "react"
import { ColaborationSection } from "@/components/CollaborationSection"

const AURORA_COLORS = {
  dark: ["#abb6ca", "#44484e", "#32373f"],
  light: ["#cddaff", "#d2d4e4", "#dac8f0"],
}

export default function HomePage() {
  const [isLight, setIsLight] = useState(false)

  const updateTheme = useCallback(() => {
    setIsLight(document.documentElement.classList.contains('light'))
  }, [])

  useEffect(() => {
    // Inicializar tema
    updateTheme()

    // Observar cambios en la clase del documento
    const observer = new MutationObserver((mutations) => {
      if (mutations.some(m => m.attributeName === 'class')) {
        updateTheme()
      }
    })

    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })

    return () => observer.disconnect()
  }, [updateTheme])

  return (
    <div className="min-h-screen bg-background overflow-hidden transition-colors duration-500">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora
            colorStops={AURORA_COLORS[isLight ? 'light' : 'dark']}
            amplitude={1.2}
            blend={0.6}
            speed={0.8}
          />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <HeroSection />
          <ColaborationSection/>
          <FeaturesSection />
          <ProblemSolutionSection />
          <AITeamSection />
          <TestimonialsSection />
          <ROICalculatorSection />
          <CTASection />
          <Footer />
        </div>
      </main>
    </div>
  )
}