"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

// --- Constantes y Tipos (DRY) ---
const FOOTER_SECTIONS: FooterSection[] = [
  {
    label: "Servicios",
    links: [
      { title: "Relaciones Públicas", href: "#features" },
      { title: "Producción Creativa", href: "#features" },
      { title: "Marketing Digital", href: "#features" },
      { title: "Consultoría Estratégica", href: "#features" },
    ],
  },
  {
    label: "Empresa",
    links: [
      { title: "Quiénes Somos", href: "#" },
      { title: "Nuestro Equipo", href: "#testimonials" },
      { title: "Contacto", href: "#contact" },
      { title: "Portafolio", href: "#" },
    ],
  },
  {
    label: "TIKI PR",
    links: [
      { title: "Política de Privacidad", href: "#" },
      { title: "Términos de Servicio", href: "#" },
      { title: "Blog", href: "#" },
      { title: "Recursos", href: "#" },
    ],
  },
  {
    label: "Síguenos",
    links: [
      { title: "Facebook", href: "#", icon: FacebookIcon },
      { title: "Instagram", href: "#", icon: InstagramIcon },
      { title: "LinkedIn", href: "#", icon: LinkedinIcon },
    ],
  },
];

const TEXT_STYLES = {
  heading: "text-foreground",
  body: "text-foreground/90",
  muted: "text-muted-foreground",
  linkHover: "hover:text-foreground transition-colors duration-200",
};

const BORDER_STYLES = {
  top: "border-border",
  divider: "border-border/50",
};

const TEAM_3_STYLES = "text-[#DC143C] hover:text-foreground transition-colors duration-200 font-semibold";
const LOGO_SIZE_CLASS = "h-16 w-auto";
// --- Fin Constantes ---

// --- Componente de Animación (Separado y Reutilizable) ---
const AnimatedContainer = ({ delay = 0.1, children, className = "" }: {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
// --- Fin Componente de Animación ---

// --- Hook Personalizado para Tema (DRY & Optimizado) ---
const useIsDarkTheme = (): boolean => {
  const [isLight, setIsLight] = useState(false);

  const updateTheme = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsLight(document.documentElement.classList.contains('light'));
    }
  }, []);

  useEffect(() => {
    updateTheme();

    const observer = new MutationObserver((mutations) => {
      if (mutations.some(m => m.attributeName === 'class')) {
        updateTheme();
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, [updateTheme]);

  return !isLight; // Devuelve true si es modo oscuro
};
// --- Fin Hook Personalizado ---

export function Footer() {
  const currentYear = new Date().getFullYear();
  const isDark = useIsDarkTheme(); // Usar el hook personalizado

  return (
    <footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t px-6 py-12 lg:py-16 transition-colors duration-200 border-border">
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur transition-colors duration-200" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <div className="transition-colors duration-200">
            <Image
              src="/logo.svg"
              alt="TIKI PR Logo"
              width={78}
              height={78}
              className={`${LOGO_SIZE_CLASS} object-contain transition-all duration-200`}
              style={{ filter: isDark ? "invert(1)" : "none" }}
              priority
            />
          </div>
          <div className={`mt-8 text-sm md:mt-0 md:block hidden transition-colors duration-200 ${TEXT_STYLES.body}`}>
            <p>© {currentYear} TIKI PR. Todos los derechos reservados.</p>
            <p className="mt-2 text-xs">
              Design & Development by{" "}
              <a href="#" className={TEAM_3_STYLES}>
                TEAM 3
              </a>
            </p>
          </div>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {FOOTER_SECTIONS.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className={`text-sm font-bold transition-colors duration-200 ${TEXT_STYLES.heading}`}>
                  {section.label}
                </h3>
                <ul className={`mt-4 space-y-2 text-sm transition-colors duration-200 ${TEXT_STYLES.body}`}>
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className={`inline-flex items-center ${TEXT_STYLES.linkHover}`}
                      >
                        {link.icon && <link.icon className="me-1 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      <div className="md:hidden mt-8 text-center space-y-2">
        <p className={`text-sm transition-colors duration-200 ${TEXT_STYLES.body}`}>
          © {currentYear} TIKI PR. Todos los derechos reservados.
        </p>
        <p className="text-xs">
          Design & Development by{" "}
          <a href="#" className={TEAM_3_STYLES}>
            TEAM 3
          </a>
        </p>
        <p className={`text-xs transition-colors duration-200 ${TEXT_STYLES.muted}`}>
          Agencia de Producción Creativa & Relaciones Públicas
        </p>
      </div>

      <div className={`hidden md:block mt-8 pt-6 border-t w-full transition-colors duration-200 ${BORDER_STYLES.divider}`}>
        <p className={`text-xs text-center transition-colors duration-200 ${TEXT_STYLES.muted}`}>
          Agencia de Producción Creativa, Relaciones Públicas & Marketing • México 
        </p>
      </div>
    </footer>
  );
}