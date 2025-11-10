// components/features-section.tsx
"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { useEffect, useState } from "react"

const pillars = [
  "Estrategias de comunicación 360°",
  "Producción creativa de alto impacto",
  "Relaciones públicas con medios clave",
  "Marketing digital y gestión de redes",
  "Alianzas con influencers estratégicos",
]

const stats = [
  { value: "+1,000", label: "Campañas lanzadas" },
  { value: "4.5", label: "Años impulsando marcas" },
  { value: "100%", label: "Compromiso con resultados reales" },
]

export function FeaturesSection() {
  const [isLight, setIsLight] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const isLightMode = document.documentElement.classList.contains('light')
    setIsLight(isLightMode)

    const observer = new MutationObserver(() => {
      const nowLight = document.documentElement.classList.contains('light')
      if (nowLight !== isLight) setIsLight(nowLight)
    })

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [isLight])

  // El variant base (sin hover)
  const baseVariant = isLight ? "dark" : "light"

  // El variant ACTUAL: si hay hover, lo invertimos
  const currentVariant = isHovered ? (baseVariant === "dark" ? "light" : "dark") : baseVariant

  // El color de texto: sigue la lógica del variant ACTUAL
  const isTextWhite = currentVariant === "light" // porque "light" = fondo blanco → texto oscuro, "dark" = fondo negro → texto blanco
    ? false
    : true

  return (
    <section id="features" className="py-24 md:py-32 bg-background/70">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground text-balance"
            >
              Creamos narrativas que{" "}
              <span className="font-bold italic">conectan marcas </span>con audiencias
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-foreground/70 leading-relaxed max-w-xl"
            >
              En <span className="font-bold"> TIKI PR </span>, combinamos creatividad, estrategia y tecnología para construir presencia auténtica, generar
              engagement y posicionar tu marca en el corazón de tu público.
            </motion.p>

            <div className="space-y-4 pt-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="text-foreground/60 mt-1 flex-shrink-0" size={24} />
                  <span className="text-foreground">{pillar}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats con hover controlado desde aquí */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 11, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 300 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <GlassCard
  variant={currentVariant}
  rounded="lg"
  padding="lg"
  blur="xl"
  className={`
    space-y-6 md:space-y-8 cursor-pointer transition-colors duration-300
    ${isHovered 
      ? currentVariant === "light" 
        ? "bg-black/5 border-black/10" 
        : "bg-white/5 border-white/0"
      : ""
    }
  `}
>
  {stats.map((stat, index) => (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className="text-center space-y-2"
    >
      <div className={`text-5xl md:text-6xl font-bold ${isTextWhite ? 'text-white' : 'text-slate-950'}`}>
        {stat.value}
      </div>
      <p className={`text-lg ${isTextWhite ? 'text-white/90' : 'text-slate-950/90'}`}>
        {stat.label}
      </p>
    </motion.div>
  ))}
</GlassCard>

            {/* Decoración */}
            <div className="absolute -top-20 -right-20 w-74 h-74 md:w-52 md:h-52 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-secondary/10 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}