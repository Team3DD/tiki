"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle } from "lucide-react"

const pilares = [
  {
    number: 1,
    title: "Posicionamiento Estratégico",
    description:
      "Definimos tu posición en el mercado basada en análisis profundo de tu industria, competencia y audiencia objetivo.",
  },
  {
    number: 2,
    title: "Medios y Amplificación",
    description:
      "Relaciones sólidas con medios de comunicación que garantizan cobertura y visibilidad estratégica para tu marca.",
  },
  {
    number: 3,
    title: "Alianzas Estratégicas",
    description:
      "Conexiones con influencers, partners y líderes de opinión que expanden tu alcance y generan credibilidad.",
  },
  {
    number: 4,
    title: "Digital & Contenido",
    description:
      "Producción de contenido de alto impacto en redes, blog y plataformas digitales que generan engagement constante.",
  },
  {
    number: 5,
    title: "Gestión de Reputación",
    description:
      "Monitoreo continuo y manejo estratégico de tu reputación online con respuestas rápidas ante cualquier situación.",
  },
]

export function AITeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="ai-team" ref={sectionRef} className="relative z-10">
      <div className="bg-white dark:bg-slate-900 rounded-b-[3rem] pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-1000 transition-colors duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Pilares de TIKI PR
            </div>

            <h2
              className={`text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-all duration-1000 transition-colors duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Cinco Pilares que{" "}
              <span className="bg-gradient-to-r from-slate-600 to-slate-400 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
                Transforman Tu Marca
              </span>
            </h2>

            <p
              className={`text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-all duration-1000 transition-colors duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Nuestra metodología se basa en cinco pilares fundamentales que garantizan resultados estratégicos y
              medibles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {pilares.map((pilar, index) => (
              <div
                key={pilar.number}
                className={`transition-all duration-1000 delay-${300 + index * 100} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
                }}
              >
                <div className="h-full p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 group">
                  <div className="text-5xl font-bold text-slate-200 dark:text-slate-700 mb-4 group-hover:text-slate-300 dark:group-hover:text-slate-600 transition-colors duration-300">
                    {pilar.number}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                    {pilar.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                    {pilar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6 transition-colors duration-300">
              Estos cinco pilares trabajan en conjunto para crear una estrategia integrada que posiciona tu marca,
              amplifica tu mensaje y genera resultados.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
