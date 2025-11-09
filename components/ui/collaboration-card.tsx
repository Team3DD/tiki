"use client";

import { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { SharedLogo } from "@/components/ui/shared-logo";

interface CollaborationCardProps {
  name: string;
  logo: string;
  description: string;
  onClick: () => void;
}

export const CollaborationCard = memo(({
  name,
  logo,
  description,
  onClick,
}: CollaborationCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = useCallback(() => setIsFlipped(true), []);
  const handleMouseLeave = useCallback(() => setIsFlipped(false), []);

  return (
    <div
      className="w-full max-w-xs cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <GlassCard
        variant="muted"
        rounded="lg"
        padding="none"
        className="w-full overflow-hidden"
      >
        <motion.div
          className="relative w-full min-h-[20rem] h-80"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Frente: Logo grande */}
          <div
            className="absolute inset-0 flex items-center justify-center backface-hidden p-8"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <SharedLogo
                src={logo}
                alt={name}
                width={280}
                height={280}
                className="opacity-90"
              />
            </div>
          </div>

          {/* Reverso: Información */}
          <div
            className="absolute inset-0 flex flex-col p-6 backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <h3 className="text-[var(--color-foreground)] font-semibold text-base mb-3">
              {name}
            </h3>

            <p className="text-[var(--color-foreground)]/80 text-sm leading-relaxed flex-grow line-clamp-4">
              {description}
            </p>

            <div className="flex justify-between items-end mt-4 pt-3 border-t border-[var(--color-border)]/20">
              <div className="w-20 h-10 flex items-center justify-start">
                <SharedLogo
                  src={logo}
                  alt={name}
                  width={80}
                  height={80}
                />
              </div>
              <span className="text-xs text-[var(--color-foreground)]/90 font-semibold italic">
                Ver más...
              </span>
            </div>
          </div>
        </motion.div>
      </GlassCard>
    </div>
  );
});

CollaborationCard.displayName = 'CollaborationCard';