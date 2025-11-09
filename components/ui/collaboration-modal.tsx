"use client";

import React, { useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp } from "lucide-react";
import { SharedLogo } from "@/components/ui/shared-logo";
import { Button } from "@/components/ui/button";

interface CollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  logo: string;
  image?: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

export const CollaborationModal = ({
  isOpen,
  onClose,
  name,
  logo,
  image,
  description,
  ctaText = "Ver más",
  ctaLink,
}: CollaborationModalProps) => {
  // Cerrar con tecla ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCTAClick = () => {
    if (ctaLink) {
      window.open(ctaLink, "_blank", "noopener,noreferrer");
    }
  };

  // Determinar qué imagen mostrar (priorizar 'image', sino usar 'logo')
  const displayImage = image || logo;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="relative w-[97vw] h-[97vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <GlassCard
              variant="muted"
              rounded="lg"
              padding="none"
              className="h-full flex flex-col overflow-hidden"
            >
              <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                @keyframes scrollIndicator {
                  0% {
                    transform: translateY(0);
                    opacity: 0;
                  }
                  10% {
                    opacity: 1;
                    transform: translateY(0);
                  }
                  30% {
                    transform: translateY(-20px);
                  }
                  45% {
                    transform: translateY(-10px);
                  }
                  60% {
                    transform: translateY(-20px);
                  }
                  75% {
                    transform: translateY(-10px);
                  }
                  90% {
                    transform: translateY(-20px);
                    opacity: 1;
                  }
                  100% {
                    transform: translateY(-20px);
                    opacity: 0;
                  }
                }
                .animate-scroll-indicator {
                  animation: scrollIndicator 1.5s ease-in-out forwards;
                }
              `}</style>

              {/* Header fijo: nombre + logo pequeño */}
              <div className="flex justify-between items-start p-4 sm:p-6 pb-3 sm:pb-4 border-b border-[var(--color-border)]/20 flex-shrink-0">
                <h2 className="text-[var(--color-foreground)]/80 font-medium text-base sm:text-lg">{name}</h2>
                <div className="w-14 h-7 sm:w-16 sm:h-8 flex-shrink-0 ml-3">
                  <SharedLogo
                    src={logo}
                    alt={name}
                    width={64}
                    height={32}
                  />
                </div>
              </div>

              {/* Contenedor con scroll para imagen + descripción */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide relative">
                {/* Imagen principal 9:16 (solo si existe y es diferente al logo) */}
                {image && image !== logo && (
                  <div className="relative w-full bg-[var(--color-foreground)]/5 overflow-hidden" style={{ paddingBottom: '177.78%' }}>
                    <img
                      src={image}
                      alt={name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = logo;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/40 to-transparent" />
                  </div>
                )}

                {/* Contenido principal */}
                <div className="p-4 sm:p-6">
                  <p className="text-[var(--color-foreground)]/90 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {description}
                  </p>
                </div>
              </div>

              {/* Footer fijo: botones */}
              <div className="flex justify-between items-center p-4 sm:p-6 pt-3 sm:pt-4 border-t border-[var(--color-border)]/20 flex-shrink-0 gap-3 relative">
                {/* Indicador de scroll */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none">
                  <ChevronUp 
                    className="text-[var(--color-foreground)]/40 animate-scroll-indicator" 
                    size={32}
                  />
                </div>

                <Button
                  onClick={handleCTAClick}
                  variant="default"
                  size="lg"
                  className="rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer"
                >
                  <span>{ctaText}</span>
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  size="lg"
                  className="rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 group cursor-pointer"
                >
                  <span>Cerrar</span>
                  <X className="ml-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" size={20} />
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};