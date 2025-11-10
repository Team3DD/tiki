"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const projects = [
  {
    title: "Campaña Editorial Vogue",
    category: "Editoriales",
    description: "Producción completa para portada y editorial de 12 páginas en Vogue México.",
    width: 800,
    height: 1200,
  },
  {
    title: "Lanzamiento Producto Tech",
    category: "Influencer Marketing",
    description: "Estrategia de influencer marketing para lanzamiento de smartphone con 50M+ impresiones.",
    width: 1200,
    height: 800,
  },
  {
    title: "Campaña Sostenibilidad",
    category: "Producciones",
    description: "Producción audiovisual de campaña de sostenibilidad para marca global.",
    width: 800,
    height: 800,
  },
  {
    title: "Fashion Week Coverage",
    category: "Editoriales",
    description: "Cobertura completa y gestión de prensa para desfile en Fashion Week.",
    width: 800,
    height: 1200,
  },
  {
    title: "Colaboración Influencer",
    category: "Influencer Marketing",
    description: "Gestión de colaboración con top influencers para marca de belleza.",
    width: 800,
    height: 800,
  },
  {
    title: "Video Corporativo",
    category: "Producciones",
    description: "Producción de video corporativo de alto impacto para empresa Fortune 500.",
    width: 1200,
    height: 800,
  },
  {
    title: "Evento de Marca",
    category: "Producciones",
    description: "Producción integral de evento de lanzamiento con 500+ asistentes.",
    width: 800,
    height: 1200,
  },
  {
    title: "Campaña Digital",
    category: "Marketing",
    description: "Campaña digital multiplataforma con alcance de 10M+ usuarios.",
    width: 1200,
    height: 800,
  },
  {
    title: "Sesión Fotográfica",
    category: "Editoriales",
    description: "Sesión fotográfica de producto para campaña internacional.",
    width: 800,
    height: 1200,
  },
  {
    title: "Estrategia de Contenido",
    category: "Marketing",
    description: "Desarrollo de estrategia de contenido anual para marca líder.",
    width: 800,
    height: 800,
  },
]

export default function Portfolio() {
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
    <section id="portfolio" ref={sectionRef} className="py-16 sm:py-24 relative z-10">
      <div className="bg-[var(--color-background)]/80 px-4 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full bg-[var(--color-background)]/10 backdrop-blur-md border border-[var(--color-foreground)]/20 text-[var(--color-foreground)] text-sm font-medium mb-8 mt-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="w-2 h-2 bg-[var(--color-foreground)]/60 rounded-full mr-2 animate-pulse" />
              Nuestro trabajo
            </div>

            <h2
              className={`text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Nuestro{" "}
              <span className="text-[var(--color-foreground)]">portafolio</span>
            </h2>

            <p
              className={`text-xl text-[var(--color-foreground)]/80 max-w-2xl mx-auto transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Proyectos que demuestran nuestra excelencia creativa
            </p>
          </div>

          {/* Masonry layout con imágenes uniformes */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`break-inside-avoid transition-all duration-1000 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
                }}
              >
                <div className="group cursor-pointer rounded-xl overflow-hidden border border-[var(--color-foreground)]/20 relative transition-all duration-300">
                  <div className="relative w-full">
                    {/* Imagen fija: logo.png */}
                    <Image
                      src="/logo.png"
                      alt={project.title}
                      width={project.width}
                      height={project.height}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Overlay oscuro en hover */}
                    <div className="absolute inset-0 bg-[var(--color-foreground)] opacity-0 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  {/* Texto en hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-[var(--color-background)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <p className="text-sm font-semibold">{project.category}</p>
                    <h3 className="text-lg font-bold mt-1">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}