"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                const el = element as HTMLElement
                el.style.opacity = "1"
                el.style.transform = "translateY(0)"
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-16 px-4 sm:px-6 lg:px-8 mb-32">
      <div className="relative max-w-4xl mx-auto">
        <div 
          className="fade-in-element text-center p-8 md:p-10 rounded-3xl border border-border/60 bg-card/50 backdrop-blur-2xl shadow-2xl"
          style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.8s ease-out" }}
        >
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-6 text-balance leading-tight">
            ¿Listo para transformar tu{" "}
            <span className="font-medium italic bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              comunicación?
            </span>
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Contáctanos para una consulta estratégica sin compromiso. Analizaremos tu situación actual y diseñaremos una
            estrategia personalizada.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg"
              className="text-base md:text-lg px-8 py-6 md:px-12 md:py-3 h-auto font-semibold"
            >
              Agenda tu Consulta
            </Button>

            <a
              href="mailto:aaron@tikipr.com"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors duration-300 hover:underline underline-offset-4"
            >
              aaron@tikipr.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}