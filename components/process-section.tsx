"use client"

import { useRef } from "react"
import { Lightbulb, Search, Palette, Rocket, BarChart } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import AnimatedSection from "@/components/ui/animated-section"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"

export default function ProcessSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60%", "end 40%"],
  })

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  const phases = [
    { icon: Lightbulb, title: "Descubrimiento", description: "Analizamos tu marca, objetivos y audiencia para crear una estrategia personalizada." },
    { icon: Search, title: "Investigación", description: "Estudiamos el mercado, competencia y tendencias para identificar oportunidades únicas." },
    { icon: Palette, title: "Creación", description: "Desarrollamos conceptos creativos y contenido que resuena con tu audiencia." },
    { icon: Rocket, title: "Lanzamiento", description: "Ejecutamos campañas coordinadas en todos los canales para máximo impacto." },
    { icon: BarChart, title: "Optimización", description: "Medimos resultados y optimizamos continuamente para superar objetivos." },
  ]

  return (
    <section id="process" className="py-24 md:py-32 ">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-6xl font-light">
              Nuestro <span className="text-primary font-bold italic">proceso</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un enfoque estructurado que garantiza resultados excepcionales
            </p>
          </div>

          <div ref={timelineRef} className="process-timeline relative max-w-4xl mx-auto">
            {/* Línea de progreso */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border">
              <motion.div
                className="absolute inset-0 bg-primary origin-top"
                style={{ scaleY }}
              />
            </div>

            <div className="space-y-16">
              {phases.map((phase, index) => {
                const Icon = phase.icon
                const isEven = index % 2 === 0

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn(
                      "process-phase relative flex items-center",
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    {/* Icono */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-background flex items-center justify-center z-10 backdrop-blur-lg bg-card">
                      <Icon className="text-primary" size={28} />
                    </div>

                    {/* Tarjeta de contenido */}
                    <div className={cn("ml-24 md:ml-0 md:w-1/2", isEven ? "md:pr-16" : "md:pl-16")}>
                      <GlassCard
                        variant="muted"
                        rounded="lg"
                        padding="md"
                        blur="md"
                        className={cn(
                          "bg-card/85", //85% opacidad para mejor legibilidad
                          "hover:scale-[1.02] transition-all duration-300",
                          "hover:bg-card/75 dark:hover:bg-card/70", //más oscuro al hacer hover
                          "shadow-md hover:shadow-lg"
                        )}
                      >
                        <h3 className="text-2xl font-bold text-foreground">{phase.title}</h3>
                        <p className="mt-2 text-foreground/80 leading-relaxed"> {/* mejor contraste */}
                          {phase.description}
                        </p>
                      </GlassCard>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}