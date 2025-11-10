"use client"

import { useState, useEffect, useRef } from "react"

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

const cardClass =
  "h-full p-6 rounded-xl border transition-all duration-300 group " +
  "bg-[var(--color-background)] text-[var(--color-foreground)] border-[var(--color-foreground)]/20 " +
  "relative overflow-hidden " +
  "before:absolute before:inset-0 before:z-0 before:bg-[var(--color-foreground)] " +
  "before:content-[''] before:transition-transform before:duration-300 before:translate-x-[-101%] " +
  "hover:before:translate-x-0 hover:text-[var(--color-background)] " +
  "[&_*]:relative [&_*]:z-10"

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
      }
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
      <div className="bg-[var(--color-background)]/80 pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full bg-[var(--color-background)]/10 backdrop-blur-md border border-[var(--color-foreground)]/20 text-[var(--color-foreground)] text-sm font-medium mb-8 mt-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="w-2 h-2 bg-[var(--color-foreground)]/60 rounded-full mr-2 animate-pulse" />
              Pilares de TIKI PR
            </div>

            <h2
              className={`text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Cinco Pilares que{" "}
              <span className="text-[var(--color-foreground)]">Transforman Tu Marca</span>
            </h2>

            <p
              className={`text-xl text-[var(--color-foreground)]/80 max-w-2xl mx-auto transition-all duration-1000 ${
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
                <div className={cardClass}>
                  <div className="text-5xl font-bold mb-4 group-hover:text-[var(--color-background)]/90 transition-colors duration-300">
                    {pilar.number}
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-[var(--color-background)] transition-colors duration-300">
                    {pilar.title}
                  </h3>
                  <p className="text-sm leading-relaxed group-hover:text-[var(--color-background)]/90 transition-colors duration-300">
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
            <p className="text-[var(--color-foreground)]/80 max-w-2xl mx-auto mb-6">
              Estos cinco pilares trabajan en conjunto para crear una estrategia integrada que posiciona tu marca,
              amplifica tu mensaje y genera resultados.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}