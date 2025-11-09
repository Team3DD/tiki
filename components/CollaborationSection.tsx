"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { CollaborationColumn } from "@/components/ui/collaboration-column";
import { CollaborationModal } from "@/components/ui/collaboration-modal";
import type { Collaboration, CollaborationData } from "@/types";

export function ColaborationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCollaboration, setSelectedCollaboration] = useState<CollaborationData | null>(null);

  const openModal = useCallback((collab: CollaborationData) => {
    setSelectedCollaboration(collab);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setSelectedCollaboration(null), 300);
  }, []);

  // Lista de colaboraciones - memoizada para evitar recreación
  const collaborations: Collaboration[] = useMemo(() => {
    const createCollaboration = (
      name: string,
      logo: string,
      image: string,
      shortDesc: string,
      fullDesc: string,
      ctaText: string
    ): Collaboration => ({
      name,
      logo,
      image,
      description: shortDesc,
      onClick: () => openModal({
        name,
        logo,
        image,
        description: fullDesc,
        ctaText,
        ctaLink: "#"
      }),
    });

    return [
      createCollaboration(
        "ULMA",
        "/clients/logo_ulma.png",
        "/clients/collage_ulma.webp",
        "Estrategia integral de comunicación para el lanzamiento de su nueva línea de empaques sostenibles en Latinoamérica.",
        "Desarrollamos una campaña 360° que incluyó gestión de prensa, contenido digital y activaciones en punto de venta, logrando un aumento del 40% en reconocimiento de marca en 6 meses.",
        "Ver campaña"
      ),
      createCollaboration(
        "UNITEC",
        "/clients/logo_unitec.png",
        "/clients/collage_unitec.webp",
        "Diseño y producción de contenidos para la campaña de admisión nacional 2024.",
        "Creamos una serie de videos testimoniales, piezas gráficas y estrategia en redes sociales que incrementó un 25% las solicitudes de información desde canales digitales.",
        "Ver portafolio"
      ),
      createCollaboration(
        "ORGANON",
        "/logo.png",
        "/clients/organon.webp",
        "Relaciones públicas y comunicación corporativa para el lanzamiento en México.",
        "Acompañamiento en el posicionamiento de marca en el sector salud femenina, con enfoque en sostenibilidad y equidad. Cobertura en +50 medios especializados.",
        "Leer caso"
      ),
      createCollaboration(
        "MITRE",
        "/clients/logo_mitre.png",
        "/clients/collage_mitre.webp",
        "Estrategia de contenido y redes sociales para su división industrial.",
        "Desarrollo de contenido técnico y visual para LinkedIn e Instagram, aumentando engagement en +200% y generando leads calificados para su equipo comercial.",
        "Ver resultados"
      ),
      createCollaboration(
        "Iberdrola",
        "/clients/logo_iberdrola.png",
        "/clients/collage_Iberdrola.webp",
        "Campaña de RSE para el programa 'Energía para el Futuro'.",
        "Comunicación de impacto social en comunidades rurales, con storytelling visual y alianzas con ONGs. Alcance mediático de 2M+ personas.",
        "Ver proyecto"
      ),
      createCollaboration(
        "CIVV",
        "/logo.png",
        "/clients/civv.webp",
        "Producción audiovisual para su plataforma de innovación.",
        "Creación de documentales corporativos y videos explicativos que humanizan la innovación en el sector público.",
        "Ver videos"
      ),
      createCollaboration(
        "UVM",
        "/clients/logo_uvm.png",
        "/clients/collage_uvm.webp",
        "Estrategia de marca empleadora para atraer talento joven.",
        "Campaña en TikTok e Instagram con micro-influencers estudiantiles, logrando +15K seguidores y un 30% más de postulaciones a vacantes.",
        "Ver campaña"
      ),
      createCollaboration(
        "Cámara de Comercio Española",
        "/clients/logo_camara_espanola.png",
        "/clients/collage_camara-espanola.webp",
        "Gestión de comunicación para el Foro Económico México-España.",
        "Cobertura mediática, producción de contenidos y moderación de paneles con líderes empresariales. +30 medios presentes y 500 asistentes presenciales.",
        "Ver evento"
      ),
      createCollaboration(
        "Tecmilenio",
        "/clients/logo_tecmilenio.png",
        "/clients/collage_tecmilenio.webp",
        "Contenido digital para la campaña 'Futuro en Acción'.",
        "Desarrollo de microsite interactivo y serie de reels educativos sobre carreras del futuro, con +2M impresiones orgánicas.",
        "Explorar microsite"
      ),
      createCollaboration(
        "Sngular",
        "/clients/logo_singular.png",
        "/clients/collage_singular.webp",
        "Posicionamiento de marca en el ecosistema tech mexicano.",
        "Estrategia de relaciones públicas y contenido de opinión en medios especializados, consolidando su presencia como partner tecnológico clave.",
        "Leer artículo"
      ),
    ];
  }, [openModal]);

  // Dividir colaboraciones en 3 columnas - memoizado
  const columns = useMemo(() => {
    const numColumns = 3;
    const cols: Collaboration[][] = Array.from({ length: numColumns }, () => []);

    collaborations.forEach((item, index) => {
      const columnIndex = index % numColumns;
      cols[columnIndex].push(item);
    });

    return cols;
  }, [collaborations]);

  // Fade-in en scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll<HTMLElement>(".fade-in-element");
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }, i * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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
            className="fade-in-element inline-flex items-center gap-2 text-[var(--color-foreground)]/60 text-sm font-medium tracking-wider uppercase mb-6"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.8s ease-out" }}
          >
            <div className="w-8 h-px bg-[var(--color-foreground)]/20"></div>
            Nuestras Colaboraciones
            <div className="w-8 h-px bg-[var(--color-foreground)]/20"></div>
          </div>
          <h2
            className="fade-in-element text-4xl md:text-5xl lg:text-6xl font-light text-[var(--color-foreground)] mb-6"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.8s ease-out 0.1s" }}
          >
            Marcas que <span className="font-medium italic">confían</span> en nosotros
          </h2>
          <p
            className="fade-in-element text-lg text-[var(--color-foreground)]/70 max-w-2xl mx-auto"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.8s ease-out 0.2s" }}
          >
            Descubre cómo hemos transformado la comunicación de empresas líderes en México y el mundo
          </p>
        </div>

        {/* Carrusel de colaboraciones - 3 columnas distribuidas */}
        <div className="flex gap-6 max-w-6xl w-full justify-center mx-auto">
          {columns[0] && columns[0].length > 0 && (
            <CollaborationColumn
              key="col-0"
              collaborations={columns[0]}
              duration={65}
              delay={0}
            />
          )}
          {columns[1] && columns[1].length > 0 && (
            <CollaborationColumn
              key="col-1"
              collaborations={columns[1]}
              duration={65}
              delay={0}
              className="hidden md:block"
            />
          )}
          {columns[2] && columns[2].length > 0 && (
            <CollaborationColumn
              key="col-2"
              collaborations={columns[2]}
              duration={65}
              delay={0}
              className="hidden lg:block"
            />
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedCollaboration && (
        <CollaborationModal
          isOpen={modalOpen}
          onClose={closeModal}
          name={selectedCollaboration.name}
          logo={selectedCollaboration.logo}
          image={selectedCollaboration.image}
          description={selectedCollaboration.description}
          ctaText={selectedCollaboration.ctaText}
          ctaLink={selectedCollaboration.ctaLink}
        />
      )}
    </section>
  );
}