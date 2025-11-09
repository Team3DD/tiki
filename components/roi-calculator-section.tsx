"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const clientSectors = [
  {
    name: "Movilidad & Transporte",
    color: "from-blue-400 to-cyan-400",
    description: "Conectando usuarios con soluciones de transporte",
  },
  {
    name: "Consumo & Retail",
    color: "from-orange-400 to-red-400",
    description: "Impulsando decisiones de compra estratégicas",
  },
  {
    name: "Servicios Financieros",
    color: "from-green-400 to-teal-400",
    description: "Generando confianza en el sector financiero",
  },
  { name: "Energía", color: "from-yellow-400 to-orange-300", description: "Comunicando sostenibilidad y eficiencia" },
  {
    name: "Responsabilidad Social",
    color: "from-pink-400 to-purple-400",
    description: "Amplificando el impacto social",
  },
  {
    name: "Tecnología & Startups",
    color: "from-indigo-400 to-blue-400",
    description: "Escalando startups innovadores",
  },
  { name: "Salud & Wellness", color: "from-rose-400 to-pink-300", description: "Posicionando marcas en wellness" },
  { name: "Inmobiliaria", color: "from-gray-400 to-slate-400", description: "Vendiendo espacios y oportunidades" },
  { name: "Educación", color: "from-violet-400 to-purple-300", description: "Inspirando el futuro de la educación" },
  {
    name: "Turismo & Hospitalidad",
    color: "from-amber-400 to-yellow-300",
    description: "Atrayendo visitantes a destinos clave",
  },
]

export function ROICalculatorSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("roi-calculator")
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="roi-calculator"
      className="py-16 md:py-20 px-4 relative bg-black dark:bg-slate-900 light:bg-white transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-slate-800/50 light:bg-slate-100 border border-white/10 dark:border-slate-700 light:border-slate-300 backdrop-blur-sm mb-6 transition-colors duration-300">
            <TrendingUp className="w-4 h-4 text-orange-400 dark:text-orange-300 light:text-orange-600" />
            <span className="text-sm font-medium text-white/80 dark:text-slate-300 light:text-slate-700 transition-colors duration-300">
              Nuestros Clientes
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white dark:text-white light:text-slate-900 mb-4 md:mb-6 text-balance transition-colors duration-300">
            Trabajamos con marcas de{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 dark:from-orange-300 dark:to-red-300 light:from-orange-600 light:to-red-600 bg-clip-text text-transparent">
              diversos sectores
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 dark:text-slate-400 light:text-slate-600 max-w-2xl mx-auto text-balance transition-colors duration-300">
            Desde startups hasta corporaciones líderes, hemos trabajado con marcas que transforman sus industrias
          </p>
        </div>

        {/* Clients Grid */}
        <div
          className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {clientSectors.map((sector, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden p-6 bg-white/5 dark:bg-slate-800/50 light:bg-slate-50 border border-white/10 dark:border-slate-700 light:border-slate-200 hover:border-white/20 dark:hover:border-slate-600 light:hover:border-slate-300 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 dark:hover:bg-slate-800 light:hover:bg-slate-100 cursor-pointer transition-colors duration-300"
                style={{
                  transitionDelay: isVisible ? `${100 + index * 50}ms` : "0ms",
                }}
              >
                <div
                  className={`absolute inset-0 opacity-10 dark:opacity-10 light:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-15 light:group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${sector.color}`}
                ></div>

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${sector.color} mb-4 flex items-center justify-center text-white font-bold text-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    {sector.name[0]}
                  </div>

                  <h3 className="font-semibold text-white dark:text-white light:text-slate-900 mb-2 group-hover:text-slate-100 dark:group-hover:text-slate-200 light:group-hover:text-slate-800 transition-colors duration-300">
                    {sector.name}
                  </h3>

                  <p className="text-sm text-white/70 dark:text-slate-400 light:text-slate-600 group-hover:text-white/80 dark:group-hover:text-slate-300 light:group-hover:text-slate-700 transition-colors duration-300">
                    {sector.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-12 md:mt-16 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm text-gray-400 dark:text-slate-500 light:text-slate-500 transition-colors duration-300">
            * Trabajamos con clientes de múltiples industrias adaptando nuestras soluciones a sus necesidades
            específicas
          </p>
        </div>
      </div>
    </section>
  )
}
