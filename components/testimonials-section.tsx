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
      text: "Especialista en estrategia de comunicación con más de 15 años en la industria. Lidera la dirección creativa y visión de TIKI PR.",
      name: "Aarón Vieyra",
      role: "Fundador & Director",
    },
    {
      text: "Coordinadora de cuentas con experiencia en gestión de proyectos complejos. Garantiza que cada cliente reciba atención personalizada.",
      name: "Constanza Aguilar",
      role: "Coordinadora de Cuentas",
    },
    {
      text: "Especialista en redes sociales y contenido digital. Crea estrategias de engagement que generan comunidades activas.",
      name: "Claudia Jiménez",
      role: "Especialista en RRSS",
    },
    {
      text: "Productor creativo con experiencia en medios audiovisuales y diseño. Transforma ideas en contenido visual impactante.",
      name: "Roberto Martínez",
      role: "Productor Creativo",
    },
    {
      text: "Analista de datos y ROI. Mide y optimiza cada estrategia para garantizar resultados medibles y continuos.",
      name: "Michelle López",
      role: "Especialista en Analytics",
    },
    {
      text: "Directora de relaciones con medios. Construye conexiones estratégicas que amplifican tu marca en canales clave.",
      name: "Patricia Rodríguez",
      role: "Directora de Medios",
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
            Nuestro Equipo
            <div className="w-8 h-px bg-foreground/20"></div>
          </div>
          <h2 
            className="fade-in-element text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.8s ease-out 0.1s" }}
          >
            Los <span className="font-medium italic">expertos</span> detrás de tu marca
          </h2>
          <p 
            className="fade-in-element text-lg text-foreground/70 max-w-2xl mx-auto"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.8s ease-out 0.2s" }}
          >
            Conoce al equipo de profesionales que transformará tu comunicación y llevará tu marca al siguiente nivel
          </p>
        </div>

        {/* Carrusel de testimonios */}
        <div 
          className="fade-in-element relative flex justify-center items-start min-h-[700px]"
          style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.8s ease-out 0.3s" }}
        >
          <div className="flex gap-6 max-w-6xl w-full justify-center">
            <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={25} />
            <TestimonialsColumn testimonials={testimonials.slice(2, 5)} duration={20} className="hidden md:block" />
            <TestimonialsColumn testimonials={testimonials.slice(1, 4)} duration={28} className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}