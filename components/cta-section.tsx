"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"

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
                element.classList.add("animate-fade-in-up")
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
    <section id="contact" ref={sectionRef} className="relative py-8 px-4 sm:px-6 lg:px-8 mb-32">
      <div className="relative max-w-4xl mx-auto">
        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-center p-8 md:p-10 rounded-3xl border border-white/20 dark:border-slate-700 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/15%),theme(backgroundColor.white/5%))] dark:bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] transition-colors duration-300">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white dark:text-white mb-6 text-balance leading-tight transition-colors duration-300">
            ¿Listo para transformar tu{" "}
            <span className="font-medium italic bg-gradient-to-r from-white to-slate-200 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              comunicación?
            </span>
          </h3>
          <p className="text-lg text-white/70 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            Contáctanos para una consulta estratégica sin compromiso. Analizaremos tu situación actual y diseñaremos una
            estrategia personalizada.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group inline-flex items-center gap-3 px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r from-white to-slate-100 dark:from-white dark:to-slate-200 text-slate-900 dark:text-slate-900 rounded-full font-semibold text-base md:text-lg hover:from-slate-50 dark:hover:from-slate-50 hover:to-slate-200 dark:hover:to-slate-300 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl dark:hover:shadow-lg transition-shadow duration-300">
              Agenda tu Consulta
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            <a
              href="mailto:aaron@tikipr.com"
              className="text-white/70 dark:text-slate-400 hover:text-white dark:hover:text-slate-200 font-medium transition-colors duration-300"
            >
              aaron@tikipr.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
