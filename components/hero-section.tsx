"use client"

import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, Transition } from "framer-motion"

// ============= TYPES =============
interface RotatingTextProps {
  texts: string[]
  mainClassName?: string
  staggerFrom?: "first" | "last" | "center"
  initial?: { y: string | number }
  animate?: { y: string | number }
  exit?: { y: string | number }
  staggerDuration?: number
  splitLevelClassName?: string
  transition?: Transition
  rotationInterval?: number
}

// ============= CONSTANTS =============
const SECTORS = ["Movilidad", "Consumo", "Servicios", "Energía", "RSE", "Tech"]
const ROTATING_TEXTS = ["Tus Ideas", "Tu Marca", "Tu Voz", "Tu Historia", "Tu Impacto"]

// ============= COMPONENTS =============
const Icon: React.FC<{ d: string; className?: string }> = ({ d, className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
)

const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  mainClassName = "",
  staggerFrom = "last",
  initial = { y: "1em" },
  animate = { y: 0 },
  exit = { y: "-1.2em" },
  staggerDuration = 0.025,
  splitLevelClassName = "",
  transition = { type: "spring", damping: 30, stiffness: 400 },
  rotationInterval = 2000,
}) => {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % texts.length), rotationInterval)
    return () => clearInterval(timer)
  }, [texts.length, rotationInterval])

  const letters = texts[idx].split("")
  const getDelay = (i: number) => {
    const len = letters.length
    return staggerFrom === "first" ? i * staggerDuration : 
           staggerFrom === "center" ? Math.abs(Math.floor(len / 2) - i) * staggerDuration :
           (len - 1 - i) * staggerDuration
  }

  return (
    <div className={`inline-flex ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.div key={idx} className="inline-flex">
          {letters.map((char, i) => (
            <div key={`${idx}-${i}`} className={splitLevelClassName}>
              <motion.span
                initial={initial}
                animate={animate}
                exit={exit}
                transition={{ ...transition, delay: getDelay(i) } as Transition}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Carrusel infinito con CSS Animation
const InfiniteCarousel: React.FC = () => {
  return (
    <div className="relative overflow-hidden w-full">
      <div className="flex animate-infinite-scroll whitespace-nowrap">
        {SECTORS.map((sector, idx) => (
          <React.Fragment key={idx}>
            <div className="text-2xl md:text-3xl font-light italic text-[var(--color-foreground)]/70 px-4 py-2 transition-colors duration-300">
              {sector}
            </div>
            <div className="text-2xl md:text-3xl font-light italic text-[var(--color-foreground)]/30 px-4 py-2">•</div>
          </React.Fragment>
        ))}
        {/* Duplicar contenido para efecto infinito */}
        {SECTORS.map((sector, idx) => (
          <React.Fragment key={`dup-${idx}`}>
            <div className="text-2xl md:text-3xl font-light italic text-[var(--color-foreground)]/70 px-4 py-2 transition-colors duration-300">
              {sector}
            </div>
            <div className="text-2xl md:text-3xl font-light italic text-[var(--color-foreground)]/30 px-4 py-2">•</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// TrustSection con carrusel infinito en todos los dispositivos
const TrustSection: React.FC = () => (
  <div className="text-center px-4 overflow-hidden animate-fade-in-trust">
    <p className="text-sm text-[var(--color-foreground)]/60 transition-colors duration-300 mb-8">
      Confían en nosotros empresas líderes en México y el mundo
    </p>
    
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden py-10">
      <InfiniteCarousel />
    </div>
  </div>
)

export function HeroSection() {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light")

    document.documentElement.classList.toggle("dark", initialTheme === "dark")
    document.documentElement.classList.toggle("light", initialTheme === "light")

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme" && e.newValue) {
        document.documentElement.classList.toggle("dark", e.newValue === "dark")
        document.documentElement.classList.toggle("light", e.newValue === "light")
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return (
    <>
      <style jsx global>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 20s linear infinite;
          display: flex;
          width: 200%;
        }

        /* Para responsividad móvil */
        @media (max-width: 640px) {
          .animate-infinite-scroll {
            animation-duration: 30s;
          }
        }
      `}</style>
      
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-hero">
          
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--color-background)]/10 backdrop-blur-md border border-[var(--color-foreground)]/20 text-[var(--color-foreground)] text-sm font-medium mb-8 mt-12 animate-fade-in-badge transition-colors duration-300">
            <span className="w-2 h-2 bg-[var(--color-foreground)]/60 rounded-full mr-2 animate-pulse" />
            Fundada en 2018 • +1000 publicaciones exitosas
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 animate-fade-in-heading">
            <span className="text-[var(--color-foreground)] transition-colors duration-300">Conectamos y</span>
            <br />
            <span className="inline-flex items-center justify-center flex-wrap gap-2 mt-4 sm:mt-6 md:mt-8">
              <span className="text-[var(--color-foreground)] transition-colors duration-300">Comunicamos</span>
              <RotatingText
                texts={ROTATING_TEXTS}
                mainClassName="px-2 sm:px-2 md:px-3 bg-[var(--color-foreground)] text-[var(--color-background)] overflow-hidden py-1 sm:py-1 md:py-2 justify-center rounded-lg transition-colors duration-300"
                staggerFrom="last"
                splitLevelClassName="overflow-hidden pb-1"
              />
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-xl md:text-2xl text-[var(--color-foreground)]/80 text-balance max-w-sm sm:max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0 animate-fade-in-subheading font-light transition-colors duration-300">
            Agencia de Producción Creativa, Relaciones Públicas & Marketing. Transformamos ideas en historias que impactan y conectan con tu audiencia.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-16 animate-fade-in-buttons">
            <Button size="lg">
              Conoce Nuestros Servicios
            </Button>
            
            <Button variant="outline" size="lg">
              <Icon d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" className="h-5 w-5" />
              Ver Portafolio
            </Button>
          </div>

          {/* Trust Indicators */}
          <TrustSection />
        </div>
      </section>
    </>
  )
}