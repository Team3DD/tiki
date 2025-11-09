"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

const BriefcaseIcon = () => (
  <svg className="h-6 w-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m0 10v10l8 4"
    />
  </svg>
)

const SparkleIcon = () => (
  <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const ArrowRight = () => (
  <svg
    className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

export function ProblemSolutionSection() {
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
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 relative z-10 bg-background dark:bg-background transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 text-foreground dark:text-white text-sm font-medium mb-6 transition-colors duration-300">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
            Quiénes Somos
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-white text-balance mb-4 sm:mb-6 transition-colors duration-300">
            <span className="text-orange-400">TIKI PR:</span> Transformamos Comunicación en Impacto
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 dark:text-white/70 max-w-3xl mx-auto font-light leading-relaxed transition-colors duration-300">
            Desde 2018, trabajamos con marcas líderes para crear estrategias que conectan, comprometen y generan
            resultados medibles.
          </p>
        </div>

        <div
          className={`grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Traditional Challenge */}
          <div className="group">
            <div className="bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 h-full hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-500 hover:border-orange-400/30 dark:hover:border-orange-400/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-orange-500/20 dark:bg-orange-500/20">
                  <BriefcaseIcon />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-orange-400 transition-colors duration-300">
                  Desafío Tradicional
                </h3>
              </div>

              <div className="bg-orange-500/10 dark:bg-orange-500/10 backdrop-blur-sm border border-orange-500/20 dark:border-orange-500/20 rounded-xl p-4 sm:p-6 mb-6 transition-colors duration-300">
                <div className="text-3xl sm:text-4xl font-bold text-orange-400 mb-2">+1000</div>
                <p className="text-foreground/80 dark:text-white/80 text-sm sm:text-base transition-colors duration-300">
                  Publicaciones con impacto demostrado en redes y medios
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/70 dark:text-white/70 text-sm sm:text-base transition-colors duration-300">
                    Comunicación desconectada de objetivos comerciales
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/70 dark:text-white/70 text-sm sm:text-base transition-colors duration-300">
                    Falta de estrategia integrada entre medios
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/70 dark:text-white/70 text-sm sm:text-base transition-colors duration-300">
                    Audiencia sin amplificación ni alcance
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TIKI PR Solution */}
          <div className="group">
            <div className="bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 h-full hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-500 hover:border-green-400/30 dark:hover:border-green-400/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-500/20 dark:bg-green-500/20">
                  <SparkleIcon />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-green-400 transition-colors duration-300">
                  Solución TIKI PR
                </h3>
              </div>

              <div className="bg-green-500/10 dark:bg-green-500/10 backdrop-blur-sm border border-green-500/20 dark:border-green-500/20 rounded-xl p-4 sm:p-6 mb-6 transition-colors duration-300">
                <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">4 Pilares</div>
                <p className="text-foreground/80 dark:text-white/80 text-sm sm:text-base transition-colors duration-300">
                  Estrategia integrada que combina creatividad, medios y resultados
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <SparkleIcon />
                  <p className="text-foreground/70 dark:text-white/70 text-sm sm:text-base transition-colors duration-300">
                    Estrategia alineada con tus objetivos
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <SparkleIcon />
                  <p className="text-foreground/70 dark:text-white/70 text-sm sm:text-base transition-colors duration-300">
                    Producción creativa de alto impacto
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <SparkleIcon />
                  <p className="text-foreground/70 dark:text-white/70 text-sm sm:text-base transition-colors duration-300">
                    Amplificación en todos los canales
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300">
            <div className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-2 transition-colors duration-300">
              6+
            </div>
            <p className="text-foreground/70 dark:text-white/70 text-xs sm:text-sm transition-colors duration-300">
              Años de experiencia comprobada
            </p>
          </div>
          <div className="text-center bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300">
            <div className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-2 transition-colors duration-300">
              50+
            </div>
            <p className="text-foreground/70 dark:text-white/70 text-xs sm:text-sm transition-colors duration-300">
              Marcas transformadas
            </p>
          </div>
          <div className="text-center bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300">
            <div className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-2 transition-colors duration-300">
              100%
            </div>
            <p className="text-foreground/70 dark:text-white/70 text-xs sm:text-sm transition-colors duration-300">
              Dedicación a tu éxito
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`text-center bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-1000 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground dark:text-white mb-3 sm:mb-4 text-balance transition-colors duration-300">
            Descubre Cómo TIKI PR Puede Transformar Tu Marca
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-foreground/70 dark:text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto font-light leading-relaxed transition-colors duration-300">
            Conecta con nosotros para una consulta estratégica sin compromiso.
          </p>
          <Button
            size="lg"
            className="bg-white dark:bg-white text-black dark:text-black rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer"
          >
            Agenda una Consulta
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  )
}
