// components/testimonials-section.tsx
"use client";

import { useEffect, useRef } from "react";
import { TestimonialsColumn } from "@/components/ui/testimonials-column";

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((element, index) => {
              setTimeout(() => {
                (element as HTMLElement).style.opacity = "1";
                (element as HTMLElement).style.transform = "translateY(0)";
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      text: "Gracias a TIKI PR, logramos un incremento del 140% en engagement en redes sociales en solo 3 meses. Nuestra campaña de lanzamiento tuvo cobertura nacional.",
      name: "Laura Mendoza",
      role: "CEO, ModaSostenible.mx",
    },
    {
      text: "Antes de trabajar con ellos, no teníamos presencia en medios. Hoy, hemos aparecido en Forbes México, Expansión y Chilango. El ROI de su estrategia fue 5x.",
      name: "Diego Ramos",
      role: "Fundador, TechEdu Labs",
    },
    {
      text: "Nuestra tasa de conversión subió un 65% tras implementar su estrategia de storytelling en redes. ¡Y todo con el mismo presupuesto!",
      name: "Sofía Contreras",
      role: "Directora de Marketing, NutriVida",
    },
    {
      text: "Organizamos un evento con 500 asistentes gracias a su gestión de prensa. Generamos más de 2 millones de impresiones en 48 horas.",
      name: "Carlos Díaz",
      role: "Head of Brand, Café Raíz",
    },
    {
      text: "Nos ayudaron a redefinir nuestra identidad de marca. En 6 meses, duplicamos seguidores y triplicamos leads calificados.",
      name: "Valeria Gómez",
      role: "CMO, Arquitectura Verde",
    },
    {
      text: "Su enfoque en datos nos permitió reducir el CAC en un 30% mientras escalábamos campañas en TikTok e Instagram.",
      name: "Miguel Rojas",
      role: "Growth Manager, FintechNow",
    },
    {
      text: "Pasamos de 0 a 12 notas de prensa en medios top en menos de 4 meses. Nuestra autoridad en el sector se disparó.",
      name: "Elena Torres",
      role: "Co-fundadora, BioWellness",
    },
    {
      text: "El video que produjeron para nuestro lanzamiento alcanzó 1.2M de vistas orgánicas. Hoy es nuestro mejor activo de contenido.",
      name: "Javier Limón",
      role: "Director Creativo, Sonido Puro",
    },
    {
      text: "Lograron posicionar nuestro nombre en el top 3 de búsquedas en Google para 'consultoría sostenible' en México. ¡Increíble!",
      name: "Andrea Espinoza",
      role: "Partner, GreenStrategy",
    },
    {
      text: "Nuestro rebranding con TIKI PR no solo mejoró la percepción de marca, sino que aumentó las ventas un 40% en el primer trimestre.",
      name: "Ricardo Navarro",
      role: "CEO, DeliCraft",
    },
  ];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative pt-24 pb-24 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      {/* Grid de fondo sutil */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(255 255 255 / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(255 255 255 / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div 
            className="fade-in-element inline-flex items-center gap-2 text-foreground/60 text-sm font-medium tracking-wider uppercase mb-6"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.8s ease-out" }}
          >
            <div className="w-8 h-px bg-foreground/20"></div>
            Testimonios Reales
            <div className="w-8 h-px bg-foreground/20"></div>
          </div>
          <h2 
            className="fade-in-element text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.8s ease-out 0.1s" }}
          >
            Lo que dicen quienes <span className="font-medium italic">confiaron en nosotros</span>
          </h2>
          <p 
            className="fade-in-element text-lg text-foreground/70 max-w-2xl mx-auto"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.8s ease-out 0.2s" }}
          >
            10 testimonios reales, con resultados específicos y medibles que respaldan nuestro impacto.
          </p>
        </div>

        {/* Carrusel de testimonios */}
        <div 
          className="fade-in-element relative flex justify-center items-start min-h-[700px]"
          style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.8s ease-out 0.3s" }}
        >
          <div className="flex gap-6 max-w-6xl w-full justify-center">
            <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={25} />
            <TestimonialsColumn testimonials={testimonials.slice(3, 6)} duration={22} className="hidden md:block" />
            <TestimonialsColumn testimonials={testimonials.slice(6, 10)} duration={27} className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}